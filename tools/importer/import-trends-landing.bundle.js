/* eslint-disable */
var CustomImportScript = (() => {
  var __defProp = Object.defineProperty;
  var __defProps = Object.defineProperties;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getOwnPropSymbols = Object.getOwnPropertySymbols;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __propIsEnum = Object.prototype.propertyIsEnumerable;
  var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
  var __spreadValues = (a, b) => {
    for (var prop in b || (b = {}))
      if (__hasOwnProp.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    if (__getOwnPropSymbols)
      for (var prop of __getOwnPropSymbols(b)) {
        if (__propIsEnum.call(b, prop))
          __defNormalProp(a, prop, b[prop]);
      }
    return a;
  };
  var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // tools/importer/import-trends-landing.js
  var import_trends_landing_exports = {};
  __export(import_trends_landing_exports, {
    default: () => import_trends_landing_default
  });

  // tools/importer/parsers/hero-feature.js
  function parse(element, { document }) {
    const columns = Array.from(element.querySelectorAll(":scope > div"));
    const textColumn = columns.find((col) => col.querySelector('h1, h2, [class*="heading"]')) || columns[0];
    const mediaColumn = columns.find((col) => col !== textColumn && col.querySelector("img, picture")) || columns.find((col) => col.querySelector("img, picture"));
    const heading = textColumn ? textColumn.querySelector('h1, h2, h3, [class*="heading"]') : null;
    const subheading = textColumn ? textColumn.querySelector('p, .subheading, [class*="subheading"], [class*="subtitle"]') : null;
    const ctaLinks = textColumn ? Array.from(textColumn.querySelectorAll('.button-group a, a.button, a[class*="button"]')) : [];
    const images = mediaColumn ? Array.from(mediaColumn.querySelectorAll("picture, img")) : [];
    const pictures = images.filter((el) => el.tagName === "PICTURE");
    const mediaNodes = pictures.length ? pictures : images;
    if (!heading && !subheading && ctaLinks.length === 0 && mediaNodes.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    const contentParts = [];
    if (heading) contentParts.push(heading);
    if (subheading) contentParts.push(subheading);
    contentParts.push(...ctaLinks);
    if (contentParts.length) {
      const contentWrapper = document.createElement("div");
      contentParts.forEach((node) => contentWrapper.append(node));
      cells.push([contentWrapper]);
    }
    if (mediaNodes.length) {
      const mediaWrapper = document.createElement("div");
      mediaNodes.forEach((node) => mediaWrapper.append(node));
      cells.push([mediaWrapper]);
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "hero-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-feature.js
  function parse2(element, { document }) {
    let cards = Array.from(element.querySelectorAll(":scope > div")).filter(
      (div) => div.querySelector("img, picture, h1, h2, h3, h4, p")
    );
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector("picture, img.cover-image, img");
      const title = card.querySelector('h1, h2, h3, h4, h5, h6, [class*="heading"]');
      const description = card.querySelector("p");
      const textContent = [];
      if (title) textContent.push(title);
      if (description) textContent.push(description);
      if (!img && !textContent.length) return;
      cells.push([img || "", textContent.length ? textContent : ""]);
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-feature", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse3(element, { document }) {
    const cards = Array.from(
      element.querySelectorAll(':scope > a.article-card, :scope > a.card-link, :scope > a[class*="article-card"]')
    );
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".article-card-image img, img.cover-image, img");
      const body = card.querySelector(".article-card-body") || card;
      const meta = body.querySelector(".article-card-meta");
      const title = body.querySelector('h3, h2, h4, [class*="heading"]');
      const href = card.getAttribute("href");
      const textContent = [];
      if (meta) textContent.push(meta);
      if (title) {
        if (href) {
          const link = document.createElement("a");
          link.setAttribute("href", href);
          link.append(...title.childNodes);
          title.append(link);
        }
        textContent.push(title);
      }
      if (textContent.length) {
        cells.push([img || "", textContent]);
      } else if (href) {
        const link = document.createElement("a");
        link.setAttribute("href", href);
        link.textContent = card.textContent.trim() || href;
        cells.push([img || "", link]);
      } else {
        cells.push([img || "", card.textContent.trim() || ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse4(element, { document }) {
    let items = Array.from(element.querySelectorAll(":scope > div.utility-aspect-1x1"));
    if (!items.length) {
      items = Array.from(element.querySelectorAll(':scope > div[class*="aspect"]'));
    }
    if (!items.length) {
      items = Array.from(element.querySelectorAll(":scope > div")).filter((div) => div.querySelector("img, picture"));
    }
    const cells = [];
    items.forEach((item) => {
      const img = item.querySelector("img");
      const picture = item.querySelector("picture");
      const media = picture || img;
      if (media) {
        cells.push([media]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-gallery", cells });
    element.replaceWith(block);
  }

  // tools/importer/transformers/wknd-trendsetters-cleanup.js
  var TransformHook = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform(hookName, element, payload) {
    if (hookName === TransformHook.beforeTransform) {
      WebImporter.DOMUtils.remove(element, [
        "div.navbar",
        "button.nav-mobile-menu-button",
        "footer.footer",
        "a.skip-link"
      ]);
    }
    if (hookName === TransformHook.afterTransform) {
      WebImporter.DOMUtils.remove(element, [
        "noscript",
        "link",
        "iframe"
      ]);
      element.querySelectorAll("*").forEach((el) => {
        [...el.attributes].forEach((attr) => {
          if (attr.name.startsWith("data-astro-cid")) {
            el.removeAttribute(attr.name);
          }
        });
      });
    }
  }

  // tools/importer/transformers/wknd-trendsetters-sections.js
  var TransformHook2 = { beforeTransform: "beforeTransform", afterTransform: "afterTransform" };
  function transform2(hookName, element, payload) {
    if (hookName === TransformHook2.afterTransform) {
      const sections = payload && payload.template && payload.template.sections || [];
      if (sections.length < 2) return;
      const doc = element.ownerDocument;
      for (let i = sections.length - 1; i >= 0; i -= 1) {
        const section = sections[i];
        const sectionEl = element.querySelector(section.selector);
        if (!sectionEl) continue;
        if (section.style) {
          const metaBlock = WebImporter.Blocks.createBlock(doc, {
            name: "Section Metadata",
            cells: { style: section.style }
          });
          sectionEl.after(metaBlock);
        }
        if (i > 0) {
          sectionEl.before(doc.createElement("hr"));
        }
      }
    }
  }

  // tools/importer/import-trends-landing.js
  var PAGE_TEMPLATE = {
    name: "trends-landing",
    description: "Fashion trends landing page with two-column hero, three-column feature highlights, section intro, four-column article cards grid, photo gallery, and accent CTA",
    urls: [
      "https://wknd-trendsetters.pages.dev/fashion-trends-young-adults"
    ],
    blocks: [
      {
        name: "hero-feature",
        instances: ["#main-content > header.section.secondary-section .grid-layout.tablet-1-column.grid-gap-xxl"]
      },
      {
        name: "cards-feature",
        instances: ["#main-content > section.section:nth-of-type(1) .grid-layout.desktop-3-column.tablet-1-column.grid-gap-xxl"]
      },
      {
        name: "cards-article",
        instances: ["#trends .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-md"]
      },
      {
        name: "cards-gallery",
        instances: ["#main-content > section.section.secondary-section:nth-of-type(4) .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-sm"]
      }
    ],
    sections: [
      {
        id: "rc2",
        name: "Page hero",
        selector: "#main-content > header.section.secondary-section",
        style: "light-grey",
        blocks: ["hero-feature"],
        defaultContent: []
      },
      {
        id: "rc3",
        name: "Feature highlights",
        selector: "#main-content > section.section:nth-of-type(1)",
        style: null,
        blocks: ["cards-feature"],
        defaultContent: []
      },
      {
        id: "rc4",
        name: "Section intro",
        selector: "#main-content > section.section.secondary-section:nth-of-type(2)",
        style: "light-grey",
        blocks: [],
        defaultContent: [
          "#main-content > section.section.secondary-section:nth-of-type(2) h2",
          "#main-content > section.section.secondary-section:nth-of-type(2) p"
        ]
      },
      {
        id: "rc5",
        name: "Trends cards",
        selector: "#trends",
        style: null,
        blocks: ["cards-article"],
        defaultContent: [
          "#trends h2"
        ]
      },
      {
        id: "rc6",
        name: "Photo gallery",
        selector: "#main-content > section.section.secondary-section:nth-of-type(4)",
        style: "light-grey",
        blocks: ["cards-gallery"],
        defaultContent: [
          "#main-content > section.section.secondary-section:nth-of-type(4) h2",
          "#main-content > section.section.secondary-section:nth-of-type(4) p"
        ]
      },
      {
        id: "rc7",
        name: "Accent CTA",
        selector: "#main-content > section.section.accent-section",
        style: "accent",
        blocks: [],
        defaultContent: [
          "#main-content > section.section.accent-section h2",
          "#main-content > section.section.accent-section p",
          "#main-content > section.section.accent-section a"
        ]
      }
    ]
  };
  var parsers = {
    "hero-feature": parse,
    "cards-feature": parse2,
    "cards-article": parse3,
    "cards-gallery": parse4
  };
  var transformers = [
    transform,
    ...PAGE_TEMPLATE.sections && PAGE_TEMPLATE.sections.length > 1 ? [transform2] : []
  ];
  function executeTransformers(hookName, element, payload) {
    const enhancedPayload = __spreadProps(__spreadValues({}, payload), {
      template: PAGE_TEMPLATE
    });
    transformers.forEach((transformerFn) => {
      try {
        transformerFn.call(null, hookName, element, enhancedPayload);
      } catch (e) {
        console.error(`Transformer failed at ${hookName}:`, e);
      }
    });
  }
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
            section: blockDef.section || null
          });
        });
      });
    });
    console.log(`Found ${pageBlocks.length} block instances on page`);
    return pageBlocks;
  }
  var import_trends_landing_default = {
    transform: (payload) => {
      const {
        document,
        url,
        html,
        params
      } = payload;
      const main = document.body;
      executeTransformers("beforeTransform", main, payload);
      const pageBlocks = findBlocksOnPage(document, PAGE_TEMPLATE);
      pageBlocks.forEach((block) => {
        if (!block.element.parentNode) return;
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
      executeTransformers("afterTransform", main, payload);
      const hr = document.createElement("hr");
      main.appendChild(hr);
      WebImporter.rules.createMetadata(main, document);
      WebImporter.rules.transformBackgroundImages(main, document);
      WebImporter.rules.adjustImageUrls(main, url, params.originalURL);
      const path = WebImporter.FileUtils.sanitizePath(
        new URL(params.originalURL).pathname.replace(/\/$/, "").replace(/\.html$/, "") || "/index"
      );
      return [{
        element: main,
        path,
        report: {
          title: document.title,
          template: PAGE_TEMPLATE.name,
          blocks: pageBlocks.map((b) => b.name)
        }
      }];
    }
  };
  return __toCommonJS(import_trends_landing_exports);
})();
