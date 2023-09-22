import { create } from "zustand";
const schdule = {
    "title": "CS Courses for 2018-2019",
    "courses": {
        "F101": {
            "term": "Fall",
            "number": "101",
            "meets": "MWF 11:00-11:50",
            "title": "Computer Science: Concepts, Philosophy, and Connections"
        },
    }
}
const useStore = create((set) => ({
    schedule: { title: "", courses: [] },
    setSchedule: (schedule) => set({ schedule }),
    updateExisitingCourse: (course) => {
        // first, calculate the key of the course
        const key = course.term + course.number;
        // then, update the course in the schedule using the key
        set((state) => {
            const { schedule } = state;
            schedule.courses[key] = course;
            return { schedule };
        });
    },
    terms: ["Fall", "Winter", "Spring"],
    term: "Fall",
    setTerm: (term) => set({ term }),
    selectedCourses: [],
    addCourse: (course) =>
        set((state) => ({
            selectedCourses: [...state.selectedCourses, course],
        })),
    removeCourse: (course) =>
        set((state) => ({
            selectedCourses: state.selectedCourses.filter((x) => x !== course),
        })),
}));

export default useStore;
