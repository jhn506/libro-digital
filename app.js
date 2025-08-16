$(document).ready(function () {
  let bookIniciado = false;

  function openBook() {
    $('#cover').fadeOut(600, function () {
      if (!bookIniciado) {
        $('#book').turn({
          width: $('#book').width(),
          height: $('#book').height(),
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
});
