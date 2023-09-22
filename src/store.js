import { create } from "zustand";

const useStore = create((set) => ({
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
