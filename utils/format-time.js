import { format, getTime, formatDistanceToNow } from 'date-fns';
import { vi } from 'date-fns/locale'
import _ from 'lodash';

// ----------------------------------------------------------------------

export function fDate(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy';

  return date ? format(new Date(date), fm, { locale: vi }) : '';
}

export function fDateTime(date, newFormat) {
  const fm = newFormat || 'dd MMM yyyy p';

  return date ? format(new Date(date), fm, { locale: vi }) : '';
}

export function fTime(date, newFormat) {
  const fm = newFormat || 'p';

  return date ? format(new Date(date), fm, { locale: vi }) : '';
}

export function fTimestamp(date) {
  return date ? getTime(new Date(date)) : '';
}

export function fToNow(date) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : '';
}

export function fMinutesToHours(minutes) {
  const numberMinutes = Number(minutes);
  return Math.trunc(numberMinutes / 60) + (numberMinutes % 60)/60 + 'h';
}

export const fConvertDays = (str) => {
  const dayMap = {
      'Thứ 2': 'T2',
      'Thứ 3': 'T3',
      'Thứ 4': 'T4',
      'Thứ 5': 'T5',
      'Thứ 6': 'T6',
      'Thứ 7': 'T7',
      'CN': 'CN'
  };

  // Thay thế các chuỗi dựa vào dayMap
  return _.reduce(dayMap, (result, value, key) => {
      return _.replace(result, new RegExp(_.escapeRegExp(key), 'g'), value);
  }, str);
};