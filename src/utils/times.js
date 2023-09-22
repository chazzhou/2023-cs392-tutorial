const parseMeetingTime = (meetingString) => {
    const [days, time] = meetingString.split(' ');
    const [start, end] = time.split('-').map(t => {
        const [hours, minutes] = t.split(':').map(Number);
        return hours * 60 + minutes; // Convert to minutes for easy comparison.
    });
    return { days, start, end };
}

const timesOverlap = (start1, end1, start2, end2) => {
    return start1 < end2 && start2 < end1;
}

const daysOverlap = (days1, days2) => {
    for (let day of days1) {
        if (days2.includes(day)) return true;
    }
    return false;
}

const coursesConflict = (course1, course2) => {
    // If either course doesn't have a meeting time, they can't conflict.
    if (!course1.meets || !course2.meets) return false;

    const { days: days1, start: start1, end: end1 } = parseMeetingTime(course1.meets);
    const { days: days2, start: start2, end: end2 } = parseMeetingTime(course2.meets);

    // Check if courses meet in the same term, have overlapping days, and overlapping times.
    return course1.term === course2.term && daysOverlap(days1, days2) && timesOverlap(start1, end1, start2, end2);
}

const hasConflictWithSelected = (newCourse, selectedCourses) => {
    for (let selectedCourse of selectedCourses) {
        // if the new course already exists in the selected courses, return false
        if (selectedCourse === newCourse) {
            return false;
        }
        if (coursesConflict(newCourse, selectedCourse)) {
            return true;
        }
    }
    return false;
}

export default hasConflictWithSelected;
