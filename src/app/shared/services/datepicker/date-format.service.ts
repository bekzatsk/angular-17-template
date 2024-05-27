import {Injectable} from "@angular/core";
import {NgbDateParserFormatter, NgbDateStruct, NgbTimeStruct} from "@ng-bootstrap/ng-bootstrap";
import {DatePipe} from "@angular/common";
import moment from "moment";

@Injectable()
export class DateParserFormatter extends NgbDateParserFormatter {

    DELIMITER = '-';
    formatView = 'dd.MM.yyyy';
    private datePipe = new DatePipe('en-US');

    parse(value: string): NgbDateStruct | null {
        if (value) {
            let date = moment(value, this.formatView.toUpperCase());
            return {
                day : date.date(),
                month : date.month() + 1,
                year : date.year()
            };
        }
        return null;
    }

    parseFromDate(value: Date): NgbDateStruct | null {
        return  {day: value.getDate(), month: value.getMonth() + 1, year: value.getFullYear()}
    }

    parseTime(value: string): NgbTimeStruct | null {
        const d = new Date(value);
        return {hour: d.getHours(), minute: d.getMinutes(), second: d.getSeconds()};
    }

    format(date: NgbDateStruct | null): string {
        if (this.formatView && date) {
            const d = new Date(date.year, date.month - 1, date.day);
            const formatView = this.formatView.split(' ')
            let formatPrepare = [];
            for (let i = 0; i < formatView.length; i++) {
                if (formatView[i].includes('HH') || formatView[i].includes('mm') || formatView[i].includes('ss')) {
                    continue
                }
                formatPrepare.push(formatView[i])
            }
            return this.datePipe.transform(d, formatPrepare.join(' ')) ?? '';
        }
        return date ? date.day + this.DELIMITER + date.month + this.DELIMITER + date.year : '';
    }

    formatDate(date: NgbDateStruct | null): string | null {
        if (date) {
            const d = new Date(date.year, date.month - 1, date.day);
            return this.datePipe.transform(d, 'yyyy-MM-dd');
        }
        return null;
    }

    formatTimestamp(date: NgbDateStruct, time: NgbTimeStruct): string | null {
        if (date && time) {
            const d = new Date(date.year, date.month - 1, date.day, time.hour, time.minute, time.second);
            return this.datePipe.transform(d, 'yyyy-MM-dd HH:mm:ss');
        }
        return null;
    }
}
