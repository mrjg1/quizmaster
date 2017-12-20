import React from "react";
import axios from "axios";
import querystring from "querystring";
import Message from "./message"
import ip from '../../../ip';

export default class Teacher_Login extends React.Component{
    constructor(props) {
        super(props);
        this.state = {appear_passkey: 0, passkey: '', username: '', password: '', key: null, message: '', appear_message: 0};
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCreate = this.handleCreate.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleChange(event){
        event.preventDefault();
        this.setState({[event.target.name]: event.target.value});
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.passkey.length!=16)
        {
            return alert ("Please enter a 16-digit key");
        }
        axios.get('http://'+ip.ip_address+':8585/api/admin/'+this.state.passkey)  
        .then((resp)=>{
            this.setState({key: resp.data.key, message: resp.data.message, appear_message: 1})
            if(this.state.key==false){
                document.getElementById('key_form').reset();
                document.getElementById('passkey').focus();
            }
            else{
                this.setState({appear_passkey: 1, appear_message: 0})
                document.getElementById('add_form').reset();
                (swal({
                    text: this.state.message,  
                    icon: "success"})
                    .then(function(){
                        
                        document.getElementById('username').focus();        
                    })           
                    
                );
            }
        })
    }
    handleCreate(event){
        event.preventDefault();
        if((this.state.username.trim()=='')||(this.state.password.trim()=='')){
            return alert ("User-ID or Password cannot be left blank");
        }
        axios.post('http://'+ip.ip_address+':8585/api/admin/createlogin', querystring.stringify({
            username: this.state.username,
            password: this.state.password,
        })
        )
        .then((resp)=>{
            this.setState({key: resp.data.key, message: resp.data.message})
            var t;
            this.state.key?(t="success"):(t="error");
            (swal({text: this.state.message, icon: t}));           
            this.props.history.push('/');
        })
    }
    handleDelete(event){
        event.preventDefault();
        if((this.state.username.trim()=='')){
            return alert ("User-ID cannot be left blank");
        }
        axios.delete('http://'+ip.ip_address+':8585/api/admin/'+this.state.username) 
        .then((resp)=>{
            this.setState({key: resp.data.key, message: resp.data.message})
            var t;
            this.state.key?(t="success"):(t="error");
            (swal({text: this.state.message, icon: t}));           
            this.props.history.push('/');
        }) 
    }
    handleCancel(event){
        event.preventDefault();
        this.props.history.push('/');
    }
    render(){
        return (
            <div>
            <div style={{backgroundImage: "url('title.png')", width: "329px", height: "57px", position: "absolute", top: "9%", left: "40%"}}></div>
            {(this.state.appear_passkey==0)?(
                <div className="container" style={{paddingTop: "300px", paddingLeft: "40px"}}>
                <form id="key_form" className="form-horizontal" onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label className="control-label col-sm-offset-2 col-sm-2">Enter Key:</label>
                        <div className="col-sm-4">
                        <input type="password" id="passkey" className="form-control" placeholder="Enter 16-digit key" name="passkey" onChange={this.handleChange} autoFocus />
                        </div>
                    </div>
                    <div className="form-group">        
                        <div className="col-sm-offset-4 col-sm-10">
                        <input type="submit" className="btn btn-info qb" value="Submit"/>
                        &nbsp;&nbsp;<button className ="btn qb" onClick={this.handleCancel}>Back</button>
                        </div>
                    </div>
                </form>
                {(this.state.appear_message==1)?<Message offset={4} keys= {this.state.key} message={this.state.message}/>:null}
                </div>
            ):(
                <div className="container" style={{paddingTop: "300px", paddingLeft: "60px"}}>
                <form id="add_form" className="form-horizontal" onSubmit={this.handleCreate}>
                    <div className="form-group">
                        <label className="control-label col-sm-offset-2 col-sm-2">Enter User-ID:</label>
                        <div className="col-sm-4">
                        <input type="text" id="username" className="form-control" placeholder="Enter User-ID" name="username" onChange={this.handleChange} autoFocus />
                        </div>
                    </div>
                    <div className="form-group">
                        <label className="control-label col-sm-offset-2 col-sm-2">Enter Password:</label>
                        <div className="col-sm-4">
                        <input type="password" id="password" className="form-control" placeholder="Enter Password" name="password" onChange={this.handleChange} autoFocus />
                        </div>
                    </div>
                    <div className="form-group">        
                        <div className="col-sm-offset-4 col-sm-10">
                        <input type="submit" className="btn btn-info qb" value="Create"/>
                        </div>
                    </div>
                </form>
                <div className="col-sm-offset-4">
                &nbsp;&nbsp;<button className ="btn btn-info qb" onClick={this.handleDelete}>Delete</button><br/><br/>
                &nbsp;&nbsp;<button className ="btn qb" onClick={this.handleCancel}>Cancel</button>
                </div>
                {(this.state.appear_message==1)?<Message offset={4} keys= {this.state.key} message={this.state.message}/>:null}
                </div>
            )}
            </div>
        );
    }
}
