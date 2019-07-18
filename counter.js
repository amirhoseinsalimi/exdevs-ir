const fs = require('fs');
const nthline = require('nthline');

const filePath = './.log';

fs.open('.log', 'r', (err) => {
  if (err) {
    console.log('.log file does not exist. Creating one...');

    const initText = "Number of times '/' path has been requested: 0\n"
        + "Number of times '/contact-message' path has been requested: 0\n"
        + "Number of times '/download' path has been requested: 0\n"
        + "Number of times '/playstore' path has been requested: 0\n";

    fs.writeFile('.log', initText, (err) => {
      if (err) {
        console.log("Couldn't create .log file");
        console.log(`${err.name}: ${err.message}`);
      }
    });
  } else {
    console.log('.log file exists!');
  }
});

const incrementIndexCounter = (() => {
  let counter;

  function f() {
    nthline(0, filePath)
      .then((line) => {
        counter = Number(line.split(':')[1]);

        counter++;

        fs.readFile('.log', (err, data) => {
          if (err) {
            console.log("Couldn't read .log file");
            console.log(`${err.name}: ${err.message}`);
          } else {
            data = data.toString().split('\n');
            data.splice(0, 1, `Number of times '/' path has been requested: ${counter}`);
            const text = data.join('\n');
            fs.writeFile('.log', text, (err) => {
              if (err) return console.log(err);
            });
          }
        });
      });
  }

  return f;
})();

const incrementContactMessageCounter = (() => {
  let counter;

  function f() {
    nthline(1, filePath)
      .then((line) => {
        counter = Number(line.split(':')[1]);

        counter++;

        fs.readFile('.log', (err, data) => {
          if (err) {
            console.log("Couldn't read .log file");
            console.log(`${err.name}: ${err.message}`);
          } else {
            data = data.toString().split('\n');
            data.splice(1, 1, `Number of times '/contact-message' path has been requested: ${counter}`);
            const text = data.join('\n');
            fs.writeFile('.log', text, (err) => {
              if (err) return console.log(err);
            });
          }
        });
      });
  }

  return f;
})();

const incrementDownloadLinkCounter = (() => {
  let counter;

  function f() {
    nthline(2, filePath)
      .then((line) => {
        counter = Number(line.split(':')[1]);

        counter++;

        fs.readFile('.log', (err, data) => {
          if (err) {
            console.log("Couldn't read .log file");
            console.log(`${err.name}: ${err.message}`);
          } else {
            data = data.toString().split('\n');
            data.splice(2, 1, `Number of times '/download' path has been requested: ${counter}`);
            const text = data.join('\n');
            fs.writeFile('.log', text, (err) => {
              if (err) return console.log(err);
            });
          }
        });
      });
  }

  return f;
})();

const incrementPlayStoreLinkCounter = (() => {
  let counter;

  function f() {
    nthline(3, filePath)
      .then((line) => {
        counter = Number(line.split(':')[1]);

        counter++;

        fs.readFile('.log', (err, data) => {
          if (err) {
            console.log("Couldn't read .log file");
            console.log(`${err.name}: ${err.message}`);
          } else {
            data = data.toString().split('\n');
            data.splice(3, 1, `Number of times '/playstore' path has been requested: ${counter}`);
            const text = data.join('\n');
            fs.writeFile('.log', text, (err) => {
              if (err) return console.log(err);
            });
          }
        });
      });
  }

  return f;
})();

module.exports = {
  incrementIndexCounter,
  incrementContactMessageCounter,
  incrementDownloadLinkCounter,
  incrementPlayStoreLinkCounter,
};
