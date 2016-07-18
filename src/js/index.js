import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import modal from 'bootstrap/js/modal';

const $ = jQuery;
require('../less/build.less');

function init () {
  const animationOn = true;
  const pageHeight = 8225;
  const $lavender = $('#lavender');
  let isLavenderFixed = false;
  $( window ).scroll(function() {
    const isBelowLavender = window.pageYOffset + window.innerHeight > pageHeight + 600;
    if (isBelowLavender !== isLavenderFixed) {
      if (isBelowLavender) {
        $lavender.css('position', 'fixed')
                 .css('bottom', '0px');
      } else {
        $lavender.css('position', 'absolute')
                 .css('bottom', '150px');
      }
      isLavenderFixed = isBelowLavender;
    }
  });

  if (animationOn) {
    $('#balloon-container').sprite({fps: 8, no_of_frames: 1})
  					.spRandom({
  						top: 20,
  						left: 50,
  						right: 90,
  						bottom: 80,
  						speed: 3500,
  						pause: 1000
  					});
      // $('#bike').sprite({fps: 3, no_of_frames: 3})

      $('#doje').sprite({fps: 8, no_of_frames: 1})
    					.spRandom({
                top: 100,
                bottom: 260,
    						left: 280,
    						right: 340,
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
