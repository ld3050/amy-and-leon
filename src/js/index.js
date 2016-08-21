import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import modal from 'bootstrap/js/modal';
import scrollspy from 'bootstrap/js/scrollspy';

const $ = jQuery;
require('../less/build.less');

function applyClassAtScrollPosition($element, className, scrollPosition, isAlreadyApplied) {
  const isBelowScrollPosition = window.pageYOffset + window.innerHeight > scrollPosition;
  if (isBelowScrollPosition !== isAlreadyApplied) {
    if (isBelowScrollPosition) {
      $element.addClass(className);
    } else {
      $element.removeClass(className);
    }
  }
  return isBelowScrollPosition
}

function init () {
  const animationOn = true;


  // enable smooth scrolling
  $('#navbar a').on('click', function(event) {
    if (this.hash !== '') {
      event.preventDefault();
      const { top } = $(this.hash).offset();
      $('html, body').animate({ scrollTop: top - 100 }, 800,
        () => { window.location.hash = this.hash; }
      );
    }
  });

  const pageHeight = 8225;
  let isLavenderFixed = false;
  const $lavender = $('#lavender');
  let isNavbarShown = false;
  const $navbar = $('#navbar');
  // handle styles triggered by scroll position
  $( window ).scroll(() => {
    isLavenderFixed = applyClassAtScrollPosition($lavender, 'fixed', pageHeight + 600, isLavenderFixed);
    isNavbarShown = applyClassAtScrollPosition($navbar, 'on', 1600, isNavbarShown);
  });

  if (animationOn) {
    const isWindowLessThanBalloonWidth = window.innerWidth < 600;
    $('#balloon-container').sprite({fps: 8, no_of_frames: 1})
  					.spRandom({
  						top: 20,
  						left: isWindowLessThanBalloonWidth ? 0 : 50,
  						right: isWindowLessThanBalloonWidth ? 0 : 90,
  						bottom: 80,
  						speed: 3500,
  						pause: 1000
  					});
    $('#bike').sprite({fps: 3, no_of_frames: 3})

    $('#doje').sprite({fps: 8, no_of_frames: 1})
  					.spRandom({
              top: 100,
              bottom: 260,
  						left: window.innerWidth * 0.15,
  						right: window.innerWidth * 0.18,
  						speed: 500,
  						pause: 3000
  					});
  }

  ReactDOM.render(
          <App />,
          document.getElementById('rsvp-form')
        );
}

$('document').ready(init);
