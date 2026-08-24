/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: columns-article
 * Base block: columns
 * Source: https://wknd-trendsetters.pages.dev/
 * Generated: 2026-06-29
 *
 * Featured article: 2-column layout.
 * Left cell  = wide feature image.
 * Right cell = breadcrumbs, H2 heading, byline metadata.
 *
 * The columns block contract: the block's first row's children become the
 * columns. So a single row with two cells produces a 2-column layout.
 */
export default function parse(element, { document }) {
  // The grid has direct child <div> wrappers, one per column.
  const columnWrappers = element.querySelectorAll(':scope > div');

  // Left column: the feature image.
  const image = element.querySelector('img');

  // Right column content lives in the second wrapper. Fall back to scanning
  // the whole element if the structure differs.
  const textWrapper = columnWrappers[1] || element;

  const breadcrumbs = textWrapper.querySelector('.breadcrumbs');
  const heading = textWrapper.querySelector('h1, h2, h3, .h2-heading, [class*="heading"]');
  // Byline metadata: the flex-horizontal rows that are NOT inside the breadcrumbs.
  const metaRows = Array.from(textWrapper.querySelectorAll('.flex-horizontal'))
    .filter((row) => !breadcrumbs || !breadcrumbs.contains(row));

  // Empty-block guard: bail gracefully if essential content is missing.
  if (!image && !heading) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Build the right (text) cell content in source order.
  const textCell = [];
  if (breadcrumbs) textCell.push(breadcrumbs);
  if (heading) textCell.push(heading);
  textCell.push(...metaRows);

  // Single row, two columns: [ image, text ].
  const cells = [
    [image || '', textCell],
  ];

  const block = WebImporter.Blocks.createBlock(document, { name: 'columns-article', cells });
  element.replaceWith(block);
}
