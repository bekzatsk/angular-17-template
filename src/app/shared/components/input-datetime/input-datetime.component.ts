import {ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnChanges, OnInit, Output} from '@angular/core';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from "@angular/forms";
import {
  NgbDateParserFormatter, NgbDatepickerConfig,
  NgbDateStruct, NgbInputDatepicker, NgbTimepicker,
  NgbTimepickerConfig,
  NgbTimeStruct
} from "@ng-bootstrap/ng-bootstrap";
import {DateParserFormatter} from '../../services/datepicker/date-format.service';
import {TranslateModule} from "@ngx-translate/core";
import {NgClass} from "@angular/common";
import moment from "moment";
import {FeatherModule} from "angular-feather";

@Component({
  selector: 'app-input-datetime',
  templateUrl: './input-datetime.component.html',
  styleUrls: ['./input-datetime.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputDatetimeComponent),
      multi: true
    },
    {provide: NgbDateParserFormatter, useClass: DateParserFormatter}
  ],
  imports: [
    NgbInputDatepicker,
    FormsModule,
    NgClass,
    NgbTimepicker,
    FeatherModule
  ],
  standalone: true
})

export class InputDatetimeComponent implements ControlValueAccessor, OnInit, OnChanges {
  @Input('value') valueInner: Date | string | null = null;
  @Input() container: 'body' | null = null;
  @Input() classes: string = '';
  @Input() placeholder: string = 'dd.mm.yyyy';
  @Input() enableTime: boolean = true;
  @Input() minDate: Date | string | null = null;
  @Input() maxDate: Date | string | null = null;
  @Input() navigation: 'select' | 'arrows' | 'none' = 'select';
  @Output() change: EventEmitter<Date | string> = new EventEmitter<Date | string>();
  date: NgbDateStruct | null = null;
  time: NgbTimeStruct | null = null;
  minDateNgb: NgbDateStruct | null = null
  maxDateNgb: NgbDateStruct | null = null

  constructor(
      private changeDetector: ChangeDetectorRef,
      config: NgbTimepickerConfig
  ) {
      config.spinners = false;
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: any): void {
    setTimeout(() => {
      if (changes) {
        if (changes.value) {
        }
        if (changes.minDate) {
          this.minDateNgb = this.minDate ? this.parse(this.minDate) : null;
        }
        if (changes.maxDate) {
          this.maxDateNgb = this.maxDate ? this.parse(this.maxDate) : null;
        }
      }
    });
  }

  onChange = (value: Date | string) => {
  };

  onTouched = () => {};

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  writeValue(value: Date | string): void {
    if (value !== this.valueInner) {
      this.valueInner = value;
      if (value) {
        this.date = this.parse(value.toString());
        this.time = this.parseTime(value.toString());
      }
    }
  }

  // get value
  get value(): Date | string | null {
    return this.valueInner;
  }

  // set value
  set value(value: Date | string) {
    this.writeValue(value);
    this.onChange(value);
    this.change.emit(value);
  }

  changeValues(event: any) {
    const dates = new Date();
    if (this.date) {
      dates.setFullYear(this.date.year, this.date.month - 1, this.date.day);
      if (this.time && this.time.hour >=0 && this.time.minute >= 0) {
        dates.setHours(this.time.hour, this.time.minute, 0, 0);
      } else {
        dates.setHours(0, 0, 0, 0);
      }
      this.value = dates;
    }
  }

  parse(value: string | Date): NgbDateStruct | null {
    const d = new Date(value);
    return  {day: d.getDate(), month: d.getMonth() + 1, year: d.getFullYear()}
  }

  parseTime(value: string): NgbTimeStruct | null {
    const d = new Date(value);
    return {hour: d.getHours(), minute: d.getMinutes(), second: d.getSeconds()};
  }
}
