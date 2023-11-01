import { React, useEffect } from "react";

import './App.css';
import useStore from "./store";
import { getDbData } from "./utils/firebase";

import { CourseList, SkeletonCourseList } from './components/CourseList';
import Navigation from "./components/Navigation";
import { useAuthState } from './utils/firebase';

const App = () => {
  const schedule = useStore(state => state.schedule);
  const setSchedule = useStore(state => state.setSchedule);
  const [user] = useAuthState();

  useEffect(() => {
    if (!schedule.title) {
      getDbData("/").then((data) => {
        setSchedule(data);
      }).catch((error) => {
        console.log(error);
      });
    }
  }, [user, schedule.title, setSchedule]);

  return (
    <div className="App">
      <div className="App-container">
        <Navigation title={schedule.title} />
        {schedule.title ? <CourseList courses={schedule.courses} /> : <SkeletonCourseList />}
        {!user && <p className="text-center text-2xl my-16" data-cy="login-prompt">Please sign in to continue.</p>}
      </div>
      <footer className="w-full my-4">
          <p className="text-center text-default-500 text-sm">Northwestern University</p>
          <p className="text-center text-default-500 text-sm">© 2023 Charles H. Zhou</p>
        </footer>
    </div>
  );
};

export default App;
