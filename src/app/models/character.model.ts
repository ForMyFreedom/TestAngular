export class Character{
  public id: number;
  public name: string;
  public resourceURI: string;
  public thumbnail: any;

  constructor(id: number, name: string, resourceURI: string, thumbnailURL: string) {
    this.id = id;
    this.name = name;
    this.resourceURI = resourceURI;
    this.thumbnail = thumbnailURL;
  }
}
