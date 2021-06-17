//get all unique cource from the list
export function getCourses(data) {
    const cources = new Set();
    data.forEach(item => cources.add(item.courseName));
    return [...cources];
}

function getPercentage(present, absent, leaveOfAbsence, totalClasses) {
    let percentage = ((present / totalClasses) * 100).toFixed(2)
    return percentage;
}

//get attandance for one cource
export function getAttandance(data, cource) {
    const dates = [];
    const classAttended = [];
    let classAttendedCounter = 0;
    const courseName = cource;
    let totalClasses = 0;
    let present = 0;
    let absent = 0;
    let leaveOfAbsence = 0;
    data.forEach(item => {
        if (cource.localeCompare(item.courseName) == 0) {
            totalClasses++;
            dates.push(item.date);
            if ("Present".localeCompare(item.status) == 0) {
                present++;
                classAttended.push(++classAttendedCounter);
            }
            if ("Absent".localeCompare(item.status) == 0) {
                absent++;
                classAttended.push(classAttendedCounter);
            }
            if ("Leave of Absence".localeCompare(item.status) == 0) {
                leaveOfAbsence++;
                classAttended.push(classAttendedCounter);
            }
        }
    });
    const percentage = getPercentage(present, absent, leaveOfAbsence, totalClasses);
    return { courseName, totalClasses, present, absent, leaveOfAbsence, percentage, dates, classAttended };
}

export function getAbsentSummary(data, cource) {
    const absentSummary = [];
    data.forEach(item => {
        if (cource.localeCompare(item.courseName) == 0) {
            if ("Absent".localeCompare(item.status) == 0) {
                absentSummary.push({ date: item.date, time: item.time })
            }
        }
    });
    return absentSummary;
}

export function getLeaveOfAbsenceSummary(data, cource) {
    const absentSummary = [];
    data.forEach(item => {
        if (cource.localeCompare(item.courseName) == 0) {
            if ("Leave of Absence".localeCompare(item.status) == 0) {
                absentSummary.push({ date: item.date, time: item.time })
            }
        }
    });
    return absentSummary;
}