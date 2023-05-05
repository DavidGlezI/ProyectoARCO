
import { useState, useEffect } from "react";
import { useParams, Outlet, Link, useNavigate } from "react-router-dom"; 
import '../../styles.css';
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Acceso(){
   const params = useParams();
   const userId= params.userId  

   const [userData, setUserData] = useState({});


   const [modal, setModal] = useState(false);
   const navigate = useNavigate();


   const toggleModal = ()=>{
    setModal(!modal);

   }



   const exportPDF =() =>{
    const input = document.getElementById("box");
    html2canvas(input, {logging: true, letterRendering: 1, useCORS: true}).then(canvas =>{
      const imgWidth  = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL('img/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save("informacion.pdf");
      toggleModal();
      navigate("/");
      
    })
   }

  function handleClickPeticion(){
    exportPDF();
    fetch(`/api/peticiones/${userId}/A`, {method:"POST"}) 
  }


   let cliente = "";
      if(userData.is_client === 1){
        cliente = "Si"
      }
      else{
        cliente = "No"
      }
    

    useEffect(()=>{
        async function dataFetch(){
            const data = await(await fetch(`/api/userA/${userId}`)).json();
            setUserData(data);
        }
        dataFetch();
    }, [])
      let born = String(userData.born_date).substring(0,10);

      
    
    return (
        <>
        <div className="fondo">
        <div className="boxA" id="box" style={{filter: modal? 'blur(8px)' : ''}}>
          <div className="intro">
            <span>Datos de {userData.user_fname} {userData.user_first_lname} {userData.user_second_lname}</span> </div>

          
              <div className="datosPersonalesA"> 

                <div className="infoA">
                  <div>
                    <span> Nombre:</span> {userData.user_fname} {userData.user_first_lname} {userData.user_second_lname}
                  </div>
                                  
                  <div>
                    <span> Fecha de nacimiento:</span> {born}
                  </div>

                  <div>
                    <span> Nacionalidad:</span> {userData.nationality}    <span> Estado de nacimiento: </span>{userData.state_of_birth}
                  </div>

                  <div>
                    <span> Genero: </span>{userData.gender}
                  </div>

                  <div>
                    <span> Telefono: </span> {userData.phone_number} <span> Curp: </span>{userData.curp}
                  </div>

                  <div>
                    <span> E-mail: </span>{userData.email}
                  </div>

                  <div>
                    <span>Actividad economica: </span> {userData.economic_activity}
                  </div>

                  <div> 
                    <span> Es cliente: </span>{cliente }
                  </div>
                </div>

              </div>

              <div className="DireccionA">
                  <div className="DirA">
                    <span> Direccion</span></div>
                    <div>
                      <span> Pais: </span>{userData.country} <span>Estado:</span>  {userData.state} <span> Ciudad:</span>{userData.city}
                    </div>

                    <div>
                      <span> Colonia:</span> {userData.neighborhood} <span> Codigo Postal:</span> {userData.zip_code}
                    </div>

                    <div>
                       <span> Calle: </span>{userData.country} <span> Numero ext/int:</span> {userData.ext_number}
                    </div>
              </div>  


              <div className="botonesA">


              <button className="btnA">
                  <Link to={`/`} style={{ textDecoration: 'none'}}>Regresar</Link>
                </button>



                <button onClick={toggleModal} className="btnA">Generar PDF</button>
                
              </div>

        </div>

        {modal && (
                    <div className="modal">
                        <div className="overlay"></div>
                        <div className="modal-content">
                            <h2>ATENCION</h2>
                            <p>Se realizará un PDF con la información del usuario
                            y se creará una petición de derechos ARCO</p>
                            
                        </div>
                        <button className="confirmar" onClick={handleClickPeticion}>Confirmar Accion</button>
                        <button className="cancelar" onClick={toggleModal}>Cancelar</button>
                            
                    </div>

                )}
            </div>
            </>
    )
}


export default Acceso;