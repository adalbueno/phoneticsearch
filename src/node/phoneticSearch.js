(function onInitAtt(process) {
  var args = process.argv.slice(2),
      file,
      fileContent,
      words;

  (function init() {
    if (!validArguments(args)) { return; }

    words = args.slice(0, args.length - 1);
    file = args[args.length - 1];
    readFile(file);
  })();

  function validArguments(args) {
    var min = 2;
    if (args.length < min) {
      console.error('ERROR: You need to inform at least 2 arguments');
      return false;
    }

    return true;
  }

  function readFile(file) {
    var fs = require('fs');
    fs.readFile(file, 'utf8', onFileRead);
  }

  function onFileRead(err, data) {
    if (err) {
      console.error('ERROR:', err);
      return;
    }

    fileContent = data.split('\n');

    search(words, fileContent);
  }

  function search(input, dictionary) {
    var phoneticSearch = require('../shared/phoneticSearch.js');
    var phoneticSearchItems = phoneticSearch(input, dictionary);
    for (var i = 0, len = phoneticSearchItems.length; i < len; i++) {
      console.log(phoneticSearchItems[i].word + ':', phoneticSearchItems[i].similar)
    }
  }

})(process);
