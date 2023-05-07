import { useState, useEffect } from "react";
import { useParams, Outlet, Link } from "react-router-dom"; 
import './Peticiones.css';


export function Peticiones(){

    const [peticiones, setPeticiones] = useState([]);


    useEffect(()=>{
        async function dataFetch(){
            const data = await(await fetch(`/api/peticiones`)).json();
            setPeticiones(data);
        }
        dataFetch();
    }, [])

    return (
        <>
        <button className="petRegresar">
            <Link to={`/`} style={{ textDecoration: 'none'}}>Regresar</Link>
        </button>
        <div className='peticiones_layout'>
                <div>Petición id</div>
                <div>Id de Usuario</div>
                <div>Nombre</div>
                <div>Apellido</div>
                <div>CURP</div>
                <div>Derecho</div>
                <div>Creado</div>
        </div>
        <div className='boxPet'>
        
            {peticiones.map( data => {
                return(
                    <>
                        <div className='infoPeticion'>
                            <div className="petid">
                                {data.petition_id}
                            </div>
                            <div className="userid">
                                {data.user_id}
                            </div>
                            
                            <div className="nombre">
                                {data.user_fname}
                            </div>

                            <div className="apellido">
                                {data.user_first_lname}
                            </div>

                            <div className="curp">
                                {data.curp}
                            </div>

                            <div className="derecho">
                                {data.user_right}
                            </div>

                            <div className="creado a">
                                {String(data.created_at).substring(0,19)}
                            </div>
                        </div>         
                    </>     
                )
            })}
        </div>     
        </>
    )
}

export default Peticiones;