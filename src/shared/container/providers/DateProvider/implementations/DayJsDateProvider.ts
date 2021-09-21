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

    compareInDays(start_date: Date, end_date: Date): number {
        const endDateFormat = this.convertToUtc(end_date)
        const startDateFormat = this.convertToUtc(start_date)
        const compare = dayjs(endDateFormat).diff(startDateFormat, "days")

        return compare
    }

    addDays(days: number):Date {
        return dayjs().add(days,"days").toDate()
    }
    
}

export {DayJsDateProvider}