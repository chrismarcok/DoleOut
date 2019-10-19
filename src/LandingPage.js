import React from 'react';
import Header from './Header.js'



class LandingPage extends React.Component {
    componentDidMount () {
        const script = document.createElement("script");
        script.src = "./script/canvas.js";
        script.async = true;
        document.body.appendChild(script);
    }
    
    render() {
        return ( 
            <div>
                <Header />
                <div className = "jumbotron">
                    <canvas id="canvas"></canvas>
                </div> 
                <div className = "above-jumbo" >
                    <h1>
                        <span className = "main-header" > Team 53 </span> 
                    </h1> 
                </div>

            </div>
        )
    }
}

export default LandingPage