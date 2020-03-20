import {Component, Input, OnInit} from "@angular/core";
import * as p5 from "p5";
import {Layer, Model, Perceptron} from "../../types/neural-network";

@Component({
  selector: "app-network-diagram",
  templateUrl: "./network-diagram.component.html",
  styleUrls: ["./network-diagram.component.scss"]
})
export class NetworkDiagramComponent implements OnInit {

  @Input() model: Model;
  private canvas;

  constructor() { }

  ngOnInit() {
    this.createCanvas();
  }

  private createCanvas() {
    this.canvas = new p5(this.sketch, document.getElementById("canvas"));
  }

  private sketch(c: any) {
    console.log(NetworkDiagramComponent);
    c.setup = () => {
      c.createCanvas(c.windowWidth, 100 * NetworkDiagramComponent.model.layers.length);
    };

    c.draw = () => {
      c.clear();
      c.background(150);
      const numLayers: number = NetworkDiagramComponent.model.layers.length;
      model.layers.forEach((l: Layer, i: number) => {
        const numPerceptrons: number = l.perceptrons.length;
        const yPosition: number = ((c.height / numLayers) / 2) * (i + 1);
        l.perceptrons.forEach((p: Perceptron, j: number) => {
          const xPosition: number = ((c.widtch / numPerceptrons) / 2) * (j + 1);
          c.circle(xPosition, yPosition, 100);
        });
      });
    };
  }

}
