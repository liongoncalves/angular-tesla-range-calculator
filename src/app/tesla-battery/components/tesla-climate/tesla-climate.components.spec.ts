/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TeslaClimateComponent } from './tesla-climate.component';

describe('AppComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        TeslaClimateComponent
      ],
    });
    TestBed.compileComponents();
  });

  it('should create the app', async(() => {
    let fixture = TestBed.createComponent(TeslaClimateComponent);
    let app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

});
