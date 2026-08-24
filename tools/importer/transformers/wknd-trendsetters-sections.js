/* eslint-disable */
/* global WebImporter */

/**
 * Transformer: WKND Trendsetters section breaks and section metadata.
 *
 * Builds section structure from payload.template.sections:
 *   - Inserts an <hr> before every section except the first (section break).
 *   - Appends a "Section Metadata" block for every section that has a style.
 *
 * Section selectors come from the template (page-templates.json), which were
 * derived from the captured DOM under #main-content. Styles per template:
 *   rc2 (Page hero)      -> light-grey
 *   rc4 (Image gallery)  -> light-grey
 *   rc6 (Latest articles)-> light-grey
 *   others               -> no style
 */
const TransformHook = { beforeTransform: 'beforeTransform', afterTransform: 'afterTransform' };

export default function transform(hookName, element, payload) {
  if (hookName === TransformHook.afterTransform) {
    const sections = (payload && payload.template && payload.template.sections) || [];
    if (sections.length < 2) return;

    const doc = element.ownerDocument;

    // Process in reverse so earlier insertions don't shift later selectors.
    for (let i = sections.length - 1; i >= 0; i -= 1) {
      const section = sections[i];
      const sectionEl = element.querySelector(section.selector);
      if (!sectionEl) continue;

      // Section Metadata block for sections that declare a style.
      if (section.style) {
        const metaBlock = WebImporter.Blocks.createBlock(doc, {
          name: 'Section Metadata',
          cells: { style: section.style },
        });
        sectionEl.after(metaBlock);
      }

      // Section break before every section except the first.
      if (i > 0) {
        sectionEl.before(doc.createElement('hr'));
      }
    }
  }
}
