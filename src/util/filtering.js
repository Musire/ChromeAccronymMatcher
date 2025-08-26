import moment from "moment";

export const filterInWeek = (shifts, target, start, end) => {
    return shifts.filter(item => {
        const startDate = moment(start);
        const endDate = moment(end);

        const itemDate = moment(item.date, 'YYYY-MM-DD');
        return (
            item.employeeId === target &&
            itemDate.isSameOrAfter(startDate) &&
            itemDate.isSameOrBefore(endDate)
        )
    })
}
