import React, { useEffect, useState } from "react";
import { Trash } from "lucide-react";
import style from '../../styles/modals/invite.module.css'
import Spinner from "../Spinner";

import { timeFomartLocalTime} from '../../utils/times'

function EachMember({ member }) {

  const [loading, setLoading] = useState(false)

  const formatTime = timeFomartLocalTime(member.joined_at)

  return (
    <div className={style.memberContainer} key={member.id} >
      <div className={style.memberSecOne}>
        <h3> { member.name } </h3>
        <span> Joined at {formatTime} </span>
      </div>

      <div className={style.memberSecTwo}>{ member.role}</div>

      <div className={style.iconRemove}>
        { loading ? <Spinner/> : <Trash/> }
      </div>
    </div>
  );
}

export default EachMember;
