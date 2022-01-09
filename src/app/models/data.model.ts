import { Character } from "./character.model";

export class Data{
  public offset: number;
  public limit: number;
  public total: number;
  public count: number;
  public results: Array<Character>;

  constructor(offset: number, limit:number, total:number, count:number, results:Array<Character>) {
    this.offset = offset;
    this.limit = limit;;
    this.total = total;
    this.count = count;
    this.results = results;
  }
}
