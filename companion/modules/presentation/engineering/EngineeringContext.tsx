"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { usePathname } from "next/navigation";
import {
  ATLAS_SECTION_ALIASES,
  focusFromAtlasHash,
  isReservedCaseStudyHash,
  resolveAtlasSectionHash,
  resolveCaseStudyHash,
  type EngineeringFocus,
  type SetEngineeringFocusOptions,
} from "./engineering.types";
import {
  focusBelongsToPath,
  readEngineeringFocus,
  readEngineeringRoom,
  writeEngineeringFocus,
  writeEngineeringRoom,
} from "./engineeringMemory";

type EngineeringContextValue = {
  focus: EngineeringFocus | null;
  setFocus: (
    next: EngineeringFocus | null,
    options?: SetEngineeringFocusOptions,
  ) => void;
  clearFocus: () => void;
};

const EngineeringContext = createContext<EngineeringContextValue | null>(null);

type EngineeringProviderProps = {
  children: ReactNode;
};

const ATLAS_SECTION_IDS = new Set(Object.values(ATLAS_SECTION_ALIASES));

function readHash(): string {
  if (typeof window === "undefined") {
    return "";
  }
  return window.location.hash.replace(/^#/, "");
}

function atlasHashForFocus(focus: EngineeringFocus): string | null {
  switch (focus.kind) {
    case "atlas-system":
      return `#atlas-system-${focus.id}`;
    case "atlas-decision":
      return `#atlas-decision-${focus.id}`;
    case "atlas-validation":
      return `#atlas-validation-${focus.id}`;
    case "atlas-failure":
      return `#atlas-failure-${focus.id}`;
    case "atlas-component":
      return `#atlas-component-${focus.id}`;
    default:
      return null;
  }
}

function replaceHash(nextHash: string) {
  if (window.location.hash === nextHash) {
    return;
  }
  window.history.replaceState(
    null,
    "",
    `${window.location.pathname}${nextHash}`,
  );
}

function scrollToId(id: string) {
  window.requestAnimationFrame(() => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "auto",
      block: "start",
    });
  });
}

function rememberRoom(pathname: string, hash: string) {
  writeEngineeringRoom({ pathname, hash });
}

/**
 * One engineering context for EOS — explorers synchronize through focus.
 * Hash restores Atlas / Journey / stage addresses. Product memory resumes quietly.
 */
