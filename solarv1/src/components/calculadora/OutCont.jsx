import React, { useEffect } from "react";
import "../../styles/OutCont.css";

export const OutCont = (props) => {

  const fnRecalcular = () => {window.location.reload()};

  useEffect(() => {
  }, [props.valSistOg]);

    return (
      <div className="outcont">
        <h2>!Felicitaciones! Esta es la información de tu proyecto!</h2>
        <div className="cont">          
          <div className="cont_card">
          <p>El valor aproximado del proyecto de sistema solar es de</p>
          <h3>EUR$ {Number(props.valSistOg).toFixed(2)}</h3>       
          </div>
          <div className="cont_card">
          <p>El ahorro aproximado anualmente es de  </p> 
          <h3>% {Number(props.porAhoSs).toFixed(0)}</h3>
          </div>
          <div className="cont_card">
          <p>Tu contribución ambiental aproximada anualmente es de </p>
          <h3>{Number(props.contAmb).toFixed(2)} tCO2 </h3> 
          </div>
        </div>
        <button className="recargar" onClick={fnRecalcular}>Reiniciar</button>
      </div>
    );
  };