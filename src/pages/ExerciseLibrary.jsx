import '../stylesheets/exercise_library.css'
import { useRef, useState } from 'react';
import { NavBar } from '../components/Navbar'
import { ExerciseList } from '../components/ExerciseList';

export function ExerciseLibrary(props) {

    const cardList = props.cardList;
    const setCardList = props.setCardList;
    const [addNewCard, setAddNewCard] = useState(false);

    const [searchBar, setSearchBar] = useState("");
    const nameOrTag = useRef(true); //true for name false for tag
    function changeSearchContents(event) {
        setSearchBar(event.target.value);
    }


    return(<div className='exercise-library-body'>

        <NavBar></NavBar>

        <div className='d-flex flex-column align-items-center'>
            <h1 className='exercise-lib-title'>Exercise Library</h1>
            <img className='exercise-lib-pic' src='src/assets/deadlift.png' width='130px' height='130px'></img>
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
        nameOrTag={nameOrTag}
        editCards={true}
        />
        
    </div>);
}