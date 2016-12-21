/* tslint:disable:no-unused-variable */

import { TestBed, async } from '@angular/core/testing';
import { TeslaClimateComponent } from './tesla-climate.component';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
describe('TeslaClimateComponent', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [
                TeslaClimateComponent
            ],
            imports: [ReactiveFormsModule],
        });
        TestBed.compileComponents();
    });

    it('should create the app', async(() => {
        let fixture = TestBed.createComponent(TeslaClimateComponent);
        let app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));


    describe('onFocus', () => {
        let fixture;
        let app;

        beforeEach(() => {
            fixture = TestBed.createComponent(TeslaClimateComponent);
            app = fixture.debugElement.componentInstance;
        });

        it('Should register focus event', async(() => {
            let onTouchSpy = jasmine.createSpy('onTouchSpy');
            fixture.detectChanges();
            app.registerOnTouched(onTouchSpy);
            app.onFocus(true);
            expect(onTouchSpy).toHaveBeenCalled();
            expect(app.focused).toBeTruthy();
        }));

        it('Should trigger focus event and update values when input element is focused', async(() => {
            let input = fixture.debugElement.query(By.css('input'));
            let label = fixture.debugElement.query(By.css('label'));
            let onTouchSpy = jasmine.createSpy('onTouchSpy');

            fixture.detectChanges();
            app.registerOnTouched(onTouchSpy);
            input.triggerEventHandler('focus', true);
            expect(onTouchSpy).toHaveBeenCalled();
            expect(app.focused).toBeTruthy();
        }));
    });

    describe('blur', () => {

        it('Should update values when input element is blur', async(() => {
            let fixture = TestBed.createComponent(TeslaClimateComponent);;
            let app = fixture.debugElement.componentInstance;
            let input = fixture.debugElement.query(By.css('input'));
            let label = fixture.debugElement.query(By.css('label'));

            fixture.detectChanges();
            input.triggerEventHandler('blur', true);
            expect(app.focused).toBeFalsy();
        }));
    });

    describe('change', () => {

        it('Should update values when input element change', async(() => {
            let fixture = TestBed.createComponent(TeslaClimateComponent);;
            let app = fixture.debugElement.componentInstance;
            let input = fixture.debugElement.query(By.css('input'));
            let label = fixture.debugElement.query(By.css('label'));
            let onChangeSpy = jasmine.createSpy('onChange');

            fixture.detectChanges();
            app.registerOnChange(onChangeSpy);
            fixture.detectChanges();
            input.triggerEventHandler('change', true);
            expect(app.focused).toBeFalsy();
            expect(onChangeSpy).toHaveBeenCalled();
        }));
    });

});
