/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: cards-feature
 * Base block: cards
 * Source: https://wknd-trendsetters.pages.dev/fashion-trends-young-adults (Feature highlights section)
 * Generated: 2026-06-30
 *
 * Structure (from source.html):
 *   .grid-layout.desktop-3-column > div (one per card)
 *     img.cover-image (card image)
 *     h2.h3-heading (card title)   // may also be h3 on other pages
 *     p.paragraph-sm (card description)
 *
 * Target (cards block contract — see blocks/cards-feature/cards-feature.js):
 *   Each card => one row with TWO cells: [ image cell, text cell ]
 *   - image cell: the card image (img/picture) — a div with a single picture
 *     is treated as the card image by the block.
 *   - text cell: heading + description paragraph (NO link wrapping).
 */
export default function parse(element, { document }) {
  // Each card is a direct child div that contains an image and/or text.
  // Validate against source.html: .grid-layout > div > (img.cover-image + h2/h3 + p)
  let cards = Array.from(element.querySelectorAll(':scope > div')).filter(
    (div) => div.querySelector('img, picture, h1, h2, h3, h4, p'),
  );

  const cells = [];

  cards.forEach((card) => {
    // Image: prefer the cover image, fall back to first picture/img in the card.
    const img = card.querySelector('picture, img.cover-image, img');

    // Title: heading at any level (source uses h2, may be h3 elsewhere).
    const title = card.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"]');

    // Description: the body paragraph(s) within the card.
    const description = card.querySelector('p');

    // Build the text cell: heading + description, no link wrapping.
    const textContent = [];
    if (title) textContent.push(title);
    if (description) textContent.push(description);

    // Skip cards with no usable content.
    if (!img && !textContent.length) return;

    cells.push([img || '', textContent.length ? textContent : '']);
  });

  // Empty-block guard: bail gracefully if no cards were found.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-feature', cells });
  element.replaceWith(block);
}
