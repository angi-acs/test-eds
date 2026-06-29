/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: accordion-faq
 * Base block: accordion
 * Source URL: https://wknd-trendsetters.pages.dev/
 * Generated: 2026-06-29
 *
 * Source structure: a `.faq-list` containing one or more `<details class="faq-item">`.
 * Each item has a `<summary class="faq-question">` with the question (wrapped in a span)
 * and a `<div class="faq-answer">` holding the answer content.
 *
 * Target structure (accordion DOM contract from blocks/accordion-faq/accordion-faq.js):
 * each accordion row = 2 cells -> [question, answer]. cell[0] becomes the summary label,
 * cell[1] becomes the collapsible body.
 */
export default function parse(element, { document }) {
  // Each FAQ item is a <details class="faq-item">; fall back to direct children if class differs.
  const items = element.querySelectorAll('details.faq-item, details');

  const cells = [];

  items.forEach((item) => {
    // Question lives in the summary. Prefer the inner span text; fall back to summary itself.
    const summary = item.querySelector('summary.faq-question, summary');
    const questionEl = summary
      ? (summary.querySelector('span') || summary)
      : null;

    // Answer is the content following the summary.
    const answerEl = item.querySelector('.faq-answer, :scope > div:not(.faq-question)');

    // Skip malformed items missing both pieces of content.
    if (!questionEl && !answerEl) return;

    const question = questionEl ? (questionEl.textContent || '').trim() : '';
    const answer = answerEl || '';

    cells.push([question, answer]);
  });

  // Empty-block guard: if no FAQ items were found, leave the original content in place.
  if (cells.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const block = WebImporter.Blocks.createBlock(document, { name: 'accordion-faq', cells });
  element.replaceWith(block);
}
