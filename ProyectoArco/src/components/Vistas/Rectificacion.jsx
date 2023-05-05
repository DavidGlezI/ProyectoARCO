
import { useState, useEffect } from "react";
import { useParams, Outlet, Link, json, useNavigate, Navigate } from "react-router-dom"; 
import '../../styles.css';

function Rectificacion(){
   const params = useParams();
   const userId= params.userId  

   const [data, setUserData] = useState({});
   const [dataTemp, setDataTemp] = useState({});
   
   

    
   const navigate = useNavigate();
   

   function handleClick(e){
    const newdata={...data}
    newdata[e.target.id] = e.target.value
    setUserData(newdata)
    console.log(newdata)
   }

   function handleSubmit(e){
    e.preventDefault();
    fetch(`/api/userA/${userId}`, {method:"PUT",   body:JSON.stringify(data), headers:{"Content-Type":"application/json"}})
    .then(fetch(`/api/peticiones/${userId}/R`, {method:"POST"}))
    .then(navigate("/"));
   }


    useEffect(()=>{
        async function dataFetch(){
            const data = await(await fetch(`/api/userA/${userId}`)).json();
            setUserData(data);
            setDataTemp(data);
        }
        dataFetch();
    }, [])

    
    
    return (
        <> 
        <div className="boxRect">
            <form onSubmit={(e)=> handleSubmit(e)}>
                        <div className='userRect'>
                            <div className="introRect">Datos de {dataTemp.user_fname} {dataTemp.user_first_lname} {dataTemp.user_second_lname}</div>
                            <div className="datosPersonalesRect">

                                <div className="primeraMitad">

                                    <label className="tipoDato">
                                            Nombre:
                                        <div>
                                            <input type="text"
                                            id="user_fname"
                                            value={data.user_fname}
                                            placeholder={data.user_fname}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Primer Apellido:
                                        <div>
                                            <input type="text"
                                            id="user_first_lname"
                                            value={data.user_first_lname}
                                            placeholder={data.user_first_lname} 
                                            defaultValue={data.user_first_lname} 
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Segundo Apellido:
                                        <div>
                                            <input type="text"

                                            id="user_second_lname"
                                            value={data.user_second_lname}
                                            placeholder={data.user_second_lname}
                                            defaultValue={data.user_second_lname} 
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Fecha de nacimiento:
                                        <div>
                                            <input type="date"

                                            id="born_date"
                                            value={data.born_data}
                                            placeholder={data.born_date}
                                            defaultValue={data.born_date}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Nacionalidad:
                                        <div>
                                            <input type="text"

                                            id="nationality"
                                            value={data.nationality}
                                            placeholder={data.nationality} 
                                            defaultValue={data.nationality} 
                                            onChange={e => handleClick(e)}

                                            
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Estado de nacimiento:
                                        <div>
                                            <input type="text"

                                            id="state_of_birth"
                                            value={data.state_of_birth}
                                            placeholder={data.state_of_birth}
                                            defaultValue={data.state_of_birth}
                                            onChange={e => handleClick(e)}

                                            
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Genero:
                                        <div>
                                            <input type="text"

                                            id="gender"
                                            value={data.gender}
                                            placeholder={data.gender}
                                            defaultValue={data.gender}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Telefono:
                                        <div>
                                            <input type="text"

                                            id="phone_number"
                                            value={data.phone_number}
                                            placeholder={data.phone_number}
                                            defaultValue={data.phone_number}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Curp:
                                        <div>
                                            <input type="text"


                                            id="curp"
                                            value={data.curp}
                                            placeholder={data.curp}
                                            defaultValue={data.curp}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            E-mail:
                                        <div>
                                            <input type="text"

                                            id="email"
                                            value={data.email}
                                            placeholder={data.email}
                                            defaultValue={data.email}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                        
                                    </label>

                               </div>

                                <div className="segundaMitad">

                                    <label className="tipoDato">
                                            Actividad Economica:
                                        <div>
                                            <input type="text"

                                            id="economic_activity"
                                            value={data.economic_activity}
                                            placeholder={data.economic_activity}
                                            defaultValue={data.economic_activity}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Es cliente:
                                        <div>
                                            <input type="text"

                                            id="is_client"
                                            value={data.is_client}
                                            placeholder={data.is_client}
                                            defaultValue={data.is_client}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                                    </label>

                                    <label className="tipoDato">
                                            Pais:
                                        <div>
                                            <input type="text"

                                            id="country"
                                            value={data.country}
                                            placeholder={data.country}
                                            defaultValue={data.country}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                                    </label>

                                    <label className="tipoDato">
                                            Estado:
                                        <div>
                                            <input type="text"

                                            id="state"
                                            value={data.state}
                                            placeholder={data.state}
                                            defaultValue={data.state}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                                    </label>
                                    
                                    <label className="tipoDato">
                                            Ciudad:
                                        <div>
                                            <input type="text"

                                            id="city"
                                            value={data.city}
                                            placeholder={data.city}
                                            defaultValue={data.city}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                                    </label>

                                    <label className="tipoDato">
                                            Colonia:
                                        <div>
                                            <input type="text"

                                            id="neighborhood"
                                            value={data.neighborhood}
                                            placeholder={data.neighborhood}
                                            defaultValue={data.neighborhood}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                                    </label>

                                    <label className="tipoDato">
                                            Codigo Postal:
                                        <div>
                                            <input type="text"

                                            id="zip_code"
                                            value={data.zip_code}
                                            placeholder={data.zip_code}
                                            defaultValue={data.zip_code}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                                    </label>

                                    <label className="tipoDato">
                                            Calle:
                                        <div>
                                            <input type="text"

                                            id="street"
                                            value={data.street}
                                            placeholder={data.street}
                                            defaultValue={data.street}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                                    </label>


                                    <label className="tipoDato">
                                            Numero ext/int
                                        <div>
                                            <input type="text"

                                            id="ext_numbero"
                                            value={data.ext_number}
                                            placeholder={data.ext_number}
                                            defaultValue={data.ext_number}
                                            onChange={e => handleClick(e)}
                                            />
                                    </div>
                                    </label>
                                </div>
                                
                            </div>
                        </div>
              <div className="botonesRect">
              <button type="submit">
                  Modificar Datos
              </button>

              <button type="reset" onClick={()=>{setUserData(dataTemp)}}>
                Reset
              </button>

              <button>
                <Link to={`/`} style={{ textDecoration: 'none'}}>Regresar</Link>
              </button>
              </div>
              </form>
            </div>
            </>
    )
}


export default Rectificacion;