import { create } from "zustand";

const useStore = create((set) => ({
    terms: ["Fall", "Winter", "Spring"],
    term: "Fall",
    setTerm: (term) => set({ term }),
    selectedCourses: [],
    setCourses: (course) =>
        set((state) => ({
            selectedCourses: state.selectedCourses.includes(course)
                ? state.selectedCourses.filter((x) => x !== course)
                : [...state.selectedCourses, course],
        })),
}));

export default useStore;
