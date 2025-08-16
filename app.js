$(document).ready(function () {
  let bookIniciado = false;

  function getBookSize() {
    // Ajustar a 90% del ancho y 70% del alto de la pantalla
    let width = Math.min(window.innerWidth * 0.9, 900); 
    let height = Math.min(window.innerHeight * 0.7, 650); 

    // Ajustar a proporción de doble página
    if (width < 500) {
      // en móviles muy pequeños mostramos una página
      return { width: width, height: height, display: 'single' };
    }
    return { width: width, height: height, display: 'double' };
  }

  function openBook() {
    $('#cover').fadeOut(600, function () {
      if (!bookIniciado) {
        let size = getBookSize();
        $('#book').turn({
          width: size.width,
          height: size.height,
          autoCenter: true,
          display: size.display,
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

  // Recalcular tamaño al redimensionar
  $(window).on('resize', function () {
    if (bookIniciado) {
      let size = getBookSize();
      $('#book').turn('size', size.width, size.height);
      $('#book').turn('display', size.display);
    }
  });

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
});
