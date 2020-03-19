import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-tiles',
  templateUrl: './tiles.component.html',
  styleUrls: ['./tiles.component.scss']
})
export class TilesComponent implements OnInit {

  @Input() dimensions: { x: number, y: number };
  @Output() inputChange: EventEmitter<number[]>;
  input: Array<number>;

  constructor() {
    this.inputChange = new EventEmitter<number[]>();
  }

  ngOnInit(): void {
    this.input = new Array<number>(this.dimensions.x * this.dimensions.y).fill(0);
    this.inputChange.emit(this.input);
  }

  Array(size: number) {
    return new Array(size);
  }

  invert(target: any) {
    this.input[target.value] = this.input[target.value] === 0 ? 1 : 0;
    this.inputChange.emit(this.input);
  }
}
