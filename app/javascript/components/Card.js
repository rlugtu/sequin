import React, {useState, useEffect} from 'react'
import AddCharge from './AddCharge'
import Charge from './Charges'
import axios from 'axios'
import styles from './css/Card.module.css'
const Card = (props) => {
    const[info,setInfo] = useState(null)
    const[showChargeForm,setShowChargeForm] = useState(false)
    const[charges,setCharges] = useState(null)
    const[showCharges, setShowCharges] = useState(null)
    useEffect(() => {
       getCardInfo()
    },[])

    const getCardInfo = () => {
        axios.get('/api/v1/cards/'+props.id)
        .then(res => {
            setInfo(res.data)
            console.log(res.data.included)
            setCharges(res.data.included)
        
        })
        .catch(res => console.log(res.data))
    }
    const deleteCard = () => {
        axios.delete(`/api/v1/cards/${props.id}`)
        .then((res) => {
            console.log(res)
            props.getCards()
        })
        .catch((err) => {
            console.log(err)
        })
    }
    return (
        <div className={styles.cardContainer}>
            <div className={styles.addCardContainer}>

            </div>
        {info && (
            <div>
                <h1 className={styles.cardName}>{info.data.attributes.name}</h1>
                <div className={styles.accountInfo}>
                    <div className={styles.cardAmounts}>
                        <p className={styles.cardHeaders}>Availible Balance</p>
                        <p className={styles.cardResults}>${info.data.attributes.availible_balance}</p>

                    </div>
                    <div className={styles.cardAmounts}>
                        <p className={styles.cardHeaders}>Limit</p>
                        <p className={styles.cardResults}>${info.data.attributes.limit}</p>

                    </div>
                </div>
                {showCharges && (
                    <div className={styles.chargesContainer}>
                        {charges.map((charge,i)=> (
                            <Charge 
                            key={i}
                            charge={charge}
                            />
                            ))}
                    </div>
                    
                )}
                {showChargeForm &&
                <AddCharge 
                getCardInfo={getCardInfo}
                setShowChargeForm={setShowChargeForm}
                info={info.data}
                />
                }
                <div className={styles.cardButtons}>
                    <div className={styles.chargeButton}
                    onClick={()=> setShowChargeForm(true)}>
                        <p>Add Charge</p>
                    </div>
                    <div className={styles.chargeButton}
                    onClick={()=> setShowCharges(!showCharges)}>
                        <p>Charges</p>
                    </div>
                    <div className={styles.deleteButton}
                    onClick={()=> deleteCard()}>
                        <p>Delete Card</p>
                    </div>
                   
                </div>
                
            </div>
           
        )}
        </div>
    )
}

export default Card