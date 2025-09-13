import React from 'react'
import style from '../styles/modals/payment.module.css'
import { X } from 'lucide-react'

import { useSpaceContext } from '../context/SpaceContext'

function PaymentModal( { onClose }) {

  const { state } = useSpaceContext()
  const { activespace } = state

  return (
    <div className={style.modalOverlay}>
        <div className={style.paymentModalContainer}>
            <X onClick={onClose} className={style.Icon} />
            <h2> Youre upgrading workspace {activespace.Space.name} </h2>
        </div>
    </div>
  )
}

export default PaymentModal