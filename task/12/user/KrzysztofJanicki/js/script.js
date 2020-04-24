/*
* Opanuj JavaScript - Przeprogramowani.pl
* I. Fundamenty języka JavaScript
*
* Ćwiczenie 12 - "Mr. Elliot"
*/

/*
* Cel zadania
*------------
* Zaimplementuj funkcję zmieniającą tekst na pozdrowienia od Mr. Elliota, według przykładu.
*
*
* Przykład:
* greetings('hacker'); // => 'H4Ck3r'
* greeting('Control Is An Illusion'); // => 'C0NtR0L 15 4N 1lLu510n'
* greeting('Saving The World'); // => 'S4V1Ng tHe w0rLd'
* 
*/

const wordsMapping = {
    'a': '4',
    'e': '3',
    'o': '0',
    'i': '1',
    's': '5'
}

const even = number => (number % 2 === 0) ? true : false;
const greeting = message => {
    const result = message.toLowerCase().split('');
    for (let i in result) {
        if (wordsMapping.hasOwnProperty(result[i])) {
            result[i] = wordsMapping[result[i]];
        }
        if (even(i)) result[i] = result[i].toUpperCase();
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

verify(greeting('hacker'), 'H4Ck3r');
verify(greeting('Control Is An Illusion'), 'C0NtR0L 15 4N 1lLu510n');
verify(greeting('Saving The World'), '54V1Ng tH3 w0rLd');