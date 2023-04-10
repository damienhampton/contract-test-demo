import sinon from "sinon";
import { expect } from "chai";

export class Expectation<T> {
  public value: any = undefined;

  constructor(public method: keyof T,
  public stub: sinon.SinonStub,
  public args?: any){
  }
  returns(value: any){
    this.value = value;
    this.stub.returns(value);
  }
}

export class ContractTest<T> {
  private expectations: Expectation<T>[] = [];

  expects(method: keyof T, args?: any) {
    const expectation = new Expectation( method, sinon.stub(), args);
    this.expectations.push(expectation);
    return expectation;
  }
  createProvider(): T {
    const provider = {} as any;
    this.expectations.forEach(expectation => {
      provider[expectation.method] = expectation.stub;
    })
    return provider as T;
  }
  verifyConsumer(){
    this.expectations.forEach(
      expectation => {
        if (expectation.args) {
          expect(expectation.stub.calledWith(expectation.args), `${expectation.method.toString()} was not called with ${expectation.args}`).to.be.true;
        }else{
          expect(expectation.stub.called, `${expectation.method.toString()} was not called`).to.be.true;
        }
      }
    )
  }
  verifyProvider(provider: T) {
    this.expectations.forEach(expectation => {
      const func = provider[expectation.method] as (a: any) => any;
      expect(func(expectation.args)).to.equal(expectation.value);
    })
  }
}
