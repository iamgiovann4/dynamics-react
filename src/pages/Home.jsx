import React from 'react';
import Content from '../components/Content';
import Clock from '../components/Calendario';
import Chart2 from '../components/Trands';
import PieChart from '../components/PieChart';
import Grafico1 from '../components/Grafico1';
import Grafico2 from '../components/Grafico2';
import Grafico3 from '../components/Grafico3';
import Grafico4 from '../components/Grafico4';
import './Home.css'
import MiniDrawer from '../components/MiniDrawer'
// import Footer from '../components/Footer';


const Home = () => {
    return (
        <>
            <MiniDrawer>
                <Content title="Dashboard">
                    {/* <Header /> */}
                    <div className='grafico1' style={{display:"flex", alignItems:"center",justifyContent:"center"}}>
                        <Clock/>
                    </div>
                    
                    <div className='grafico2'>
                        <Chart2 />
                        <div>
                            <div><Grafico2></Grafico2></div>
                            <div><Grafico1 ></Grafico1></div>
                        </div>
                    </div>

                </Content>
            </MiniDrawer>
            {/* <Footer/> */}
        </>
    );
};

export default Home;
