import './Table.css'
import { UserContent } from "./UserContent";
import { useState } from 'react';
import { Link } from 'react-router-dom';



export function Table(){


    const [curp, setCurp] = useState("");
    const [az, setAz] = useState("1");


    function handleAz(){
        if(az === "1"){
            console.log("Ordenado de: A - Z")
        }
        else{
            setAz("1");
        }
        
    }

    function handleZa(){
        if(az === "0"){
            console.log("Ordenado de: Z - A")
        }
        else{
            setAz("0");
        }
    }
    

    return(
        <>
        <div className="container">
            <div className='navbar'>
                <button>
                    <Link to={`/peticiones`} style={{ textDecoration: 'none'}}>Peticiones</Link>
                </button>
                <button disabled>
                    Home
                </button>
            </div>
            <div className="table">
                <div className="tools">
                    <div className='ordenarBTN '> 
                        <p>Ordenar:</p>
                        <button onClick={() => handleAz()}>A - Z</button>
                        <button onClick={()=> handleZa()}>Z - A</button>
                    </div>
                    <div className="filtro">
                        <label> Filtro por CURP: </label>
                        <input onChange = {(e) => setCurp(e.target.value)} value = {curp}></input>
                    </div>
                </div>
                
                <div className='table_layout'>
                    <div>User id</div>
                    <div>Email</div>
                    <div>Nombre</div>
                    <div>Apellido</div>
                    <div>CURP</div>
                    <div>Accion</div>
                </div>
                    <UserContent curpSearch = {curp} busqueda = {az}/>
            </div>
        </div>
        </>
    )
}