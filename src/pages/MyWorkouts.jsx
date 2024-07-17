import '../stylesheets/exercise_list.css'
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import Modal from 'react-bootstrap/Modal';
import Dropdown from 'react-bootstrap/Dropdown';
import InputGroup from 'react-bootstrap/InputGroup';
import { NavBar } from "../components/Navbar";
import {useEffect, useRef, useState } from 'react';
import { Card, DropdownItem } from 'react-bootstrap';
import { ExerciseList } from '../components/ExerciseList';

export function MyWorkouts(props) {

    const cardList = props.cardList;
    const setCardList = props.setCardList;
    const workoutList = props.workoutList;
    const setWorkoutList = props.setWorkoutList;

    const defaultWorkout = new Workout("", []);
    const cwi = useRef(-1);
    const currentWorkout = useRef(defaultWorkout);
    const [currentExercises, setCurrentExercises] = useState([]);

    const [showModal, setShowModal] = useState(false);

    const [searchBar, setSearchBar] = useState("");
    function changeSearchContents(event) {
        setSearchBar(event.target.value);
    }

    useEffect(() => {
        currentWorkout.current = (cwi.current == -1) ? defaultWorkout : workoutList[cwi.current];
    }, [cwi.current])

    function displayModal(index) {
        cwi.current = index;
        currentWorkout.current = (cwi.current == -1) ? defaultWorkout : workoutList[cwi.current];
        setCurrentExercises([...currentWorkout.current.exercises]);
        setShowModal(true);
    }

    function noDisplayModal() {
        setCurrentExercises([]);
        cwi.current = -1;
        setShowModal(false);
    }

    function addWorkout(index) {
        const newName = document.getElementById('name').value;
        const newExercises = [...currentExercises];
        const newWorkout = new Workout(newName, newExercises);
        const newWorkoutList = [...workoutList];
        if(index == -1) {
            newWorkoutList.push(newWorkout);
        } else {
            newWorkoutList[index] = newWorkout;
        }
        setWorkoutList(newWorkoutList);
        noDisplayModal();

    }

    function addExercise(exercise) {
        if(!currentExercises.includes(exercise)) {
            setCurrentExercises(e => [...e, exercise]);
        }
    }

    function deleteExercise(index) {
        const updatedExercises = currentExercises.filter((_, i) => i !== index);
        setCurrentExercises(updatedExercises);
    }

    function filterByName(workout) {
        const fl = workoutList.filter((w, _) => w.name.toLowerCase().includes(searchBar.toLowerCase()));
        return fl.includes(workout);
    }

    function filterByExercise(workout) {
        const fl = workoutList.filter((w, _) => {
            const le = w.exercises.map((e, _) => e.name.toLowerCase());
            return le.includes(searchBar.toLowerCase());
        });

        return fl.includes(workout);
    }

    return(<div className="my-workouts-body">

        <NavBar></NavBar>

        <div className='d-flex flex-column align-items-center'>
            <h1 className='workout-lib-title'>My Workouts</h1>
            <img className='workout-lib-pic' src='src/assets/overhead_press.png' width='130px' height='130px'></img>
        </div>

        <div className='workout-search-contents'>
        <input type='text' className='workout-search-bar' value={searchBar} onChange={changeSearchContents} placeholder='Search for a workout...'></input>
        <button className='workout-add-button' onClick={() => displayModal(-1)}>+</button>
        </div>

        <Modal show={showModal} onHide={noDisplayModal} aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header className='bg-dark'>
            <Modal.Title id="contained-modal-title-vcenter">
            <input type='text' defaultValue={currentWorkout.current.name} placeholder="Workout name" className='workout-modal-title bg-dark' id='name'/>
            {/* <button className='workout-delete-button-modal'>Trash</button> */}
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="grid-example bg-dark">
                <div className='m-2 workout-modal-form'>
                    <p className='workout-modal-info-text'>Add Exercises:</p>
                    <WorkoutDropdown cardList={cardList} addToWorkout={addExercise}></WorkoutDropdown>
                </div>
                    <ul className='workout-tag-list'>
                        {currentExercises.map((exercise, index) =>
                            <li className='exercise-item' key={index} onClick={() => deleteExercise(index)}>
                                {exercise.name}
                            </li>
                        )}
                    </ul>
        </Modal.Body>
        <Modal.Footer className='bg-dark'>
            <button className='modal-buttons' onClick={() => addWorkout(cwi.current)}>Save</button>
            <button className='modal-buttons' onClick={noDisplayModal}>Close</button>
        </Modal.Footer>
        </Modal>


        <Accordion defaultActiveKey="0" className='mt-5' flush>
                {workoutList.map((workout, index) => {
                    const show = filterByName(workout) || filterByExercise(workout);
                return (<Card key={index} className='accordian-item' style={{display: show ? 'flex' : 'none'}}>
                        <Card.Header className='accordian-header'>
                        <p className='accordian-header-title' onClick={() => displayModal(index)}>{workout.name}</p>
                            <CustomToggle eventKey={index}>{workout.name}</CustomToggle>
                        </Card.Header>
                        <Accordion.Collapse eventKey={index}>
                            <Card.Body className='accordian-body'>
                                <ExerciseList cardList={cardList} setCardList={setCardList} filterList={workout.exercises}></ExerciseList>
                            </Card.Body>
                        </Accordion.Collapse>
                </Card>);
                }
                )};
        </Accordion>
    </div>);
}


function WorkoutDropdown(props) {
    const cardList = props.cardList;
    const addToWorkout = props.addToWorkout;
    const [filteredList, setFilteredList] = useState(cardList);
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchBar, setSearchBar] = useState("");
    const dropdownRef = useRef(null);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
          document.removeEventListener('mousedown', handleClickOutside);
        };
      }, []);

    useEffect(() => {
        const newList = cardList.filter((c) => c.name.toLowerCase().includes(searchBar.toLowerCase()));
        setFilteredList(newList);
    }, [searchBar]);

      function changeSearchContents(event) {
        setSearchBar(event.target.value);
      }

      function handleSelect(index) {
        addToWorkout(filteredList[index]);
        setShowDropdown(false);
      }

      const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
          setShowDropdown(false);
        }
      };


    return(<div ref={dropdownRef}>  
      <InputGroup>
        <input
          className='exercise-search-bar-for-workouts bg-dark'
          value={searchBar}
          onChange={changeSearchContents}
          onClick={() => setShowDropdown(true)}
        />
        <Dropdown.Menu show={showDropdown} className='custom-dropdown-menu'>
            {filteredList.map((card, index) =>
                <DropdownItem eventKey={index} key={index} onClick={() => handleSelect(index)}>{card.name}</DropdownItem>
            )}

        </Dropdown.Menu>
      </InputGroup>
      </div>);
}

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey);

    return(<div>

        <button className="accordian-header-button" onClick={decoratedOnClick}>V</button>

    </div>);
}

class Workout {
    constructor(name, exercises) {
        this.name = name;
        this.exercises = exercises;
    }
}