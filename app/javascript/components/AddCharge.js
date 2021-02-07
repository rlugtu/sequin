import React, {useState} from 'react'
import axios from 'axios'
import styles from './css/Charge.module.css'
const AddCharge = (props) => {
    const[cardInfo,setCardInfo] = useState(props.info)
    const[chargeAmount,setChargeAmount] = useState(0)
    const handleSubmit = (e) => {
        e.preventDefault()
       addCharge()
    }
    const addCharge =() => {
        if(cardInfo.attributes.availible_balance - chargeAmount > 0) {
            axios.post("/api/v1/charges", {
                "charge_amount": chargeAmount,
                "card_id":parseInt(cardInfo.id)
            })
            .then((res) => {
                console.log(res)
            })
            .then((res) => {
                updateCard()
            })
            .catch((err) => console.log(err))
        }
        else{
            console.log('exceeding balance')
            alert('cannot process transaction (exceeding limit)')
        }
        
    }
    const updateCard = () => {
        // console.log(cardInfo.attributes.availible_balance)
        if(cardInfo.attributes.availible_balance - chargeAmount > 0) {
            axios.put(`/api/v1/cards/${cardInfo.id}`, {
                "availible_balance": (cardInfo.attributes.availible_balance - chargeAmount)
            })
            .then((res) => {
                console.log(res)
                props.getCardInfo()
                props.setShowChargeForm(false)
            })
            .catch((err) => console.log(err))
        }
       else {
           return false
       }
    }
    return(
        <div className={styles.chargeForm}>
            <form 
                onSubmit={(e) => handleSubmit(e)}className={styles.form}>
                <label className={styles.label}>Charge Amount: </label>
                <input type="number" 
                value={chargeAmount} onChange={(e) => setChargeAmount(e.target.value)}
                step="0.01"
                />
                <input type="submit" value="Submit"
                className={styles.button}
                />
            </form>
            <button className={styles.button}
            onClick={() => props.setShowChargeForm(false)}
            >Cancel</button>
        </div>
    )
}

export default AddCharge