import { React, useEffect } from "react";

import './App.css';
import useStore from "./store";
import { useDbData } from "./utils/firebase";

import Banner from './components/Banner';
import { CourseList, SkeletonCourseList } from './components/CourseList';
import TermSelector from "./components/TermSelector";
import ScheduleModal from "./components/ScheduleModal";

const App = () => {
  const schedule = useStore(state => state.schedule);
  const setSchedule = useStore(state => state.setSchedule);

  // set schedule on first render from database
  const [data, error] = useDbData("/");
  useEffect(() => {
    if (data && !schedule.title) {
      setSchedule(data);
    }
  }, [data, schedule.title, setSchedule]);

  return (
    <div className="App">
      <header className="App-header">
        <Banner title={schedule.title} />
        <TermSelector />
        <ScheduleModal />
        {schedule.title ? <CourseList courses={schedule.courses} /> : <SkeletonCourseList />}
      </header>
    </div>
  );
};

export default App;
