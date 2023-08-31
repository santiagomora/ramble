import {
    DAYS,
    MONTHS,
    monthRows,
    monthIndex
} from '../constantes/DaysMonths';

export const generateHoursFromInterval = (interval) => {
    let res = {};
    res["0"] = "00";
    for (let ctr = interval; ctr < 60; ctr += interval) {
        res[ctr] = (ctr).toString();
    }
    return res;
}

export const getMonthLength = (month, year) => {
    let date = new Date(year, month, 0).getDate();
    return date;
}

export function processData (
    data
) {
    return Object.values(data).reduce(
        (t,x) => [...t,...x],[]
    );
}


export const assignType = (curr) =>
    (curr  === 'agenda')
        ? 'tabla'
        : (curr === 'tabla')
            ? 'agenda'
            :'agenda'



const cmp = {
    '>'    : (a,b) => a>b,
    '<'    : (a,b) => a<b,
    '>='   : (a,b) => a>=b,
    '<='   : (a,b) => a<=b,
    '='    : (a,b) => a===b,
    '!='   : (a,b) => a!=b
}

export const compareDates = (
    d1,
    d2,
    {d,m,y}
) => {
    return  cmp[d](d1.getDate(),d2.getDate())
            && cmp[m](d1.getMonth(), d2.getMonth())
            && cmp[y](d1.getFullYear(), d2.getFullYear());
}


export const createFeriadosList = (data) =>
    Object.values(data).reduce(
        (total,curr) => {
            total[curr.id] = curr.nombre;
            return total
        }, {}
    );


export const assignHorarios = (hList) => {
    const keys = Object.keys(hList),
        res = keys.reduce(
            (final, curr) => {
                const el = hList[curr];
                final[el] = DAYS[curr-1];
                return final;
            }, {}
        );
    return [res,keys.length];
}
