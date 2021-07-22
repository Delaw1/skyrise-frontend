

  var swiper = new Swiper('.swiper-container', {
    slidesPerView: 1.14,
    spaceBetween: 12,
    speed: 1200,
    longSwipes: false,


    freeMode: false,
    slidesPerGroup: 1,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {

      767: {
        slidesPerView: 4, slidesPerGroup: 4,

      }

    }
  });