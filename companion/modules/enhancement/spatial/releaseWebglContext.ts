/**
 * Explicitly release a throwaway WebGL context. Browsers only allow a small
 * number of live contexts per tab; capability/tier probes must not leave
 * orphaned contexts that steal slots from real cinematic canvases.
 */
export function releaseWebglContext(
  gl: WebGLRenderingContext | WebGL2RenderingContext | null | undefined,
): void {
  if (!gl) {
    return;
  }
  const lose = gl.getExtension("WEBGL_lose_context") as {
    loseContext: () => void;
  } | null;
  lose?.loseContext();
}
