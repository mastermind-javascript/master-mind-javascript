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

  first = ('' + first).split('');
  second = ('' + second).split('');

  let n = first.length + second.length;
  let arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(first[i]);
    arr.push(second[i]);
  }

  arr = arr.join('');

  return arr;
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