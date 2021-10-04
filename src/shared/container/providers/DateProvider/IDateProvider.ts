

interface IDateProvider{
    compare(start_date, end_date): number;
    convertToUtc(date: Date);
    dateNow(): Date;
    compareInDays(start_date: Date, end_date: Date): number
    addDays(days: number):Date
    addHours(hours: number):Date
    compareIfBefore(start_date: Date, end_date: Date): boolean

}


export{IDateProvider}