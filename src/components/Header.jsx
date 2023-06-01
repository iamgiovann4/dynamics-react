import Box from '@mui/material/Box'
import MainMenu from './MainMenu'

import { AiFillHome } from "react-icons/ai";
import { RiContactsFill } from "react-icons/ri";
import  { RiDashboardFill } from "react-icons/ri";
import  { FiMoreHorizontal } from "react-icons/fi";
import  { AiFillSetting } from "react-icons/ai";
import  { AiOutlineBars} from "react-icons/ai";

import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';

        export default function Header() {
            const [state, setState] = React.useState({
              top: false,
              left: false,
              bottom: false,
              right: false,
            });
          
            const toggleDrawer = (anchor, open) => (event) => {
              if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
                return;
              }
          
              setState({ ...state, [anchor]: open });
            };
          
            const list = (anchor) => (

              <Box
                sx={{background: "#FFFFFF",
                width: 250,
                height: '100%',
                top: '0',
                left: '0',
                margin: '10px',
                borderRadius: '10px',
                boxShadow: '0px 0px 10px 1px #00000026' ,width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 300 }}
                role="presentation"
                onClick={toggleDrawer(anchor, false)}
                onKeyDown={toggleDrawer(anchor, false)}
              >
<Box style={{margin: '30px'}}>
                
                <AiFillHome style={{
                width: 30,
                height: 30,
                fill: 'black', 
                float: 'left',
                padding: '10px'
                }} /> 
                <h3 style={{padding: '14px'}}>Casa</h3>
            </Box>



            <Box style={{margin: '30px'}}>
                
                <RiDashboardFill style={{
                width: 30,
                height: 30, 
                float: 'left',
                padding: '10px'
                }} /> 
                <h3 style={{padding: '14px'}}>Produto</h3>
            </Box>

            <Box style={{margin: '30px'}}>
                
                <RiDashboardFill style={{
                width: 30,
                height: 30,
                fill: 'black', 
                float: 'left',
                padding: '10px'
                }} /> 
                <h3 style={{padding: '14px'}}>Cliente</h3>
            </Box>
            
            <Box style={{margin: '30px'}}>
                
                <RiContactsFill style={{
                width: 30,
                height: 30,
                fill: 'black', 
                float: 'left',
                padding: '10px'
                }} /> 
                <h3 style={{padding: '14px'}}>Contato</h3>
            </Box>

            <Box style={{margin: '30px', marginTop: '400px'}}>
                
                <FiMoreHorizontal style={{
                width: 30,
                height: 30,
                fill: 'black', 
                float: 'left',
                padding: '10px'
                }} /> 
                <h3 style={{padding: '14px'}}>Mais</h3>
            </Box>

            <Box style={{margin: '30px'}}>
                
                <AiFillSetting style={{
                width: 30,
                height: 30,
                fill: 'black', 
                float: 'left',
                padding: '10px'
                }} /> 
                <h3 style={{padding: '14px'}}>Configs</h3>
            </Box>
              </Box>
            );
          
            return (
              <div>
                {['left'].map((anchor) => (
                  <React.Fragment key={anchor}>
                    <Button onClick={toggleDrawer(anchor, true)}><AiOutlineBars style={{
                width: 20,
                height: 20,
                fill: 'black', 
                float: 'left',
                padding: '10px'
                }}></AiOutlineBars></Button>
                    <Drawer
                      anchor={anchor}
                      open={state[anchor]}
                      onClose={toggleDrawer(anchor, false)}
                    >
                      {list(anchor)}
                    </Drawer>
                  </React.Fragment>
                ))}
              </div>
            );
          }

          const styles = {
            css4t3x6lMuiPaperrootMuiDrawerpaper: {
              backgroundColor: 'red'
}
            }
                
                    