

interface IDateProvider{
    compare(start_date, end_date): number;
    convertToUtc(date: Date);
    dateNow(): Date;
    compareInDays(start_date: Date, end_date: Date): number

}


export{IDateProvider}