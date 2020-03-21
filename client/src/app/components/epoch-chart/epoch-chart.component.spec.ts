import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { EpochChartComponent } from "./epoch-chart.component";

describe("EpochChartComponent", () => {
  let component: EpochChartComponent;
  let fixture: ComponentFixture<EpochChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpochChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpochChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
