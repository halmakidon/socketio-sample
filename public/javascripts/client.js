$(function() {
  // コネクション接続
  var socket = io.connect('http://' + document.location.host);
  // responseイベント受信時イベント
  socket.on('response', function(data) {
    $('#postlist').append('<p>' + data + '</p>');
  });
  // message受信時イベント
  socket.on('con-message', function(data) {
    $('#messagelist').append('<p>' + data + '</p>');
  });
  // フォームポストイベント登録
  $('#formpost').click( function (){
    socket.emit('post', $('#input').val());
  });
});
