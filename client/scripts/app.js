// YOUR CODE HERE:
const App = function () {
  this.endpointServer = 'http://parse.RPT.hackreactor.com/chatterbox';
  this.userName = 'anonymous';
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
  $.ajax({
    url: this.endpointServer + '/classes/messages',
    method: 'GET',
    dataType: 'json', //could be interpreted as a script
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

App.prototype.testTemplate = function () {
  // grab html string from DOM w template
  var templateString = $('#entry-template').html();
  // compile template
  var templ = Handlebars.compile(templateString);

  // pass object into template, invoking it
  // set variable to returned html string
  var renderedTemplate = templ({ username: this.userName, message: 'whatever' });

  // set html body of chats to html string
  $('#chats').html(renderedTemplate);

};




$(function () {
  new App();

});
