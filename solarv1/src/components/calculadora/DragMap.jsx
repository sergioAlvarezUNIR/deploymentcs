import React from "react";

import '../../styles/DragMap.css';

export const DragMap = (props) => {



  const forceUpdate = () => {
    props.setUpdateRad(window.radVar);

    console.log("window.latvar en Componente de calculadora DragMap es" + window.latVar);

    props.setIsShown("InForm");

    window.location.href = '/#calculadora';

    

 


                        const fetchData = async () => {
                          try {
                            let pvgisAPI=`https://re.jrc.ec.europa.eu/api/v5_2/MRcalc?lat=${window.latVar}&lon=${window.lonVar}&horirrad=1&outputformat=json`;                        
                            const response = await fetch(pvgisAPI, {method: "GET",  mode: "cors"/* no-cors, *cors, same-origin*//*credentials: "include",  include, *same-origin, omit*/ /*headers: {"Content-Type": "json"}, *//*, referrerPolicy: "same-origin"  no-referrer,"unsafe-url", *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url*/ });                           

                            const jsonData = await response.json();
                            //setData(jsonData);
                            
                            console.log("Esta es la info de jsonData dentro de DragMAp")
                            console.log(jsonData);


                                                                // Obtén los valores de H(h)_m de cada mes
                                              const valoresHhm = jsonData.outputs.monthly.map(mes => mes["H(h)_m"]);
                                              
                                              // Calcula la suma de todos los valores
                                              const sumaValores = valoresHhm.reduce((acumulador, siguienteValor) => acumulador + siguienteValor, 0);
                                              
                                              // Calcula el promedio
                                              const promedioHhm = sumaValores / jsonData.outputs.monthly.length;
                                              
                                              console.log(`El promedio de H(h)_m es: ${promedioHhm} kWh/m2/mo`);

                                              window.radVar=promedioHhm;
                                              console.log("Esto es dentro de DragMap El promedio rad dentro de fetch es " + window.radVar);

                          } catch (error) {
                            console.error('Error fetching data:', error);
                          }
                        };

                        fetchData();





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

  };

    return (
      <div className="dragmap">
          <h2>Selecione la ubicación en el mapa</h2>
          <div id="map" style={{height: "40vh", width: "50vw"}}></div>
          <button className="dragmap" onClick={forceUpdate}>Continuar</button>
      </div>
    );
  };