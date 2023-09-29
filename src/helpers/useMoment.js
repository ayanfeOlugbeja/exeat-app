import moment from 'moment/moment';
export const getCurrentTimestamp = (timeformat) => {
  return moment().format(timeformat);
};
