import {Component, EventEmitter, Input, OnInit, Output} from "@angular/core";

@Component({
  selector: "app-numpad",
  templateUrl: "./numpad.component.html",
  styleUrls: ["./numpad.component.scss"]
})
export class NumpadComponent implements OnInit {

  @Input() dimensions: {x: number, y: number};
  @Output() inputChange: EventEmitter<Array<number>>;
  inputs: Array<number>;

  constructor() {
    this.inputChange = new EventEmitter<Array<number>>();
  }

  ngOnInit(): void {
    this.inputs = new Array<number>(this.dimensions.x * this.dimensions.y).fill(0);
  }

  createArraySize(size: number): Array<number> {
    return new Array<number>(size);
  }

  flipPad(target: any) {
    this.inputs[target.value] = this.inputs[target.value] === 0 ? 1 : 0;
    this.inputChange.emit(this.inputs);
  }
}
