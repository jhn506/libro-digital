$(document).ready(function () {
  let bookIniciado = false;

  function getBookSize() {
    const width = $(window).width();
    const height = $(window).height() * 0.9;

    if (width <= 600) {
      // móvil → una sola página
      return { width: width, height: height, display: 'single' };
    } else if (width <= 1024) {
      // tablet
      return { width: 700, height: 500, display: 'double' };
    } else {
      // PC
      return { width: 900, height: 650, display: 'double' };
    }
  }

  function openBook() {
    $('#cover').fadeOut(600, function () {
      if (!bookIniciado) {
        const size = getBookSize();

        $('#book').turn({
          width: size.width,
          height: size.height,
          display: size.display,
          autoCenter: true,
          elevation: 50,
          gradients: true,
          acceleration: true,
          turnCorners: "bl,tr",
          when: {
            turned: function (e, page) {
              const totalPages = $('#book').turn('pages');
              $('#nextPage').toggle(page !== totalPages);
            }
          }
        });

        bookIniciado = true;

        setTimeout(() => {
          $('#bookContainer').fadeIn(600);
        }, 300);
      } else {
        $('#book').turn('page', 1);
        $('#bookContainer').fadeIn(600);
      }
    });
  }

  function closeBook() {
    $('#bookContainer').fadeOut(600, () => {
      $('#cover').fadeIn(600);
    });
  }

  $('#openBookBtn').on('click', openBook);

  $('#prevPage').on('click', () => {
    const page = $('#book').turn('page');
    if (page === 1) {
      closeBook();
    } else {
      $('#book').turn('previous');
    }
  });

  $('#nextPage').on('click', () => {
    $('#book').turn('next');
  });

  $('#closeBookBtn').on('click', closeBook);

  // 🔹 Redimensionar dinámico
  $(window).on('resize orientationchange', function () {
    if (bookIniciado) {
      const size = getBookSize();
      $('#book').turn('size', size.width, size.height);
      $('#book').turn('display', size.display);
    }
  });
});
