
import { useState, useEffect } from "react";
import { useParams,Outlet, Link, useNavigate } from "react-router-dom"; 
import '../../styles.css';

function Oposicion(){
   const params = useParams();
   const userId= params.userId  

   const [userData, setUserData] = useState([]);

   const [modal, setModal] = useState(false);
   const navigate = useNavigate();


   const toggleModal = ()=>{
    setModal(!modal);
   }


   function handleOposicion(){
    fetch(`/api/opuesto/${userId}`, {method:"PUT"})
    fetch(`/api/peticiones/${userId}/O`, {method:"POST"})
    toggleModal();
    navigate("/");
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
    <div className="boxOp" style={{filter: modal? 'blur(8px)' : ''}}>
      <div className="introOp">Marcar oposición a {userData.user_fname} {userData.user_first_lname} {userData.user_second_lname}</div>

      
          <div className="datosPersonalesOp"> 

            <div className="infoOp">
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

          <div className="DireccionOp">
              <div className="DirOp">Direccion</div>
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

            <div className="botonesOp">

            
                <button onClick={toggleModal}>Marar Oposición</button>
                <button> <Link to={`/`} style={{ textDecoration: 'none'}}>Cancelar/Regresar</Link></button>
                <div className="Notas">
                    <p>Agregar Notas</p>
                    <input type="text" />
                </div>
            </div>

        </div>
        {modal && (
                    <div className="modal">
                        <div className="overlay"></div>
                        <div className="modal-content">
                            <h2>ATENCION</h2>
                            <p>Se marcará como Oposición al usuario y sus datos ya no se 
                                desplegarán en la página
                            </p>
                            
                        </div>
                        <button className="confirmar" onClick={handleOposicion}>Confirmar Accion</button>
                        <button className="cancelar" onClick={toggleModal}>Cancelar</button>
                            
                    </div>

                )}
    </>
    )
}


export default Oposicion;