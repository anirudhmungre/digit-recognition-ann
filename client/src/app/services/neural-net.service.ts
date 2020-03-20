import { Injectable } from "@angular/core";
import {Socket} from "ngx-socket-io";
import {Observable} from "rxjs";
import {Epoch} from "../types/training";

@Injectable({
  providedIn: "root"
})
export class NeuralNetService {

  confirmation: Observable<{success: boolean}>;
  epoch: Observable<{data: Epoch, success: boolean}>;
  prediction: Observable<Array<number>>;

  constructor(private socket: Socket) {
    this.socketSetup();
  }

  private socketSetup(): void {
    this.confirmation = this.socket.fromEvent<{success: boolean}>("connected");
    this.epoch = this.socket.fromEvent<{data: Epoch, success: boolean}>("epoch");
    this.prediction = this.socket.fromEvent<Array<number>>("prediction");
  }

  connect(): void {
    this.socket.connect();
    this.socketSetup();
  }

  disconnect(): void {
    this.socket.disconnect();
  }

  train(inputSize: number, layerSizes: Array<number>): void {
    this.socket.emit("train", {inputSize, layerSizes});
  }

  pauseTraining(): void {
    this.socket.emit("pause");
  }

  predict(inputs: Array<number>) {
    this.socket.emit("predict", inputs);
  }
}
