import chalk from "chalk";
import readline from "readline";

import { ChalkTable } from "../utils/chalkTable.js";
import { DictionaryRepository } from "../repositories/dictionaryRepository.js";

export class DictionaryController {
  constructor() {}

  async findRandomWords() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const repository = new DictionaryRepository();

    const words = await repository.findRandomWords();

    rl.question(
      chalk.yellow("How many words do you want to learn? "),
      async (answer) => {
        const randomWords = [];

        for (let index = 0; index < Number(answer); index++) {
          randomWords.push(words[Math.floor(Math.random() * words.length)]);
        }

        const parsedWords = randomWords.map((obj) => {
          switch (obj.rate) {
            case "LOW":
              return { ...obj, rate: chalk.red(obj.rate) };
            case "MEDIUM":
              return { ...obj, rate: chalk.yellow(obj.rate) };
            case "HIGH":
              return { ...obj, rate: chalk.green(obj.rate) };
          }
        });

        const chalkOptions = {
          leftPad: 2,
          columns: [
            { field: "id", name: chalk.cyan("Id") },
            { field: "word", name: chalk.cyan("Word") },
            { field: "rate", name: chalk.cyan("Rate") },
          ],
        };

        ChalkTable.Print(parsedWords, chalkOptions);

        rl.close();
      }
    );
  }

  async findRandomWordsByRate() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      chalk.yellow("Which rate do you want to learn LOW/MEDIUM/HIGH? "),
      async (answer) => {
        const repository = new DictionaryRepository();

        const result = await repository.findRandomWordsByRate(
          answer.toUpperCase()
        );

        const chalkOptions = {
          columns: [
            { field: "id", name: chalk.cyan("Id") },
            { field: "word", name: chalk.cyan("Word") },
            { field: "rate", name: chalk.cyan("Rate") },
          ],
        };

        console.clear();

        ChalkTable.Print(result, chalkOptions);

        rl.close();
      }
    );
  }

  async changeWordRate() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      chalk.yellow("What is the id of the word you want to change? "),
      async (answer) => {
        const repository = new DictionaryRepository();

        const wordId = Number(answer);

        const findWord = await repository.findWordById(wordId);

        const chalkOptions = {
          columns: [
            { field: "id", name: chalk.cyan("Id") },
            { field: "word", name: chalk.cyan("Word") },
            { field: "rate", name: chalk.cyan("Rate") },
          ],
        };

        console.clear();

        ChalkTable.Print(findWord, chalkOptions);

        rl.question(
          chalk.yellow("\nWhat is the new rate LOW/MEDIUM/HIGH? "),
          async (answer) => {
            await repository.changeWordRate(wordId, answer.toUpperCase());

            console.clear();

            console.log(chalk.greenBright("\nWord rate changed successfully!"));

            rl.close();
          }
        );
      }
    );
  }
}
