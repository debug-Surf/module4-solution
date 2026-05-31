// Library that provides the allGreetings function

(function (global) {
  var allGreetings = global.allGreetings = {};

  // Loops over names array, prints Hello or Goodbye based on first letter
  allGreetings.greetAll = function (names) {
    for (var i = 0; i < names.length; i++) {
      var name = names[i];
      if (name.charAt(0).toLowerCase() === 'j') {
        console.log(greeter.sayGoodbye(name));
      } else {
        console.log(greeter.sayHello(name));
      }
    }
  };

})(window);
