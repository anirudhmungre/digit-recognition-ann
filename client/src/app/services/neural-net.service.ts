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

  constructor(private socket: Socket) {
    this.socketSetup();
  }

  private socketSetup(): void {
    this.confirmation = this.socket.fromEvent<{success: boolean}>("connected");
    this.epoch = this.socket.fromEvent<{data: Epoch, success: boolean}>("epoch");
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
}
