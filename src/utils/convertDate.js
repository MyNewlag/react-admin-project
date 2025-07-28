
import jMoment from 'jalali-moment'

export const convertDateToJalali=(date,format='jYYYY/jMM/jDD')=>{
    return jMoment(date).format(format)
}

export const convertDateToMiladi=(date)=>{
return jMoment(date,'jD / jM / jYYYY').format('YYYY/M/D')
}