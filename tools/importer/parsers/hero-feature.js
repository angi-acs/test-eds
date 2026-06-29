/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: hero-feature
 * Base block: hero
 * Source URL: https://wknd-trendsetters.pages.dev/
 * Generated: 2026-06-29
 *
 * Page hero: a two-column grid.
 *  - Left column: H1 heading + subheading paragraph + button-group with two CTAs
 *    (See case, All stories).
 *  - Right column: a stack of three lifestyle cover images.
 *
 * The hero block decoration treats a first-child <picture> as a background image,
 * so this parser keeps the textual content (heading/subheading/CTAs) in the first
 * content cell and the image stack in a following cell. All selectors validated
 * against migration-work/block-context/hero-feature/source.html.
 */
export default function parse(element, { document }) {
  // The two top-level columns of the hero grid (direct children of the grid).
  const columns = Array.from(element.querySelectorAll(':scope > div'));

  // Locate the text column: it holds the H1 heading.
  const textColumn = columns.find((col) => col.querySelector('h1, h2, [class*="heading"]'))
    || columns[0];

  // Locate the media column: it holds the image stack (and is not the text column).
  const mediaColumn = columns.find((col) => col !== textColumn && col.querySelector('img, picture'))
    || columns.find((col) => col.querySelector('img, picture'));

  // --- Extract text-column content ---
  const heading = textColumn
    ? textColumn.querySelector('h1, h2, h3, [class*="heading"]')
    : null;
  const subheading = textColumn
    ? textColumn.querySelector('p, .subheading, [class*="subheading"], [class*="subtitle"]')
    : null;
  const ctaLinks = textColumn
    ? Array.from(textColumn.querySelectorAll('.button-group a, a.button, a[class*="button"]'))
    : [];

  // --- Extract media-column images ---
  const images = mediaColumn
    ? Array.from(mediaColumn.querySelectorAll('picture, img'))
    : [];
  // If a column wraps each image in a <picture>, prefer those; otherwise the raw <img>.
  const pictures = images.filter((el) => el.tagName === 'PICTURE');
  const mediaNodes = pictures.length ? pictures : images;

  // Empty-block guard: bail gracefully if there is no usable content.
  if (!heading && !subheading && ctaLinks.length === 0 && mediaNodes.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  // Content row: a single cell wrapping heading, subheading, then CTA buttons
  // (stacked vertically, matches source order). Wrapping in one container keeps
  // them in ONE cell rather than spreading across multiple columns.
  const contentParts = [];
  if (heading) contentParts.push(heading);
  if (subheading) contentParts.push(subheading);
  contentParts.push(...ctaLinks);
  if (contentParts.length) {
    const contentWrapper = document.createElement('div');
    contentParts.forEach((node) => contentWrapper.append(node));
    cells.push([contentWrapper]);
  }

  // Media row: a single cell wrapping the stacked lifestyle images.
  if (mediaNodes.length) {
    const mediaWrapper = document.createElement('div');
    mediaNodes.forEach((node) => mediaWrapper.append(node));
    cells.push([mediaWrapper]);
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'hero-feature', cells });
  element.replaceWith(block);
}
