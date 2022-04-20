import path from "path";
import fs from "fs/promises";

export class File {
  static async ReadFileFromJsonFile(fileName) {
    return JSON.parse(
      await fs.readFile(path.resolve("database", fileName), {
        encoding: "utf-8",
      })
    );
  }

  static async WriteFileToJsonFile(fileName, data) {
    return fs.writeFile(
      path.resolve("database", fileName),
      JSON.stringify(data)
    );
  }
}
