/*
* Opanuj JavaScript - Przeprogramowani.pl
* I. Fundamenty języka JavaScript
*
* Ćwiczenie 13 - "Izogram"
*/

/*
* Cel zadania
*------------
* Zaimplementuj funkcję sprawdzającą czy podane słowo jest izogramem, czyli słowem w którym każda litera występuje tylko jeden raz.
*
*
* Przykład:
* isogram('Izogram'); // => true
* isogram('Przeprogramowani'); // => false
* 
*/

const isogram = word => {
    const letters = {};
    word.toLowerCase().split('').forEach((letter) => {
        if (letters.hasOwnProperty(letter)) {
            letters[letter]++;
        } else {
            letters[letter] = 1;
        }
    });

    return (Math.max(...Object.values(letters)) === 1) ? true : false;
}

/* Weryfikacja */

function verify(input, goal) {
    if (input === goal) {
        console.log('Gratulacje!');
    } else {
        console.log(`Niestety, oczekiwano - ${goal}, otrzymano - ${input}`);
    }
}

verify(isogram('izogram'), true);
verify(isogram('Przeprogramowani'), false);
verify(isogram('SprawdzAm'), false);