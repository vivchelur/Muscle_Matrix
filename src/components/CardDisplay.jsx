import '../stylesheets/card_display.css'

export function CardDisplay(props) {

    return(<div className='bg-card-display'>
        <p className='name'>{props.name}</p>
        <div>
            <p className='number-info'>{props.weight}</p>
            <p className='number-info'>{props.reps}</p>
            <p className='number-info'>{props.sets}</p>
        </div>
    </div>);
}