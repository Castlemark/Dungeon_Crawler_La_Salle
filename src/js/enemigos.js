$(document).ready(function() {
  $('#area-cabeza').hover(function() {
    $('#protection-selector').addClass('protection-selector-cabeza');
  }, function() {
    $('#protection-selector').removeClass('protection-selector-cabeza');
  });
  $('#area-torso').hover(function() {
    $('#protection-selector').addClass('protection-selector-torso');
  }, function() {
    $('#protection-selector').removeClass('protection-selector-torso');
  });
  $('#area-piernas').hover(function() {
    $('#protection-selector').addClass('protection-selector-piernas');
  }, function() {
    $('#protection-selector').removeClass('protection-selector-piernas');
  });
});
