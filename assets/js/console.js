// Override default console functions for our custom Dev Console
(function () {
  // store default console functionality before changing them
  default_log = console.log;
  default_clear = console.clear;
  default_error = console.error;
  default_warn = console.warn;

  console.log = function (...args) {
    for (let arg of args) {
      if (typeof arg == "object") {
        $("#console").append(
          (JSON && JSON.stringify ? JSON.stringify(arg, undefined, 2) : arg) +
            " "
        );
      } else {
        $("#console").append(arg + " ");
      }
    }
    // Console prompt
    $("#console").append("\n&raquo;  ");

    // So console is always scrolled to the bottom
    $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;

    // Allow the default console action to happen
    default_log(...args);
  };
  console.error = function (event) {
    $("#console").append("Error: " + event);

    // Console prompt
    $("#console").append("\n&raquo;  ");

    // So console is always scrolled to the bottom
    $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;

    // Allow the default console action to happen
    default_error(event);
  };
  console.warn = function (w) {
    $("#console").append("Warning: " + w);

    // Console prompt
    $("#console").append("\n&raquo;  ");

    // So console is always scrolled to the bottom
    $("#console").get(0).scrollTop = $("#console").get(0).scrollHeight;

    // Allow the default console action to happen
    default_warn(w);
  };
  console.clear = function () {
    // Console prompt
    $("#console").html("&raquo;  ");
    // Allow the default console action to happen
    default_clear();
  };
  clear = console.clear;
})();
