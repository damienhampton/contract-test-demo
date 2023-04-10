import { GetDataInterface } from "./get-data-interface";

export class Provider implements GetDataInterface{
  getData(): number {
    return 10;
  }
}
