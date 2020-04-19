/*
* Opanuj JavaScript - Przeprogramowani.pl
* I. Fundamenty języka JavaScript
*
* Ćwiczenie 2 - "Walidacja"
*/

/*
* Cel zadania
*------------
* Zaimplementuj funkcję, która sprawdzi, czy przekazane hasło spełnia określone warunki:
*
* a) Ma długość od 3 do 10 znaków
* b) Zawiera jeden ze znaków specjalnych - !, @ lub #
* c) Zawiera cyfrę
*
* Przykład:
* validatePassword('test') // => false
* validatePassword('test11!') // => true
*/

/*
* Punkty dodatkowe
*-----------------
* Funkcja powinna weryfikować, czy przekazany parametr jest typu string. Jeśli parametr nie
* spełnia tego warunku, funkcja powinna rzucić wyjątek.
*/

function validatePassword(password) {
  if (typeof password !== 'string') throw new TypeError(`Podana wartość "${password}" nie jest stringiem!`);
  const validationResult = new RegExp('(?=.*[0-9])(?=.*[!@#]).{3,10}$');

  return validationResult.test(password);
}

/* Weryfikacja */

function verify(input, goal) {
  if (input === goal) {
    console.log('Gratulacje!');
  } else {
    console.log(`Niestety, oczekiwano - ${goal}, otrzymano - ${input}`);
  }
}

verify(validatePassword(''), false);
verify(validatePassword('lol'), false);
verify(validatePassword('ToDziala1#'), true);

// Obsługa błedów
console.log('\nobsługa błędów:\n');

try {
  validatePassword(123);
} catch (e) {
  console.log(e.message);
}

try {
  validatePassword([1, 'a']);
} catch (e) {
  console.log(e.message);
}
