// YOUR CODE HERE:
const App = function () {
  this.server = 'http://parse.RPT.hackreactor.com/chatterbox/classes/messages';
  this.userName = 'anonymous';
  this.messages = {};
  this.timer = false;
  this.delay = 2000;
  this.currentRoom = 'lobby';
  this.init();
};

App.prototype.init = function () {
  var urlParams = new URLSearchParams(window.location.search);
  this.userName = urlParams.get('username');
  console.log('Hello ', this.userName);
  // this.testTemplate();

  // this.timer = setInterval(() => {
  //   this.fetch();
  // }, this.delay);
  // this.fetch();
  // this.setUpUI();
};

App.prototype.setUpUI = function () {
  const that = this;
  $('.sendMsgBtn').on('click', function(e) {
    // grab the msgInput.value
    const msg = $('.msgInput').val().trim();
    // invoke postMessage
    if (msg !== '') {
      that.send(msg);
      // clear input box
      $(this).val('');
    }
  });
};

App.prototype.clearMessages = function () {
  $('#chats').empty();
};

App.prototype.fetch = function () {
  const that = this;
  $.ajax({
    url: this.server,
    method: 'GET',
    dataType: 'json', //could be interpreted as a script
    success: function(data) {
      console.log(data);
      that.storeAndDisplayNewMessages(data.results);
    },
    error: function(error) {
      console.warn('Server Error: ', error);
    },
    loading: function() {},
    complete: function(data) {}
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
    success: function(data) {
      console.log(data);
    },
    error: function(error) {
      console.warn('Server Error: ', error);
    },
    loading: function() {},
    complete: function(data) {}
  });
};

App.prototype.renderRoom = function (roomName) {
  $('<option>' + roomName + '</option>').appendTo('#roomSelect');
};

App.prototype.storeAndDisplayNewMessages = function (messagesArr) {
  for (let i=0; i < messagesArr.length; i++) {
    let objectId = messagesArr[i].objectId;
    if (this.messages[objectId] === undefined) {
      this.messages[objectId] = this.sanitizeMessage(messagesArr[i]);
      this.renderMessage(this.messages[objectId]);
    }
  }
};

App.prototype.sanitizeMessage = function (msg) {
  let attributesToSanitize = ['username', 'roomname', 'text'];
  for (let i=0; i<attributesToSanitize.length; i++) {
    let att = attributesToSanitize[i];
    msg[att] = $('<div></div>').text(msg[att]).html();
  }
  return msg;
};

App.prototype.renderMessage = function (msg) {
  // grab html string from DOM w template
  var templateString = $('#msg-template').html();
  // compile template
  var templ = Handlebars.compile(templateString);
  // pass object into template, invoking it
  // set variable to returned html string
  var renderedTemplate = templ(
    {
      username: msg.username,
      message: msg.text
    });

  // set html body of chats to html string
  $('#chats').prepend(renderedTemplate);

};




$(function () {
  window.app = new App();
});
