import { File } from "../utils/file.js";

export class DictionaryRepository {
  constructor() {}

  async findRandomWords() {
    return File.ReadFileFromJsonFile("dictionary.json");
  }

  async findRandomWordsByRate(rate) {
    const words = await File.ReadFileFromJsonFile("dictionary.json");
    return words.filter((x) => x.rate === rate);
  }

  async findWordById(id) {
    const words = await File.ReadFileFromJsonFile("dictionary.json");
    return words.filter((x) => x.id === id);
  }

  async changeWordRate(id, rate) {
    const words = await File.ReadFileFromJsonFile("dictionary.json");
    const index = words.findIndex((x) => x.id === id);
    words[index].rate = rate;
    await File.WriteFileToJsonFile("dictionary.json", words);
  }
}
