import '../stylesheets/exercise_library.css'
import { useRef, useState, useEffect } from 'react';
import { NavBar } from '../components/Navbar'
import { ExerciseList } from '../components/ExerciseList';
import { useNavigate } from 'react-router-dom';
import deadlift from '../assets/deadlift.png'

export function ExerciseLibrary(props) {

    const isAuthenticated = props.isAuthenticated;
    const navigate = useNavigate();

    const cardList = props.cardList;
    const setCardList = props.setCardList;
    const [addNewCard, setAddNewCard] = useState(false);
    const [searchBar, setSearchBar] = useState("");
    function changeSearchContents(event) {
        setSearchBar(event.target.value);
    }

    useEffect(() => {
        if(!isAuthenticated) {
            navigate('/')
        }
    }, [])

    return(<div className='exercise-library-body'>

        <NavBar></NavBar>

        <div className='d-flex flex-column align-items-center'>
            <h1 className='exercise-lib-title'>Exercise Library</h1>
            <img className='exercise-lib-pic' src={deadlift} width='130px' height='130px'></img>
        </div>

        <div className='exercise-search-contents'>
        <input type='text' className='exercise-search-bar' value={searchBar} onChange={changeSearchContents} placeholder='Search for an exercise...'></input>
        <button className='exercise-add-button' onClick={() => setAddNewCard(true)}>+</button>
        </div>

        <ExerciseList
        cardList={cardList}
        setCardList={setCardList}
        addNewCard={addNewCard}
        setAddNewCard={setAddNewCard}
        searchBar={searchBar}
        trashable={true}
        />
        
    </div>);
}