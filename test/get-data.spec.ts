import { ContractTest } from "./contract-test";
import { Provider} from "../src/provider";
import { Consumer } from "../src/consumer";
import { GetDataInterface } from "../src/get-data-interface";
import { BadProvider } from "../src/bad-provider";

describe("getData contract", () => {
  const contract = new ContractTest<GetDataInterface>()
  contract.expects("getData").returns(10);

  context("consumer", () => {
    it("should use contract correctly", () => {
      const mockProvider = contract.createProvider();
      const consumer = new Consumer(mockProvider);
      consumer.getConsumerData();
      contract.verifyConsumer();
    })
  })

  context("provider", () => {
    it("should satisfy contract", () => {
      const provider = new Provider();
      contract.verifyProvider(provider);
    })
  })

  context("bad provider", () => {
    it("should satisfy contract (but won't)", () => {
      const badProvider = new BadProvider();
      contract.verifyProvider(badProvider);
    })
  })
})
