$(function() {
  // コネクション接続
  var socket = io.connect('http://' + document.location.host);

  function clearMessage() {
    $('#message').empty();
  }

  function outputMessage(message) {
    $('#message').prepend('<p>' + message + '</p>');
  }

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
    clearMessage();
    var chat = $('#chat');
    if (chat.val() == null || chat.val() == 0) {
      outputMessage('入力してください');
      return;
    }
    socket.emit('chatpost', chat.val());
    chat.val('');
  });

  // ニックネーム設定
  $('#nicknamepost').click( function () {
    clearMessage();
    var nickname = $('#nickname').val();
    if (nickname == null || nickname == 0) {
      outputMessage('入力してください');
      return;
    }
    socket.emit('setNickname', $('#nickname').val());
    $('#nicknameform').remove();
  });

});
