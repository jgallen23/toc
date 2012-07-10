!function($) {
$.fn.toc = function(options) {
  var self = this;
  var opts = $.extend({}, jQuery.fn.toc.defaults, options);

  var container = $(opts.container);
  var headings = $(opts.selectors, container);
  var headingOffsets = [];
  var activeClassName = opts.prefix+'-active';

  var findScrollableElement = function(els) {
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
  };
  var scrollable = findScrollableElement(opts.container, 'body', 'html');

  var scrollTo = function(e) {
    if (opts.smoothScrolling) {
      e.preventDefault();
      var elScrollTo = $(e.target).attr('href');
      var $el = $(elScrollTo);
      
      scrollable.animate({ scrollTop: $el.offset().top - opts.offset }, 1100, 'swing', function() {
        if (opts.hash)
            location.hash = elScrollTo;
      });
    }
    $('li', self).removeClass(activeClassName);
    $(e.target).parent().addClass(activeClassName);
  };

  //highlight on scroll
  var timeout;
  var highlightOnScroll = function(e) {
    if (timeout) {
      clearTimeout(timeout);
    }
    timeout = setTimeout(function() {
    
      var top = $(window).scrollTop() - opts.offset,
        highlighted;
      for (var i = 0, c = headings.length; i < c; i++) {
        if ($(headings[i]).offset().top - opts.offset >= top) {
          $('li', self).removeClass(activeClassName);
          highlighted = $('li:eq('+(i)+')', self).addClass(activeClassName);
          if (opts.onHighlight)
            opts.onHighlight(highlighted);
          break;
        }
      }
    }, 50);
  };
  if (opts.highlightOnScroll) {
    $(window).bind('scroll', highlightOnScroll);
    highlightOnScroll();
  }

  return this.each(function() {
    //build TOC
    var el = $(this);
    var ul = $('<ul/>');
    headings.each(function(i, heading) {
      var $h = $(heading);
      headingOffsets.push($h.offset().top - opts.offset - opts.highlightOffset);

      //add anchor
      var anchor = $('<span/>').attr('id', opts.anchorName(i, heading, opts.prefix)).insertBefore($h);

      //build TOC item
      var a = $('<a/>')
      .text($h.text())
      .attr('href', '#' + opts.anchorName(i, heading, opts.prefix))
      .bind('click', function(e) { 
        scrollTo(e);
        el.trigger('selected', $(this).attr('href'));
      });

      var li = $('<li/>')
      .addClass(opts.prefix+'-'+$h[0].tagName.toLowerCase())
      .append(a);

      ul.append(li);
    });
    el.html(ul);
  });
};


jQuery.fn.toc.defaults = {
  container: 'body',
  selectors: 'h1,h2,h3',
  smoothScrolling: true,
  prefix: 'toc',
  offset: 0,
  hash: false,
  onHighlighted: function() {},
  highlightOnScroll: true,
  highlightOffset: 100,
  anchorName: function(i, heading, prefix) {
    return prefix+i;
  }

};

}(jQuery);
