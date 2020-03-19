import { Component, OnInit } from '@angular/core';
import {ModelService} from '../../services/model.service';
import {Model} from '../../types/Model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  prediction: number;
  dimensions: {x: number, y: number};
  private input: number[];
  model: Model;

  constructor(
    private modelService: ModelService,
    private snackBar: MatSnackBar
    ) {
    this.dimensions = {x: 5, y: 9};
  }

  ngOnInit(): void {
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  inputChange(inputValues: number[]) {
    this.input = inputValues;
    this.testModel();
  }

  resetModel() {
    this.modelService.resetModel(45, [5, 10]).subscribe(data => {
      if (data.success) {
        this.model = data.model;
        this.openSnackBar('The model has been reset!', 'dismiss');
      }
    });
  }

  trainModel() {
    this.modelService.trainModel(0.001).subscribe(data => {
      if (data.success) {
        this.model = data.model;
        this.openSnackBar('The model has been trained!', 'dismiss');
      }
    });
  }

  testModel() {
    this.modelService.testModel(this.input).subscribe(data => {
      if (data.success) {
        const maxCertain: number = Math.max(...data.predictions);
        this.prediction = data.predictions.indexOf(maxCertain);
      }
    });
  }
}
