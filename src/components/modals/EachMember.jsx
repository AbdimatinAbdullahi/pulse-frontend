import React, { useState } from "react";
import { Trash } from "lucide-react";
import style from '../../styles/modals/invite.module.css'
import Spinner from "../Spinner";

function EachMember({ index }) {

  const [loading, setLoading] = useState(false)


  return (
    <div className={style.memberContainer}>
      <div className={style.memberSecOne}>
        <h3> Ramla Hussien </h3>
        <span> Joined at 30 sep 2025 </span>
      </div>

      <div className={style.memberSecTwo}>Admin</div>

      <div className={style.iconRemove}>
        { loading ? <Spinner/> : <Trash/> }
      </div>
    </div>
  );
}

export default EachMember;
