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
  let isPangram = false;
  const ALPHABET_ARRAY = "abcdefghijklmnoprstuwyzśćóźąęłńż".length;
  let normalizedData = sentence.toLocaleLowerCase().match(/[a-zśćóźąęłńż]/g);
  let storageChar = {};

  normalizedData.forEach((char) => {
    if (char in storageChar) {
      storageChar[char] = storageChar[char] + 1;
    } else {
      storageChar[char] = 1;
    }
  });

  if (ALPHABET_ARRAY == Object.keys(storageChar).length) {
    isPangram = true;
  }

  for (const key in storageChar) {
    if (storageChar[key] > 1) {
      console.log(`Litera ${key} występuje ${storageChar[key]} razy`);
    }
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

verify(isPangram("test !"), false);
verify(isPangram("Dość gróźb fuzją, klnę, pych i małżeństw!"), true);
verify(isPangram("Dość gróźb fuzją, klnę, pych i małże!"), false);
