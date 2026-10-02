import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * Loads and decorates the header: a replica of the source `<nav class="site-header">`,
 * two bare links, no brand, no hamburger, no dropdowns, identical at every width.
 * The authored `<a>` elements are MOVED out of the /nav fragment (EW1) — the pipeline
 * delivers them as `<li><a>`, `<li><p><a>` or `<p><a>`; moving the anchor unwraps them.
 * @param {Element} block The header block element
 */
export default async function decorate(block) {
  const navMeta = getMetadata('nav');
  const navPath = navMeta ? new URL(navMeta, window.location).pathname : '/nav';
  const fragment = await loadFragment(navPath);

  block.textContent = '';
  const nav = document.createElement('nav');
  nav.className = 'site-header';
  nav.setAttribute('aria-label', 'Main');

  if (fragment) {
    fragment.querySelectorAll('a[href]').forEach((a) => {
      // decorateButtons defaults a.title to the link text; the source links carry no title
      if (a.title && a.title === a.textContent) a.removeAttribute('title');
      nav.append(a);
    });
  }

  block.append(nav);
}
