/* jshint devel:true */

(function () {
  'use strict';

  // elements
  var heroEl = '.b-hero',
      $heroEl = $(heroEl);

  // carousel shizzle
  var carouselCacheObj = {},
      currPostIdEl;

  $.fn.extend({
    scrollTo: function (id) {
      $('html, body').animate({
        scrollTop: $(id).offset().top
      }, 300);
    } // scrollTo
  });

  var handleWorkPostClick = function (el) {
    var postIdEl = '.post-id_' + $(el).data('post-id'),
        $postIdEl = $(postIdEl),
        postIdThumbsEl = '.post-id_' + $(el).data('post-id') + '-thumbs',
        $postIdThumbsEl = $(postIdThumbsEl),
        $initedCarousel = $('.slick-initialized');

    $.fn.scrollTo('.b-hero');

    // prevent the current post from being clicked on again
    if (postIdEl === currPostIdEl) {
      return;
    } else {
      currPostIdEl = postIdEl;
    }

    // hide the $heroEl's background
    $heroEl.css('background', 'black');

    // check if the post has been inited already, if not init it and then
    // store the element in a cache to be inited later if clicked on again
    if (!carouselCacheObj[postIdEl]) {
      carouselCacheObj[postIdEl] = [$postIdEl, $postIdThumbsEl];
    }

    // check if there's already another carousel, if so: destroy it
    if ($initedCarousel) {
      $initedCarousel.slick('unslick');
    }

    $heroEl.empty();
    $heroEl.append(carouselCacheObj[postIdEl][0]);
    $heroEl.append(carouselCacheObj[postIdEl][1]);
    init.carousel(postIdEl, postIdThumbsEl);
    init.carouselThumbs(postIdThumbsEl, postIdEl);
  }; // handleWorkPostClick

  var bind = {
    work: function () {
      $('.b-work__post').on('click', function () {
        handleWorkPostClick(this);
      });

      $('.b-header__nav-item').on('click', function (e) {
        var targetId = $(this).children().attr('href');

        console.log(targetId);

        e.preventDefault();
        $.fn.scrollTo(targetId);
      });
    }
  }; // bind

  var init = {
    work: function () {
      bind.work();
    },
    carousel: function (el, elThumbs) {
      $(el).slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        asNavFor: elThumbs,
        infinite: false
      });
    },
    carouselThumbs: function (elThumbs, el) {
      $(elThumbs).slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        asNavFor: el,
        dots: true,
        centerMode: true,
        focusOnSelect: true,
        infinite: false
      });
    }
  }; // init

  $(function () {
    init.work();
  }); // $ready
}());
