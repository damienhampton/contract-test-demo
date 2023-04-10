import { Consumer } from "./consumer";
import { Provider } from "./provider";

const provider = new Provider();
const consumer = new Consumer(provider);

console.log(consumer.getConsumerData());
