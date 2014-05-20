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

  suite('toc navigation', function() {
    test('should contain links', function() {
      assert.equal($('.toc ul a').length, 0);

      $('.toc').toc({
        container: '#fixture'
      });

      assert.notEqual($('.toc ul a').length, 0);
    });

    test('should scroll to element on click', function(done) {
      assert.equal($(window).scrollTop(), 0);

      $('.toc').toc({
        container: '#fixture',
        smoothScrolling: true
      });

      $('.toc a:first').click();

      setTimeout(function(){
        var elOffset = $('#toc0').offset().top;
        var windowTop = $(window).scrollTop();
        assert.ok((windowTop <= elOffset + 5 && windowTop >= elOffset - 5));
        done();
      }, 400);
    });

    test('should update on scroll', function(done) {
      assert.equal($(window).scrollTop(), 0);

      $('.toc').toc({
        container: '#fixture'
      });

      $(window).scrollTop(~~($('#toc1').offset().top));
      
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

      $(window).scrollTop(~~($('#toc1').offset().top));

      setTimeout(function(){
        assert.ok($('.toc .active').length, 1);
        done();
      }, 110);
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
