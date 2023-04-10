import { GetDataInterface } from "./get-data-interface";

export class Consumer{
  constructor(private provider: GetDataInterface) {
  }

  getConsumerData(){
    return this.provider.getData();
  }
}
