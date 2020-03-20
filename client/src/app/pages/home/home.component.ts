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

  private subscription: Subscription;
  dimensions: {x: number, y: number};
  epochs: Array<Epoch>;

  constructor(private neuralNetService: NeuralNetService) {
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
  }

  get isSubscribed(): boolean {
    if (!this.subscription) {
      return false;
    }
    return !this.subscription.closed;
  }

  stopSubscription() {
    this.subscription.unsubscribe();
    this.neuralNetService.disconnect();
  }

  trainNetwork() {
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
}
