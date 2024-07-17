import '../stylesheets/my_workouts.css'
import { useEffect, useRef, useState } from 'react';
import { CardDisplay } from './CardDisplay';
import Stack from 'react-bootstrap/Stack';
import Modal from 'react-bootstrap/Modal';

export function ExerciseList(props) {

    const cardList = props.cardList;
    const setCardList = props.setCardList;

    const addNewCard = props.addNewCard;
    const setAddNewCard = props.setAddNewCard;

    const nameOrTag = props.nameOrTag;
    const filterList = props.filterList;

    const defaultCard = new CardInfo("", 0, 0, 0, []);
    const cci = useRef(-1);
    const currentCard = useRef(defaultCard);
    const [currentTags, setCurrentTags] = useState([]);

    const searchBar = props.searchBar;

    const checkBox = props.checkBox;

    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        if(addNewCard) {
            displayModal(-1);
        }
        currentCard.current = (cci.current == -1) ? defaultCard : cardList[cci.current];
    }, [addNewCard, cci])

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

    function changeCard(index) {
        const newName = document.getElementById('name').value;
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
        if(nameOrTag === undefined || !nameOrTag) {
            return true;
        }
        return card.name.toLowerCase().includes(searchBar.toLowerCase());
    }
    
    function filterByTags(card) {
        if(nameOrTag === undefined || nameOrTag) {
            return true;
        }
        return card.tags.includes(searchBar);
    }
    
    function filterByList(card) {
        if(filterList === undefined) {
            return true;
        }
        return filterList.includes(card);
    }

    return(<>
    <Modal show={showModal} onHide={noDisplayModal} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header className='bg-dark'>
        <Modal.Title id="contained-modal-title-vcenter">
          <input type='text' defaultValue={currentCard.current.name} placeholder='Exercise name' className='modal-title bg-dark' id='name'/>
          {/* <button className='delete-button-modal' onClick={() => deleteCard(cci)}>Trash</button> */}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="grid-example bg-dark">
        <div className='d-flex flex-column text-center'>
            <div className='m-2'>
                <p className='modal-info-text'>Weight:</p>
                <input type='number' className='modal-info-input bg-dark' defaultValue={currentCard.current.weight} id='weight'></input>
                <p className='modal-info-text'>Reps:</p>
                <input type='number' className='modal-info-input bg-dark' defaultValue={currentCard.current.reps} id='reps'></input>
                <p className='modal-info-text'>Sets:</p>
                <input type='number' className='modal-info-input bg-dark' defaultValue={currentCard.current.sets} id='sets'></input>
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
                const displayable = filterByName(card) && filterByTags(card) && filterByList(card);
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