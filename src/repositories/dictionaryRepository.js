import { File } from "../utils/file.js";

export class DictionaryRepository {
  constructor() {}

  async findRandomWords() {
    return File.ReadFileFromJsonFile("dictionary.json");
  }
}
