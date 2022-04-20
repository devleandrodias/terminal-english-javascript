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
}
