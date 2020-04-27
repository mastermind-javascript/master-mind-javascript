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
  const regex = /[a-ząćęłńóśźż]/gi;
  let result;
  const polishLetters = 32; //litery w polskim

  if (typeof sentence === 'string') { //sprawdzam czy na wejściu jest sentence
    result = sentence.toLowerCase().match(regex);  //usunięcie dużych liter i przepisanie tablicy z wynikiem
    result.length // zwrocilby wartosc z powtorzeniami

  }
  else { // w innym wypadku...
    console.log('Sentencja nie jest typu string!'); //prymitywny błąd
    return false;   //przerwanie funkcji
  }

  const sizeOfResult = new Set(result).size; // przypisanie ilości znalezionych znaków (wyknik tablicy po metodzie match) !- znaki bez powtorzen -!
  pangramCheck = sizeOfResult === polishLetters; // zmienna pangramCheck zawiera bool który mówi o tym czy wynik jest równy ilości znaków w j.polskim

  if (pangramCheck !== true) {
    return pangramCheck;
  }
  else if (pangramCheck && result.length !== sizeOfResult) { // bool z znakami i przyrownanie czy powtarzaja sie znaki 
    console.log("LITERY SIĘ POWTÓRZYŁY!");
  }
  else {
    return pangramCheck;
  }
}

/* Weryfikacja */

function verify(input, goal) {
  if (input === goal) {
    console.log('Gratulacje!');
  } else {
    console.log(`Niestety, oczekiwano - ${goal}, otrzymano - ${input}`);
  }
}

verify(isPangram('test'), false);
verify(isPangram('Dość gróźb fuzją, klnę, pych i małżeństw!'), true);
verify(isPangram('Dość gróźb fuzją, klnę, pych i małże!'), false);
verify(isPangram('Pójdźże, kiń tę chmurność w głąb flaszy!'), true);
verify(isPangram(11), true);