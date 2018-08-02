// YOUR CODE HERE:
const App = function () {
  this.server = 'http://parse.RPT.hackreactor.com/chatterbox/classes/messages';
  this.userName = 'anonymous';
  this.messages = {};
  this.timer = false;
  this.delay = 1000;
  this.currentRoom = 'lobby';
  this.friends = [];
  this.init();
};

App.prototype.init = function () {
  var urlParams = new URLSearchParams(window.location.search);
  this.userName = urlParams.get('username');
  console.log('Hello ', this.userName);
  this.setUpUI();
  // this.testTemplate();

  this.timer = setInterval(() => {
    this.fetch();
  }, this.delay);
  this.fetch();
};

App.prototype.setUpUI = function () {
  const that = this;
  $('#send').off('submit'); 
  $('#send').on('submit', function (e) {
    e.preventDefault();
    that.handleSubmit(e, this);
  });
};

App.prototype.handleSubmit = function (e, el) {
  // grab the msgInput.value
  const msg = $('#message').val().trim();
  // invoke postMessage
  if (msg !== '') {
    this.send({
      text: msg,
      roomname: this.currentRoom,
      username: this.userName
    });
    // clear input box
    $('#message').val('');
  }
};

App.prototype.clearMessages = function () {
  $('#chats').empty();
};

App.prototype.fetch = function () {
  const that = this;
  $.ajax({
    url: this.server,
    method: 'GET',
    data: {limit: 50, order: '-createdAt'},
    dataType: 'json', //could be interpreted as a script
    success: function (data) {
      console.log('new data!');
      that.storeAndDisplayNewMessages(data.results.reverse());

    },
    error: function (error) {
      console.warn('Server Error: ', error);
    },
    loading: function () { },
    complete: function (data) { }
  });
};

App.prototype.send = function (msgObj) {
  $.ajax({
    url: this.server,
    type: 'POST',
    contentType: 'application/json',
    dataType: 'json', //could be interpreted as a script
    data: JSON.stringify({
      username: msgObj.username,
      roomname: msgObj.roomname,
      text: msgObj.text
    }),
    success: function (data) {
      console.log(data);
    },
    error: function (error) {
      console.warn('Server Error: ', error);
    },
    loading: function () { },
    complete: function (data) { }
  });
};

App.prototype.handleUsernameClick = function (username) {
  // append $(this).text() to this.friends
  if (!this.isFriend(username)) {
    this.friends.push(username);
  }

  // search for all messages in the DOM w .username
  // add .friends to it
  $('[data-username="' + username + '"]').addClass('friend');
};

App.prototype.renderRoom = function (roomName) {
  $('<option>' + roomName + '</option>').appendTo('#roomSelect');
};

App.prototype.storeAndDisplayNewMessages = function (messagesArr) {
  for (let i = 0; i < messagesArr.length; i++) {
    let objectId = messagesArr[i].objectId;
    if (this.messages[objectId] === undefined) {
      console.time('');
      this.messages[objectId] = this.sanitizeMessage(messagesArr[i]);
      this.renderMessage(this.messages[objectId]);
    }
  }

};

App.prototype.sanitizeMessage = function (msg) {
  let attributesToSanitize = ['username', 'roomname', 'text'];
  for (let i = 0; i < attributesToSanitize.length; i++) {
    let att = attributesToSanitize[i];
    msg[att] = $('<div></div>').text(msg[att]).html();
  }
  return msg;
};

App.prototype.isFriend = function(username) {
  return this.friends.indexOf(username) !== -1;
};

App.prototype.renderMessage = function (msg) {
  // grab html string from DOM w template
  const that = this;
  const templateString = $('#msg-template').html();
  // compile template
  const templ = Handlebars.compile(templateString, {noEscape: true});
  // pass object into template, invoking it
  // set variable to returned html string
  const renderedTemplate = templ(
    {
      username: msg.username,
      message: msg.text,
      roomname: msg.roomname,
      fromMe:  $('<div></div>').text(this.userName.trim()).html() === msg.username.trim()
    });
  const $renderedTemplate = $(renderedTemplate.trim());

  const $bubble = $renderedTemplate.find('.bubble');
  $bubble.attr({
    'data-username': msg.username,
    'data-roomname': msg.roomname
  });
  $bubble.on('click', function(e) {
    //this = DOM element
    that.handleUsernameClick(msg.username);
  });

  if (this.isFriend(msg.username)) {
    $renderedTemplate.addClass('friend');
  }

  // set html body of chats to html string
  $('#chats').prepend($renderedTemplate);
};




$(function () {
  window.app = new App();
});
