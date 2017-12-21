import toc from '../index';
import test from 'tape-rollup';

const init = () => {
  const container = document.createElement('div');
  container.id = 'fixture';
  document.body.appendChild(container);
};

const setup = () => {
  const container = document.getElementById('fixture');
  container.innerHTML = `
    <div id="wrapper">
      <div class="toc" data-toc="h1.page-title, h2, #last, #last-heading"></div>
    </div>
    <div id="content_wrapper">
      <h1 class="page-title">Page Title</h1>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <h2>Sub Heading</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <h2>Sub Heading</h2>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <h3 id="last" data-toc-title="Custom subsub-heading">SubSub Heading</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <h3 id="last-heading">Last heading</h3>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum fermentum ligula a augue sollicitudin a tincidunt felis tincidunt. Donec et urna augue, sed consectetur lacus. Maecenas tincidunt volutpat lorem. Suspendisse turpis tellus, sodales ac commodo id, rhoncus vel augue. Vestibulum nisl nibh, rutrum eu bibendum vitae, bibendum et libero. Suspendisse vel odio vitae leo commodo lacinia. Sed non lacinia nulla. Pellentesque faucibus euismod dictum. Suspendisse potenti.</p>
    </div>
  `;

  toc(container.querySelector('[data-toc]'));

  return container;
};

init();

test('toc', assert => {
  const container = setup();
  assert.equal(typeof toc, 'function', 'toc function');
  assert.equal(container.querySelectorAll('ul').length, 1, 'list created');
  assert.end();
});

test('anchor formatting', assert => {
  const container = setup();

  assert.equal(container.querySelector('h1').id, 'toc-1');
  assert.equal(container.querySelector('h2').id, 'toc-2');
  assert.equal(container.querySelector('h3').id, 'last', 'respects existing id');
  assert.end();
});

test('links', assert => {
  const container = setup();

  assert.equal(container.querySelectorAll('a').length, 5, 'should have links');
  assert.equal(container.querySelectorAll('a')[3].textContent, container.querySelector('h3').dataset.tocTitle, 'should use data-toc-title if available');
  assert.equal(container.querySelectorAll('a')[0].textContent, container.querySelector('h1').textContent, 'should use text otherwise');
  assert.ok(container.querySelectorAll('li')[0].classList.contains('page-title'), 'should have "page-title" class');
  assert.ok(container.querySelectorAll('li')[3].classList.contains('toc-last'), 'should have "toc-last" class');
  assert.ok(container.querySelectorAll('li')[4].classList.contains('toc-last-heading'), 'should have "toc-last-heading" class');
  assert.end();
});

test('navigation', assert => {
  const container = setup();

  document.body.scrollTop = document.documentElement.scrollTop = 0;
  container.querySelectorAll('a')[3].click();
  setTimeout(() => {
    const scroll = (document.body.scrollTop || document.documentElement.scrollTop) - 1; // Account for the extra pixel we scroll
    assert.equal(scroll, container.querySelector('h3').offsetTop, 'should set scroll to top of the element');
    assert.end();
  }, 1001);
});
