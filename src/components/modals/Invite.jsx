import React from "react";
import { Trash } from "lucide-react";
import style from '../../styles/modals/invite.module.css'


function Invite() {
  return (
    <div className={style.memberContainer}>
      <div className={style.memberSecOne}>
        <h3> Ramla Hussien </h3>
        <span> Joined at 30 sep 2025 </span>
      </div>

      <div className={style.memberSecTwo}>Admin</div>

      <div className={style.iconRemove}>
        <Trash />
      </div>
    </div>
  );
}

export default Invite;
