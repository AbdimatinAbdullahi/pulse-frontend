import React, { useState } from "react";
import { Trash } from "lucide-react";
import style from '../../styles/modals/invite.module.css'
import { timeFomartLocalTime } from "../../utils/times";
import Spinner from "../Spinner";
import { useSpace } from "../../context/SpaceContext";


function Invite({ invite }) {

  const [ Loading, setLoading ] = useState(false)
  
  const formatTime = timeFomartLocalTime(invite.InvitedAt)

  // get the invite id
  const { id } = invite

  const { hanleCancelInvitation  } = useSpace()

  console.log("Invite ", invite)

  const handleRemoveUser = async ()=>{
    
    setLoading(true)
    
    const result = await hanleCancelInvitation(id)

    setLoading(false)  
        
    console.log("Results of remove: ", result)  
    
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
