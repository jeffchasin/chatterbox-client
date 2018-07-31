// YOUR CODE HERE:
const App = function () {
  this.endpointServer = 'http://parse.RPT.hackreactor.com/chatterbox';
  this.userName = 'anonymous';
  this.messages = {};
  this.init();
};

App.prototype.init = function () {
  var urlParams = new URLSearchParams(window.location.search);
  this.userName = urlParams.get('username');
  console.log('Hello ', this.userName);
  // this.testTemplate();
  this.getMessages();
};

App.prototype.getMessages = function () {
  const that = this;
  $.ajax({
    url: this.endpointServer + '/classes/messages',
    method: 'GET',
    dataType: 'json', //could be interpreted as a script
    success: function (data) {
      console.log(data);
      that.storeAndDisplayNewMessages(data.results);
    },
    error: function (error) {
      console.warn('Server Error: ', error);
    },
    loading: function () { },
    complete: function (data) { }
  });
};

App.prototype.storeAndDisplayNewMessages = function (messagesArr) {
  for (let i = 0; i < messagesArr.length; i++) {
    let objectId = messagesArr[i].objectId;
    if (this.messages[objectId] === undefined) {
      this.messages[objectId] = this.sanitizeMessage(messagesArr[i]);
      this.displayMessage(this.messages[objectId]);
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

App.prototype.displayMessage = function (msg) {
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
  new App();

});
