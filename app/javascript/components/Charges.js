import React, {useState, useEffect} from 'react'
import styles from './css/Card.module.css'
const Charges = (props) => {
    return (
        <div className={styles.chargeContainer}>
            {props.charge.attributes.charge_amount && (
                <p>-{props.charge.attributes.charge_amount}</p>
            )}
        </div>
    )
}

export default Charges