

interface IDateProvider{
    compare(start_date, end_date): number;
    convertToUtc(date: Date);
    dateNow(): Date;

}


export{IDateProvider}