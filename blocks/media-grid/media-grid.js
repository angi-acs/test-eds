/**
 * media-grid — the source's `<table class="media-grid">`: one row of white card cells,
 * each holding a single media item (an image, or the YouTube player).
 *
 * Authoring rows (one row per grid row, one cell per card):
 *   - image card: `<p><img src alt></p>` — external URLs carried verbatim (capture state)
 *   - embed card: `<p>YouTube video</p>` (the player's accessible title) followed by
 *     `<p><a href="https://www.youtube.com/embed/…">…</a></p>` (the player source);
 *     the block renders the same `<iframe>` the source serves (embed-passthrough,
 *     stardust/dynamic-features.md row 1).
 *
 * Decode tier: reconstructive — every cell is classified by its content (embed link
 * vs picture), never by position. Pictures MOVE into the card (EW1); the row and cell
 * wrappers carry the layout classes (EW2).
 *
 * Column widths: the source table is auto-laid-out, so a row's cells share the width in
 * proportion to their content's intrinsic width (iframe 300, image = its natural width,
 * which the pipeline keeps as the img `width` attribute) plus each card's own padding and
 * border. Measured on the origin at 1440: video|image row 324|804, image|image 564|564.
 * The row's grid-template-columns reproduces that split at every width (CSS fallback:
 * equal columns).
 *
 * @ew-exempt <p> embed title (embed card) — text-as-metadata: becomes the iframe title
 * @ew-exempt <p><a> embed source URL (embed card) — text-as-metadata: becomes the iframe src
 */

const EMBED_HOST = /(^|\.)(youtube\.com|youtu\.be|youtube-nocookie\.com)$/i;

function isEmbedLink(a) {
  try {
    return EMBED_HOST.test(new URL(a.href, window.location.href).hostname);
  } catch (e) {
    return false;
  }
}

// Read-only classification helper — decisions and attributes only, never displayed text.
const text = (el) => (el ? el.textContent.trim() : '');

/**
 * Builds the player from the authored source link and title paragraph. Attributes are
 * the captured ones (560×315, frameborder 0, allow list, allowfullscreen); the CSS
 * sizes the frame to the card.
 */
function buildEmbed(link, titleP) {
  const iframe = document.createElement('iframe');
  iframe.setAttribute('width', '560');
  iframe.setAttribute('height', '315');
  iframe.src = link.href;
  iframe.title = text(titleP) || 'YouTube video';
  iframe.setAttribute('frameborder', '0');
  iframe.setAttribute(
    'allow',
    'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture',
  );
  iframe.setAttribute('allowfullscreen', '');
  return iframe;
}

function decorateEmbedCell(cell, link) {
  const paras = [...cell.querySelectorAll('p')];
  const titleP = paras.find((p) => !p.contains(link) && !p.querySelector('img, picture'));
  const iframe = buildEmbed(link, titleP);
  // title + source paragraphs are configuration, declared @ew-exempt above
  paras.forEach((p) => {
    if (p === titleP || p.contains(link)) p.remove();
  });
  cell.append(iframe);
}

function decorateImageCell(cell, media) {
  const holder = media.closest('p');
  cell.append(media);
  if (holder && holder.parentElement === cell && !text(holder) && !holder.children.length) {
    holder.remove();
  }
}

const EMBED_INTRINSIC_WIDTH = 300; // an iframe's default intrinsic width
const IMAGE_FALLBACK_WIDTH = 800; // the source images' natural width

/** Intrinsic width the source table layout would see for a card's content. */
function cellWeight(cell) {
  if (cell.querySelector('iframe')) return EMBED_INTRINSIC_WIDTH;
  const img = cell.querySelector('img');
  if (!img) return IMAGE_FALLBACK_WIDTH;
  const w = parseInt(img.getAttribute('width'), 10);
  return Number.isFinite(w) && w > 0 ? w : IMAGE_FALLBACK_WIDTH;
}

/** Row tracks = card chrome (padding + border) + content share of the remaining width. */
function sizeColumns(row) {
  const cells = [...row.children];
  if (cells.length < 2) return;
  const weights = cells.map(cellWeight);
  const sum = weights.reduce((a, b) => a + b, 0);
  const n = cells.length;
  // 1.5rem gap between cards; each card adds 2 × 1rem padding + 2 × 2px border
  const fixed = `${(n - 1) * 1.5}rem - ${n * 2}rem - ${n * 4}px`;
  row.style.gridTemplateColumns = weights
    .map((w) => `calc(2rem + 4px + ${w} * (100% - ${fixed}) / ${sum})`)
    .join(' ');
}

export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('media-row');
    [...row.children].forEach((cell) => {
      cell.classList.add('media-cell');
      const link = [...cell.querySelectorAll('a[href]')].find(isEmbedLink);
      if (link) {
        decorateEmbedCell(cell, link);
        return;
      }
      const media = cell.querySelector('picture, img');
      if (media) decorateImageCell(cell, media);
    });
    sizeColumns(row);
  });
}
