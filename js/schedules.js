const EARLIEST_AM_HOUR = 6;

const HTMLnewlineRegex = /<(p|div|br).*?>|\),? *(?=[A-Z0-9])/g;
const noHTMLRegex = /<.*?>/g;
const noNbspRegex = /&nbsp;/g;
const timeGetterRegex = /\(?(1?[0-9]):([0-9]{2}) *(?:-|–) *(1?[0-9]):([0-9]{2}) *(pm)?\)?/;
const newLineRegex = /\r?\n/g;
const getPeriodLetterRegex = /\b[A-G]\b/;
const selfGradeRegex = /(1?[9012])th/gi;
const periodSelfGradeRegex = /self for (.+?) grader/gi;
const gradeToInt = {'9': 1, '10': 2, '11': 4, '12': 8};
const defaultSelf = 0b11;

function parseAlternate(summary, description) {
  if (/schedule|extended/i.test(summary)) {
    if (!description) return;
    description = '\n' + description.replace(HTMLnewlineRegex, '\n').replace(noHTMLRegex, '').replace(noNbspRegex, ' ');
    let periods = [];
    description.split(newLineRegex).map(str => {
      let times;
      const name = str.replace(timeGetterRegex, (...matches) => {
        times = matches;
        return '';
      }).trim();

      if (!times) return;

      let [, sH, sM, eH, eM, pm] = times;

      sH = +sH; sM = +sM; eH = +eH; eM = +eM;
      if (sH < EARLIEST_AM_HOUR || pm) sH += 12;
      if (eH < EARLIEST_AM_HOUR || pm) eH += 12;
      const startTime = sH * 60 + sM,
      endTime = eH * 60 + eM;

      const duplicatePeriod = periods.findIndex(p => p.start === startTime);
      if (!~duplicatePeriod) {
        const period = identifyPeriod(name);
        const periodData = {
          period: period,
          start: startTime,
          end: endTime
        };
        if (period === 's') {
          periods.selfInSchedule = true;
          periodSelfGradeRegex.lastIndex = 0;
          const selfSlice = periodSelfGradeRegex.exec(name);
          if (selfSlice) {
            let grades = 0;
            selfSlice[1].replace(selfGradeRegex, (_, grade) => grades += gradeToInt[grade]);
            periodData.selfGrades = grades || defaultSelf;
          } else {
            periodData.selfGrades = defaultSelf;
          }
        }
        if (period) periods.push(periodData);
      }
    });
    return periods;
  } else if (/holiday|no\sstudents|break|development/i.test(summary)) {
    if (description) return;
    return null;
  }
}

function identifyPeriod(name) {
  name = name.toUpperCase();
  if (~name.indexOf('PERIOD')) {
    let letter = getPeriodLetterRegex.exec(name);
    if (letter) return letter[0];
  }
  if (~name.indexOf('SELF')) return 's';
  else if (~name.indexOf('FLEX')
      || ~name.indexOf('ASSEMBL') // assembly, assemblies
      || ~name.indexOf('TUTORIAL'))
    return 'f';
  else if (~name.indexOf('BRUNCH') || ~name.indexOf('BREAK')) return 'b';
  else if (~name.indexOf('LUNCH') || ~name.indexOf('TURKEY')) return 'l';
  else return;
}

const firstDay = '2018-08-13T00:00:00.000-07:00';
const lastDay = '2019-05-31T23:59:59.999-07:00';
const keywords = ['self', 'schedule', 'extended', 'holiday', 'no students', 'break', 'development'];
const calendarURL = 'https://www.googleapis.com/calendar/v3/calendars/'
  + encodeURIComponent('u5mgb2vlddfj70d7frf3r015h0@group.calendar.google.com')
  + '/events?singleEvents=true&fields='
  + encodeURIComponent('items(description,end(date,dateTime),start(date,dateTime),summary)')
  + '&key=AIzaSyDBYs4DdIaTjYx5WDz6nfdEAftXuctZV0o'
  + `&timeMin=${encodeURIComponent(firstDay)}&timeMax=${encodeURIComponent(lastDay)}`;

