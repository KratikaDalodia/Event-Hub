
$(document).ready(function() {
  $('.toggle-collapse').click(function() {
    $('.nav').toggleClass('expanded');
  });
});
$('.owl-carousel').owlCarousel({
  loop: true,
  autoplay: true,
  autoplayTimeout: 3000,
  dots: false,
  nav: true,
  navText: [$('.owl-navigation .owl-nav-prev'), $('.owl-navigation .owl-nav-next')]
});
