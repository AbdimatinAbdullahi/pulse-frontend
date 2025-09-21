import React from 'react'
import style from '../styles/modals/user.module.css'
import { X } from 'lucide-react'

function UserModal({ onClose }) {
  return (
    <div className={style.userOverLay} >
        <div className={style.userModalContainer} >
            <X onClick={onClose} className={style.icon} />
        </div>
    </div>
  )
}

export default UserModal