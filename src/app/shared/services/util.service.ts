import {Injectable} from '@angular/core';

@Injectable()
export class UtilService {

  static convertMS(obj: any[]): any[] {
    const result: any[] = [];
    obj.forEach(item => {
      result.push({ value: item.id, name: item.value });
    });
    return result;
  }

  static convertVS(obj: string, option: any[], isSingle: Boolean = false): any {
    const result: any[] = [];
    option.forEach(item => {
      if (item.value === obj) {
        result.push(item);
        if (isSingle) {
          return
        }
      }
    });
    if (isSingle && result.length) {
      return result[0]
    }
    return result;
  }

  // convert Object to list by sort
  static convertOL(obj: any, byKey: string): any[] {
    const resultArray = Object.keys(obj).map(function(index) {
      return obj[index];
    });
    return resultArray.sort((a, b) => (a[byKey] > b[byKey] ? 1 : -1));

  }

  static intersect(array1: any[], array2: any[]): boolean {
    const result = array1.filter(x => array2.includes(x.toUpperCase()));
    return result.length > 0;
  }

  static copyDeep(object1: any | any[]): any | any[] {
    return JSON.parse(JSON.stringify(object1))
  }

  static difference(list1: any[], list2: any[]): any[] {
    const result: any[] = [];
    const map2: any = {};
    if (list1 && list2) {
      list2.forEach(item => {
        if (!map2[item.id]) {
          map2[item.id] = item;
        }
      });

      list1.forEach(item => {
        if (!map2[item.id]) {
          result.push(item);
        }
      });
    }

    return result;
  }

  static show2Digits(value: number): string {
    return value <= 9 ? '0' + value.toString() : value.toString();
  }

  static getMonthsFromRange(fromDate: Date, toDate: Date): any[] {
    const fromYear = fromDate.getFullYear();
    const fromMonth = fromDate.getMonth();
    const toYear = toDate.getFullYear();
    const toMonth = toDate.getMonth();
    const months = [];

    for (let year = fromYear; year <= toYear; year++) {
      let monthNum = year === fromYear ? fromMonth : 0;
      const monthLimit = year === toYear ? toMonth : 11;

      for (; monthNum <= monthLimit; monthNum++) {
        const month = monthNum + 1;
        months.push({ year, month });
      }
    }
    return months;
  }

  static getFirstLetters(s: string, count: number = 2): string {
    return s.trim().split(' ').filter(s => s.length > 0).map(s => s[0].toUpperCase()).join('').substring(0, count);
  }

  static requestLoaded(loadedRequest: any, s: string): boolean {
    let loaded = true;
    Object.keys(loadedRequest).forEach(item => {
      if (item === s) {
        loadedRequest[item] = true;
      }
      if (loadedRequest[item] === false) {
        loaded = false;
      }
    });
    return !loaded
  }

  static removeNullFromObject(obj: any): any {
    return Object.keys(obj).reduce((accumulator: any, key) => {
      if (obj[key] != null) {
        accumulator[key] = obj[key];
      }
      return accumulator;
    }, {})
  }

}
