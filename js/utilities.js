// Utility library - provides greeting functions

(function (global) {
  var greeter = global.greeter = {};

  // Returns "Hello name"
  greeter.sayHello = function (name) {
    return "Hello " + name;
  };

  // Returns "Goodbye name"
  greeter.sayGoodbye = function (name) {
    return "Goodbye " + name;
  };

})(window);
