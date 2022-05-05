import chalk from "chalk";
import readline from "readline";
import convert from "number-to-words";

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export class ElementaryController {
  learnNumbers() {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(
      chalk.yellow("What is the range of numbers? "),
      async (range) => {
        const rangeOfNumbers = range.split(" ").map((number) => Number(number));
        const [min, max] = rangeOfNumbers;
        const randomNumber = getRandomInt(min, max);

        console.clear();
        rl.question(
          chalk.yellow(`How do you say ${randomNumber} in English? `),
          async (answer) => {
            const convertedNumber = convert.toWords(randomNumber);
            if (answer.toLocaleUpperCase() === convertedNumber.toUpperCase()) {
              console.clear();
              console.log(chalk.green("\nPerfect! The answer is correct!"));
            } else {
              console.log(chalk.red("\nSorry, the answer is incorrect!\n"));
              console.log(
                `${chalk.gray("The corret answer is")} ${chalk.green(
                  convertedNumber.toUpperCase()
                )}`
              );
            }

            rl.close();
          }
        );
      }
    );
  }
}
