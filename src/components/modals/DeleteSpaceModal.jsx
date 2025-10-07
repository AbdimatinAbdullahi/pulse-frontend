import React from 'react'
import style from '../../styles/modals/delete.module.css'
import { Trash2 } from 'lucide-react'
import { useWorkspaceModal } from '../../context/WorkspaceModalContext'
function DeleteSpace() {

  const { openModal } = useWorkspaceModal()

  return (
    <div className={style.deleteContainer} >
        <div className={style.title}>
          <h2>Delete space</h2>
          <span> Only the creator of the space can delete the space </span>
        </div>
        <Trash2 size={40} className={style.trashIcon} onClick={()=>openModal("deleteModal")} />
    </div>
  )
}

export default DeleteSpace