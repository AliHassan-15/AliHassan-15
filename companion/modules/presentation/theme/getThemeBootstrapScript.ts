export function getThemeBootstrapScript(): string {
  return `(function(){try{var m=window.matchMedia("(prefers-color-scheme: dark)");document.documentElement.setAttribute("data-theme",m.matches?"dark":"light");}catch(e){document.documentElement.setAttribute("data-theme","light");}})();`;
}
