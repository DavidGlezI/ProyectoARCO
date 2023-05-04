
import { useState, useEffect } from "react";
import { useParams,Outlet, Link } from "react-router-dom"; 
import '../../styles.css';

function Cancelacion(){
   const params = useParams();
   const userId= params.userId  

   const [userData, setUserData] = useState([]);

    function handleCancelacion(){
        fetch(`/api/eliminado/${userId}`, {method:"PUT"})
        fetch(`/api/peticiones/${userId}/C`, {method:"POST"})
    }

    useEffect(()=>{
        async function dataFetch(){
            const data = await(await fetch(`/api/userA/${userId}`)).json();
            setUserData(data);
        }
        dataFetch();
    }, [])
      let born = String(userData.born_date).substring(0,10);

      let cliente = "";
      if(userData.is_client === 1){
        cliente = "Si"
      }
      else{
        cliente = "No"
      }


    return (
        <>
        <div className="boxCa">
          <div className="introCa">Generar borrado lógico de {userData.user_fname} {userData.user_first_lname} {userData.user_second_lname}</div>

          
              <div className="datosPersonalesCa"> 

                <div className="infoCa">
                  <div>
                    Nombre: {userData.user_fname} {userData.user_first_lname} {userData.user_second_lname}
                  </div>
                                  
                  <div>
                    Fecha de nacimiento: {born}
                  </div>

                  <div>
                    Nacionalidad: {userData.nationality}    Estado de nacimiento: {userData.state_of_birth}
                  </div>

                  <div>
                    Genero: {userData.gender}
                  </div>

                  <div>
                    Telefono: {userData.phone_number}  Curp: {userData.curp}
                  </div>

                  <div>
                    E-mail: {userData.email}
                  </div>

                  <div>
                    Actividad economica: {userData.economic_activity}
                  </div>

                  <div> 
                    Es cliente: {cliente }
                  </div>
                </div>

              </div>

              <div className="DireccionCa">
                  <div className="DirCa">Direccion</div>
                    <div>
                      Pais: {userData.country} Estado: {userData.state} Ciudad: {userData.city}
                    </div>

                    <div>
                      Colonia: {userData.neighborhood} Codigo Postal: {userData.zip_code}
                    </div>

                    <div>
                       Calle: {userData.country} Numero ext/int: {userData.ext_number}
                    </div>
              </div>  

        
                    
            <div className="botonesCa">
                <button onClick={handleCancelacion}>
                    <Link to={`/`} style={{ textDecoration: 'none'}}>Borrar datos</Link>
                </button>
                <button>
                    <Link to={`/`} style={{ textDecoration: 'none'}}>Cancelar/Regresar</Link>
                    </button>

                <div className="NotasCa">
                    <p>Agregar Notas</p>
                    <input type="text" />
                </div>
            </div>

        </div>


        
                
        
        </>
    )
}


export default Cancelacion;