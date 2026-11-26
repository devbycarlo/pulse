/**
 * Stealth / anti-tamper utilities (production only).
 *
 * Loaded ONLY in production builds (import.meta.env.PROD === true).
 * These are UI / anti-tamper measures — NOT a security boundary:
 * every restriction below is trivially bypassed by a user who
 * disables JS, patches the bundle, or opens DevTools manually.
 *
 * Pair this with the server-side headers in firebase.json
 * (CSP, X-Frame-Options, HSTS, Permissions-Policy, etc.).
 */

export function enableStealthMode() {
  const doc = document;

  // 1) Disable right-click / context menu
  doc.addEventListener('contextmenu', (e) => e.preventDefault());

  // 2) Prevent text selection (mouse + keyboard selection)
  doc.addEventListener('selectstart', (e) => e.preventDefault());
  doc.onselectstart = () => false;

  // 3) Disable F12 / DevTools keyboard shortcuts
  doc.addEventListener('keydown', (e) => {
    const { key, code, ctrlKey, shiftKey, metaKey } = e;
    const isOpenShortcut =
      key === 'F12' ||
      code === 'F12' ||
      (ctrlKey && shiftKey && ['I', 'J', 'C'].includes(key)) ||
      (ctrlKey && shiftKey && metaKey && ['I', 'J'].includes(key)) ||
      (ctrlKey && key === 'U'); // view source
    if (isOpenShortcut) e.preventDefault();
  });

  // 4) Drop the global DevTools-open flag (best-effort; bypassable)
  //    We do NOT override console.* — hiding real errors is a bad
  //    trade-off for a timer app. The counter below is a no-op
  //    sentinel used to document the pattern; it has no effect.
}
