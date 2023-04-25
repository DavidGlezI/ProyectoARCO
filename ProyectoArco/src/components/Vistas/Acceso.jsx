
import { useState, useEffect } from "react";
import { useParams, Outlet, Link } from "react-router-dom"; 
import './Acceso.css'

function Acceso(){
   const params = useParams();
   const userId= params.userId  

   const [userData, setUserData] = useState([]);

    

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
            {userData.map( data => {
                return(
                        <div className='userAcceso'>
                            <div className="intro">Datos de {data.user_fname} {data.user_first_lname} {data.user_second_lname}</div>
                            <div className="datosPersonales">

                                <div>
                                  Nombre: {data.user_fname} {data.user_first_lname} {data.user_second_lname}
                                </div>
                                
                                <div>
                                  Fecha de nacimiento: {data.born_date}
                                </div>

                                <div>
                                  Nacionalidad: {data.nationality}    Estado de nacimiento: {data.state_of_birth}
                                </div>

                                <div>
                                  Genero: {data.gender}
                                </div>

                                <div>
                                  Telefono: {data.phone_number}  Curp: {data.curp}
                                </div>

                                <div>
                                  E-mail: {data.email}
                                </div>

                                <div>
                                  Actividad economica: {data.economic_activity}
                                </div>

                                <div> 
                                  Es cliente: {data.is_client} 
                                </div>


                                <div className="Direccion">
                                    <div className="Dir">Direccion</div>
                                    <div>
                                      Pais: {data.country} Estado: {data.state} Ciudad: {data.city}
                                    </div>

                                    <div>
                                      Colonia: {data.neighborhood} Codigo Postal: {data.zip_code}
                                    </div>

                                    <div>
                                      Calle: {data.country} Numero ext/int: {data.ext_number}
                                    </div>

                                </div>
                                
                            </div>
                        </div>
                )
                
            })}
              <div className="botones">
              <button>
                  Generar PDF
              </button>

              <button>
                <Link to={`/`} style={{ textDecoration: 'none'}}>Regresar</Link>
              </button>
              </div>
            </div>
            </>
    )
}


export default Acceso;