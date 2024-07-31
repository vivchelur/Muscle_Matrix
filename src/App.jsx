import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Today } from './pages/Today';
import { MyWorkouts } from './pages/MyWorkouts';
import { ExerciseLibrary } from './pages/ExerciseLibrary';

import {Amplify} from 'aws-amplify';
import awsExports from './aws-exports';
import { get } from 'aws-amplify/api'

Amplify.configure(awsExports);


function App() {
  const [cardList, setCardList] = useState(() => {
    const localExercises = localStorage.getItem("exercises");
    return localExercises === null ? [] : JSON.parse(localExercises);
  });
  const [workoutList, setWorkoutList] = useState(() => {
    const localWorkouts = localStorage.getItem("workouts");
    return localWorkouts === null ? [] : JSON.parse(localWorkouts);
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [newSession, setNewSession] = useState(false); //will come in handy when i fetch from database
  const [username, setUsername] = useState("");

  useEffect(() => {
    if(isAuthenticated) {
      getLocalData();
    }
  }, [isAuthenticated])

  function getLocalData() {
    const localExercises = localStorage.getItem("exercises");
    setCardList(localExercises === null ? [] : JSON.parse(localExercises));
    const localWorkouts = localStorage.getItem("workouts");
    setWorkoutList(localWorkouts === null ? [] : JSON.parse(localWorkouts));
  }

  function setLocalData() {
    localStorage.setItem("exercises", JSON.stringify(cardList));
    localStorage.setItem("workouts", JSON.stringify(workoutList));
  }

  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login 
          setIsAuthenticated={setIsAuthenticated}
          setUsername={setUsername}
          setNewSession={setNewSession}
          />}/>
          <Route path='/signup' element={<SignUp 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated}
          username={username}
          setUsername={setUsername}
          />}/>
          <Route path='/today' element={<Today
          cardList={cardList} 
          setCardList={setCardList} 
          workoutList={workoutList}
          isAuthenticated={isAuthenticated}
          />}/>
          <Route path='/workouts' element={<MyWorkouts 
          cardList={cardList}
          setCardList={setCardList} 
          workoutList={workoutList} 
          setWorkoutList={setWorkoutList}
          isAuthenticated={isAuthenticated}
          />}
          />
          <Route path='/exercises' element={<ExerciseLibrary 
          cardList={cardList} 
          setCardList={setCardList}
          isAuthenticated={isAuthenticated}
          />}/>
        </Routes>
      </Router>
    </>

  );
}

export default App
