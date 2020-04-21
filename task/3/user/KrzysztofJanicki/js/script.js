/*
* Opanuj JavaScript - Przeprogramowani.pl
* I. Fundamenty języka JavaScript
*
* Ćwiczenie 3 - "Przeplatanie"
*/

/*
* Cel zadania
*------------
* Zaimplementuj funkcję, która dla dwóch podanych parametrów wykona "przeplatanie"
* - używając kolejnych cyfr parametrów połączy je w jeden string.
*
* Przykład:
* zipIt(111, 222) // => '121212'
* zipIt(123, 456) // => '142536'
* zipIt(12, 5555) // => '152555'
*/

/*
* Punkty dodatkowe
*-----------------
* Funkcja powinna weryfikować, czy przekazane parametry są typu number. Jeśli parametry nie
* spełniają tego warunku, funkcja powinna rzucić wyjątek.
*/

function zipIt(first, second) {
  if (typeof first !== 'number' || typeof second !== 'number') throw new TypeError('Wprowadzone wartości nie są typu number');
  const result = [];

  for (let i = 0; i < Math.max(first.toString().length, second.toString().length); i++) {
    result.push(first.toString()[i], second.toString()[i]);
  }

  return result.join('');
}

/* Weryfikacja */

function verify(input, goal) {
  if (input === goal) {
    console.log('Gratulacje!');
  } else {
    console.log(`Niestety, oczekiwano - ${goal}, otrzymano - ${input}`);
  }
}

verify(zipIt(111, 222), '121212');
verify(zipIt(123, 456), '142536');
verify(zipIt(12, 5555), '152555');

// Obsługa błedów
console.log('\nObsługa błędu\n');

try {
  zipIt([1, 2], '123');
} catch (e) {
  console.log(e.message);
}

try {
  zipIt(111, 'aaa');
} catch (e) {
  console.log(e.message);
}
