class ConsoleHelper {
  constructor() {
    throw new Error("This class cannot be instantiated");
  }

  static setNewConsole() {
    let default_log = console.log;
    let default_clear = console.clear;
    let default_error = console.error;
    let default_warn = console.warn;
    let consoleElement = document.querySelector("#console");

    console.log = function (...args) {
      for (let arg of args) {
        if (typeof arg == "object") {
          consoleElement.innerHTML +=
            (JSON && JSON.stringify ? JSON.stringify(arg, undefined, 2) : arg) +
            " ";
        } else {
          consoleElement.innerHTML += arg + " ";
        }
      }
      // Console prompt
      consoleElement.innerHTML += "\n&raquo;  ";

      // So console is always scrolled to the bottom
      consoleElement.scrollTop = consoleElement.scrollHeight;

      // Allow the default console action to happen
      default_log(...args);
    };
    console.error = function (event) {
      consoleElement.innerHTML += "Error: " + event;

      // Console prompt
      consoleElement.innerHTML += "\n&raquo;  ";

      // So console is always scrolled to the bottom
      consoleElement.scrollTop = consoleElement.scrollHeight;

      // Allow the default console action to happen
      default_error(event);
    };
    console.warn = function (event) {
      consoleElement.innerHTML += "Warning: " + event;

      // Console prompt
      consoleElement.innerHTML += "\n&raquo;  ";

      // So console is always scrolled to the bottom
      consoleElement.scrollTop = consoleElement.scrollHeight;

      // Allow the default console action to happen
      default_warn(event);
    };
    console.clear = function () {
      // Console prompt
      consoleElement.innerHTML = "&raquo;  ";
      // Allow the default console action to happen
      default_clear();
    };
    clear = console.clear;
  }
}

ConsoleHelper.setNewConsole();
