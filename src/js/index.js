import $ from 'jQuery';

require('../less/build.less');

function init () {
  $('#clouds').pan({fps: 30, speed: 0.5, dir: 'right'});
  console.log('panning');
}

$('document').ready(init);
