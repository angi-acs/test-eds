/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: cards-article
 * Base block: cards
 * Source: https://wknd-trendsetters.pages.dev/
 * Generated: 2026-06-29
 *
 * Structure (from source.html):
 *   .grid-layout > a.article-card.card-link (one per card)
 *     .article-card-image > img.cover-image
 *     .article-card-body
 *       .article-card-meta > span.tag (category) + span (date)
 *       h3 (title)
 *
 * Target (cards block contract — see blocks/cards-article/cards-article.js):
 *   Each card => one row: [ image cell, text cell ]
 *   - image cell: the card image (img)
 *   - text cell: the card link preserved, containing the meta (category + date) and title
 */
export default function parse(element, { document }) {
  // Each card is an anchor link. Fallback covers slight class variations.
  const cards = Array.from(
    element.querySelectorAll(':scope > a.article-card, :scope > a.card-link, :scope > a[class*="article-card"]'),
  );

  const cells = [];

  cards.forEach((card) => {
    // Image: prefer the dedicated image container, fall back to first img in the card.
    const img = card.querySelector('.article-card-image img, img.cover-image, img');

    // Body: meta (category tag + date) and the title heading.
    const body = card.querySelector('.article-card-body') || card;
    const meta = body.querySelector('.article-card-meta');
    const title = body.querySelector('h3, h2, h4, [class*="heading"]');

    const href = card.getAttribute('href');

    // Build the text cell. Keep meta and title as separate block elements.
    // The destination link is placed INSIDE the heading (<h3><a>Title</a></h3>)
    // so it converts to a clean markdown heading link rather than collapsing
    // a heading inside an inline link.
    const textContent = [];
    if (meta) textContent.push(meta);

    if (title) {
      if (href) {
        const link = document.createElement('a');
        link.setAttribute('href', href);
        link.append(...title.childNodes);
        title.append(link);
      }
      textContent.push(title);
    }

    if (textContent.length) {
      cells.push([img || '', textContent]);
    } else if (href) {
      // No structured body content — keep image + a bare link to preserve the destination.
      const link = document.createElement('a');
      link.setAttribute('href', href);
      link.textContent = card.textContent.trim() || href;
      cells.push([img || '', link]);
    } else {
      cells.push([img || '', card.textContent.trim() || '']);
    }
  });

  // Empty-block guard: bail gracefully if no cards were found.
  if (!cells.length) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'cards-article', cells });
  element.replaceWith(block);
}
