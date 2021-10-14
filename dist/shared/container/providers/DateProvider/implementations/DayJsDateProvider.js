"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.DayJsDateProvider = void 0;

var _dayjs = _interopRequireDefault(require("dayjs"));

var _utc = _interopRequireDefault(require("dayjs/plugin/utc"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dayjs.default.extend(_utc.default);

class DayJsDateProvider {
  compare(start_date, end_date) {
    const endDateFormat = this.convertToUtc(end_date);
    const startDateFormat = this.convertToUtc(start_date);
    const compare = (0, _dayjs.default)(endDateFormat).diff(startDateFormat, "hours");
    return compare;
  }

  convertToUtc(date) {
    return (0, _dayjs.default)(date).utc().local().format();
  }

  dateNow() {
    return (0, _dayjs.default)(new Date()).toDate();
  }

  compareInDays(start_date, end_date) {
    const endDateFormat = this.convertToUtc(end_date);
    const startDateFormat = this.convertToUtc(start_date);
    const compare = (0, _dayjs.default)(endDateFormat).diff(startDateFormat, "days");
    return compare;
  }

  addDays(days) {
    return (0, _dayjs.default)().add(days, "days").toDate();
  }

  addHours(hours) {
    return (0, _dayjs.default)().add(hours, "hours").toDate();
  }

  compareIfBefore(start_date, end_date) {
    return (0, _dayjs.default)(start_date).isBefore(end_date);
  }

}

exports.DayJsDateProvider = DayJsDateProvider;