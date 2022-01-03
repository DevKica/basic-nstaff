export const hourDiff = (time1: string, time2: string) => {
    const timeStart = new Date(2021, 3, 28, parseFloat(time1.slice(0, 2)), parseFloat(time1.slice(3)));
    const timeEnd = new Date(2021, 3, 28, parseFloat(time2.slice(0, 2)), parseFloat(time2.slice(3)));

    const hourDiff = Math.abs(timeStart.getTime() - timeEnd.getTime()) / 60 / 60 / 1000;

    return Math.round(hourDiff * 100) / 100;
};
