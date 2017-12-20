import React from "react";
// import axios from "axios";
// import ip from '../../../ip';

export default class Nav_Student extends React.Component{
    constructor(props){
        super(props);
        //this.handleLogout = this.handleLogout.bind(this);
    }
    render(){
        //var x = this.props.offset;
        return (
            <div>
            <br/><br/>
            <nav id = "nav_bar" className="navbar navbar-inverse">
            <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" style={{color: "white", paddingLeft: "50px"}}>Quiz Master</a>
            </div>
            
            <ul className="nav navbar-nav navbar-right">
                <li><a style={{color: "white"}}><span className="glyphicon glyphicon-user"></span>&ensp; {this.props.roll}</a></li>
                <li style={{paddingRight: "50px", paddingLeft: "50px"}}></li>
                <li><a href = "" style={{color: "white"}}><span className="glyphicon glyphicon-time"></span></a></li>
                <li><a id="time_left" style={{color: "white"}}>00 : 00</a></li>
                <li style={{paddingRight: "60px"}}></li>
              </ul>
            </div>
            </nav>
            </div>
        );
    }
}