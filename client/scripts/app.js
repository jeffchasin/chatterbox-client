// YOUR CODE HERE:
const App = function() {
  this.userName = 'anonymous';
  this.init();
};

App.prototype.init = function() {
  var urlParams = new URLSearchParams(window.location.search);
  this.userName = urlParams.get('username');
  console.log('Hello ', this.userName);
  this.testTemplate();
};

App.prototype.testTemplate = function() {
  // grab html string from DOM w template

  // compile template

  // pass object into template, invoking it
    // set variable to returned html string

  // set html body of chats to html string

};

$(function() {
  new App();

});
