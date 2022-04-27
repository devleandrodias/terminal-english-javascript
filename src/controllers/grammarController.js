import chalk from "chalk";
import { ChalkTable } from "../utils/chalkTable.js";

export class GrammarController {
  learnPronouns() {
    const pronouns = [
      {
        subjectPronoun: "I",
        objectPronoun: "Me",
        possessiveAdjective: "My",
        possessivePronoun: "Mine",
        reflexivePronoun: "Myself",
      },
      {
        subjectPronoun: "You",
        objectPronoun: "You",
        possessiveAdjective: "Your",
        possessivePronoun: "Yours",
        reflexivePronoun: "Yourself",
      },
      {
        subjectPronoun: "He",
        objectPronoun: "Him",
        possessiveAdjective: "His",
        possessivePronoun: "His",
        reflexivePronoun: "Himself",
      },
      {
        subjectPronoun: "She",
        objectPronoun: "Her",
        possessiveAdjective: "Her",
        possessivePronoun: "Hers",
        reflexivePronoun: "Herself",
      },
      {
        subjectPronoun: "It",
        objectPronoun: "It",
        possessiveAdjective: "Its",
        possessivePronoun: "Its",
        reflexivePronoun: "Itself",
      },
      {
        subjectPronoun: "We",
        objectPronoun: "Us",
        possessiveAdjective: "Our",
        possessivePronoun: "Ours",
        reflexivePronoun: "Ourselves",
      },
      {
        subjectPronoun: "You",
        objectPronoun: "You",
        possessiveAdjective: "Your",
        possessivePronoun: "Yours",
        reflexivePronoun: "Yourself",
      },
      {
        subjectPronoun: "They",
        objectPronoun: "Them",
        possessiveAdjective: "Their",
        possessivePronoun: "Theirs",
        reflexivePronoun: "Themselves",
      },
    ];

    const chalkOptions = {
      columns: [
        { field: "subjectPronoun", name: chalk.cyan("Subject pronoun") },
        { field: "objectPronoun", name: chalk.cyan("Object pronoun") },
        {
          field: "possessiveAdjective",
          name: chalk.cyan("Possessive adjective"),
        },
        {
          field: "possessivePronoun",
          name: chalk.cyan("Possessive pronoun"),
        },
        {
          field: "reflexivePronoun",
          name: chalk.cyan("Reflexive pronoun"),
        },
      ],
    };

    ChalkTable.Print(pronouns, chalkOptions);
  }
}
