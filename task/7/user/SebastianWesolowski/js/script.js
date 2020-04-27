/*
 * Opanuj JavaScript - Przeprogramowani.pl
 * I. Fundamenty języka JavaScript
 *
 * Ćwiczenie 7 - "Emoji"
 */

/*
 * Cel zadania
 *------------
 * Zaimplementuj funkcję "useEmoji", która zastąpi wszystkie słowa danego parametru zgodnie
 * z mapowaniem z obiektu "emojiMappings";
 *
 * Przykład:
 * useEmoji('Takiemu zachowaniu mówię stop i to mocny stop!') // => 'Takiemu zachowaniu mówię 🚫 i to mocny 🚫!'
 * useEmoji('Jadę po nowy samochód :D') // => 'Jadę po nowy 🏎 :D'
 */

const emojiMappings = {
  stop: "🚫",
  gwiazda: "⭐️",
  samochód: "🏎",
  buduję: "🧱",
  budzik: "⏰",
};

function useEmoji(input) {
  console.log(input.split(" ").map((element) => element));

  let mappingInput = input
    .split(" ")
    .map((element) => {
      for (const property in emojiMappings) {
        if (element.toLowerCase().indexOf(property) == 0) {
          return element
            .toLowerCase()
            .replace(property, emojiMappings[property]);
        }
      }
      return element;
    })
    .join(" ");
  return mappingInput;
}

/* Weryfikacja */

function verify(input, goal) {
  if (input === goal) {
    console.log("Gratulacje!");
  } else {
    console.log(`Niestety, oczekiwano - ${goal}, otrzymano - ${input}`);
  }
}

verify(useEmoji("stop i to mocny stop!"), "🚫 i to mocny 🚫!");
// verify(
//   useEmoji("Takiemu zachowaniu mówię Stop i to mocny stop!"),
//   "Takiemu zachowaniu mówię 🚫 i to mocny 🚫!"
// );
// verify(
//   useEmoji("Takiemu zachowaniu mówię stop i to mocny stop!"),
//   "Takiemu zachowaniu mówię 🚫 i to mocny 🚫!"
// );
// verify(useEmoji("Jadę po nowy samochód :D"), "Jadę po nowy 🏎 :D");
// verify(
//   useEmoji("Właśnie buduję swoje skille w JS"),
//   "Właśnie 🧱 swoje skille w JS"
// );
