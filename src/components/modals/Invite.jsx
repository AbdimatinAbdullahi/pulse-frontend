import React, { useState } from "react";
import { Trash } from "lucide-react";
import style from '../../styles/modals/invite.module.css'
import { timeFomartLocalTime } from "../../utils/times";
import Spinner from "../Spinner";
import { useSpace } from "../../context/SpaceContext";


function Invite({ invite }) {

  const [ Loading, setLoading ] = useState(false)
  
  const formatTime = timeFomartLocalTime(invite.InvitedAt)

  const { id, email } = invite
  const { hanleCancelInvitation  } = useSpace()

  console.log("Invite ", invite)

  console.log("Invite structure outloook: ", invite)

  const handleRemoveUser = async ()=>{
    
    setLoading(true)
    
    const result = await hanleCancelInvitation(id)
    
    console.log("Results of remove: ", result)  
    
    setLoading(false)  
  }


  return (
    <div className={style.memberContainer} key={invite?.id} >
      <div className={style.memberSecOne}>
        <h3> { invite.email } </h3>
        <span> Joined at {formatTime} </span>
      </div>

      <div className={style.memberSecTwo}>{ invite.role }</div>

      <div className={style.iconRemove} onClick={handleRemoveUser} >
        { Loading ? <Spinner/>  : <Trash/> }
      </div>
    </div>
  );
}

export default Invite;
