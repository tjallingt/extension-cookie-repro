const extension = tableau.extensions;

function configure() {
  extension.ui
    .displayDialogAsync(window.location.href)
    .then(payload => {
      switch (payload) {
        default:
          console.error('unhandled payload', payload);
      }
    })
    .catch(error => {
      switch (error.errorCode) {
        case tableau.ErrorCodes.DialogClosedByUser:
          // Dialog was closed by user
          break;
        default:
          console.error(error.message);
      }
    });
}

document.getElementById('dialog').addEventListener('click', configure);
document.getElementById('reload').addEventListener('click', function() {
  window.location.reload(true);
});

extension.initializeAsync({ configure: configure });
