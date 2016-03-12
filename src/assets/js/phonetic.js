var PhoneticSearch = (function() {

  return function(input, dictionary) {
    init(input, dictionary);
  }

  function init(input, dictionary) {
    var inputPhoneticArray = getPhoneticArray(input);
    var dictPhoneticArray = getPhoneticArray(dictionary);

    inputPhoneticArray.map(function(inputItem) {
      inputItem.similar = dictPhoneticArray.filter(function(dictItem) {
        return inputItem.phonetic === dictItem.phonetic;
      }).map(function(dictItem) {
        return dictItem.word;
      }).join(', ');
      return inputItem;
    });

    for (var i = 0, len = inputPhoneticArray.length; i < len; i++) {
      console.log(inputPhoneticArray[i].word + ':', inputPhoneticArray[i].similar)
    }
  };

  function getPhoneticArray(arr) {
    return arr.map(function(item) {
      var phonetic = item;
      phonetic = removeNonAlphabeticChars(phonetic);
      phonetic = decapitalize(phonetic);
      phonetic = discardCharsAfterFirstChar(phonetic);
      phonetic = changeEquivalents(phonetic);
      phonetic = removeDuplicatedChars(phonetic);
      return {
        word: item,
        phonetic: phonetic
      };
    });
  }

  function getPhoneticSimilarItems(inputArr, dictArr) {
    inputArr.map(function(inputItem) {
      inputItem.similar = dictArr.filter(function(dictItem) {
        return inputItem.phonetic === dictItem.phonetic;
      }).map(function(dictItem) {
        return dictItem.word;
      }).join(', ');
      return inputItem;
    });
  }

  function removeNonAlphabeticChars(str) {
    var pattern = /[^a-z\s]/gi;
    str = str.replace(pattern, '');
    return str;
  }

  function decapitalize(str) {
    str = str.toLowerCase();
    return str;
  }

  function discardCharsAfterFirstChar(str) {
    var pattern = /A|E|I|H|O|U|W|Y/gi;
    var firstLetter = str.substring(0, 1);
    str = str.substring(1).replace(pattern, '');
    return firstLetter + str;
  }

  function changeEquivalents(str) {
    str = str.replace(/A|E|I|O|U/gi, 'A');
    str = str.replace(/C|G|J|K|Q|S|X|Y|Z/gi, 'C');
    str = str.replace(/B|F|P|V|W/gi, 'B');
    str = str.replace(/D|T/gi, 'D');
    str = str.replace(/M|N/gi, 'M');
    str = str.replace(/R/gi, 'R');
    str = str.replace(/L/gi, 'L');
    return str;
  }

  function removeDuplicatedChars(str) {
    str = str.replace(/(.)(?=.*\1)/g, '');
    return str;
  }
})();