export function EngineeringProvider({ children }: EngineeringProviderProps) {
  const pathname = usePathname() ?? "/";
  const [focus, setFocusState] = useState<EngineeringFocus | null>(null);
  const focusRef = useRef<EngineeringFocus | null>(null);
  focusRef.current = focus;

  const setFocus = useCallback(
    (next: EngineeringFocus | null, options?: SetEngineeringFocusOptions) => {
      setFocusState(next);
      writeEngineeringFocus(next);

      if (typeof window !== "undefined") {
        rememberRoom(window.location.pathname, readHash());
      }

      if (
        options?.syncHash === false ||
        typeof window === "undefined" ||
        !next
      ) {
        return;
      }

      if (next.kind === "architecture-stage") {
        if (!isReservedCaseStudyHash(next.id)) {
          replaceHash(`#${next.id}`);
          rememberRoom(window.location.pathname, next.id);
        }
        return;
      }

      if (next.kind === "walkthrough-room") {
        replaceHash(`#${next.id}`);
        rememberRoom(window.location.pathname, next.id);
        return;
      }

      if (
        next.kind === "journey-station" &&
        window.location.pathname.includes("/journey")
      ) {
        replaceHash(`#${next.id}`);
        rememberRoom(window.location.pathname, next.id);
        return;
      }

      const atlasHash = atlasHashForFocus(next);
      if (atlasHash && window.location.pathname.includes("/atlas")) {
        replaceHash(atlasHash);
        rememberRoom(window.location.pathname, atlasHash.slice(1));
      }
    },
    [],
  );

  const clearFocus = useCallback(() => {
    setFocusState(null);
    writeEngineeringFocus(null);
  }, []);

  useEffect(() => {
    const applyHash = () => {
      const path = window.location.pathname;
      let hash = readHash();

      if (path.includes("/archive/") && hash) {
        const resolved = resolveCaseStudyHash(hash);
        if (resolved !== hash) {
          replaceHash(`#${resolved}`);
          hash = resolved;
        }
      }

      if (path.includes("/atlas") && hash) {
        const sectionAlias = resolveAtlasSectionHash(hash);
        if (sectionAlias) {
          replaceHash(`#${sectionAlias}`);
          scrollToId(sectionAlias);
          rememberRoom(path, sectionAlias);
          return;
        }
        if (ATLAS_SECTION_IDS.has(hash)) {
          scrollToId(hash);
          rememberRoom(path, hash);
          return;
        }
      }

      if (path.includes("/journey") && hash === "systems") {
        scrollToId("systems");
        rememberRoom(path, "systems");
        return;
      }

      if (!hash) {
        return;
      }

      const atlasFocus = focusFromAtlasHash(hash);
      if (atlasFocus) {
        setFocusState(atlasFocus);
        writeEngineeringFocus(atlasFocus);
        rememberRoom(path, hash);
        return;
      }

      if (isReservedCaseStudyHash(hash)) {
        rememberRoom(path, hash);
        return;
      }

      if (hash.startsWith("atlas-")) {
        return;
      }

      if (/^\d{4}-/.test(hash) && path.includes("/journey")) {
        const stationFocus: EngineeringFocus = {
          kind: "journey-station",
          id: hash,
          label: hash,
          related: [],
          source: "hash",
        };
        setFocusState(stationFocus);
        writeEngineeringFocus(stationFocus);
        rememberRoom(path, hash);
        return;
      }

      if (path.includes("/archive/")) {
        rememberRoom(path, hash);
        return;
      }

      const stageFocus: EngineeringFocus = {
        kind: "architecture-stage",
        id: hash,
        label: hash.replace(/-/g, " "),
        related: [],
        source: "hash",
      };
      setFocusState(stageFocus);
      writeEngineeringFocus(stageFocus);
      rememberRoom(path, hash);
    };

    applyHash();
    window.addEventListener("hashchange", applyHash);
    return () => window.removeEventListener("hashchange", applyHash);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const hash = readHash();
    rememberRoom(pathname, hash);

    const current = focusRef.current;
    if (current && !focusBelongsToPath(current, pathname)) {
      clearFocus();
    }

    if (hash) {
      return;
    }

    const storedFocus = readEngineeringFocus();
    if (storedFocus && focusBelongsToPath(storedFocus, pathname)) {
      setFocusState(storedFocus);
      return;
    }

    const storedRoom = readEngineeringRoom();
    if (
      storedRoom &&
      storedRoom.pathname === pathname &&
      storedRoom.hash.length > 0
    ) {
      replaceHash(`#${storedRoom.hash}`);
      window.dispatchEvent(new Event("hashchange"));
    }
  }, [pathname, clearFocus]);

  const value = useMemo(
    () => ({
      focus,
      setFocus,
      clearFocus,
    }),
    [focus, setFocus, clearFocus],
  );

  return (
    <EngineeringContext.Provider value={value}>
      {children}
    </EngineeringContext.Provider>
  );
}

export function useEngineeringContext(): EngineeringContextValue {
  const value = useContext(EngineeringContext);
  if (!value) {
    throw new Error("useEngineeringContext requires EngineeringProvider");
  }
  return value;
}

export function useOptionalEngineeringContext(): EngineeringContextValue | null {
  return useContext(EngineeringContext);
}

export function useEngineeringFocus(): EngineeringFocus | null {
  return useOptionalEngineeringContext()?.focus ?? null;
}
