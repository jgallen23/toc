(function ($, window) {
$.fn.toc = function(options) {
  var self = this,
  opts = $.extend({}, jQuery.fn.toc.defaults, options),

  container = $(opts.container),
  headings = $(opts.selectors, container),
  headingOffsets = [],
  activeClassName = opts.prefix+'-active',

  findScrollableElement = function(els) {
    for (var i = 0, argLength = arguments.length; i < argLength; i++) {
      var el = arguments[i],
          $scrollElement = $(el);
      if ($scrollElement.scrollTop() > 0) {
        return $scrollElement;
      } else {
        $scrollElement.scrollTop(1);
        var isScrollable = $scrollElement.scrollTop() > 0;
        $scrollElement.scrollTop(0);
        if (isScrollable) {
          return $scrollElement;
        }
      }
    }
    return [];
  },
  scrollable = findScrollableElement(opts.container, 'body', 'html'),

  scrollTo = function(e) {
    if (opts.smoothScrolling) {
      e.preventDefault();
      var elScrollTo = $(e.target).attr('href');
      var $el = $(elScrollTo);
      
      scrollable.animate({ scrollTop: $el.offset().top }, opts.scrollSpeed, 'swing', function() {
        location.hash = elScrollTo;
      });
    }
    $('li', self).removeClass(activeClassName);
    $(e.target).parent().addClass(activeClassName);
  },

  //highlight on scroll
  timeout,
  highlightOnScroll = function(e) {
      var top = $(window).scrollTop();
      for (var i = 0, c = headingOffsets.length; i < c; i++) {
        if (headingOffsets[i] >= top) {
          $('li', self).removeClass(activeClassName);
          $('li:eq('+(i-1)+')', self).addClass(activeClassName);
          break;
        }
      }
  };
  if (opts.highlightOnScroll) {
      $(window).bind("scroll", function () {
          if (timeout) {
              clearTimeout(timeout);   // clear any previous timeout
          }
          timeout = setTimeout(highlightOnScroll, 50);   // set new timeout
      });
      highlightOnScroll();
  }

  return this.each(function() {
    //build TOC
    var ul = $('<ul/>'),
    el = $(this),
    $h,
    anchor,
    a,
    li;

    headings.each(function(i, heading) {
      $h = $(heading),

      //add anchor
      anchor = $('<span/>').attr('id', opts.anchorName(i, heading, opts.prefix)).insertBefore($h),

      //build TOC item
      a = $('<a/>')
      .text($h.text())
      .attr('href', '#' + opts.anchorName(i, heading, opts.prefix))
      .bind('click', scrollTo),

      li = $('<li/>')
      .addClass(opts.prefix+'-'+$h[0].tagName.toLowerCase())
      .append(a);

      headingOffsets.push($h.offset().top - opts.highlightOffset);

      ul.append(li);
    });
    el.html(ul);
  });
};


jQuery.fn.toc.defaults = {
  container: 'body',
  selectors: 'h1,h2,h3',
  smoothScrolling: true,
  scrollSpeed: 400,
  prefix: 'toc',
  highlightOnScroll: true,
  highlightOffset: 100,
  anchorName: function(i, heading, prefix) {
    return prefix+i;
  } 
};

}(jQuery, window));
