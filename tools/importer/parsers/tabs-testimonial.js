/* eslint-disable */
/* global WebImporter */
/**
 * Parser for variant: tabs-testimonial
 * Base block: tabs
 * Source URL: https://wknd-trendsetters.pages.dev/
 * Generated: 2026-06-29
 *
 * Source structure:
 *   .tabs-wrapper
 *     .tabs-content > .tab-pane[data-tab-index] (4 panels): image + name(strong) + role + quote
 *     .tab-menu > button.tab-menu-link[data-tab-target] (4 buttons): avatar + name + role
 *
 * Target (vanilla `tabs` contract — see blocks/tabs-testimonial/tabs-testimonial.js):
 *   Each block row = 2 cells:
 *     cell 1 -> tab label (the person name; firstElementChild.textContent becomes the tab id)
 *     cell 2 -> tab content (image, name, role, quote)
 *   Tab label is paired with its panel content by index (data-tab-target / data-tab-index).
 */
export default function parse(element, { document }) {
  // Panels hold the rich tab content (image, name, role, quote)
  const panes = Array.from(
    element.querySelectorAll('.tabs-content .tab-pane, .tab-pane'),
  );

  // Menu buttons hold the tab labels (person name)
  const menuButtons = Array.from(
    element.querySelectorAll('.tab-menu .tab-menu-link, .tab-menu button, button.tab-menu-link'),
  );

  // Empty-block guard: nothing meaningful to author
  if (panes.length === 0) {
    element.replaceWith(...element.childNodes);
    return;
  }

  const cells = [];

  panes.forEach((pane, i) => {
    // ----- Tab label (cell 1): derive the person name -----
    // Prefer the matching menu button (by data-tab-target index), then fall back
    // to the panel's own name, then a generic label.
    let label = '';
    const button = menuButtons.find(
      (b) => b.getAttribute('data-tab-target') === String(i),
    ) || menuButtons[i];

    if (button) {
      const nameEl = button.querySelector('strong')
        || button.querySelector('.paragraph-sm strong, .paragraph-sm');
      label = (nameEl ? nameEl.textContent : button.textContent).trim();
    }

    if (!label) {
      const paneName = pane.querySelector('strong, [class*="paragraph"] strong');
      label = paneName ? paneName.textContent.trim() : `Tab ${i + 1}`;
    }

    // ----- Tab content (cell 2): image, name, role, quote -----
    const contentCell = [];

    const image = pane.querySelector('img');
    if (image) contentCell.push(image);

    // Name (rendered bold)
    const nameSource = pane.querySelector('.paragraph-xl strong, strong');
    if (nameSource) {
      const nameP = document.createElement('p');
      const strong = document.createElement('strong');
      strong.textContent = nameSource.textContent.trim();
      nameP.append(strong);
      contentCell.push(nameP);
    }

    // Role: the sibling div of the name's wrapper (no strong, not the quote paragraph)
    let roleText = '';
    if (nameSource) {
      const nameWrapper = nameSource.closest('div');
      let roleEl = nameWrapper && nameWrapper.nextElementSibling;
      // role sits right after the name line within the same group
      if (roleEl && roleEl.querySelector('strong')) roleEl = null;
      if (roleEl && roleEl.tagName === 'DIV') {
        roleText = roleEl.textContent.trim();
      }
    }
    if (roleText) {
      const roleP = document.createElement('p');
      roleP.textContent = roleText;
      contentCell.push(roleP);
    }

    // Quote paragraph
    const quote = pane.querySelector('p.paragraph-xl, p');
    if (quote) contentCell.push(quote);

    cells.push([label, contentCell]);
  });

  const block = WebImporter.Blocks.createBlock(document, {
    name: 'tabs-testimonial',
    cells,
  });
  element.replaceWith(block);
}
