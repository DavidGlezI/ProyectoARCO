
import { useState, useEffect } from "react";
import { useParams, Outlet, Link } from "react-router-dom"; 
import './Rectificacion.css'

function Rectificacion(){
   const params = useParams();
   const userId= params.userId  

   const [userData, setUserData] = useState([]);
   const [edit, setEdit] = useState('');

    

    useEffect(()=>{
        async function dataFetch(){
            const data = await(await fetch(`/api/userA/${userId}`)).json();
            setUserData(data);
        }
        dataFetch();
    }, [])


    return (
        <> 
        <div className="box">
            <form action="">
            {userData.map( data => {
                return(
                        <div className='userAcceso'>
                            <div className="intro">Datos de {data.user_fname} {data.user_first_lname} {data.user_second_lname}</div>
                            <div className="datosPersonales">

                                <div className="primeraMitad">

                                    <label className="tipoDato">
                                            Nombre:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.user_fname}
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Primer Apellido:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.user_first_lname} 
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Segundo Apellido:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.user_second_lname}
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Fecha de nacimiento:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.born_date}
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Nacionalidad:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.nationality} 
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Estado de nacimiento:
                                        <div>
                                            <input type="text"
                                            defaultValue= {data.state_of_birth}
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Genero:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.gender}
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Telefono:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.phone_number} 
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Curp:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.curp} 
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            E-mail:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.email}
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                        
                                    </label>

                               </div>

                                <div className="segundaMitad">

                                    <label className="tipoDato">
                                            Actividad Economica:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.economic_activity}
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                        
                                    </label>

                                    <label className="tipoDato">
                                            Es cliente:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.is_client} 
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                                    </label>

                                    <label className="tipoDato">
                                            Pais:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.country} 
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                                    </label>

                                    <label className="tipoDato">
                                            Estado:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.state} 
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                                    </label>
                                    
                                    <label className="tipoDato">
                                            Ciudad:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.city} 
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                                    </label>

                                    <label className="tipoDato">
                                            Colonia:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.neighborhood} 
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                                    </label>

                                    <label className="tipoDato">
                                            Codigo Postal:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.zip_code} 
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                                    </label>

                                    <label className="tipoDato">
                                            Calle:
                                        <div>
                                            <input type="text"
                                            defaultValue={data.street} 
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                                    </label>


                                    <label className="tipoDato">
                                            Numero ext/int
                                        <div>
                                            <input type="text"
                                            defaultValue={data.ext_number}
                                            onChange={e => setEdit(e.target.value)}
                                            />
                                    </div>
                                    </label>
                                </div>
                                
                            </div>
                        </div>
                )
                
            })}
              <div className="botones">
              <button type="sumbit">
                  Modificar Datos
              </button>

              <button type="reset">
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