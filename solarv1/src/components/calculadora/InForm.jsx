import React from "react";

import { useForm } from "react-hook-form";
import "../../styles/InForm.css";


                 

export const InForm = (props) => {





    const { register, handleSubmit} = useForm ({
      defaultValues: {
        //lat: '175',
        //lon: '-70',
        //rad: window.radVar,
        area: '20',
        //ori: 'norte',
        //inc: '10°',
        inmueble: 'residencial',
        tarifa: '0.2347',
        excedente: '0.06',
        consumo: '1300'
      }
    })

    const onSubmit = (datainform) => {

      props.setInLat(datainform.lat);

      props.setIsShown("OutCont");

      window.location.href = '/#calculadora';

      props.setTamanoSs(datainform.consumo / window.radVar);

     
      props.setValSistOg(props.data.valkwpog * (datainform.consumo / window.radVar));

      console.log(datainform);

      //Cálculo del ahorro aproximado

      props.setPorAhoSs(12 * datainform.tarifa * (datainform.consumo / window.radVar));

      //Cálculo de la contribución ambiental

      //props.setContAmb(12*datainform.consumo*(window.factorTco2/1000));
      props.setContAmb(12*datainform.consumo*(window.factorTco2/1000));


      
    }

   


    return (

     
      <div className="inform">
          <h2>Por favor ingresa la siguiente información</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/*
            <div>
               Este es un comentario en React <label>Ubicación (Latitud)</label>
              <input type="text" {...register('lat', {
                required: true,
                maxLength: 10
              })}/>
              {errors.lat?.type === 'required' && <p>El campo es requerido</p>}
              {errors.lat?.type === 'maxLength' && <p>El campo debe tener menos de 10 caracteres</p>}
            </div>
            <div>
              <label>Ubicación (Longitud)</label>
              <input type="text" {...register('lon')}/>
            </div>

            <div>
              <label>Radiación promedio {window.radVar}</label>
              <input type="text" {...register('rad', {
                required: true,
                maxLength: 10
              })} defaultValue={props.updateRad}/>
              {errors.rad?.type === 'required' && <p>El campo es requerido</p>}
              {errors.rad?.type === 'maxLength' && <p>El campo debe tener menos de 10 caracteres</p>}
            </div>

            */}

            <div>
              <label>Área disponible para paneles ( m2 )</label>
              <input type="text" {...register('area')}/>
            </div>
            {/*
            <div>
              <label>Orientación aproximada tejado</label>
              <input type="text" {...register('ori')}/>
            </div>
            <div>
              <label>Inclinación aproximada tejado</label>
              <input type="text" {...register('inc')}/>
            </div>
            */}
            <div>
              <label>Tipo de inmueble</label>
              <select {...register('inmueble')}>
                <option value="residencial">Residencial</option>
                <option value="empresarial">Empresarial</option>
              </select>
            </div>
            <div>
              <label>Tarifa energía ( EUR / kWH )</label>
              <input type="text" {...register('tarifa')}/>
            </div>
            <div>
              <label>Precio excedente ( EUR / kWh )</label>
              <input type="text" {...register('excedente')}/>
            </div>
            <div>
              <label>Consumo promedio mes ( kWh )</label>
              <input type="text" {...register('consumo')}/>
            </div>
            <input type="submit" value="Enviar"></input>
          </form>
      </div>
    
    );
  };
