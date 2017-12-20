import React from "react";
import {Link} from "react-router-dom"
import axios from "axios";
import querystring from "querystring";
import Nav_Teacher from "./nav_teacher"
import ip from '../../../ip';

class Option extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <option value={this.props.index}>{this.props.index+1+". "+this.props.question.question_text}</option>        
        );    
    }
}

export default class View_Question extends React.Component{
    constructor(props){
        super(props);
        this.state = {user: props.match.params.username, questions: [], question: {}, key: null, message: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCorrect = this.handleChangeCorrect.bind(this);
        this.handleChangeSelect = this.handleChangeSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteAll = this.handleDeleteAll.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    componentDidMount(){
        axios.get('http://'+ip.ip_address+':8585/api/teacher/questions/'+this.state.user)
        .then((response)=>{
            this.setState({questions: response.data, question: response.data[0]});
        })
    }

    handleChange(event){
        this.setState({
            question: Object.assign(
                {}, 
                this.state.question,
                { [event.target.name]:event.target.value}
            )
        });
    }

    handleChangeCorrect(event){
        this.setState({[event.target.name]: event.target.value.toUpperCase()});
        event.target.value=event.target.value.toUpperCase();
    }

    handleChangeSelect(event){
        this.setState({question: this.state.questions[event.target.value]})
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.question.question_text.trim()==''){
            return alert("Question Text cannot be left blank");
        }
        var a=this.state.question.optiona.trim(), b=this.state.question.optionb.trim(), c=this.state.question.optionc.trim(), d=this.state.question.optiond.trim(); 
        if ((a =='')||(b =='')||(c =='')||(d =='')) {
            return alert("Options cannot be left blank");
        }
        
        var ch = this.state.question.correct.trim();
        if (!((ch =='A')||(ch =='B')||(ch =='C')||(ch =='D'))) {
            return alert("Correct Option must be a single Character (A, B, C or D)");
        }
        if(confirm("Are you sure you want to update these changes ?")){
            axios.post('http://'+ip.ip_address+':8585/api/teacher/update', querystring.stringify({
                id: this.state.question.id,
                question_text: this.state.question.question_text,
                optiona: this.state.question.optiona,
                optionb: this.state.question.optionb,
                optionc: this.state.question.optionc,
                optiond: this.state.question.optiond,
                correct: this.state.question.correct,
            })
            )
            .then((resp)=>{
                this.setState({key: resp.data.key, message: resp.data.message})
                this.state.key?(swal("", this.state.message, "success")):(swal("", this.state.message, "error"));
                axios.get('http://'+ip.ip_address+':8585/api/teacher/questions/'+this.state.user)
                .then((response)=>{
                    this.setState({questions: response.data, question: response.data[0]});
                    document.getElementById('view_form').reset();
                })
            })
            
        }
    }

    handleDelete(event){
        event.preventDefault();
        if(confirm("Are you sure you want to delete the selected question ?")){
            axios.delete('http://'+ip.ip_address+':8585/api/teacher/'+this.state.question.id)  
            .then((resp)=>{
                this.setState({key: resp.data.key, message: resp.data.message})
                axios.get('http://'+ip.ip_address+':8585/api/teacher/questions/'+this.state.user)
                .then((response)=>{
                    if(!response.data[0]){
                        alert ("All questions have been deleted. Please add a new one to continue!");
                        this.props.history.replace('/teacher/home/'+this.state.user);
                    }
                    else{
                        this.state.key?(swal("", this.state.message, "success")):(swal("", this.state.message, "error"));
                        this.setState({questions: response.data, question: response.data[0]});
                        document.getElementById('view_form').reset();
                    }
                })
            })
            
        }
    }

    handleDeleteAll(event){
        event.preventDefault();
        axios.get('http://'+ip.ip_address+':8585/api/teacher/deleteall/'+this.state.user)
        .then((resp)=>{
            this.setState({key: resp.data.key, message: resp.data.message})
            if(this.state.key==true){
                alert ("All questions have been deleted successfully!");
                this.props.history.replace('/teacher/home/'+this.state.user);
            }
            else{
                swal("", this.state.message, "error");
            }
        })  
    }
    handleBack(event){
        window.history.back();
    }


    render(){
        return (
            <div>
            <Nav_Teacher user={this.state.user}/>
            <div className="container">
            <br/><br/><br/><br/>
            <form id="view_form" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label col-sm-offset-1 col-sm-2">Questions:</label>
                    <div className="col-sm-8">
                        <select className="form-control" id="ques" onChange={this.handleChangeSelect}>
                        {
                            this.state.questions.map( function(question, index){
                                return <Option question={question} key={question.id} index={index}/>
                            })
                        }
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-offset-1 col-sm-2">Question-Text:</label>
                    <div className="col-sm-8">
                    <input type="text" className="form-control" value={this.state.question.question_text} name="question_text" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-offset-1 col-sm-2">Option A:</label>
                    <div className="col-sm-2">          
                    <input type="text" className="form-control" value={this.state.question.optiona} name="optiona" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-offset-1 col-sm-2">Option B:</label>
                    <div className="col-sm-2">          
                    <input type="text" className="form-control" value={this.state.question.optionb} name="optionb" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-offset-1 col-sm-2">Option C:</label>
                    <div className="col-sm-2">          
                    <input type="text" className="form-control" value={this.state.question.optionc} name="optionc" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-offset-1 col-sm-2">Option D:</label>
                    <div className="col-sm-2">          
                    <input type="text" className="form-control" value={this.state.question.optiond} name="optiond" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-offset-1 col-sm-2">Correct Option:</label>
                    <div className="col-sm-2">          
                    <input type="text" className="form-control" value={this.state.question.correct} name="correct" onChange={this.handleChangeCorrect}/>
                    </div>
                </div>
                <br/>
                <div className="form-group">        
                    <label className="control-label col-sm-offset-1 col-sm-2"></label>
                    <div className="col-sm-9">
                        <input type="submit" className="btn btn-info qb" value="Update"/>&nbsp;&nbsp;
                        <button id="delete" className="btn btn-info qb" onClick={this.handleDelete}>Delete</button>&nbsp;&nbsp;
                        <button id="deleteall" className="btn btn-info qb" onClick={this.handleDeleteAll}>Delete All</button>&nbsp;&nbsp;
                        <Link to={'/teacher/add/'+this.state.user}><button id="add_new" className="btn btn-info qb">Add New</button></Link>&nbsp;&nbsp;
                    </div>
                </div>
              </form>
              &nbsp;&nbsp;<button id="back" className="btn qb col-sm-offset-3" onClick={this.handleBack}>Back</button>
            </div>
            </div>
        );
    }
}