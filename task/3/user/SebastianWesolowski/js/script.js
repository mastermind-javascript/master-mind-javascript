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
  [...arguments].forEach((element) => {
    if (typeof element !== "number") {
      throw new Error(`${element} it isn't number type`);
    }
  });

  first = String(first).split("");
  second = String(second).split("");
  let storageArr = [];

  while (first.length + second.length !== 0) {
    storageArr.push(first.shift());
    storageArr.push(second.shift());
  }

  return storageArr.filter(Boolean).join("");
}

/* Weryfikacja */

function verify(input, goal) {
  if (input === goal) {
    console.log("Gratulacje!");
  } else {
    console.log(`Niestety, oczekiwano - ${goal}, otrzymano - ${input}`);
  }
}

verify(zipIt(111, 222), "121212");
verify(zipIt(123, 456), "142536");
verify(zipIt(12, "11s"), "152555");
verify(zipIt(12, 5555), "152555");
