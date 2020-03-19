import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import {LoaderService} from '../../../services/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  color: any;
  mode: any;
  value: number;
  isLoading: Subject<boolean>;

  constructor(private loaderService: LoaderService) {
    this.color = 'primary';
    this.mode = 'indeterminate';
    this.value = 50;
    this.isLoading = this.loaderService.isLoading;
  }

  ngOnInit(): void {
  }

}
