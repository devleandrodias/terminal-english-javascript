import chalkTable from "chalk-table";

export class ChalkTable {
  static Print(data, options = {}) {
    console.log(chalkTable(options, data));
  }
}
