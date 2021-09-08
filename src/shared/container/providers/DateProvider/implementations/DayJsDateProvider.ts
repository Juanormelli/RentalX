import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import { IDateProvider } from "../IDateProvider";

dayjs.extend(utc)

class DayJsDateProvider implements IDateProvider {
    
   
    compare(start_date: any, end_date: any): number {
        
        const endDateFormat = this.convertToUtc(end_date)
        const startDateFormat = this.convertToUtc(start_date)
        const compare = dayjs(endDateFormat).diff(startDateFormat, "hours")

        return compare
    }
    convertToUtc(date: Date) {
        return dayjs(date).utc().local().format()
    }

    dateNow(): Date {
        return dayjs(new Date()).toDate()
    }
    
}

export {DayJsDateProvider}