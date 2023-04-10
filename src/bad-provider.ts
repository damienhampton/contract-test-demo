import { GetDataInterface } from "./get-data-interface";

export class BadProvider implements GetDataInterface{
  getData(): number {
    return 13;
  }
}
