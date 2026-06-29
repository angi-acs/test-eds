/* eslint-disable */
/* global WebImporter */
/**
 * Parser for cards-gallery.
 * Base block: cards.
 * Source: https://wknd-trendsetters.pages.dev/ (Image gallery section)
 * Generated: 2026-06-29
 *
 * Image-only gallery: a grid of square lifestyle images. Each grid item
 * (div.utility-aspect-1x1) contains a single <img> and no text. Each grid item
 * becomes one card row with a single cell holding the image, matching the cards
 * block DOM contract (each block child row → <li>; a div with one picture →
 * card image).
 */
export default function parse(element, { document }) {
  // Each card is a grid item containing a single image (no text).
  // Validate against source.html: div.utility-aspect-1x1 > img.cover-image
  let items = Array.from(element.querySelectorAll(':scope > div.utility-aspect-1x1'));

  // Fallbacks for cross-page variation in the grid item wrapper.
  if (!items.length) {
    items = Array.from(element.querySelectorAll(':scope > div[class*="aspect"]'));
  }
  if (!items.length) {
    // Last resort: treat each direct child div that contains an image as a card.
    items = Array.from(element.querySelectorAll(':scope > div')).filter((div) => div.querySelector('img, picture'));
  }

  const cells = [];

  items.forEach((item) => {
    const img = item.querySelector('img');
    const picture = item.querySelector('picture');
    const media = picture || img;
    if (media) {
      // Each card is a single-cell row containing only the image.
      cells.push([media]);
    }
  });

  // Empty-block guard: if no images found, unwrap the element gracefully.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-gallery', cells });
  element.replaceWith(block);
}
