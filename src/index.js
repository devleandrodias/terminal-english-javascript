import fs from "fs/promises";
import readline from "readline";

import chalk from "chalk";
import chalkTable from "chalk-table";

function readFile(pathFile) {
  return fs.readFile(pathFile, {
    encoding: "utf-8",
  });
}

function parseFile(file) {
  const words = file.toString("utf-8").split("\n");
  return words.map((word, index) => ({
    id: index + 1,
    word,
    translation: `https://translate.google.com/?sl=en&tl=pt&text=${word}`,
  }));
}

function getRandomPosition(max) {
  return Math.floor(Math.random() * max);
}

function showWordsInTerminal(words, start = 0, limit = 50) {
  const options = {
    leftPad: 2,
    columns: [
      { field: "id", name: chalk.cyan("ID") },
      { field: "word", name: chalk.cyan("Word") },
    ],
  };

  const end = start + limit;

  return chalkTable(options, words.slice(start, end));
}

function showMenuOptions() {
  console.clear();

  console.log(chalk.cyan("============== LEARN ENGLISH ================\n"));

  ["Learn random words", "Read a list of words"].map((op, i) =>
    console.log(chalk.white(`${i + 1} - ${op}`))
  );

  console.log(chalk.cyan("\n============================================="));
}

async function main() {
  showMenuOptions();

  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question(chalk.yellow("\nWhat do you learn today? "), async (answer) => {
    const option = parseInt(answer);

    if (option >= 3) {
      console.log(chalk.red("\nYou choose an invalid option"));
      rl.close();
    }

    rl.close();

    switch (option) {
      case 1:
        {
          console.clear();

          const words = parseFile(await readFile("./files/words.txt"));

          const rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
          });

          rl.question(
            "\nHow many words do you want to learn? ",
            async (answer) => {
              const randomWords = [];

              for (let index = 0; index < Number(answer); index++) {
                randomWords.push(words[getRandomPosition(words.length)]);
              }

              console.log(chalkTable({}, randomWords));

              rl.close();
            }
          );
        }
        break;
      case 2:
        {
          const words = parseFile(await readFile("./files/words.txt"));
          console.log(showWordsInTerminal(words, 0, 100));
        }
        break;
    }
  });
}

main();
