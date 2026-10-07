import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and decorates the footer: a replica of the source
 * `<footer class="site-footer">© 2026 Super Page. All rights reserved.</footer>`.
 * The authored `<p>` elements are MOVED out of the /footer fragment (EW1);
 * footer.css neutralises the global p rule with descendant selectors (EW2).
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  const fragment = await loadFragment(footerPath);

  block.textContent = '';
  const footer = document.createElement('div');
  footer.className = 'site-footer';

  if (fragment) {
    fragment.querySelectorAll('p').forEach((p) => footer.append(p));
  }

  block.append(footer);
}
