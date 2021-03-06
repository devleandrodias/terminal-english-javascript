import chalk from "chalk";
import readline from "readline";

export class Terminal {
  constructor(options) {
    this.options = options;

    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  generateCustomHeader(limit) {
    let customHeader = [];

    for (let index = 0; index < limit; index++) {
      if (index % 2 === 0) {
        customHeader.push(chalk.red("*"));
      } else {
        customHeader.push(chalk.white("="));
      }
    }

    return customHeader.join("");
  }

  showTerminalOptions() {
    const header = this.generateCustomHeader(20);

    console.log(`${header} ${chalk.white("LEARN ENGLISH")} ${header}\n`);

    this.options.map((op, i) => console.log(chalk.white(`${i} - ${op.title}`)));

    console.log(`\n${this.generateCustomHeader(55)}`);

    this.rl.question(
      chalk.yellow("\nWhat do you learn today? "),
      async (answer) => {
        console.clear();

        const option = parseInt(answer);

        if (option === 0) this.rl.close();

        this.rl.close();

        if (option > this.options.length) {
          console.log(chalk.red("Sorry, the option is not available!"));
          this.rl.close();
        } else {
          this.options[option].fn();
        }
      }
    );
  }

  init() {
    console.clear();
    this.showTerminalOptions();
    return this.rl;
  }
}
