(function($) {
var verboseIdCache = {};
$.fn.toc = function(options) {
  var self = this;
  var opts = $.extend({}, jQuery.fn.toc.defaults, options);
  var $doc = $(document);
  var $window = $(window);
  var $bottomPaddingElement = opts.addBottomPadding ? $(opts.addBottomPadding) : [];

  var container = $(opts.container);
  var headings = $(opts.selectors, container);
  var headingOffsets = [];
  var activeClassName = opts.activeClass;

  var addPaddingToElement = function (element) {    
    var needsPadding,
        currentPadding = parseInt($bottomPaddingElement.css('paddingBottom').replace('px',''), 10) || 0,
        padding = '',
        docHeight = $doc.height(),
        winHeight = $window.height();

    needsPadding = (winHeight + element.offset().top) > (docHeight - currentPadding);

    var updatePadding = function () {
      $bottomPaddingElement.css({
        paddingBottom : padding
      });
    };

    if (needsPadding) {
      padding = (winHeight + element.offset().top) - docHeight + currentPadding + 25;

      if (padding !== currentPadding){
        if (padding < currentPadding){
          // We wait till the scrolling happened to remove the extra padding
          var speed = typeof opts.smoothScrolling === 'function' ? 425 : 10;
          setTimeout(updatePadding, speed);
        }
        else {
          updatePadding();
        }
      }
    }
    else if (currentPadding){
      updatePadding();
    }
  };

  var scrollTo = function(e, callback) {
    if (opts.smoothScrolling && typeof opts.smoothScrolling === 'function') {
      e.preventDefault();
      var elScrollTo = $(e.target).attr('href');

      opts.smoothScrolling(elScrollTo, opts, callback);
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
      var top = $(window).scrollTop(),
        highlighted, closest = Number.MAX_VALUE, index = 0;
      
      for (var i = 0, c = headingOffsets.length; i < c; i++) {
        var currentClosest = Math.abs(headingOffsets[i] - top);
        if (currentClosest < closest) {
          index = i;
          closest = currentClosest;
        }
      }
      
      $('li', self).removeClass(activeClassName);
      highlighted = $('li:eq('+ index +')', self).addClass(activeClassName);
      opts.onHighlight(highlighted);      
    }, 50);
  };
  if (opts.highlightOnScroll) {
    $(window).bind('scroll', highlightOnScroll);
    highlightOnScroll();
  }

  return this.each(function() {
    //build TOC
    var el = $(this);
    var ul = $(opts.listType);

    headings.each(function(i, heading) {
      var $h = $(heading);
      headingOffsets.push($h.offset().top - opts.highlightOffset);

      var anchorName = opts.anchorName(i, heading, opts.prefix);

      //add anchor
      if(heading.id !== anchorName) {
        var anchor = $('<span/>').attr('id', anchorName).insertBefore($h);
      }

      //build TOC item
      var a = $('<a/>')
        .text(opts.headerText(i, heading, $h))
        .attr('href', '#' + anchorName)
        .bind('click', function(e) {
          if ($bottomPaddingElement.length){

            addPaddingToElement($($(e.target).attr('href')));
          }

          $(window).unbind('scroll', highlightOnScroll);
          scrollTo(e, function() {
            $(window).bind('scroll', highlightOnScroll);
          });
          el.trigger('selected', $(this).attr('href'));
        });

      var li = $('<li/>')
        .addClass(opts.itemClass(i, heading, $h, opts.prefix))
        .append(a);

      ul.append(li);
    });
    el.html(ul);
  });
};


jQuery.fn.toc.defaults = {
  container: 'body',
  listType: '<ul/>',
  selectors: 'h1,h2,h3',
  smoothScrolling: function(target, options, callback) {
    $(target).smoothScroller({
      offset: options.scrollToOffset
    }).on('smoothScrollerComplete', function() {
      callback();
    });
  },
  scrollToOffset: 0,
  prefix: 'toc',
  activeClass: 'toc-active',
  onHighlight: function() {},
  highlightOnScroll: true,
  highlightOffset: 100,
  addBottomPadding: false,
  anchorName: function(i, heading, prefix) {
    if(heading.id.length) {
      return heading.id;
    }

    var candidateId = $(heading).text().replace(/[^a-z0-9]/ig, ' ').replace(/\s+/g, '-').toLowerCase();
    if (verboseIdCache[candidateId]) {
      var j = 2;
      
      while(verboseIdCache[candidateId + j]) {
        j++;
      }
      candidateId = candidateId + '-' + j;
      
    }
    verboseIdCache[candidateId] = true;

    return prefix + '-' + candidateId;
  },
  headerText: function(i, heading, $heading) {
    return $heading.data('toc-title') || $heading.text();
  },
  itemClass: function(i, heading, $heading, prefix) {
    return prefix + '-' + $heading[0].tagName.toLowerCase();
  }

};

})(jQuery);
