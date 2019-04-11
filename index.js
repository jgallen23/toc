import { find, findOne, ready, on, fire } from 'domassist';
import scrollTriggers from 'scroll-triggers';
import { init as smoothScroll, scroll } from 'smooth-scroller';

function init(el) {
  if (!el) {
    el = find('[data-toc]');
    el.forEach(e => init(e));
    return;
  }

  if (!el) {
    return;
  }

  const container = el.dataset.tocContainer ?
    findOne(el.dataset.tocContainer) || document.body : document.body;
  const selectors = el.dataset.toc.split(',').map(s => s.trim());
  const tocItems = [];
  const offset = el.dataset.tocOffset ? parseInt(el.dataset.tocOffset, 10) : 1;
  let i = 1;

  // Building dict
  selectors.forEach(selector => {
    const items = find(selector, container);

    items.forEach(item => {
      // Keep the id if already there
      const index = item.id || `toc-${i++}`;
      const text = item.dataset.tocTitle ?
      item.dataset.tocTitle.trim() : item.textContent.trim();
      const sanitizedClassName = selector.replace(/((:+[\w-\d]*)|[^A-z0-9-\s])/g, ' ').replace(/\s{2,}/g, ' ').trim();
      const className = `toc-${sanitizedClassName}`;

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
      fixed: 'true',
      start: `#${item.index}`,
      position: 'top',
      positionEnd: 'top',
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
  const tocs = find('li', el);
  const anchors = find('a', el);

  // Setting up scroll triggers and smooth scroll
  scrollTriggers(triggerOptions);
  smoothScroll(anchors, offset);

  // Pause scroll triggers while smoothscrolling
  on(document.body, 'smoothscroll:start', () => {
    fire(tocs, 'scrolltriggers:pause');
  });

  on(document.body, 'smoothscroll:end', () => {
    fire(tocs, 'scrolltriggers:resume');
    fire(window, 'scroll');
  });

  if (window.location.hash) {
    anchors.some(anchor => {
      const found = anchor.getAttribute('href') === window.location.hash;

      if (found) {
        setTimeout(() => {
          const element = findOne(window.location.hash);
          if (element) {
            // Silent scroll to element
            scroll(element, null, offset, true);
          }
        });
      }

      return found;
    });
  }
}

export default init;

ready(init);
