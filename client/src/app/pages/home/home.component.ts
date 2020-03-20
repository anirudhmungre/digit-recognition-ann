import { Component, OnInit } from "@angular/core";
import {NeuralNetService} from "../../services/neural-net.service";
import {Subscription} from "rxjs";
import {Epoch} from "../../types/training";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"]
})
export class HomeComponent implements OnInit {

  paused: boolean;
  private subscription: Subscription;
  dimensions: {x: number, y: number};
  epochs: Array<Epoch>;

  constructor(private neuralNetService: NeuralNetService) {
    this.paused = true;
    this.dimensions = {x: 5, y: 9};
    this.epochs = [];
  }

  ngOnInit(): void {
    this.neuralNetService.confirmation.subscribe(data => {
      if (data.success) {
        console.log("Connected to socket!");
      } else {
        console.log("Something went wrong when connecting to socket!");
      }
    });
    this.neuralNetService.prediction.subscribe(data => {
      if (data) {
        const maxPredicted: number = Math.max(...data);
        const prediction: number = data.indexOf(maxPredicted);
        console.log(`Predicted: ${prediction}`);
      }
    });
  }

  get isSubscribed(): boolean {
    if (!this.subscription) {
      return false;
    }
    return !this.subscription.closed;
  }

  resetModel() {
    this.epochs = [];
    this.paused = true;
    this.subscription.unsubscribe();
    this.neuralNetService.disconnect();
  }

  trainNetwork() {
    this.paused = false;
    this.neuralNetService.connect();
    this.subscription = this.neuralNetService.epoch.subscribe(data => {
      // HANDLE EPOCHS HERE
      if (data.success) {
        this.epochs.push(data.data);
      } else {
        console.log("Getting an issue with retrieving data.");
      }
    });
    console.log(`Starting training with input size ${this.dimensions.x * this.dimensions.y}`);
    this.neuralNetService.train(this.dimensions.x * this.dimensions.y, [5, 10]);
  }

  pauseTraining(): void {
    this.paused = true;
    this.neuralNetService.pauseTraining();
  }

  numpadChanged(inputs: Array<number>) {
    this.neuralNetService.predict(inputs);
  }
}
