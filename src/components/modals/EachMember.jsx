import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import style from '../../styles/modals/invite.module.css'
import Spinner from "../Spinner";
import { useSpace } from '../../context/SpaceContext'

import { timeFomartLocalTime} from '../../utils/times'
import { useAuth } from "../../context/AuthContext";

function EachMember({ member }) {

  const [ loading, setLoading ] = useState(false)

  const formatTime = timeFomartLocalTime(member.joined_at)
  const { handleRemoveMemberFromSpace } = useSpace()
  const { user } = useAuth()



  const handleRemoveMember = async ()=>{
     setLoading(true) 
     const result = await handleRemoveMemberFromSpace(member.id, member.space_id, user.id)
     if(result.success){
      alert("User Removed!")
     } else {
      alert("Removed failed!")
     }
  }

  return (
    <div className={style.memberContainer} key={member.id} >
      <div className={style.memberSecOne}>
        <h3> { member.name } </h3>
        <span> Joined at {formatTime} </span>
      </div>

      <div className={style.memberSecTwo}>{ member.role}</div>

      <div className={style.iconRemove} onClick={handleRemoveMember} >
        { loading ? <Spinner/> : <Trash/> }
      </div>
    </div>
  );
}

export default EachMember;
