import {Component, Input, OnInit} from "@angular/core";
import { Chart } from "chart.js";
import {Epoch} from "../../types/training";
import {NeuralNetService} from "../../services/neural-net.service";

@Component({
  selector: "app-epoch-chart",
  templateUrl: "./epoch-chart.component.html",
  styleUrls: ["./epoch-chart.component.scss"]
})
export class EpochChartComponent implements OnInit {

  @Input() paused: boolean;
  epochs: Array<Epoch>;
  linechart;
  x: Array<number>;

  constructor(private neuralNetService: NeuralNetService) {
    this.epochs = [];
  }

  ngOnInit(): void {
    this.neuralNetService.epoch.subscribe(data => {
      // HANDLE EPOCHS HERE
      if (data.success) {
        this.epochs.push(data.data);
        if (!this.paused) {
          this.buildChart();
        }
      } else {
        console.log("Getting an issue with retrieving data.");
      }
    });
    this.buildChart();
  }

  private buildChart(): void {
    // console.log(epochs);
    this.x = Array<number>(this.epochs.length).fill(0).map((d: number, i: number) => i);
    this.linechart = new Chart("canvas", {
      type: "line",
      data: {
        labels: this.x,
        datasets: [
          {
            data: this.epochs.map(e => e.sumOfSquaredErrors),
            borderColor: "#3cb371",
            backgroundColor: "#0000FF",
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: true
          }],
          yAxes: [{
            display: true,
            ticks: {
              min: 0,
              max: 10
            }
          }],
        }
      }
    });
  }

}
