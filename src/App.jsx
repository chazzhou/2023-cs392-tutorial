import React from "react";

import './App.css';

import Banner from './components/Banner';
import {CourseList, SkeletonCourseList} from './components/CourseList';
import TermSelector from "./components/TermSelector";
import ScheduleModal from "./components/ScheduleModal";

const fetchJSON = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) throw response;
    return await response.json();
  } catch (error) {
    console.error(error);
  }
}


const App = () => {
  const [schedule, setSchedule] = React.useState({ title: "", courses: [] });

  React.useEffect(() => {
    fetchJSON('https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php').then(data => {
      if (data) setSchedule(data);
    });
  }, []);


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
