import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Today } from './pages/Today';
import { MyWorkouts } from './pages/MyWorkouts';
import { ExerciseLibrary } from './pages/ExerciseLibrary';

function App() {
  //all the global variables
  const [cardList, setCardList] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/today' element={<Today cardList={cardList} setCardList={setCardList} workoutList={workoutList}/>}/>
          <Route path='/workouts' element={<MyWorkouts 
          cardList={cardList} setCardList = {setCardList} workoutList={workoutList} setWorkoutList={setWorkoutList}/>}
          />
          <Route path='/exercises' element={<ExerciseLibrary cardList={cardList} setCardList = {setCardList}/>}/>
        </Routes>
      </Router>
    </>

  );
}

export default App
