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

import { FormBuilder, FormGroup } from '@angular/forms';

describe('TeslaBatteryComponent: Integration', () => {
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

  describe('onInit', () => {
    let fixture;
    let app;
    beforeEach(() => {
      fixture = TestBed.createComponent(TeslaBatteryComponent);
      app = fixture.debugElement.componentInstance;
    });

    it('Should retrieve the model from the service when the component gets initialized', async(() => {
      let batteryService = fixture.debugElement.injector.get(BatteryService);
      spyOn(batteryService, 'getModelData').and.callThrough();
      fixture.detectChanges();
      expect(batteryService.getModelData).toHaveBeenCalled();
    }));

    it('Should initialize the stats.', async(() => {
      fixture.detectChanges();
      expect(app.stats).toEqual([
        { model: '60', miles: 246 },
        { model: '60D', miles: 250 },
        { model: '75', miles: 297 },
        { model: '75D', miles: 306 },
        { model: '90D', miles: 336 },
        { model: 'P100D', miles: 376 }
      ]);
    }));

    it('Should update the stats when the values changes (climate true)', async(() => {
      fixture.detectChanges();
      app.tesla.controls['config'].setValue({ speed: 45, temperature: 20, climate: true, wheels: 19 });
      fixture.detectChanges();
      expect(app.stats).toEqual([
        { model: '60', miles: 289 },
        { model: '60D', miles: 293 },
        { model: '75', miles: 350 },
        { model: '75D', miles: 358 },
        { model: '90D', miles: 394 },
        { model: 'P100D', miles: 442 }
      ]);
    }));

    it('Should update the stats when the values changes (climate true)', async(() => {
      fixture.detectChanges();
      app.tesla.controls['config'].setValue({ speed: 45, temperature: 20, climate: false, wheels: 19 });
      fixture.detectChanges();
      expect(app.stats).toEqual([
        { model: '60', miles: 325 },
        { model: '60D', miles: 330 },
        { model: '75', miles: 393 },
        { model: '75D', miles: 404 },
        { model: '90D', miles: 443 },
        { model: 'P100D', miles: 496 }
      ]);
    }));

  });

});


fdescribe('TeslaBatteryComponent: Isolated', () => {
  let component;
  let self;
  beforeEach(() => {
    self = this;

    self.BatteryService = new BatteryService();
    spyOn(self.BatteryService, 'getModelData').and.callThrough();

    self.FormBuilder = new FormBuilder();
    spyOn(self.FormBuilder, 'group').and.callThrough();
    self.component = new TeslaBatteryComponent(self.FormBuilder, self.BatteryService);
  });

  describe('ngOnInit', () => {
    beforeEach(() => {
      spyOn(self.component, 'calculateStats').and.callThrough();
      self.component.ngOnInit();
    });

    it('Should retrieve the model data from the battery service', () => {
      expect(self.BatteryService.getModelData).toHaveBeenCalled();
    });

    it('Should create 2 form groups', () => {
      expect(self.FormBuilder.group).toHaveBeenCalledTimes(2);
      expect(self.FormBuilder.group).toHaveBeenCalledWith({
        speed: 55,
        temperature: 20,
        climate: true,
        wheels: 19
      });
      expect(self.FormBuilder.group).toHaveBeenCalledWith({ config: jasmine.any(FormGroup) });
    });

    it('should calculate stats', () => {
      expect(self.component.calculateStats).toHaveBeenCalled();
    });

    describe('subscribe', () => {
      it('test', () => {
        self.component.tesla.controls['config'].setValue({ speed: 45, temperature: 20, climate: true, wheels: 19 });
        expect(self.component.stats).toEqual([
        { model: '60', miles: 289 },
        { model: '60D', miles: 293 },
        { model: '75', miles: 350 },
        { model: '75D', miles: 358 },
        { model: '90D', miles: 394 },
        { model: 'P100D', miles: 442 }
      ]);
      });
    });

  });

});
