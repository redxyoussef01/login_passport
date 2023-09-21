
$(document).ready(function () {
  /*global io*/
  const socket = io.connect('https://redxyoussef01githubio-production.up.railway.app/');
  
socket.on('user count', function (data) {
    console.log(data);
  });

  // Form submittion with new message in field with id 'm'
  $('form').submit(function () {
    var messageToSend = $('#m').val();

    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });
});