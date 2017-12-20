import React from "react";
import axios from "axios";
import querystring from 'querystring';
import {Link} from "react-router-dom";
import Nav_Teacher from "./nav_teacher"
import ip from '../../../ip';


export default class Teacher_Logged extends React.Component{
    constructor(props){
        super(props);
        this.state={user: props.match.params.username, key: null, message: ''};
        this.handleView = this.handleView.bind(this);
        this.handleSetPaper = this.handleSetPaper.bind(this);
        this.handleResult = this.handleResult.bind(this); 
        this.handleDelete = this.handleDelete.bind(this); 
    }
    handleView(event){
        event.preventDefault();
        axios.get('http://'+ip.ip_address+':8585/api/teacher/question/'+this.state.user)
        .then((response)=>{
            if(!response.data){
                return alert ("No questions are currently present in the database.");
            }
            this.props.history.push('/teacher/update/'+this.state.user);
        })
    }
    handleSetPaper(event){
        var batch, timer;
        if(confirm("Please ensure that you have deleted the previous submissions before setting the paper. \nIf yes Click - OK")){
            swal({
                text: "Please enter Batch Year (ex: 2015)",
                icon:  "info",
                content: "input"
            })
            .then((b)=>{
                if(b.trim()=='' || parseInt(b)<2000 || parseInt(b)>2050 || isNaN(b)){
                    return swal("", "Invalid Batch Year", "error");
                }
                batch=b;
                swal({
                    text: "Please enter Time Limit for the test in minutes",
                    icon: "info",
                    content: "input"
                })
                .then((t)=>{
                    if(t<=0 || isNaN(t)){
                        return swal("", "Invalid Time Limit", "error");
                    }
                    timer=t;
                    axios.post('http://'+ip.ip_address+':8585/api/teacher/set_paper', querystring.stringify({
                        username: this.state.user,
                        batch: batch,
                        timer: timer
                    })
                    )
                    .then((resp)=>{
                        this.setState({key: resp.data.key, message: resp.data.message})
                        this.state.key?(swal("", this.state.message, "success")):(swal("", this.state.message, "error"));
                    })
                })
            })
        }
    }
    handleResult(event){
        event.preventDefault();
        axios.get('http://'+ip.ip_address+':8585/api/teacher/marks/'+this.state.user)
        .then((response)=>{
            this.setState({key: response.data.key, message: response.data.message})
            this.state.key?(swal(this.state.message, "You will be moved to the download page now.", "success")):(swal("", this.state.message, "error"));
            if(this.state.key){
                this.props.history.push('/results');
            }
        })
    }
    handleDelete(event){
        event.preventDefault();
        if(confirm("Please save the student records before deleting their submissions. \nIf already saved Click - OK \nTo save records Click - Cancel")){
            axios.get('http://'+ip.ip_address+':8585/api/teacher/delete_records')
            .then((response)=>{
                this.setState({key: response.data.key, message: response.data.message}, function(){
                    this.state.key?(swal("", this.state.message, "success")):(swal("", this.state.message, "error"));
                })
                
            })
        }
        else{
            this.props.history.push('/records/'+this.state.user);
        }
    }
    render(){
        return (
            <div>
            <Nav_Teacher user={this.state.user}/>
            <div style={{position: "absolute", top: "32%", left: "45%"}}>
            <br/><br/>
            <Link to = {'/teacher/add/'+this.state.user}><button type="button" className="btn btn-info qb">Add Question</button></Link>
            <br/><br/>
            <button type="button" className="btn btn-info qb" onClick={this.handleView}>View Questions</button>
            <br/><br/>
            <button type="button" className="btn btn-info qb" onClick={this.handleSetPaper}>Set Paper</button>
            <br/><br/>
            <button type="button" className="btn btn-info qb" onClick={this.handleResult}>View Result</button>
            <br/><br/>
            <button type="button" className="btn btn-info qb" onClick={this.handleDelete}>Delete Submissions</button>
            <br/><br/>
            </div>
            </div>
        );
    }
}