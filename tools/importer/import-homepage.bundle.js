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

  // tools/importer/import-homepage.js
  var import_homepage_exports = {};
  __export(import_homepage_exports, {
    default: () => import_homepage_default
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

  // tools/importer/parsers/columns-article.js
  function parse2(element, { document }) {
    const columnWrappers = element.querySelectorAll(":scope > div");
    const image = element.querySelector("img");
    const textWrapper = columnWrappers[1] || element;
    const breadcrumbs = textWrapper.querySelector(".breadcrumbs");
    const heading = textWrapper.querySelector('h1, h2, h3, .h2-heading, [class*="heading"]');
    const metaRows = Array.from(textWrapper.querySelectorAll(".flex-horizontal")).filter((row) => !breadcrumbs || !breadcrumbs.contains(row));
    if (!image && !heading) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const textCell = [];
    if (breadcrumbs) textCell.push(breadcrumbs);
    if (heading) textCell.push(heading);
    textCell.push(...metaRows);
    const cells = [
      [image || "", textCell]
    ];
    const block = WebImporter.Blocks.createBlock(document, { name: "columns-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-gallery.js
  function parse3(element, { document }) {
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

  // tools/importer/parsers/tabs-testimonial.js
  function parse4(element, { document }) {
    const panes = Array.from(
      element.querySelectorAll(".tabs-content .tab-pane, .tab-pane")
    );
    const menuButtons = Array.from(
      element.querySelectorAll(".tab-menu .tab-menu-link, .tab-menu button, button.tab-menu-link")
    );
    if (panes.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const cells = [];
    panes.forEach((pane, i) => {
      let label = "";
      const button = menuButtons.find(
        (b) => b.getAttribute("data-tab-target") === String(i)
      ) || menuButtons[i];
      if (button) {
        const nameEl = button.querySelector("strong") || button.querySelector(".paragraph-sm strong, .paragraph-sm");
        label = (nameEl ? nameEl.textContent : button.textContent).trim();
      }
      if (!label) {
        const paneName = pane.querySelector('strong, [class*="paragraph"] strong');
        label = paneName ? paneName.textContent.trim() : `Tab ${i + 1}`;
      }
      const contentCell = [];
      const image = pane.querySelector("img");
      if (image) contentCell.push(image);
      const nameSource = pane.querySelector(".paragraph-xl strong, strong");
      if (nameSource) {
        const nameP = document.createElement("p");
        const strong = document.createElement("strong");
        strong.textContent = nameSource.textContent.trim();
        nameP.append(strong);
        contentCell.push(nameP);
      }
      let roleText = "";
      if (nameSource) {
        const nameWrapper = nameSource.closest("div");
        let roleEl = nameWrapper && nameWrapper.nextElementSibling;
        if (roleEl && roleEl.querySelector("strong")) roleEl = null;
        if (roleEl && roleEl.tagName === "DIV") {
          roleText = roleEl.textContent.trim();
        }
      }
      if (roleText) {
        const roleP = document.createElement("p");
        roleP.textContent = roleText;
        contentCell.push(roleP);
      }
      const quote = pane.querySelector("p.paragraph-xl, p");
      if (quote) contentCell.push(quote);
      cells.push([label, contentCell]);
    });
    const block = WebImporter.Blocks.createBlock(document, {
      name: "tabs-testimonial",
      cells
    });
    element.replaceWith(block);
  }

  // tools/importer/parsers/cards-article.js
  function parse5(element, { document }) {
    const cards = Array.from(
      element.querySelectorAll(':scope > a.article-card, :scope > a.card-link, :scope > a[class*="article-card"]')
    );
    const cells = [];
    cards.forEach((card) => {
      const img = card.querySelector(".article-card-image img, img.cover-image, img");
      const body = card.querySelector(".article-card-body") || card;
      const meta = body.querySelector(".article-card-meta");
      const title = body.querySelector('h3, h2, h4, [class*="heading"]');
      const link = document.createElement("a");
      if (card.getAttribute("href")) link.setAttribute("href", card.getAttribute("href"));
      const textContent = [];
      if (meta) textContent.push(meta);
      if (title) textContent.push(title);
      if (textContent.length) {
        link.append(...textContent);
        cells.push([img || "", link]);
      } else {
        if (card.getAttribute("href")) link.textContent = card.textContent.trim();
        cells.push([img || "", card.getAttribute("href") ? link : card.textContent.trim() || ""]);
      }
    });
    if (!cells.length) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "cards-article", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/accordion-faq.js
  function parse6(element, { document }) {
    const items = element.querySelectorAll("details.faq-item, details");
    const cells = [];
    items.forEach((item) => {
      const summary = item.querySelector("summary.faq-question, summary");
      const questionEl = summary ? summary.querySelector("span") || summary : null;
      const answerEl = item.querySelector(".faq-answer, :scope > div:not(.faq-question)");
      if (!questionEl && !answerEl) return;
      const question = questionEl ? (questionEl.textContent || "").trim() : "";
      const answer = answerEl || "";
      cells.push([question, answer]);
    });
    if (cells.length === 0) {
      element.replaceWith(...element.childNodes);
      return;
    }
    const block = WebImporter.Blocks.createBlock(document, { name: "accordion-faq", cells });
    element.replaceWith(block);
  }

  // tools/importer/parsers/hero-overlay.js
  function parse7(element, { document }) {
    const bgImage = element.querySelector(
      'img.cover-image, img.utility-overlay, img[class*="cover"], img[class*="background"]'
    );
    const contentRoot = element.querySelector(".card-body") || element;
    const heading = contentRoot.querySelector("h1, h2, h3, h4, h5, h6");
    const description = contentRoot.querySelector("p.subheading, p");
    const ctaLinks = Array.from(
      contentRoot.querySelectorAll(".button-group a, a.button")
    );
    const cells = [];
    if (bgImage) {
      cells.push([bgImage]);
    }
    const contentCell = [];
    if (heading) contentCell.push(heading);
    if (description) contentCell.push(description);
    contentCell.push(...ctaLinks);
    if (!heading && !description && ctaLinks.length === 0 && !bgImage) {
      element.replaceWith(...element.childNodes);
      return;
    }
    cells.push([contentCell]);
    const block = WebImporter.Blocks.createBlock(document, {
      name: "hero-overlay",
      cells
    });
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

  // tools/importer/import-homepage.js
  var PAGE_TEMPLATE = {
    name: "homepage",
    description: "WKND Trendsetters fashion blog homepage with hero, featured article, image gallery, testimonials tabs, latest articles cards, FAQ accordion, and CTA sections",
    urls: [
      "https://wknd-trendsetters.pages.dev/"
    ],
    blocks: [
      {
        name: "hero-feature",
        instances: ["#main-content > header.section.secondary-section .grid-layout.tablet-1-column.grid-gap-xxl"]
      },
      {
        name: "columns-article",
        instances: ["#main-content > section.section:nth-of-type(1) .grid-layout.tablet-1-column.grid-gap-lg"]
      },
      {
        name: "cards-gallery",
        instances: ["#main-content > section.section.secondary-section:nth-of-type(2) .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-sm"]
      },
      {
        name: "tabs-testimonial",
        instances: ["#main-content > section.section:nth-of-type(3) .tabs-wrapper"]
      },
      {
        name: "cards-article",
        instances: ["#main-content > section.section.secondary-section:nth-of-type(4) .grid-layout.desktop-4-column.tablet-2-column-1.mobile-portrait-1-column.grid-gap-md"]
      },
      {
        name: "accordion-faq",
        instances: ["#main-content > section.section:nth-of-type(5) .faq-list"]
      },
      {
        name: "hero-overlay",
        instances: ["#main-content > section.section.inverse-section .grid-layout.desktop-1-column"]
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
        name: "Featured article",
        selector: "#main-content > section.section:nth-of-type(1)",
        style: null,
        blocks: ["columns-article"],
        defaultContent: []
      },
      {
        id: "rc4",
        name: "Image gallery",
        selector: "#main-content > section.section.secondary-section:nth-of-type(2)",
        style: "light-grey",
        blocks: ["cards-gallery"],
        defaultContent: [
          "#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.utility-text-align-center.utility-margin-bottom-8rem > h2.h2-heading",
          "#main-content > section.section.secondary-section:nth-of-type(2) > div.container > div.utility-text-align-center.utility-margin-bottom-8rem > p.paragraph-lg"
        ]
      },
      {
        id: "rc5",
        name: "Testimonials",
        selector: "#main-content > section.section:nth-of-type(3)",
        style: null,
        blocks: ["tabs-testimonial"],
        defaultContent: []
      },
      {
        id: "rc6",
        name: "Latest articles",
        selector: "#main-content > section.section.secondary-section:nth-of-type(4)",
        style: "light-grey",
        blocks: ["cards-article"],
        defaultContent: [
          "#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.utility-text-align-center > h2.h2-heading",
          "#main-content > section.section.secondary-section:nth-of-type(4) > div.container > div.utility-text-align-center > p.paragraph-lg"
        ]
      },
      {
        id: "rc7",
        name: "FAQ",
        selector: "#main-content > section.section:nth-of-type(5)",
        style: null,
        blocks: ["accordion-faq"],
        defaultContent: [
          "#main-content > section.section:nth-of-type(5) .grid-layout.tablet-1-column.grid-gap-xxl > div > h2.h2-heading",
          "#main-content > section.section:nth-of-type(5) .grid-layout.tablet-1-column.grid-gap-xxl > div > p.subheading"
        ]
      },
      {
        id: "rc8",
        name: "Closing CTA banner",
        selector: "#main-content > section.section.inverse-section",
        style: null,
        blocks: ["hero-overlay"],
        defaultContent: []
      }
    ]
  };
  var parsers = {
    "hero-feature": parse,
    "columns-article": parse2,
    "cards-gallery": parse3,
    "tabs-testimonial": parse4,
    "cards-article": parse5,
    "accordion-faq": parse6,
    "hero-overlay": parse7
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
  var import_homepage_default = {
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
  return __toCommonJS(import_homepage_exports);
})();
