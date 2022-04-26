import { Terminal } from "./services/terminal.js";
import { DictionaryController } from "./controllers/dictionaryController.js";

(async () => {
  const dictionaryController = new DictionaryController();

  const options = [
    {
      id: 1,
      title: "Learn random words",
      fn: dictionaryController.findRandomWords,
    },
    {
      id: 2,
      title: "Learn random words by rate",
      fn: dictionaryController.findRandomWordsByRate,
    },
    {
      id: 3,
      title: "Change rate of a word",
      fn: dictionaryController.changeWordRate,
    },
  ];

  new Terminal(options).init();
})();
