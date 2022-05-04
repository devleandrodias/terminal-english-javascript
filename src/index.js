import { Terminal } from "./services/terminal.js";
import { GrammarController } from "./controllers/grammarController.js";
import { DictionaryController } from "./controllers/dictionaryController.js";

(async () => {
  const grammarController = new GrammarController();
  const dictionaryController = new DictionaryController();

  const options = [
    {
      title: "Exit",
      fn: () => process.exit(0),
    },
    {
      title: "Learn random words",
      fn: dictionaryController.findRandomWords,
    },
    {
      title: "Learn random words by rate",
      fn: dictionaryController.findRandomWordsByRate,
    },
    {
      title: "Learn random words by length",
      fn: dictionaryController.findRandomWordsByLength,
    },
    {
      title: "Change rate of a word",
      fn: dictionaryController.changeWordRate,
    },
    {
      title: "Find word by name",
      fn: dictionaryController.findWordByName,
    },
    {
      title: "Learn pronouns",
      fn: grammarController.learnPronouns,
    },
    {
      title: "Report of words",
      fn: dictionaryController.reportByRate,
    },
  ];

  new Terminal(options).init();
})();
