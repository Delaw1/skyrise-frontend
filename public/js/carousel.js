
    $(document).ready(function () {
      $(".owl-dbox").owlCarousel
        ({

          margin: 13,
          nav: true,
          navText: ["<div class='nav-btn nav-ct-pre'>Pre</div>", "<div class='nav-btn nav-ct-next'>Next</div>"],
          loop: true,
          dots: false,
          responsive: {
            0: {
              items: 1, slideBy: 3, stagePadding: 30
            },
            600: {
              items: 3, slideBy: 3
            },
            1000: {
              items: 3, slideBy: 3
            }
          }
        });


    });