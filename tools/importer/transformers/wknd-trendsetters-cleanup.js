/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters site-wide cleanup.
 *
 * Removes non-authorable page chrome (auto-populated header/nav and footer)
 * and strips framework/SVG noise so the import contains only authorable
 * page content.
 *
 * All selectors verified against migration-work/cleaned.html:
 *   - <div class="navbar"> ... </div>            (top-level nav/header chrome)
 *   - <button class="nav-mobile-menu-button">     (mobile menu toggle, chrome)
 *   - <footer class="footer inverse-footer"> ...  (site footer chrome)
 *   - <a href="#main-content" class="skip-link">  (accessibility skip link, chrome)
 *   - data-astro-cid-* attributes (Astro framework build artifacts)
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.beforeTransform) {
    // Non-authorable site chrome that lives outside #main-content.
    // Verified in cleaned.html: div.navbar, button.nav-mobile-menu-button,
    // footer.footer, a.skip-link.
    WebImporter.DOMUtils.remove(element, [
      'div.navbar',
      'button.nav-mobile-menu-button',
      'footer.footer',
      'a.skip-link',
    ]);
  }

  if (hookName === TransformHook.afterTransform) {
    // Strip leftover non-authorable elements.
    WebImporter.DOMUtils.remove(element, [
      'noscript',
      'link',
      'iframe',
    ]);

    // Remove Astro framework build artifact attributes (data-astro-cid-*)
    // present throughout the captured DOM (e.g. on faq-icon <svg>).
    element.querySelectorAll('*').forEach((el) => {
      [...el.attributes].forEach((attr) => {
        if (attr.name.startsWith('data-astro-cid')) {
          el.removeAttribute(attr.name);
        }
      });
    });
  }
}
