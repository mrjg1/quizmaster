import React from "react";
import axios from "axios";
import ip from '../../../ip';

export default class Nav_Teacher extends React.Component{
    constructor(props){
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
    }
    handleLogout(event){
        event.preventDefault();
        axios.get('http://'+ip.ip_address+':8585/api/teacher/logout')
        .then((resp)=>{
            (swal({
                text: resp.data.message,  
                icon: "success"})
                .then(function(){
                    location.reload('/');
                })           
                
            );
        })
    }
    render(){
        return (
            <div>
            <br/><br/>
            <nav id = "nav_bar" className="navbar navbar-inverse">
            <div className="container-fluid">
            <div className="navbar-header">
                <a className="navbar-brand" style={{color: "white", paddingLeft: "50px"}}>Quiz Master</a>
            </div>
            
            <ul className="nav navbar-nav navbar-right">
                <li><a style={{color: "white"}}><span className="glyphicon glyphicon-user"></span> {this.props.user}</a></li>
                <li><a href = "" onClick={this.handleLogout} style={{color: "white"}}><span className="glyphicon glyphicon-log-out"></span> Logout</a></li>
                <li style={{paddingRight: "60px"}}></li>
              </ul>
            </div>
            </nav>
            </div>
        );
    }
}