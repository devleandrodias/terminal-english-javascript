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
      chalk.yellow("Which rate do you want to learn [LOW - MEDIUM - HIGH] "),
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

  async findRandomWordsByLength() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(chalk.yellow("What is the word length? "), async (answer) => {
      const repository = new DictionaryRepository();

      const words = await repository.findAllWords();

      const filteredWords = words.filter(
        ({ word }) => word.length === Number(answer)
      );

      const parsedWords = filteredWords.map((obj) => {
        switch (obj.rate) {
          case "LOW":
            return { ...obj, rate: chalk.red(obj.rate) };
          case "NEW WORD":
            return { ...obj, rate: chalk.magenta(obj.rate) };
          case "MEDIUM":
            return { ...obj, rate: chalk.yellow(obj.rate) };
          case "HIGH":
            return { ...obj, rate: chalk.green(obj.rate) };
        }
      });

      const chalkOptions = {
        columns: [
          { field: "id", name: chalk.cyan("Id") },
          { field: "word", name: chalk.cyan("Word") },
          { field: "rate", name: chalk.cyan("Rate") },
        ],
      };

      console.clear();

      ChalkTable.Print(parsedWords, chalkOptions);

      rl.close();
    });
  }

  async findWordByName() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    const repository = new DictionaryRepository();

    rl.question(
      chalk.yellow("What is the word you want to find? "),
      async (answer) => {
        const word = await repository.findWordByName(answer);

        const parsedWords = word.map((obj) => {
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
          columns: [
            { field: "id", name: chalk.cyan("Id") },
            { field: "word", name: chalk.cyan("Word") },
            { field: "rate", name: chalk.cyan("Rate") },
          ],
        };

        console.clear();

        ChalkTable.Print(parsedWords, chalkOptions);

        rl.question(
          chalk.yellow("Do you want to change the rate? (y/n) "),
          async (yesOrNo) => {
            if (yesOrNo.toUpperCase() === "Y") {
              const wordId = word[0].id;

              rl.question(
                chalk.yellow(
                  "\nWhat is the new rate [LOW - NEW WORD - MEDIUM - HIGH] "
                ),
                async (rate) => {
                  await repository.changeWordRate(wordId, rate.toUpperCase());

                  console.clear();

                  console.log(
                    chalk.greenBright("\nWord rate changed successfully!")
                  );

                  rl.close();
                }
              );
            } else {
              rl.close();
            }
          }
        );
      }
    );
  }

  async reportByRate() {
    const repository = new DictionaryRepository();

    const words = await repository.findAllWords();

    const numberOfWordsLow = words.filter((word) => word.rate === "LOW").length;

    const numberOfWordsNewWords = words.filter(
      (word) => word.rate === "NEW WORD"
    ).length;

    const numberOfWordsMedium = words.filter(
      (word) => word.rate === "MEDIUM"
    ).length;

    const numberOfWordsHigh = words.filter(
      (word) => word.rate === "HIGH"
    ).length;

    const totalWords = words.length;

    var formatter = new Intl.NumberFormat("en-US", {
      style: "percent",
      minimumIntegerDigits: 2,
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const report = [
      {
        rate: "LOW",
        numberOfWords: numberOfWordsLow,
        percentage: formatter.format(
          (numberOfWordsLow * 100) / totalWords / 100
        ),
      },
      {
        rate: "NEW WORD",
        numberOfWords: numberOfWordsNewWords,
        percentage: formatter.format(
          (numberOfWordsNewWords * 100) / totalWords / 100
        ),
      },
      {
        rate: "MEDIUM",
        numberOfWords: numberOfWordsMedium,
        percentage: formatter.format(
          (numberOfWordsMedium * 100) / totalWords / 100
        ),
      },
      {
        rate: "HIGH",
        numberOfWords: numberOfWordsHigh,
        percentage: formatter.format(
          (numberOfWordsHigh * 100) / totalWords / 100
        ),
      },
    ];

    const chalkOptions = {
      columns: [
        { field: "rate", name: chalk.cyan("Rate") },
        { field: "numberOfWords", name: chalk.cyan("Number of Words") },
        { field: "percentage", name: chalk.cyan("Percentage") },
      ],
    };

    console.clear();

    ChalkTable.Print(report, chalkOptions);
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
