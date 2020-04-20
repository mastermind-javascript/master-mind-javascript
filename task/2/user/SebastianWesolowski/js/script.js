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
  let passworsIsValid = false;

  if (typeof password !== "string") {
    return passworsIsValid;
  }

  specialCharArr = ["!", "@", "#"];
  specialCharArrIsValid = false;

  specialCharArr.forEach((char) => {
    if (password.split("").find((el) => el === char)) {
      specialCharArrIsValid = true;
    }
  });

  if (password.length >= 3 && password.length <= 10 && specialCharArrIsValid) {
    passworsIsValid = true;
  }

  return passworsIsValid;
}

/* Weryfikacja */

function verify(input, goal) {
  if (input === goal) {
    console.log("Gratulacje!");
  } else {
    console.log(`Niestety, oczekiwano - ${goal}, otrzymano - ${input}`);
  }
}

verify(validatePassword(""), false);
verify(validatePassword("lol"), false);
verify(validatePassword("ToDziala1#"), true);
verify(validatePassword(122), false);
