import React from "react";

import '../../styles/DragMap.css';

export const DragMap = (props) => {


  //const URL = process.env.REACT_APP_BACKEND_URL || "http://localhost:4041";
  const URL = "http://localhost:4041";


  const forceUpdate = () => {
    props.setUpdateRad(window.radVar);

    console.log("window.latvar en Componente de calculadora DragMap es" + window.latVar);

    props.setIsShown("InForm");

    window.location.href = '/#calculadora';

                        const fetchData2 = async () => {
                          try {
                            let reeAPI=`https://apidatos.ree.es/es/datos/generacion/no-renovables-detalle-emisiones-CO2?start_date=2024-05-31T00:00&end_date=2024-05-31T23:59&time_trunc=day&systemElectric=nacional`                        
                            const response2 = await fetch(reeAPI,{method: "GET"});                          
                            const jsonData2 = await response2.json();
                            //setData(jsonData);                            
                            console.log("Esta es la info de jsonData dentro de ree")
                            console.log(jsonData2);

                                    // Encuentra la tecnología "tCO2 eq./MWh"
                                    const tCO2eqPerMWhData = jsonData2.included.find(item => item.type === "tCO2 eq./MWh");
                                    const tCO2eqPerMWhValue = tCO2eqPerMWhData.attributes.values[0].value;
                                    console.log(`Valor de tCO2 eq./MWh: ${tCO2eqPerMWhValue}`);
                                    window.factorTco2=tCO2eqPerMWhValue;


                                     

                          } catch (error) {
                            console.error('Error fetching2 data:', error);
                          }
                        };

                        fetchData2();



                        const fetchRad = async () => {
                          try {
                            let radAPI=`${URL}/eprad`;                        
                            const response3 = await fetch(radAPI,{method: "GET"});                  
                            const jsonData3 = await response3.json();                              
                            console.log("Esta es la info recibida de la consulta del frontend de radAPI"); 
                            console.log(jsonData3.eprad[0].eprad);     
                            window.radVar=jsonData3.eprad[0].eprad;                             

                          } catch (error) {
                            console.error('Error fetching Rad data:', error);
                          }
                        };

                        fetchRad();




                   





  };         



    return (
      <div className="dragmap">
          <h2>Arrastra el pin a la ubicación del proyecto</h2>
          <div id="map" style={{height: "40vh", width: "50vw"}}></div>
          <button className="dragmap" onClick={forceUpdate}>Continuar</button>
      </div>
    );
  };