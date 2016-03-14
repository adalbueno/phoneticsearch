(function onInitApp($, PhoneticSearch, window) {
  var $words,
      $form,
      $error,
      $success,
      file = '/assets/data/word_dict.txt',
      fileContent,
      words;

  $(document).ready(init);

  function init() {
    cacheDomElements();
    $form.on('submit', onFormSubmitHandler);
  }

  function cacheDomElements() {
    $words = $('#words');
    $form = $('#frm');
    $error = $('#error');
    $success = $('#success');
  }

  function onFormSubmitHandler(e) {
    e.preventDefault();
    words = $words.val().split(' ').filter(function(item) {
      return item.length > 0;
    });
    if (!validArguments(words)) { return; }
    readFile(file);
  }

  function validArguments(args) {
    var min = 1;
    if (args.length < min) {
      setError('Error: You need to inform at least 1 word');
      return false;
    }

    return true;
  }

  function readFile(file) {
    $.ajax(file).done(onFileReadSuccess)
                .error(onFileReadError)
  }

  function onFileReadSuccess(data) {
    fileContent = data.split('\n');
    search(words, fileContent);
  }

  function onFileReadError(error) {
    setError('ERROR: File not found!');
  }

  function search(input, dictionary) {
    try {
      var phoneticSearchItems = PhoneticSearch(input, dictionary);
      setSuccess(phoneticSearchItems);
    } catch (e) {
     setError(e);
    }
  }

  function setSuccess(phoneticSearchItems) {
    var message = '';
    for (var i = 0, len = phoneticSearchItems.length; i < len; i++) {
      message += '<dt>' + phoneticSearchItems[i].word + ':</dt>';
      message += '<dd>' + (phoneticSearchItems[i].similar.length ? phoneticSearchItems[i].similar : 'No similar items found') + '</dd>'
    }

    $form.hide();
    $success.html('<dl>' + message + '</dl>');
    $success.show();
  }

  function setError(message) {
    $error.html(message);
  }

})(window.jQuery, window.PhoneticSearch);
