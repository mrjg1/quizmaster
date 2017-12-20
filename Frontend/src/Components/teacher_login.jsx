import React from "react";
import axios from "axios";
import querystring from "querystring";
import Message from "./message"
import ip from '../../../ip';

export default class Teacher_Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {username: '', password: '', key: null, message: '', appear_message: 0};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    componentDidMount(){
        this.props.history.go(1);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.username.trim()=='' || this.state.password.trim()==''){
            return alert ("Username or Password cannot be left blank");
        }
        axios.post('http://'+ip.ip_address+':8585/api/teacher/login', querystring.stringify({
            username: this.state.username,
            password: this.state.password
        })
        )
        .then((resp)=>{
            this.setState({key: resp.data.key, message: resp.data.message, appear_message: 1})
            if(this.state.key==false)
            {
                document.getElementById('teacher_form').reset();
                document.getElementById('user').focus();
            }
            else{
                swal("", "Successfully Logged In", "success");
                this.props.history.replace('teacher/home/'+this.state.username);
            }
        })
    }

    handleBack(event){
        event.preventDefault();
        this.props.history.replace('/');
    }
    render(){
        return (
            <div>
            <div style={{backgroundImage: "url('title.png')", width: "329px", height: "57px", position: "absolute", top: "9%", left: "40%"}}></div>
            <div className="container">
            <form id="teacher_form" className="form-horizontal" style={{paddingTop: "22%", paddingLeft: "10%"}} onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label col-sm-offset-2 col-sm-2">Username:</label>
                    <div className="col-sm-4">
                    <input type="text" id="user" className="form-control" placeholder="Enter username" name="username" onChange={this.handleChange} autoFocus />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-offset-2 col-sm-2">Password:</label>
                    <div className="col-sm-4">          
                    <input type="password" className="form-control" placeholder="Enter password" name="password" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">        
                    <div className="col-sm-offset-4 col-sm-10">
                    <input type="submit" className="btn btn-info qb" value="Login"/>
                    &nbsp;&nbsp;<button id="back" className="btn qb" onClick={this.handleBack}> Back </button><br/><br/>
                    </div>
                </div>
            </form>
            
            {(this.state.appear_message==1)?<Message offset={5} keys= {this.state.key} message={this.state.message}/>:null}
            
            </div>
            </div>
        );
    }
}
