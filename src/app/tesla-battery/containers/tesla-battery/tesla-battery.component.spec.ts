/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TeslaBatteryComponent } from './tesla-battery.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NO_ERRORS_SCHEMA } from '@angular/core';

import { BatteryService } from '../../tesla-battery.service';

// Components
import { TeslaCarComponent } from '../../components/tesla-car/tesla-car.component';
import { TeslaStatsComponent } from '../../components/tesla-stats/tesla-stats.component';
import { TeslaCounterComponent } from '../../components/tesla-counter/tesla-counter.component';
import { TeslaClimateComponent } from '../../components/tesla-climate/tesla-climate.component';
import { TeslaWheelsComponent } from '../../components/tesla-wheels/tesla-wheels.component';

describe('TeslaBatteryComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeslaBatteryComponent,
        TeslaCarComponent,
        TeslaStatsComponent,
        TeslaCounterComponent,
        TeslaClimateComponent,
        TeslaWheelsComponent
      ],
      providers: [
        BatteryService
      ],
      imports: [ReactiveFormsModule],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(TeslaBatteryComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  fit('Should retrieve the model from the service', async(() => {
    let fixture = TestBed.createComponent(TeslaBatteryComponent);
    let app = fixture.debugElement.componentInstance;
    let hds = fixture.debugElement.injector.get(BatteryService);
    const saveSpy = spyOn(hds, 'getModelData').and.callThrough();
    fixture.detectChanges();
    expect(hds.getModelData).toHaveBeenCalled();
  }));

});
