import React, { useState } from "react";
import { Trash } from "lucide-react";
import style from '../../styles/modals/invite.module.css'
import { timeFomartLocalTime } from "../../utils/times";
import Spinner from "../Spinner";


function Invite({ invite }) {

  const [ Loading, setLoading ] = useState(false)
  console.log("Invite: ", invite)
  const formatTime = timeFomartLocalTime(invite.InvitedAt)

  const handleRemoveUser = async ()=>{
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
    }, 2000);
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
