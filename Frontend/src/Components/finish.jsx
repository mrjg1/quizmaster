import React from "react";

export default class Finish extends React.Component{
    render(){
        document.onkeydown = function(e){
            if(((e.which || e.keyCode)==115 && e.altKey)||(e.which || e.keyCode)==87 && e.ctrlKey){}
        }
        return (
            <div>
            <div style={{backgroundImage: "url('l2.png')", width: "413px", height: "472px", position: "absolute", top: "12%", left: "36.1%"}}></div>
            <div style={{position: "absolute", top: "20%", left: "40%"}}>
                <h1 style={{color: "#01114c", paddingLeft: "50px"}}>Thank You!</h1><br/><br/><br/><br/><br/>
                <p style={{color: "#01114c", fontSize: "20px", paddingLeft: "110px"}}>Regards</p>
            </div>
            </div>
        );
    }
}
