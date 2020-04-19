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
  if (typeof sentence !== 'string') throw new Error('Podana wartość nie jest typu string!');
  const alphabetCheck = { a: 0, ą: 0, b: 0, c: 0, ć: 0, d: 0, e: 0, ę: 0, f: 0, g: 0, h: 0, i: 0, j: 0, k: 0, l: 0, ł: 0, m: 0, n: 0, ń: 0, o: 0, ó: 0, p: 0, r: 0, s: 0, ś: 0, t: 0, u: 0, w: 0, y: 0, z: 0, ź: 0, ż: 0 };
  sentence.toLowerCase().split('').forEach((letter) => {
    if (Object.keys(alphabetCheck).includes(letter)) alphabetCheck[letter]++;
  });

  return (Math.max(...Object.values(alphabetCheck)) < 2 && Math.min(...Object.values(alphabetCheck)) > 0) ? true : false;
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

console.log("\nObsługa błedu\n");

try {
  isPangram(123);
} catch (e) {
  console.log(e.message);
}
