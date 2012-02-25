$(function() {
  // コネクション接続
  var socket = io.connect('http://' + document.location.host);

  // responseイベント受信時イベント
  socket.on('response', function(data) {
    $('#output').prepend(
      '<p>' + data.nickname + ' : ' + data.chat + '</p>');
  });

  // message受信時イベント
  socket.on('message', function(data) {
    $('#output').prepend('<p>' + data + '</p>');
  });

  // フォームポストイベント登録
  $('#chatpost').click( function (){
    var chat = $('#chat');
    socket.emit('chatpost', chat.val());
    chat.val('');
  });

  // ニックネーム設定
  $('#nicknamepost').click( function () {
    socket.emit('setNickname', $('#nickname').val());
  });

});
