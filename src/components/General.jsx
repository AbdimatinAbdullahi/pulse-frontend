import React from 'react'
import style from '../styles/components/general.module.css'

import { useSpaceContext } from '../context/SpaceContext'
import { useWorkspaceModal } from '../context/WorkspaceModalContext'

function General() {

  const { state } = useSpaceContext()
  const { activespace } = state
  const { openModal } = useWorkspaceModal()

  return (
    <div className={style.generalContainer}>
        <div className={style.membersContainer}>
          <div className={style.activeMembers}>
              <h2> Members of {state.activespace.Space.name} </h2>

              {
               activespace.length > 0 ? activespace.Members.map((member)=>(
                  <div className={style.member}>

                  </div>
                )) : (
                  <div className={style.noMember}>
                      <h4>No Mmebers yet</h4>
                  </div>
                )
              }
              
          </div>

          <div className={style.activeInvitations}>
              <h2> Pending invitations to {state.activespace.Space.name} </h2>
                
                {
                  activespace.Invitations.length > 0 ? activespace.Invitations.map((invitee)=>(
                    <div className={style.member}>
                      
                    </div>
                  )) : (
                    <div className={style.noInvitation}>
                      <h4>No invitations yet</h4>
                    </div>
                  )
                }

                <button className={style.inviteButton} > Invite to space </button>
          </div>

        </div>

        <div className={style.dangerContainer}>
              <div className={style.leaveWorkspace}>
                  <button> Leave workspace </button>
                  <p> If you are no longer member of the space, leave the space </p>
              </div>
              <div className={style.deleteWorkspace}>
                  <button> Delete workspace </button>
                  <p> *This action is permanent and cant be reversed. You will lose all the data, members, messages and meetings </p>
              </div>
        </div>
    </div>
  )
}

export default General