/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: hero-overlay
 * Base block: hero
 * Source URL: https://wknd-trendsetters.pages.dev/
 * Generated: 2026-06-29
 *
 * Closing CTA banner: full-bleed background image with a dark overlay and
 * overlaid text (heading, subheading, single CTA button).
 *
 * Target table (hero DOM contract):
 *   Row 1: block name (hero-overlay)
 *   Row 2: background image (rendered as absolutely-positioned background)
 *   Row 3: text content (heading + subheading + CTA)
 */
export default function parse(element, { document }) {
  // Background image — validated against source: img.cover-image.utility-overlay.
  // Fallbacks cover common background/cover image patterns.
  const bgImage = element.querySelector(
    'img.cover-image, img.utility-overlay, img[class*="cover"], img[class*="background"]',
  );

  // Text content lives in .card-body. Fall back to the element itself so we
  // still find content if the wrapper class varies across pages.
  const contentRoot = element.querySelector('.card-body') || element;

  // Heading — source uses h2.h1-heading. Accept any heading level.
  const heading = contentRoot.querySelector('h1, h2, h3, h4, h5, h6');

  // Subheading paragraph — source uses p.subheading.
  const description = contentRoot.querySelector('p.subheading, p');

  // CTA links — source uses a.button inside .button-group. Accept buttons/links.
  const ctaLinks = Array.from(
    contentRoot.querySelectorAll('.button-group a, a.button'),
  );

  const cells = [];

  // Background image row (only if present).
  if (bgImage) {
    cells.push([bgImage]);
  }

  // Text content row: heading + subheading + CTA(s).
  const contentCell = [];
  if (heading) contentCell.push(heading);
  if (description) contentCell.push(description);
  contentCell.push(...ctaLinks);

  // Empty-block guard: bail gracefully if there is no meaningful content.
  if (!heading && !description && ctaLinks.length === 0 && !bgImage) {
    element.replaceWith(...element.childNodes);
    return;
  }

  // Single cell containing all overlaid text content (heading + subheading + CTA).
  cells.push([contentCell]);

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'hero-overlay',
    cells,
  });

  element.replaceWith(block);
}