function parseEvents(events) {
  const alts = events.map(({items}) => {
    const events = [];
    items.forEach(ev => {
      if (ev.start.dateTime) events.push({
        summary: ev.summary,
        description: ev.description,
        date: ev.start.dateTime.slice(5, 10)
      });
      else {
        const dateObj = new Date(ev.start.date);
        const endDate = new Date(ev.end.date).getTime();
        while (dateObj.getTime() < endDate) {
          events.push({
            summary: ev.summary,
            description: ev.description,
            date: dateObj.toISOString().slice(5, 10)
          });
          dateObj.setUTCDate(dateObj.getUTCDate() + 1);
        }
      }
    });
    return events;
  });
  const selfDays = {};
  alts[0].forEach(ev => {
    if (ev.summary.includes('SELF')) {
      let grades = 0;
      ev.summary.replace(selfGradeRegex, (_, grade) => grades += gradeToInt[grade]);
      if (grades > 0) selfDays[ev.date] = grades || defaultSelf;
    }
  });
  const alternates = {};
  alts.slice(1).forEach(moreAlts => moreAlts.forEach(alt => {
    const schedule = parseAlternate(alt.summary, alt.description);
    if (schedule !== undefined) {
      alternates[alt.date] = schedule;
      if (schedule && schedule.selfInSchedule) delete selfDays[alt.date];
    }
  }));
  return {
    lastGenerated: new Date(),
    selfDays: selfDays,
    schedules: alternates
  };
}
function fetchAlternates() {
  return Promise.all(keywords.map(k => fetch(calendarURL + '&q=' + k).then(r => r.json()))).then(alts => {
    // localStorage.setItem('[ugwisha] test.rawAlts', JSON.stringify(alts));
    scheduleData = parseEvents(alts);
    storage.setItem('[ugwisha] alternates', encodeStoredAlternates(scheduleData));
  });
}

const selfCharOffset = 72;
const alternateRegex = /([A-GblfI-W])([\dab]{3})([\dab]{3})/g;
function decodeStoredAlternates(string = storage.getItem('[ugwisha] alternates')) {
  const lines = string.split('|');
  const firstLine = lines.shift();
  const lastGeneratedDate = new Date(Date.UTC(+firstLine.slice(0, 4), parseInt(firstLine[4], 36), parseInt(firstLine[5], 36)));
  const selfDays = {};
  firstLine.slice(6).split('!').forEach(m => {
    const month = parseInt(m[0], 36) + 1;
    for (let i = 1; i < m.length; i += 2) {
      selfDays[month + '-' + parseInt(m[i], 36)] = m[i + 1].charCodeAt() - selfCharOffset;
    }
  });
  const schedules = {};
  lines.forEach(m => {
    const month = parseInt(m[0], 36) + 1;
    m.slice(1).split('!').forEach(d => {
      const schedule = d.length > 1 ? [] : null;
      if (d.length > 1) {
        d.slice(1).replace(alternateRegex, (_, period, start, end) => {
          const periodData = {
            period: period,
            start: parseInt(start, 12),
            end: parseInt(end, 12)
          };
          if (period >= 'I' && period <= 'W') {
            periodData.period = 's';
            periodData.selfGrades = period.charCodeAt() - selfCharOffset;
          }
          schedule.push(periodData);
        });
      }
      schedules[month + '-' + parseInt(d[0], 36)] = schedule;
    });
  });
  return {
    lastGenerated: lastGeneratedDate,
    selfDays: selfDays,
    schedules: schedules
  };
}
function encodeStoredAlternates({lastGenerated, selfDays, schedules}) {
  let result = lastGenerated.getUTCFullYear() + lastGenerated.getUTCMonth().toString(36) + lastGenerated.getUTCDate().toString(36);
  const selfMonths = {};
  Object.keys(selfDays).forEach(day => {
    let [month, date] = day.split('-').map(Number);
    month = (month - 1).toString(36);
    date = date.toString(36);
    selfMonths[month] = (selfMonths[month] || month) + date + String.fromCharCode((selfDays[day] || defaultSelf) + selfCharOffset);
  });
  result += Object.values(selfMonths).join('!') + '|';
  const schedMonths = {};
  Object.keys(schedules).forEach(day => {
    let [month, date] = day.split('-').map(Number);
    month = (month - 1).toString(36);
    date = date.toString(36);
    if (schedMonths[month]) schedMonths[month] += '!';
    else schedMonths[month] = month;
    schedMonths[month] += date;
    if (schedules[day])
      schedMonths[month] += schedules[day].map(({period, start, end}) => (period === 's' ? String.fromCharCode((period.selfGrades || defaultSelf) + selfCharOffset) : period)
        + start.toString(12).padStart(3, '0') + end.toString(12).padStart(3, '0')).join('');
  });
  result += Object.values(schedMonths).join('|');
  return result;
}

