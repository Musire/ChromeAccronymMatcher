import moment from 'moment-timezone';

export const convertTraditional = (datestr) => {
    return moment.tz(datestr, 'YYYY-MM-DD', 'America/Chicago').format('ddd, MMMM D');
}

export const generateWeekString = (weekIndex) => {
  const timezone = moment.tz.guess();
  const year = moment.tz(timezone).year();

  const start = moment.tz(timezone).year(year).isoWeek(weekIndex).startOf('isoWeek');
  const end = moment(start).endOf('isoWeek');

  const startMonth = start.format('MMM');
  const endMonth = end.format('MMM');

  const startDay = start.format('D');
  const endDay = end.format('D');

  if (startMonth === endMonth) {
    return `${startMonth} ${startDay} - ${endDay}`;
  } else {
    return `${startMonth} ${startDay} - ${endMonth} ${endDay}`;
  }
};

export const getShiftDuration = (shift) => {
  const [startStr, endStr] = shift.split(/\s*-\s*/);
  const start = moment(startStr, 'h:mm a');
  const end = moment(endStr, 'h:mm a');

  // Handle overnight shifts
  if (end.isBefore(start)) {
    end.add(1, 'day');
  }

  const duration = moment.duration(end.diff(start));
  const hours = Math.floor(duration.asHours());
  const minutes = duration.minutes();

  return `${hours}:${minutes.toString().padStart(2, '0')}`;
};

export const generateShifts = (
  hours,
  availability = null,
  open = "08:00",
  close = "22:00"
) => {
  const toMinutes = (time) => {
    const [h, m] = time.split(":").map(Number);
    return h * 60 + m;
  };

  const toTime = (mins) => {
    const h = String(Math.floor(mins / 60)).padStart(2, "0");
    const m = String(mins % 60).padStart(2, "0");
    return `${h}:${m}`;
  };

  const windowSize = hours * 60; // convert shift hours to minutes
  const step = 30; // 30-minute step

  // fallback if no availability
  const blocks = availability && availability.length
    ? availability
    : [[open, close]];

  const result = [];

  for (const [start, end] of blocks) {
    let startMins = toMinutes(start);
    const endMins = toMinutes(end);

    while (startMins + windowSize <= endMins) {
      const shiftStart = toTime(startMins);
      const shiftEnd = toTime(startMins + windowSize);
      result.push(`${shiftStart} - ${shiftEnd}`);
      startMins += step;
    }
  }

  return result;
};

export const isOverlapping = (range1, range2) => {
  const [start1, end1] = range1.split(' - ').map(t => moment(t, 'hh:mm A'));
  const [start2, end2] = range2.split(' - ').map(t => moment(t, 'hh:mm A'));

  return start1.isBefore(end2) && start2.isBefore(end1);
};

export const calculateEnd = (start, duration) => {
  const startMoment = moment(start, "hh:mm A");
  const endMoment = startMoment.clone().add(Number(duration), "hours");
  return `${start} - ${endMoment.format("hh:mm A")}`
}

export const commonDate = (dateStr) => {
  return moment(dateStr).format("MMMM D")
}

export const generateTimeSlots = (start = "09:00", end = "20:30") => {
  const slots = [];
  const [startHour, startMin] = start.split(":").map(Number);
  const [endHour, endMin] = end.split(":").map(Number);

  const pad = (n) => n.toString().padStart(2, "0");

  let current = new Date();
  current.setHours(startHour, startMin, 0, 0);

  const endTime = new Date();
  endTime.setHours(endHour, endMin, 0, 0);

  while (current <= endTime) {
    const hours = current.getHours();
    const minutes = current.getMinutes();
    const ampm = hours >= 12 ? "PM" : "AM";
    const formattedHour = hours % 12 === 0 ? 12 : hours % 12;

    slots.push(`${pad(formattedHour)}:${pad(minutes)} ${ampm}`);
    current.setMinutes(current.getMinutes() + 30);
  }

  return slots;
}