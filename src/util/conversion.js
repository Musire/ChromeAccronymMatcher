import moment from "moment";

const convertShiftToDigits = (timeStr) => {
  const hours = parseFloat(timeStr.slice(0, 2));
  const minutes = parseFloat(timeStr.slice(3, 5));
  const meridiem = timeStr.slice(6, 8).toLowerCase().trim();

  const aggregate = (meridiem === 'am') ? 0 : 12
  const correction = hours === 12 ? -12 : 0

  return hours + aggregate + correction + (minutes / 60)
}

export const buildMatrix = ( data, openTime=6, hours=17,) => {
  const roles = ['kitchen', 'register', 'waitress'];

  const matrix = Array(7).fill(null).map(() =>  // 7 days
    Array(roles.length).fill(null).map(() =>    // roles
      Array(hours * 2).fill(0)                   // half-hour slots
    )
  );

  data.forEach(item => {
    const zIndex = moment(item.date).isoWeekday() - 1
    const yIndex = roles.findIndex(r => r === item.role.toLowerCase());
    if (yIndex === -1) return; // skip unknown roles

    const [start, end] = item.shift.split(/\s*-\s*/);

    const xIndex = Math.floor((convertShiftToDigits(start) - openTime) * 2);
    const endIndex = Math.floor((convertShiftToDigits(end) - openTime) * 2);

    for (let i = xIndex; i < endIndex; i++) {
      matrix[zIndex][yIndex][i] += 1;
    }
  });

  return matrix;
}

export const formatCurrency = (stringNumber) => {
  const priceNum = parseFloat(stringNumber);

  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(priceNum);

}