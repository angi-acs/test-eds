/**
 * highlight — the source's `<div class="content-block">`: one gradient card of prose.
 *
 * Authoring: a single cell carrying the paragraph(s).
 *
 * Decode tier: template-slotted — the block element is the card; the authored cell's
 * children MOVE into `div.highlight-body` (EW1/EW8), styled by descendant selectors (EW2).
 * Re-entrant: a block already carrying `.highlight-body` is left as is (EW9).
 */
export default function decorate(block) {
  if (block.querySelector(':scope > .highlight-body')) return;
  const body = document.createElement('div');
  body.className = 'highlight-body';
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    while (cell.firstChild) body.append(cell.firstChild);
  });
  block.replaceChildren(body);
}
