$(document).ready(function () {
  let bookIniciado = false;

  function getBookDimensions() {
    let w = $(window).width();
    let h = $(window).height();

    if (w > 1024) {
      // PC
      return { width: 900, height: 650 };
    } else if (w > 768) {
      // Tablet
      return { width: Math.min(700, w * 0.9), height: h * 0.7 };
    } else {
      // Celular
      return { width: Math.min(400, w * 0.95), height: h * 0.75 };
    }
  }

  function openBook() {
    $('#cover').fadeOut(600, function () {
      if (!bookIniciado) {
        let dims = getBookDimensions();

        $('#book').turn({
          width: dims.width,
          height: dims.height,
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
      closeBook(); // si está en la primera página, volver a la portada
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

  // 🔄 Ajustar tamaño al cambiar orientación o tamaño de ventana
  $(window).on('resize', function () {
    if (bookIniciado) {
      let dims = getBookDimensions();
      $('#book').turn('size', dims.width, dims.height);
    }
  });
});
