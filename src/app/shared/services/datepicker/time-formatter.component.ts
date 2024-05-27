import {NouiFormatter} from 'ng2-nouislider';

export class TimeFormatter implements NouiFormatter {
    to(value: number): string {
        let h = Math.floor(value / 3600);
        let m = Math.floor(value % 3600 / 60);
        let s = value - 60 * m - 3600 * h;
        let values = [h, m, s];
        let timeString: string = '';
        let i = 0;
        for(let v of values) {
            if(values[i] < 10)
                timeString += '0';
            timeString += values[i].toFixed(0);
            if(i < 2) {
                timeString += ':';
            }
            i++;
        }
        return timeString;
    };

    from(value: string): number {
        let v = value.split(':').map(parseInt);
        let time: number = 0;
        time += v[0] * 3600;
        time += v[1] * 60;
        time += v[2];
        return time;
    }
}
