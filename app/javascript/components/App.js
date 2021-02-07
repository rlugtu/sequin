import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Card from './Card'
import AddCard from './AddCard'
import { hot } from 'react-hot-loader'
import styles from './css/App.module.css'
const App = () => {
    const [cards, setCards] = useState([])
    const[showForm, setShowForm] = useState(false)
    useEffect(() => {
        getCards()
    },[])

    const getCards = () => {
        axios.get('/api/v1/cards')
        .then(res => setCards(res.data.data))
        .catch(res => console.log(res))
    }
    return (
        <div className={styles.pageContainer}>
            <div className={styles.contentHeader}>
            <h1>My Cards</h1>
                <div className={styles.addCardButton}>
                    <h1  onClick={() => setShowForm(true)}>Add Card</h1>
                </div>
            </div>
            {showForm && (
                <div className={styles.addCardContainer}>
                    <AddCard
                    setShowForm={setShowForm}
                    getCards={getCards}/>
                    <div className={styles.closeButtonContainer}
                    >
                        <h1 className={styles.closeButton}onClick={() => setShowForm(!showForm)}>Close</h1>
                    </div>
                </div>
                
            )}
            {cards && (
                cards.map((card, i) => (
                    <Card
                        id={card.id}
                        key={i}
                        getCards={getCards}
                    />
                ))
            )}
        </div>
    )
}

export default App