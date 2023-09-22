import { React, useEffect } from "react";

import './App.css';
import useStore from "./store";
import { useDbData } from "./utils/firebase";

import { CourseList, SkeletonCourseList } from './components/CourseList';
import Navigation from "./components/Navigation";

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
        <Navigation title={schedule.title}/>
        {schedule.title ? <CourseList courses={schedule.courses} /> : <SkeletonCourseList />}
      </header>
    </div>
  );
};

export default App;
