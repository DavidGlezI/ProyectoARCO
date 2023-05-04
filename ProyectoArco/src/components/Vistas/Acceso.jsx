
import { useState, useEffect } from "react";
import { useParams, Outlet, Link } from "react-router-dom"; 
import './Acceso.css'
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function Acceso(){
   const params = useParams();
   const userId= params.userId  


   const [userData, setUserData] = useState({});



   const exportPDF =() =>{
    const input = document.getElementById("box");
    html2canvas(input, {logging: true, letterRendering: 1, useCORS: true}).then(canvas =>{
      const imgWidth  = 208;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const imgData = canvas.toDataURL('img/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
      pdf.save("informacion.pdf");

      
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
        <div className="box" id="box">
          <div className="intro">Datos de {userData.user_fname} {userData.user_first_lname} {userData.user_second_lname}</div>

          
              <div className="datosPersonales"> 

                <div className="info">
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

              <div className="Direccion">
                  <div className="Dir">Direccion</div>
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


              <div className="botones">
                <button onClick={()=> handleClickPeticion()}>Generar PDF</button>
                

                <button>
                  <Link to={`/`} style={{ textDecoration: 'none'}}>Regresar</Link>
                </button>
              </div>

        </div>
            </>
    )
}


export default Acceso;