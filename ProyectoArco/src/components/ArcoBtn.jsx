import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Acceso from './Vistas/Acceso';
import { Outlet, Link } from "react-router-dom";





export default function ArcoBtn({userId}) {

    const [selected, setSelected] = React.useState(false);
    const [right, setRight] = React.useState("");

    

    const handleChange = (event) => {

            if(event.target.value === 10){
                console.log("Acceso");
                setRight(event.target.value);
                console.log("done");
                
                
    
            }
            else if(event.target.value === 20){
                
                setRight(event.target.value);
                console.log("Rectificacion");
    
            }
            else if(event.target.value === 30){
                
                setRight(event.target.value);
                console.log("Cancelacion");
    
            }
            else if(event.target.value === 40){
                setRight(event.target.value);
                console.log("Oposicion");
    
            }

    }


  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Right</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={right}
          label="Right"
          onChange={handleChange}
        >
            <MenuItem value={10} >
                <Link to={`/Acceso/${userId}`} style={{ textDecoration: 'none'}}>Acceso</Link>
            </MenuItem>

            <MenuItem value={20}>
                <Link to={`/Rectificacion/${userId}`} style={{ textDecoration: 'none' }}>Rectificacion</Link>
            </MenuItem>

            <MenuItem value={30}>
                <Link to= {`/Cancelacion/${userId}`} style={{ textDecoration: 'none' }}>Cancelacion</Link>
            </MenuItem>

            <MenuItem value={40}>
                <Link to={`/Oposicion/${userId}`} style={{ textDecoration: 'none' }}>Oposicion</Link>
            </MenuItem>
          
          <Outlet />
        </Select>
      </FormControl>
    </Box>
  );
}