/**
 * tabs — the source's team tab switcher (`.tabs-section`): a strip of tab labels over
 * one visible panel of team cards; activating a label shows its panel
 * (stardust/dynamic-features.md row 2, motion record: click only).
 *
 * Authoring rows (one row per tab): cell 1 the label (`<p>Team Alpha</p>`), cell 2 the
 * panel — per team member `<p><img></p>`, `<h4>Name</h4>`, `<p>bio</p>`.
 *
 * Decode tier: the shell (strip + panels) is template-slotted; the team cards are
 * reconstructive — a card opens at each portrait, or at the first element when none is
 * open — classified by content, never by index.
 *
 * EW7: no <button> hosts authored text — each label's authored <p> MOVES into a
 * `div.tab-button` wrapper that is the click target (role=tab, Enter/Space).
 * EW9: decorate() reads only the block's own rows; no module-level state.
 */

const text = (el) => (el ? el.textContent.trim() : '');

function activate(tabs, panels, idx) {
  tabs.forEach((tab, i) => {
    const on = i === idx;
    tab.classList.toggle('active', on);
    tab.setAttribute('aria-selected', String(on));
    tab.tabIndex = on ? 0 : -1;
  });
  panels.forEach((panel, i) => {
    panel.classList.toggle('active', i === idx);
  });
}

/** Moves the authored members of a panel cell into team cards, segmenting on portraits. */
function buildCards(panel, cell) {
  let card = null;
  let node = cell.firstElementChild;
  while (node) {
    const next = node.nextElementSibling;
    const media = node.matches('picture, img') ? node : node.querySelector('picture, img');
    if (media || !card) {
      card = document.createElement('div');
      card.className = 'team-card';
      panel.append(card);
    }
    if (media) {
      card.append(media);
      if (node !== media) {
        if (text(node) || node.children.length) card.append(node);
        else node.remove();
      }
    } else {
      card.append(node);
    }
    node = next;
  }
}

export default function decorate(block) {
  const rows = [...block.children];
  const strip = document.createElement('div');
  strip.className = 'tab-buttons';
  strip.setAttribute('role', 'tablist');
  const tabs = [];
  const panels = [];

  rows.forEach((row, i) => {
    const cells = [...row.children];
    const panelCell = cells.find((c) => c.querySelector('h1, h2, h3, h4, h5, h6, img, picture'))
      || (cells.length > 1 ? cells[cells.length - 1] : null);
    const labelCell = cells.find((c) => c !== panelCell) || null;

    const tab = document.createElement('div');
    tab.className = 'tab-button';
    tab.setAttribute('role', 'tab');
    if (labelCell) {
      while (labelCell.firstChild) tab.append(labelCell.firstChild);
    }
    tab.addEventListener('click', () => activate(tabs, panels, i));
    tab.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activate(tabs, panels, i);
      }
    });

    const panel = document.createElement('div');
    panel.className = 'tab-content';
    panel.setAttribute('role', 'tabpanel');
    if (panelCell) buildCards(panel, panelCell);

    strip.append(tab);
    tabs.push(tab);
    panels.push(panel);
  });

  block.classList.add('tabs-section');
  block.replaceChildren(strip, ...panels);
  activate(tabs, panels, 0);
}
