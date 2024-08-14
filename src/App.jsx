import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import { Login } from './pages/Login';
import { SignUp } from './pages/SignUp';
import { Today } from './pages/Today';
import { MyWorkouts } from './pages/MyWorkouts';
import { ExerciseLibrary } from './pages/ExerciseLibrary';
import axios from 'axios';
import {Amplify} from 'aws-amplify';
import awsExports from './aws-exports';

Amplify.configure(awsExports);


function App() {
  const [cardList, setCardList] = useState([]);
  const [workoutList, setWorkoutList] = useState([]);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const client = useRef(axios.create({
    baseURL: 'https://asbgeuthsi.execute-api.us-east-2.amazonaws.com/dev'
  }));

  useEffect(() => {
    if(isAuthenticated) {
      fetchUserData();
    }
  }, [isAuthenticated])

  async function fetchUserData() {
    try {
        const response = await client.current.get('/user', {params: {username: username}});
        setCardList(response.data.exercises);
        setWorkoutList(response.data.workouts);
    } catch(error) {
        console.log(error);
    }
}

useEffect(() => {
  if(isAuthenticated) {
    updateUserData();
  }
}, [cardList, workoutList])

  async function updateUserData() {
    const body = {
      'exercises': cardList,
      'workouts': workoutList
    }
    try {
      const response = await client.current.put('/user', body, {params: {username: username}});
  } catch(error) {
      console.log(error);
  }
  }
  
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Login 
          setIsAuthenticated={setIsAuthenticated}
          setUsername={setUsername}
          client = {client}
          />}/>
          <Route path='/signup' element={<SignUp 
          isAuthenticated={isAuthenticated} 
          setIsAuthenticated={setIsAuthenticated}
          username={username}
          setUsername={setUsername}
          client = {client}
          />}/>
          <Route path='/today' element={<Today
          cardList={cardList} 
          setCardList={setCardList} 
          workoutList={workoutList}
          isAuthenticated={isAuthenticated}
          client = {client}
          />}/>
          <Route path='/workouts' element={<MyWorkouts 
          cardList={cardList}
          setCardList={setCardList} 
          workoutList={workoutList} 
          setWorkoutList={setWorkoutList}
          isAuthenticated={isAuthenticated}
          client = {client}
          />}
          />
          <Route path='/exercises' element={<ExerciseLibrary 
          cardList={cardList} 
          setCardList={setCardList}
          isAuthenticated={isAuthenticated}
          client = {client}
          />}/>
        </Routes>
      </Router>
    </>

  );
}

export default App
