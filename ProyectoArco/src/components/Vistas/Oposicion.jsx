
import { useState, useEffect } from "react";
import { useParams,Outlet, Link } from "react-router-dom"; 

function Oposicion(){
   const params = useParams();
   const userId= params.userId  

   const [userData, setUserData] = useState([]);

    

    useEffect(()=>{
        async function dataFetch(){
            const data = await(await fetch(`/api/user/${userId}`)).json();
            setUserData(data);
        }
        dataFetch();
    }, [])


    return (
        <>
            {userData.map( data => {
                return(
                        <div className='UserOposicion'>
                            <div>Se eliminaran los datos de {data.user_fname} {data.user_first_lname} ID = {data.user_id}</div>
                            <div >
                                {data.user_id}
                            </div>
                            <div >
                                {data.email}
                            </div>
                            <div >
                                {data.user_fname}
                            </div>
                            <div >
                                {data.user_first_lname}
                            </div>
                            <div >
                                {data.curp}
                            </div>
                        </div>
                )
            })}
            <button>Oposicion</button>
            <button> <Link to={`/`} style={{ textDecoration: 'none'}}>Cancelar/Regresar</Link></button>
            <div className="Notas">
                <p>Agregar Notas</p>
                <input type="text" />
            </div>
            </>
    )
}


export default Oposicion;