/*
 * Opanuj JavaScript - Przeprogramowani.pl
 * I. Fundamenty języka JavaScript
 *
 * Ćwiczenie 5 - "Pangram"
 */

/*
 * Cel zadania
 *------------
 * Zaimplementuj funkcję, która sprawdzi, czy podany parametr to tzw. pangram.
 *
 * Pangram to możliwe do zrozumienia zdanie wykorzystujące wszystkie litery danego alfabetu.
 *
 *
 * Przykład:
 *
 * isPangram('test') // => false
 * isPangram('Dość gróźb fuzją, klnę, pych i małżeństw!') // => true
 */

/*
 * Punkty dodatkowe
 *-----------------
 * Zweryfikuj, czy konkretna litera występuje w podanym zdaniu tylko jeden raz.
 */

function isPangram(sentence) {
  const alphabetArray = "abcdefghijklmnoprstuwyzśćóźąęłńż".split("");
  let isPangram = false;
  let normalizeData = sentence.split("").map((el) => el.toLocaleLowerCase());
  let countUniqeChar = 0;

  function isCharExist() {
    let storage = [];
    return (char) => {
      if (storage.includes(char)) {
        return storage;
      }
      storage.push(char);

      return storage;
    };
  }

  const checkChar = isCharExist();

  alphabetArray.forEach((char) => {
    if (normalizeData.find((el) => el === char)) {
      countUniqeChar = checkChar(char.toLocaleLowerCase());
    }
  });

  if (alphabetArray.length == countUniqeChar.length) {
    isPangram = true;
  }
  return isPangram;
}

/* Weryfikacja */

function verify(input, goal) {
  if (input === goal) {
    console.log("Gratulacje!");
  } else {
    console.log(`Niestety, oczekiwano - ${goal}, otrzymano - ${input}`);
  }
}

verify(isPangram("test"), false);
verify(isPangram("Dość gróźb fuzją, klnę, pych i małżeństw!"), true);
verify(isPangram("Dość gróźb fuzją, klnę, pych i małże!"), false);
