import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Model} from '../types/Model';

@Injectable({
  providedIn: 'root'
})
export class ModelService {

  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:5000/';
  }

  resetModel(inputSizeOverall: number, layerSizesOverall: Array<number>): Observable<{model: Model, success: boolean}> {
    const url = this.baseUrl + 'api/training/reset';
    const body = {
      inputSize: inputSizeOverall,
      layerSizes: layerSizesOverall
    };
    return this.http.post<{model: Model, success: boolean}>(url, body);
  }

  trainModel(acceptedErrorIn: number): Observable<{model: Model, success: boolean}> {
    const url = this.baseUrl + 'api/training/train';
    const body = {
      acceptedError: acceptedErrorIn,
    };
    return this.http.post<{model: Model, success: boolean}>(url, body);
  }

  testModel(inputs: Array<number>): Observable<{predictions: Array<number>, success: boolean}> {
    const url = this.baseUrl + 'api/training/predict';
    const body = {
      input: inputs,
    };
    return this.http.post<{predictions: Array<number>, success: boolean}>(url, body);
  }
}
