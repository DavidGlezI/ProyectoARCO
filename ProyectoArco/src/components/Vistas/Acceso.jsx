
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
        <div className="boxA" id="box" style={{filter: modal? 'blur(8px)' : ''}}>
          <div className="intro">Datos de {userData.user_fname} {userData.user_first_lname} {userData.user_second_lname}</div>

          
              <div className="datosPersonalesA"> 

                <div className="infoA">
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

              <div className="DireccionA">
                  <div className="DirA">Direccion</div>
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


              <div className="botonesA">
                <button onClick={toggleModal}>Generar PDF</button>
                

                <button>
                  <Link to={`/`} style={{ textDecoration: 'none'}}>Regresar</Link>
                </button>
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
            </>
    )
}


export default Acceso;