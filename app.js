$(document).ready(function () {
  let bookIniciado = false;

  // 🔹 función para obtener tamaño según dispositivo
  function getBookSize() {
    const width = $(window).width();

    if (width <= 600) {
      // celular
      return { width: $(window).width(), height: $(window).height() * 0.9 };
    } else if (width <= 1024) {
      // tablet
      return { width: 700, height: 500 };
    } else {
      // PC
      return { width: 900, height: 650 };
    }
  }

  function openBook() {
    $('#cover').fadeOut(600, function () {
      if (!bookIniciado) {
        const size = getBookSize();

        $('#book').turn({
          width: size.width,
          height: size.height,
          autoCenter: true,
          elevation: 50,
          gradients: true,
          acceleration: true,
          display: 'double',
          turnCorners: "bl,tr",
          when: {
            turned: function (e, page) {
              const totalPages = $('#book').turn('pages');
              $('#nextPage').toggle(page !== totalPages);
            }
          }
        });

        $('#book').turn('disable', true);
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

  // Abrir libro
  $('#openBookBtn').on('click', openBook);

  // Página anterior
  $('#prevPage').on('click', () => {
    const page = $('#book').turn('page');
    if (page === 1) {
      closeBook();
    } else {
      $('#book').turn('previous');
    }
  });

  // Página siguiente
  $('#nextPage').on('click', () => {
    $('#book').turn('next');
  });

  // Cerrar libro
  $('#closeBookBtn').on('click', closeBook);

  // 🔹 Redimensionar dinámico al rotar pantalla
  $(window).on('resize', function () {
    if (bookIniciado) {
      const size = getBookSize();
      $('#book').turn('size', size.width, size.height);
    }
  });
});
