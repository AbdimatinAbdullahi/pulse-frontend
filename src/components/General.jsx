import React from 'react'
import style from '../styles/components/general.module.css'

import { useSpaceContext } from '../context/SpaceContext'

function General() {

  const { state } = useSpaceContext()

  return (
    <div className={style.generalContainer}>
        <div className={style.membersContainer}>
          <div className={style.activeMembers}>
              <h2> Members of {state.activespace.Space.name} </h2>
          </div>

          <div className={style.activeInvitations}>
              <h2> Pending invitations to {state.activespace.Space.name} </h2>

          </div>

        </div>

        <div className={style.dangerContainer}>

        </div>
    </div>
  )
}

export default General