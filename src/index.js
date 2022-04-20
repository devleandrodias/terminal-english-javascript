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
  ];

  new Terminal(options).init();
})();
