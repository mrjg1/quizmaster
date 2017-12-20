import React from "react";
import axios from "axios";
import querystring from 'querystring';
import {Link} from "react-router-dom";
import ip from '../../../ip';


export default class Student_Login extends React.Component{
    constructor(props){
        super(props);
        this.state={batch: null, roll: '', time: 0};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    componentDidMount(){
        this.props.history.go(1);  
        document.getElementById('roll').focus();
        axios.get('http://'+ip.ip_address+':8585/api/student/batch')
        .then((response)=>{
            if(response.data.key==false){
                (swal({
                    text: response.data.message,  
                    icon: "error"})
                    .then(function(){
                        location.reload('/');
                    })           
                    
                );
            }
            this.setState({batch: response.data.batch, time: response.data.timer})
        })
    }
    handleChange(event){
        event.preventDefault();
        this.setState({roll: event.target.value})
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.roll.trim()==''){
            return swal("","Roll Number cannot be left blank", "warning");
        }
        var r = parseInt(this.state.roll.trim());
        if(r<1000 || r>9999 || isNaN(this.state.roll)){
            return swal("","The entered Roll Number is invalid", "warning");
        } 
        var countDownDate = new Date();
        countDownDate.setSeconds(countDownDate.getSeconds()+(this.state.time*60))
        countDownDate = countDownDate.getTime();
        this.props.history.replace('student/test/'+countDownDate+'/'+document.getElementById('batch').value+" CSA "+this.state.roll);
    }
    handleBack(event){
        event.preventDefault();
        this.props.history.go(-1);
    }
    render(){
        return (
            <div>
            <div style={{backgroundImage: "url('title.png')", width: "329px", height: "57px", position: "absolute", top: "9%", left: "40%"}}></div>
            <div className="container" style={{display: 'grid', height: '100%'}}>
            <div className="content" style={{margin: 'auto', width: '99%'}}>
            <div><form id="teacher_form" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label col-sm-5">Roll Number :</label>
                    <div className="col-md-2">
                        <div className="col-md-8">
                            <select className="form-control" id="batch">
                                  <option value={this.state.batch}>{this.state.batch}</option>
                                  <option value={this.state.batch-1}>{this.state.batch-1}</option>
                                  <option value={this.state.batch-2}>{this.state.batch-2}</option>
                            </select>
                        </div>
                        <label className="control-label">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;CSA</label>
                    </div>
                    <div className="col-md-1">
                        <input type="text" className="form-control" id="roll" name="roll" onChange={this.handleChange}/><br/><br/>
                    </div>
                </div>
                <div className="form-group">        
                    <div className="col-sm-offset-5">
                    &emsp;&emsp;<input type="submit" className="btn btn-success qb" value="Start Test"/><br/><br/>
                    &emsp;&emsp;<button id="back" className="btn qb" onClick={this.handleBack}> Back </button>
                    </div>
                </div>
            </form></div>
            </div>
            </div>
            </div>
        );
    }
}