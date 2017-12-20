import React from "react";
import axios from "axios";
import querystring from "querystring";
import Nav_Teacher from "./nav_teacher"
import ip from '../../../ip';

export default class Add_Question extends React.Component{
    constructor(props) {
        super(props);
        this.state = {user: props.match.params.username, question_text: '', optiona: '', optionb: '', optionc: '', optiond: '', correct: '', key: null, message: ''};
        this.handleChange = this.handleChange.bind(this);
        this.handleChangeCorrect = this.handleChangeCorrect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }

    handleChange(event){
        this.setState({[event.target.name]: event.target.value});
    }

    handleChangeCorrect(event){
        this.setState({[event.target.name]: event.target.value.toUpperCase()});
        event.target.value=event.target.value.toUpperCase();
    }

    handleSubmit(event){
        event.preventDefault();
        if(this.state.question_text.trim()==''){
            return alert("Question Text cannot be left blank");
        }
        var ch = this.state.correct;
        var a=this.state.optiona.trim(), b=this.state.optionb.trim(), c=this.state.optionc.trim(), d=this.state.optiond.trim(); 
        if ((a =='')||(b =='')||(c =='')||(d =='')) {
            return alert("Options cannot be left blank");
        }
        if (!((ch =='A')||(ch =='B')||(ch =='C')||(ch =='D'))) {
            return alert("Correct Option must be a single Character (A, B, C or D)");
        }
        axios.post('http://'+ip.ip_address+':8585/api/teacher/add', querystring.stringify({
            teach_id: this.state.user,
            question_text: this.state.question_text,
            optiona: this.state.optiona,
            optionb: this.state.optionb,
            optionc: this.state.optionc,
            optiond: this.state.optiond,
            correct: this.state.correct,
        })
        )
        .then((resp)=>{
            this.setState({key: resp.data.key, message: resp.data.message})
            var t;
            this.state.key?(t="success"):(t="error");
            (swal({
                text: this.state.message,  
                icon: t})
                .then(function(){
                    document.getElementById('add_form').reset();
                    document.getElementById('question_text').focus();        
                })           
                
            );
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
            <br/><br/><br/><br/><br/>
            <form id="add_form" className="form-horizontal" onSubmit={this.handleSubmit}>
                <div className="form-group">
                    <label className="control-label col-sm-offset-2 col-sm-2">Question:</label>
                    <div className="col-sm-6">
                    <input type="text" id="question_text" className="form-control" placeholder="Enter question" name="question_text" onChange={this.handleChange} autoFocus />
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-offset-2 col-sm-2">Option A:</label>
                    <div className="col-sm-2">          
                    <input type="text" className="form-control" placeholder="Option A" name="optiona" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-offset-2 col-sm-2">Option B:</label>
                    <div className="col-sm-2">          
                    <input type="text" className="form-control" placeholder="Option B" name="optionb" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-offset-2 col-sm-2">Option C:</label>
                    <div className="col-sm-2">          
                    <input type="text" className="form-control" placeholder="Option C" name="optionc" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-offset-2 col-sm-2">Option D:</label>
                    <div className="col-sm-2">          
                    <input type="text" className="form-control" placeholder="Option D" name="optiond" onChange={this.handleChange}/>
                    </div>
                </div>
                <div className="form-group">
                    <label className="control-label col-sm-offset-2 col-sm-2">Correct Option:</label>
                    <div className="col-sm-2">          
                    <input type="text" className="form-control" placeholder="A, B, C or D" name="correct" onChange={this.handleChangeCorrect}/>
                    </div>
                </div>
                <div className="form-group">        
                    <div className="col-sm-offset-4 col-sm-10">
                    <input type="submit" className="btn btn-info qb" value=" Add "/>
                    </div>
                </div>
            </form>
            &nbsp;&nbsp;<button id="back" className="btn qb col-sm-offset-4" onClick={this.handleBack}> Back </button>
            </div>
            </div>
        );
    }
}
