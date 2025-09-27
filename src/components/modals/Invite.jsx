import React from "react";
import { Trash } from "lucide-react";
import style from '../../styles/modals/invite.module.css'
import { timeFomartLocalTime } from "../../utils/times";


function Invite({ invite }) {

  const formatTime = timeFomartLocalTime(invite.invited_at)

  return (
    <div className={style.memberContainer}>
      <div className={style.memberSecOne}>
        <h3> { invite.email } </h3>
        <span> Joined at {formatTime}</span>
      </div>

      <div className={style.memberSecTwo}>{ invite.role }</div>

      <div className={style.iconRemove}>
        <Trash />
      </div>
    </div>
  );
}

export default Invite;
