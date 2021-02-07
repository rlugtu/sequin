import React, {useState} from 'react'
import axios from 'axios'
import styles from './css/AddCard.module.css'
const AddCard = (props) => {
    const[cardName, setCardName] = useState('')
    const[cardLimit, setCardLimit] = useState('')

    const handleSubmit = (e) => {
       e.preventDefault()
       axios.post('/api/v1/cards', {
           'name': cardName,
           'availible_balance': cardLimit,
           'limit': cardLimit
       })
       .then((res)=> {
           console.log(res)
       })
       .then((res) => {
           props.getCards()
           props.setShowForm(false)
       })
       .catch((err) => {
           console.log(err)
       })
    }
    return (
        <div className={styles.addCardContainer}>
            <form 
            onSubmit={(e) => handleSubmit(e)}className={styles.form}>
                <label>Card Name</label>
                <input type="text" value={cardName} onChange={(e) => setCardName(e.target.value)}/>
                <label>Limit</label>
                <input type="number" 
                 step="0.01"
                value={cardLimit} onChange={(e) => setCardLimit(e.target.value)}/>
                <input type="submit" value="Submit"/>

            </form>
        </div>
    )
}

export default AddCard