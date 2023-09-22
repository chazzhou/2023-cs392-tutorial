import { create } from "zustand";

const useStore = create((set) => ({
    terms: ["Fall", "Winter", "Spring"],
    term: "Fall",
    setTerm: (term) => set({ term }),
}));

export default useStore;
