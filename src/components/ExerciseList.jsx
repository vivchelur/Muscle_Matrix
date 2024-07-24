import '../stylesheets/my_workouts.css'
import { useEffect, useRef, useState } from 'react';
import { CardDisplay } from './CardDisplay';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';

export function ExerciseList(props) {

    const cardList = props.cardList;
    const setCardList = props.setCardList;

    const addNewCard = props.addNewCard;
    const setAddNewCard = props.setAddNewCard;

    const filterList = props.filterList;

    const defaultCard = new CardInfo("", 0, 0, 0, []);
    const cci = useRef(-1);
    const currentCard = useRef(defaultCard);
    const [currentTags, setCurrentTags] = useState([]);

    const searchBar = props.searchBar;

    const checkBox = props.checkBox;
    const trashable = props.trashable;

    const [showModal, setShowModal] = useState(false);
    const [showAlert, setShowAlert] = useState(false);

    useEffect(() => {
        if(addNewCard) {
            displayModal(-1);
        }
        currentCard.current = (cci.current == -1) ? defaultCard : cardList[cci.current];
    }, [addNewCard, cci.current])

    useEffect(() => {
        if(showModal) {
            document.getElementById('name').readOnly = cci.current !== -1;
        }
    }, [showModal])

    function displayModal(index) {
        cci.current = index;
        currentCard.current = (cci.current == -1) ? defaultCard : cardList[cci.current];
        setCurrentTags([...currentCard.current.tags]);
        setShowModal(true);
    }
    function noDisplayModal() {
        setCurrentTags([]);
        cci.current = -1;
        if(addNewCard !== undefined) {
            setAddNewCard(false);
        }
        setShowModal(false);
    }

    function uniqueName(n) {
        for(let i = 0; i < cardList.length; i++) {
            if(cardList[i].name === n) return false;
        }
        return true;
    }

    function changeCard(index) {
        const newName = document.getElementById('name').value;
        if(!uniqueName(newName) && cci.current === -1) {
            return;
        }
        const newWeight = document.getElementById('weight').value;
        const newReps = document.getElementById('reps').value;
        const newSets = document.getElementById('sets').value;
        const newTags = [...currentTags];
        const newCard = new CardInfo(newName, newWeight, newReps, newSets, newTags);
        const newCardList = [...cardList];

        if(filterList !== undefined) {
            const i = filterList.indexOf(cardList[index]);
            if(i !== -1) filterList[i] = newCard;
        }

        if(index == -1) {
            newCardList.push(newCard);
        } else {
            newCardList[index] = newCard;
        }

        setCardList(newCardList);
        noDisplayModal();
    }

    function deleteCard(index) {
        const newCardList = cardList.filter((_, i) => i !== index);
        setCardList(newCardList);
        noDisplayModal();
    }

    function addTag() {
        const text = document.getElementById('tag').value;
        if(text != "") {
            setCurrentTags(t => [...t, text]);
            document.getElementById('tag').value = "";
        }
    }

    function deleteTag(index) {
        const updatedTags = currentTags.filter((_, i) => i !== index);
        setCurrentTags(updatedTags);
    }

    function filterByName(card) {
        if(searchBar === undefined) return true;
        return card.name.toLowerCase().includes(searchBar.toLowerCase());
    }
    
    function filterByTags(card) {
        if(searchBar === undefined) return true;
        const lt = card.tags.map((t, _) => t.toLowerCase());
        return lt.includes(searchBar.toLowerCase());
    }
    
    function filterByList(card) {
        if(filterList === undefined) {
            return true;
        }
        for(let i = 0; i < filterList.length; i++){
            if(filterList[i].name === card.name) return true;
        }
        return false;
    }

    return(<>
    <Modal show={showModal} onHide={noDisplayModal} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className='bg-dark'>
        <Modal.Title id="contained-modal-title-vcenter" className='d-flex align-items-center justify-content-center'>
            <input type='text' defaultValue={currentCard.current.name} placeholder='Exercise name' className='modal-title bg-dark' id='name'/>
            <button className='delete-button-modal bg-dark' onClick={() => deleteCard(cci.current)} style={{display: (cci.current === -1 || !trashable) ? 'none' : 'block'}}>
                <img src='src/assets/trash.png' width='18px' height='25px'></img>
            </button>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example bg-dark">
        <div className='d-flex flex-column text-center'>
            <div className='m-2'>
                <p className='modal-info-text'>Weight:</p>
                <input type='number' className='modal-info-input bg-dark' defaultValue={currentCard.current.weight} id='weight' maxLength='3'></input>
                <p className='modal-info-text'>Reps:</p>
                <input type='number' className='modal-info-input bg-dark' defaultValue={currentCard.current.reps} id='reps' maxLength='3'></input>
                <p className='modal-info-text'>Sets:</p>
                <input type='number' className='modal-info-input bg-dark' defaultValue={currentCard.current.sets} id='sets' maxLength='3'></input>
            </div>

            <div className='m-2'>
                <p className='modal-info-text'>Add tags:</p>
                <input type='text' className='modal-tags-input bg-dark' id='tag'></input>
                <button className='modal-tags-button' onClick={addTag}>+</button>
            </div>

            <div>
                <ul className='tag-list'>
                    {currentTags.map((tag, index) =>
                        <li className='tag-item' key={index} onClick={() => deleteTag(index)}>
                            {tag}
                        </li>
                    )}
                </ul>
            </div>
        </div>
      </Modal.Body>
      <Modal.Footer className='bg-dark'>
        <button className='modal-buttons' onClick={() => changeCard(cci.current)}>Save</button>
        <button className='modal-buttons' onClick={noDisplayModal}>Close</button>
      </Modal.Footer>
    </Modal>

    <div>
        <Stack className='mt-3'>
            {cardList.map((card, index) => {
                const displayable = (filterByName(card) || filterByTags(card)) && filterByList(card);
                if(displayable) {
                    if(checkBox) {
                        return(
                            <div key={index} className='d-flex align-items-center justify-content-center'>
                                  <label className="check-box">
                                    <input type="checkbox"/>
                                    <span className="checkmark"></span>
                                    </label>
                                <div className='card-item-new' key={index} onClick={() => displayModal(index)}>
                                    <CardDisplay name={card.name} weight={card.weight} reps={card.reps} sets={card.sets}/>
                                </div>
                            </div>
                        );
                    } else {
                        return(
                        <div className='card-item' key={index} onClick={() => displayModal(index)}>
                        <CardDisplay name={card.name} weight={card.weight} reps={card.reps} sets={card.sets}/>
                        </div>);
                    }
                } else {
                    return(
                    <div className='card-item-no-display' key={index} onClick={() => displayModal(index)}>
                        <CardDisplay name={card.name} weight={card.weight} reps={card.reps} sets={card.sets}/>
                    </div>);
                }
            }
            )}
        </Stack>
    </div>

    </>);
}

class CardInfo {
    constructor(name, weight, reps, sets, tags) {
        this.name = name;
        this.weight = weight;
        this.reps = reps;
        this.sets = sets;
        this.tags = tags;
        this.check = false;
    }
};