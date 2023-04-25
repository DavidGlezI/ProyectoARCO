import './Table.css'
import { SelectProvider } from "../SelectProvider";
import { UserContent } from "./UserContent";



export function Table(){
    return(
        <div className="table">
            <div className='table_layout'>
                <div>User id</div>
                <div>Email</div>
                <div>Nombre</div>
                <div>Apellido</div>
                <div>CURP</div>
                <div>Accion</div>
            </div>
                <UserContent/>
        </div>
    )
}