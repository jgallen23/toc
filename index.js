import { find, findOne, ready } from 'domassist';
import scrollTriggers from 'scroll-triggers';
import smoothScroll from 'smooth-scroller';

function init(el) {
  if (!el) {
    el = findOne('[data-toc]');
  }

  if (!el) {
    return;
  }

  const container = el.dataset.tocContainer ?
    findOne(el.dataset.tocContainer) | document.body : document.body;
  const selectors = el.dataset.toc.split(',').map(s => s.trim());
  const tocItems = [];
  let i = 1;

  // Building dict
  selectors.forEach(selector => {
    const items = find(selector, container);

    items.forEach(item => {
      // Keep the id if already there
      const index = item.id || `toc-${i++}`;
      const text = item.dataset.tocTitle ?
        item.dataset.tocTitle.trim() : item.textContent.trim();
      const className = `toc-${selector}`;

      // Set it if none
      if (item.id !== index) {
        item.id = index;
      }

      tocItems.push({ index, text, className });
    });
  });

  let html = '<ul>';
  const triggerOptions = [];

  // Building markup
  tocItems.forEach((item, j) => {
    const nextEl = tocItems[j + 1];
    const options = {
      el: `.toc-li-${j}`,
      start: `#${item.index}`,
      position: 'top',
      className: 'toc-visible'
    };
    html += `\n<li class="toc-li-${j} ${item.className}"><a href="#${item.index}">${item.text}</a></li>`;

    if (nextEl) {
      options.end = `#${nextEl.index}`;
    }

    triggerOptions.push(options);
  });

  html += '</ul>';

  el.innerHTML = html;

  // Setting up scroll triggers and smooth scroll
  scrollTriggers(triggerOptions);
  smoothScroll(find('a', el));
}

export default init;

ready(init);
