import React from 'react';
import Content from '../components/Content';
import Chart from '../components/Grafico1';
import Chart2 from '../components/Grafico2';
import Chart3 from '../components/Grafico3';
import Chart4 from '../components/Grafico4';
import './Home.css'
import MiniDrawer from '../components/MiniDrawer'
// import Footer from '../components/Footer';


const Home = () => {
    return (
        <>
            <MiniDrawer>
                <Content title="Dashboard">
                    {/* <Header /> */}
                            <div className='grafico1'>
                                <Chart/>
                            </div>
                            <div className='grafico2'>  
                                <Chart2 />
                            </div>      
                            <div className='grafico3'>
                                <Chart3 />
                            </div>    
                                <Chart4 />
                </Content>
            </MiniDrawer>
            {/* <Footer/> */}
        </>
    );
};

export default Home;
