import React, { useState } from "react";
import { InCont } from "./InCont";
import { OutCont } from "./OutCont";
import "../../styles/Calculadora.css";




export const Calculadora = (props) => {

    const [isShown, setIsShown] = useState("DragMap"); 

       const [inLat, setInLat] = useState("Lat");
       const [updateRad, setUpdateRad] = useState(0);

       const [valSistOg, setValSistOg] = useState("Cargando valSistOg ...");
       const [tamanoSs, setTamanoSs] = useState("Calculando ...");

       const [porAhoSs, setPorAhoSs] = useState("Calculando ...");

       const [contAmb, setContAmb] = useState("Calculando ...");



  return (
    <div id="calculadora">
      <div className="container">
              <div  className="calculadora">
                <h1>CALCULADORA DE SISTEMAS SOLARES</h1>
                <h1></h1>
                <InCont inLat={inLat} setInLat={setInLat} updateRad={updateRad} setUpdateRad={setUpdateRad} isShown={isShown} setIsShown={setIsShown} valSistOg={valSistOg} setValSistOg={setValSistOg} tamanoSs={tamanoSs} setTamanoSs={setTamanoSs} data={props.data} porAhoSs={porAhoSs} setPorAhoSs={setPorAhoSs} contAmb={contAmb} setContAmb={setContAmb}/>
                {isShown==="OutCont" &&<OutCont inLat={inLat} isShown={isShown} setIsShown={setIsShown} valSistOg={valSistOg} setValSistOg={setValSistOg} porAhoSs={porAhoSs} setPorAhoSs={setPorAhoSs} contAmb={contAmb} setContAmb={setContAmb}/> }    
              </div>
      </div>
    </div>
   
  );
};