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
    success: function(data) {
      console.log(data);
      // invoke that.displayMessages(data);
    },
    error: function(error) {
      console.warn('Server Error: ', error);
    },
    loading: function() {},
    complete: function(data) {}
  });
};

App.prototype.displayMessages = function (data) {
  // set messages = data (which is recvd from success callback and passed in)
  // for each message
  //    if (this.messages[key] is not stored)
  //      store sanitize message into this.messages
  //      add message to dom (this.addMessageToDOM(messages[i])
};

App.prototype.sanitizeMessage = function (msg) {
  // attributesToSanitize = [username, roomname, text]
  // for each attributesToSanitize (attName)
  //    use jquery text/html trick to sanitize each att of msg
  // return msg
};

App.prototype.addMessageToDOM = function (msg) {
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
