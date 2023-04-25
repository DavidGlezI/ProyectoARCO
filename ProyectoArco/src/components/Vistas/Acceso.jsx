
import { useState, useEffect } from "react";
import { useParams, Outlet, Link } from "react-router-dom"; 

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
        <div>
            <div>HOLA {userId}</div>
            {userData.map( data => {
                return(
                        <div className='userAcceso'>
                            <div>Datos de {data.user_fname} {data.user_first_lname} ID = {data.user_id}</div>
                            <div className="datosPersonales">

                                <div>
                                  Nombre: {data.user_fname} {data.user_first_lname} {data.user_second_lname}
                                </div>
                                
                                <div>
                                  Fecha de nacimiento: {data.born_date}
                                </div>

                                <div>
                                  Nacionalidad: {data.nationality}  Estado de nacimiento: {data.state_of_birth}
                                </div>

                                <div>
                                  Genero: {data.gender}
                                </div>

                                <div>
                                  Telefono: {data.phone_number} Curp: {data.curp}
                                </div>

                                <div>
                                  Email: {data.email}
                                </div>

                                <div>
                                  Actividad economica: {data.economic_activity}
                                </div>

                                <div> 
                                  Es cliente: {data.is_client} 
                                </div>


                                <div className="Direccion">
                                    Direccion
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

            <button>
                Generar PDF
            </button>

            <button>
              <Link to={`/`} style={{ textDecoration: 'none'}}>Regresar</Link>
            </button>

            

            </div>
            
            </>
    )
}


export default Acceso;