import React from "react";

import { DragMap } from "./DragMap";
import { InForm } from "./InForm";
import "../../styles/InCont.css"

export const InCont = (props) => {

  


    return (
      <div className="incont">
          
          {props.isShown==="DragMap" &&<DragMap inLat={props.inLat} setInLat={props.setInLat} updateRad={props.updateRad} setUpdateRad={props.setUpdateRad} isShown={props.isShown} setIsShown={props.setIsShown}/>}
          {props.isShown==="InForm" && <InForm inLat={props.inLat} setInLat={props.setInLat} updateRad={props.updateRad} setUpdateRad={props.setUpdateRad} isShown={props.isShown} setIsShown={props.setIsShown} valSistOg={props.valSistOg} setValSistOg={props.setValSistOg} tamanoSs={props.tamanoSs} setTamanoSs={props.setTamanoSs} data={props.data} porAhoSs={props.porAhoSs} setPorAhoSs={props.setPorAhoSs} contAmb={props.contAmb} setContAmb={props.setContAmb} />}
          
      </div>
    );
  };