const normalSchedules = [
  null,
  [
    {period: 'A', start: 505, end: 585},
    {period: 'b', start: 585, end: 590},
    {period: 'B', start: 600, end: 675},
    {period: 'C', start: 685, end: 760},
    {period: 'l', start: 760, end: 790},
    {period: 'F', start: 800, end: 875}
  ], [
    {period: 'D', start: 505, end: 585},
    {period: 'b', start: 585, end: 590},
    {period: 'f', start: 600, end: 650},
    {period: 'E', start: 660, end: 735},
    {period: 'l', start: 735, end: 765},
    {period: 'A', start: 775, end: 855},
    {period: 'G', start: 865, end: 940}
  ], [
    {period: 'B', start: 505, end: 590},
    {period: 'b', start: 590, end: 595},
    {period: 'C', start: 605, end: 685},
    {period: 'D', start: 695, end: 775},
    {period: 'l', start: 775, end: 805},
    {period: 'F', start: 815, end: 895}
  ], [
    {period: 'E', start: 505, end: 590},
    {period: 'b', start: 590, end: 595},
    {period: 'f', start: 605, end: 655},
    {period: 'B', start: 665, end: 735},
    {period: 'l', start: 735, end: 765},
    {period: 'A', start: 775, end: 845},
    {period: 'G', start: 855, end: 935}
  ], [
    {period: 'C', start: 505, end: 580},
    {period: 'b', start: 580, end: 585},
    {period: 'D', start: 595, end: 665},
    {period: 'E', start: 675, end: 745},
    {period: 'l', start: 745, end: 775},
    {period: 'F', start: 785, end: 855},
    {period: 'G', start: 865, end: 935}
  ],
  null
];
let scheduleData;
function getSchedule(dateObj) {
  const string = dateObj.toISOString().slice(5, 10);
  let schedule;
  if (scheduleData.schedules[string] !== undefined) {
    schedule = JSON.parse(JSON.stringify(scheduleData.schedules[string]));
  } else {
    schedule = JSON.parse(JSON.stringify(normalSchedules[dateObj.getUTCDay()]));
  }
  if (schedule && scheduleData.selfDays[string]) {
    schedule.forEach(pd => {
      if (pd.period === 'f') {
        pd.period = 's';
        pd.selfGrades = scheduleData.selfDays[string];
      }
    });
  }
  if (schedule === null) {
    schedule = { noSchool: true };
  }
  if (scheduleData.schedules[string] !== undefined) {
    schedule.alternate = true;
  }
  return schedule;
}

const months = 'january february march april may june july august september october november december'.split(' ');
const days = ['sunday', 'monday', 'tuesday', 'wed<span class="abbrev-wednesday">nesday</span>', 'thursday', 'friday', 'saturday'];
let dateElem, dayElem;
function updateView() {
  setSchedule(getSchedule(viewingDate));
  dateElem.innerHTML = months[viewingDate.getUTCMonth()] + ' ' + viewingDate.getUTCDate();
  dayElem.innerHTML = days[viewingDate.getUTCDay()];
}
ready.push(async () => {
  dateElem = document.getElementById('date');
  dayElem = document.getElementById('weekday');
  if (localStorage.getItem('[ugwisha] alternates')) {
    scheduleData = decodeStoredAlternates(localStorage.getItem('[ugwisha] alternates'));
  } else {
    await fetchAlternates();
  }
  updateView();
  document.getElementById('fetch-alts').addEventListener('click', async e => {
    await fetchAlternates();
    updateView();
  });
});
