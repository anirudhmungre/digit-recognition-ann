import { TestBed } from "@angular/core/testing";

import { NeuralNetService } from "./neural-net.service";

describe("NeuralNetService", () => {
  let service: NeuralNetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NeuralNetService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
