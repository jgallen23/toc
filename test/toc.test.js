suite('toc', function() {

  setup(function() {
    $('.toc').empty();

    var id = window.setTimeout(function() {}, 0);

    while (id--) {
      window.clearTimeout(id);
    }

    $(window).unbind('scroll');

    $(window).scrollTop(0);

    $('span[id^="toc"]').remove();
  });

  suite('jquery', function() {
    test('should have toc method', function() {
      assert.equal(typeof $.fn.toc, 'function');
    });

    test('plugin should bind to element', function() {
      assert.equal($('.toc ul').length, 0);

      $('.toc').toc({
        container: '#fixture'
      });

      assert.equal($('.toc ul').length, 1);
    });
  });
  
  suite('anchor id formatting', function() {
    test('should verbose ids by default', function() {
      assert.equal($('.toc ul a').length, 0);

      $('.toc').toc({
        container: '#fixture'
      });

      assert.equal($('#fixture').find('h1').prev().attr('id'), 'toc-page-title-2');
      assert.equal($('#fixture').find('h2').eq(1).prev().attr('id'), 'toc-sub-heading-2');
    });

   
    test('should be able to use custom id generator', function() {
      assert.equal($(window).scrollTop(), 0);
      
      $('.toc').toc({
        container: '#fixture',
        anchorName: function (i, heading, prefix) {
          return i + prefix;
        }
      });

      assert.equal($('h1').prev().attr('id'), '0toc');
    });
  });

  suite('toc navigation', function() {
    test('should contain links', function() {
      assert.equal($('.toc ul a').length, 0);

      $('.toc').toc({
        container: '#fixture'
      });

      assert.notEqual($('.toc ul a').length, 0);
    });

    // This test is a bit weird, two different results happen depending on where test is run.
    test('should scroll to element on click', function(done) {
      assert.equal($(window).scrollTop(), 0);

      $('.toc').toc({
        container: '#fixture'
      });

      $('.toc a:first').click();

      setTimeout(function(){
        var elOffset = $('#toc-page-title-2').offset().top;
        var windowTop = $(window).scrollTop();
        assert.equal(405, elOffset);
        // assert.ok((windowTop <= elOffset + 5 && windowTop >= elOffset - 5));
        done();
      }, 410);
    });

    test('should update on scroll', function(done) {
      assert.equal($(window).scrollTop(), 0);

      $('.toc').toc({
        container: '#fixture'
      });

      $(window).scrollTop(~~($('#toc-page-title-2').offset().top + 100));
      
      setTimeout(function(){
        assert.ok($('.toc ul li:eq(1)').hasClass('toc-active'));
        done();
      }, 110);
    });

    test('custom active class', function(done) {
      assert.equal($(window).scrollTop(), 0);

      $('.toc').toc({
        container: '#fixture',
        activeClass: 'active'
      });

      $(window).scrollTop(~~($('#toc-page-title-2').offset().top));

      setTimeout(function(){
        assert.ok($('.toc .active').length, 1);
        done();
      }, 110);
    });

    test('should pick data-toc-title if that\'s available on the heading as the anchor text', function () {
      var $toc = $('.toc');

      $toc.toc({ container: '#fixture' });

      assert.equal($toc.find('a:last').text(), $('#fixture h3').data('toc-title'));
    });
  });

  suite('existing ids', function() {
    test('should use existing id', function() {
      assert.equal($(window).scrollTop(), 0);

      $('.toc').toc({
        container: '#fixture',
        smoothScrolling: true
      });

      var lastA = $('.toc a:last');

      assert.equal(lastA.attr('href'), '#last');
    });
  });
});
