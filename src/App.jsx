import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Today } from './pages/Today';
import { MyWorkouts } from './pages/MyWorkouts';
import { ExerciseLibrary } from './pages/ExerciseLibrary';

import {Amplify} from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);


function App() {
  //all the global variables
  const [cardList, setCardList] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated}
          username={username}
          setUsername={setUsername}
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
