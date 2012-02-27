
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');

var app = module.exports = express.createServer();
var io = require('socket.io').listen(app);

// Configuration

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static(__dirname + '/public'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.index);

app.listen(80);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);

// socket.ioイベント登録
io.sockets.on('connection', function (socket) {

  // 名前を取得する
  function getNickname() {
    var nickname = null;
    socket.get('nickname', function (err, name) {
      if (name === null) {
        nickname = '名無しさん';
      } else {
        nickname = name;
      }
    });
    return nickname;
  }

  // 接続発生時(ブロードキャスト)
  socket.broadcast.emit('message', '名無しさんが接続しました');

  // nickname設定イベント(全体)
  socket.on('setNickname', function (nickname) {
    socket.set('nickname', nickname);
    io.sockets.emit('message', '名無しさんがニックネーム:' + nickname + ' になりました');
  });

  // postイベント(全体)
  socket.on('chatpost', function (chat) {
    var nickname = getNickname();
    io.sockets.emit('response',
                    {nickname: nickname,
                    chat: chat});
  });

  // 切断イベント(ブロードキャスト) 
  socket.on('disconnect', function () {
    var nickname = getNickname();
    socket.broadcast.emit('message', nickname + 'が切断しました');
  });
});

