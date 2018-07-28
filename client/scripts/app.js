// YOUR CODE HERE:
const App = function() {
  this.userName = 'anonymous';
  this.init();
};

App.prototype.init = function() {
  var urlParams = new URLSearchParams(window.location.search);
  this.userName = urlParams.get('username');
  console.log('Hello ', this.userName);
  // this.testTemplate();
};

App.prototype.testTemplate = function() {
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

$(function() {
  new App();

});
