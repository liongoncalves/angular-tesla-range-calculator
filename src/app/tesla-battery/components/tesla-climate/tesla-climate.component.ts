import { Component, Input, ChangeDetectionStrategy, forwardRef } from '@angular/core';
import { FormControl, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

const CHECKBOX_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TeslaClimateComponent),
    multi: true
};

@Component({
    selector: 'tesla-climate',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
    <div class="tesla-climate">
      <label 
        class="tesla-climate__item"
        [class.tesla-heat]="!limit"
        [class.tesla-climate__item--active]="value"
        [class.tesla-climate__item--focused]="focused === value">
        <p>{{ (limit ? 'ac' : 'heat') }} {{ value ? 'on' : 'off' }}</p>
        <i class="tesla-climate__icon"></i>
      <input 
        type="checkbox"
        name="climate"
        [checked]="value"
        (change)="onChange(value)"
        (blur)="onBlur($event)"
        (focus)="onFocus($event)">
    </label>
  </div>
  `,
    providers: [CHECKBOX_VALUE_ACCESSOR],
    styleUrls: ['./tesla-climate.component.scss']
})
export class TeslaClimateComponent implements ControlValueAccessor {

    @Input() limit: boolean;

    value: boolean;
    focused: boolean;

    private onTouch: Function;
    private onModelChange: Function;

    private onChange(value: boolean) {
        console.log('onChange', value);
        this.value = !value;
        this.onModelChange(this.value);
    }

    registerOnChange(fn: Function) {
        this.onModelChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.onTouch = fn;console.log('registerOnTouched');
    }

    writeValue(value: boolean) {
        this.value = value;
        console.log('writeValue');
    }

    private onBlur(value: boolean) {
        this.focused = false;console.log('onBlur');
    }

    private onFocus(value: boolean) {
        this.focused = value;
        this.onTouch();
        console.log('onFocus');
    }

}