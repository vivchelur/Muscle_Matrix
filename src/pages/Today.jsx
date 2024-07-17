import '../stylesheets/today.css'
import { NavBar } from '../components/Navbar';
import { useState } from 'react';
import { ExerciseList } from '../components/ExerciseList';


export function Today(props) {

    const cardList = props.cardList;
    const setCardList = props.setCardList;
    const workoutList = props.workoutList;
    const [todayWorkout, setTodayWorkout] = useState(null);

    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currentDate = formatDate();

    const [note, setNote] = useState("");

    function formatDate() {
        const date = new Date();
        const weekDay = daysOfWeek[date.getDay()];
        const day = date.getDate();
        const month = date.getMonth();
        return weekDay + " " + month + "/" + day;
    }

    function changeNote(event) {
        setNote(event.target.value);
    }

    function setWorkout(index) {
        setTodayWorkout(workoutList[index]);
    }

    return(<div className='today-body'>
        <NavBar></NavBar>

        <div className='workout-title-container'>
        <h2 className='today-date'>{currentDate}</h2>
        <h1 className='today-workout-name'>{todayWorkout !== null ? todayWorkout.name : ""}</h1>
        <textarea 
        className='today-workout-note' 
        value={note} 
        onChange={changeNote} 
        placeholder='Enter a note...'
        rows={2}
        style={{visibility: todayWorkout !== null ? 'visible' : 'hidden'}}
        />
        </div>

        <div className='select-workout' style={{display: todayWorkout !== null ? 'none' : 'flex'}}>
            <p className='select-workout-text'>Select a workout:</p>
            <div className='today-workout-list'>
                {workoutList.map((workout, index) => 
                    <p className='today_workout_choice' key={index} onClick={() => setWorkout(index)}>{workout.name}</p>
                )}
            </div>
        </div>

        <div className='today-workout-display' style={{display: todayWorkout !== null ? 'block' : 'none'}}>
            <ExerciseList
                cardList={cardList}
                setCardList={setCardList}
                filterList={todayWorkout !== null ? todayWorkout.exercises : []}
                checkBox={true}
            />
        </div>



        
        </div>);

}