const hebrewDays = ['ראשון', 'שני', 'שלישי', 'רביעי', 'חמישי', 'שישי', 'שבת'];
const hebrewMonths = [
  'ינואר', 'פברואר', 'מרץ', 'אפריל', 'מאי', 'יוני',
  'יולי', 'אוגוסט', 'ספטמבר', 'אוקטובר', 'נובמבר', 'דצמבר'
];

export const formatHebrewDateTime = (date: Date, time: string): { dayText: string; timeText: string; fullDate: string } => {
  const dayText = hebrewDays[date.getDay()];
  const day = date.getDate();
  const month = hebrewMonths[date.getMonth()];
  
  // Ensure time is in HH:MM format
  const timeRegex = /^([0-9]{1,2}):([0-9]{2})$/;
  let timeText = time;
  if (timeRegex.test(time)) {
    const [hours, minutes] = time.split(':');
    timeText = `${hours.padStart(2, '0')}:${minutes}`;
  }

  const fullDate = `${day} ב${month}`;

  return { dayText, timeText, fullDate };
};