/* eslint-disable */
/* global WebImporter */

// PARSER IMPORTS
import heroFeatureParser from './parsers/hero-feature.js';
import cardsFeatureParser from './parsers/cards-feature.js';
import cardsArticleParser from './parsers/cards-article.js';
import cardsGalleryParser from './parsers/cards-gallery.js';

// TRANSFORMER IMPORTS
import cleanupTransformer from './transformers/wknd-trendsetters-cleanup.js';
import sectionsTransformer from './transformers/wknd-trendsetters-sections.js';

// PAGE TEMPLATE CONFIGURATION - Embedded from page-templates.json
const PAGE_TEMPLATE = {
  name: 'trends-landing',
  description: 'Fashion trends landing page with two-column hero, three-column feature highlights, section intro, four-column article cards grid, photo gallery, and accent CTA',
  urls: [
    'https://wknd-trendsetters.pages.dev/fashion-trends-young-adults',
  ],
  blocks: [
    {
      name: 'hero-feature',
      instances: ['#main-content > header.section.secondary-section .grid-layout.tablet-1-column.grid-gap-xxl'],
    },
    {
      name: 'cards-feature',
      instances: ['#main-content > section.section:nth-of-type(1) .grid-layout.desktop-3-column.tablet-1-column.grid-gap-xxl'],
    },
    {
      name: 'cards-article',
      instances: ['#trends .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-md'],
    },
    {
      name: 'cards-gallery',
      instances: ['#main-content > section.section.secondary-section:nth-of-type(4) .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-sm'],
    },
  ],
  sections: [
    {
      id: 'rc2',
      name: 'Page hero',
      selector: '#main-content > header.section.secondary-section',
      style: 'light-grey',
      blocks: ['hero-feature'],
      defaultContent: [],
    },
    {
      id: 'rc3',
      name: 'Feature highlights',
      selector: '#main-content > section.section:nth-of-type(1)',
      style: null,
      blocks: ['cards-feature'],
      defaultContent: [],
    },
    {
      id: 'rc4',
      name: 'Section intro',
      selector: '#main-content > section.section.secondary-section:nth-of-type(2)',
      style: 'light-grey',
      blocks: [],
      defaultContent: [
        '#main-content > section.section.secondary-section:nth-of-type(2) h2',
        '#main-content > section.section.secondary-section:nth-of-type(2) p',
      ],
    },
    {
      id: 'rc5',
      name: 'Trends cards',
      selector: '#trends',
      style: null,
      blocks: ['cards-article'],
      defaultContent: [
        '#trends h2',
      ],
    },
    {
      id: 'rc6',
      name: 'Photo gallery',
      selector: '#main-content > section.section.secondary-section:nth-of-type(4)',
      style: 'light-grey',
      blocks: ['cards-gallery'],
      defaultContent: [
        '#main-content > section.section.secondary-section:nth-of-type(4) h2',
        '#main-content > section.section.secondary-section:nth-of-type(4) p',
      ],
    },
    {
      id: 'rc7',
      name: 'Accent CTA',
      selector: '#main-content > section.section.accent-section',
      style: 'accent',
      blocks: [],
      defaultContent: [
        '#main-content > section.section.accent-section h2',
        '#main-content > section.section.accent-section p',
        '#main-content > section.section.accent-section a',
      ],
    },
  ],
};

// PARSER REGISTRY
const parsers = {
  'hero-feature': heroFeatureParser,
  'cards-feature': cardsFeatureParser,
  'cards-article': cardsArticleParser,
  'cards-gallery': cardsGalleryParser,
};

// TRANSFORMER REGISTRY - section transformer runs after cleanup
const transformers = [
  cleanupTransformer,
  ...(PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [sectionsTransformer] : []),
];

/**
 * Execute all page transformers for a specific hook
 */
function executeTransformers(hookName, element, payload) {
  const enhancedPayload = {
    ...payload,
    template: PAGE_TEMPLATE,
  };
  transformers.forEach((transformerFn) => {
    try {
      transformerFn.call(null, hookName, element, enhancedPayload);
    } catch (e) {
      console.error(`Transformer failed at ${hookName}:`, e);
    }
  });
}

/**
 * Find all blocks on the page based on the embedded template configuration
 */
function findBlocksOnPage(document, template) {
  const pageBlocks = [];
  template.blocks.forEach((blockDef) => {
    blockDef.instances.forEach((selector) => {
      const elements = document.querySelectorAll(selector);
      if (elements.length === 0) {
        console.warn(`Block "${blockDef.name}" selector not found: ${selector}`);
      }
      elements.forEach((element) => {
        pageBlocks.push({
          name: blockDef.name,
          selector,
          element,
          section: blockDef.section || null,
        });
      });
    });
  });
  console.log(`Found ${pageBlocks.length} block instances on page`);
  return pageBlocks;
}

export default {
  transform: (payload) => {
    const {
      document, url, html, params,
    } = payload;

    const main = document.body;

    // 1. beforeTransform (initial cleanup)
    executeTransformers('beforeTransform', main, payload);

    // 2. Find blocks on page
    const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);

    // 3. Parse each block
    pageBlocks.forEach((block) => {
      if (!block.element.parentNode) return; // already replaced
      const parser = parsers[block.name];
      if (parser) {
        try {
          parser(block.element, { document, url, params });
        } catch (e) {
          console.error(`Failed to parse ${block.name} (${block.selector}):`, e);
        }
      } else {
        console.warn(`No parser found for block: ${block.name}`);
      }
    });

    // 4. afterTransform (final cleanup + section breaks/metadata)
    executeTransformers('afterTransform', main, payload);

    // 5. WebImporter built-in rules
    const hr = document.createElement('hr');
    main.appendChild(hr);
    WebImporter.rules.createMetadata(main, document);
    WebImporter.rules.transformBackgroundImages(main, document);
    WebImporter.rules.adjustImageUrls(main, url, params.originalURL);

    // 6. Generate sanitized path
    const path = WebImporter.FileUtils.sanitizePath(
      new URL(params.originalURL).pathname.replace(/\/$/, '').replace(/\.html$/, '') || '/index',
    );

    return [{
      element: main,
      path,
      report: {
        title: document.title,
        template: PAGE_TEMPLATE.name,
        blocks: pageBlocks.map((b) => b.name),
      },
    }];
  },
};
