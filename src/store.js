import { create } from "zustand";

const useStore = create((set) => ({
    schedule: { title: "", courses: [] },
    setSchedule: (schedule) => set({ schedule }),
    updateExisitingCourse: (oldCourse, newCourse) => {
        // calculate the key of the course
        const old_key = oldCourse.term[0] + oldCourse.number;
        const new_key = newCourse.term[0] + newCourse.number;
        // update the course in the schedule using the key
        set((state) => {
            const updatedSchedule = { ...state.schedule };
            // remove the old course
            delete updatedSchedule.courses[old_key];
            // add the new course
            updatedSchedule.courses[new_key] = newCourse;
            return { schedule: updatedSchedule };
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
