import React from "react";
import axios from "axios";
import querystring from 'querystring';
import Nav_Student from "./nav_student"
import ip from '../../../ip';

class Question extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var num = this.props.index+1;
        return(                   
            <div id={"q"+num} className="tab-pane">
                <div style={{paddingLeft: "15px"}}>
                <p style={{paddingTop: "15px"}}>Q-{num}. {this.props.question.question_text}</p>
                <input type="radio" name={"a"+num} value="A"/>&ensp; A)&ensp; {this.props.question.optiona}<br/>
                <input type="radio" name={"a"+num} value="B"/>&ensp; B)&ensp; {this.props.question.optionb}<br/>
                <input type="radio" name={"a"+num} value="C"/>&ensp; C)&ensp; {this.props.question.optionc}<br/>
                <input type="radio" name={"a"+num} value="D"/>&ensp; D)&ensp; {this.props.question.optiond}<br/><br/>
                </div>
            </div>
        );    
    }
}

export default class Student_Logged extends React.Component{
    constructor(props){
        super(props);
        this.state={
            teacher: '', 
            questions: [], 
            rollno: props.match.params.rollno, 
            time: props.match.params.timer, 
            key: null, 
            message: '', 
            activeQues: 1, 
            answers: '',
            rev: false
        };
        this.handleNext = this.handleNext.bind(this);
        this.getAns = this.getAns.bind(this);
        this.completeAns=this.completeAns.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose=this.handleClose.bind(this);
    }
    componentDidMount(){
        this.props.history.go(1);
        axios.get('http://'+ip.ip_address+':8585/api/student/teacher')
        .then((response)=>{
            if(response.data.key==false){
                return swal("", response.data.message, "error");
            }
            this.setState({teacher: response.data.teach_id})
            axios.get('http://'+ip.ip_address+':8585/api/student/questions/'+this.state.teacher)
            .then((response)=>{
                if(response.data.key==false){
                    return swal("", response.data.message, "error");
                }
                if(Math.round(Math.random())==1){
                    this.setState({questions: response.data.reverse(), rev: true});
                }
                else{
                    this.setState({questions: response.data});
                }
                document.getElementById('curr_question').innerHTML=document.getElementById("q1").innerHTML;
                var prev = this.state.time, f=this.completeAns;
                var x = setInterval(function() {
                    var now = new Date().getTime();
                    var distance = prev - now;
                    var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                    var seconds = Math.floor((distance % (1000 * 60)) / 1000);
                    if(document.getElementById("time_left")!==null){
                        document.getElementById("time_left").innerHTML = minutes + " : " + seconds + " ";
                    }
                    if (distance < 0) {
                        clearInterval(x);
                        f();
                    }
                }, 1000);
                     
                    
            })
        })
        
    }
    
    getAns(){
        var query='input[name=a'+(this.state.activeQues)+']:checked', ans;
        if(document.querySelector(query)!=null){
            ans=document.querySelector(query).value
            }
            else{
                ans='F';
        }
        this.setState({answers: (this.state.answers+ans)});
    }
    completeAns(){
        var query='input[name=a'+(this.state.activeQues)+']:checked', ans;
        if(document.querySelector(query)!=null){
            ans=document.querySelector(query).value
            }
            else{
                ans='F';
        }
        this.setState({answers: (this.state.answers+ans)}, function(){
            var pad="";
            for(var i=this.state.activeQues; i<10; i++){
                pad=pad+'F';
            }
            axios.post('http://'+ip.ip_address+':8585/api/student/submit', querystring.stringify({
                rollno: this.state.rollno,
                answers: this.state.rev?(pad+((this.state.answers.split()).reverse()).join()):(this.state.answers+pad)
                })
            )
            .then((resp)=>{
                this.setState({key: resp.data.key, message: resp.data.message})
                var t;
                this.state.key?(t="success"):(t="error");
                (swal({
                    text: this.state.message,  
                    icon: t,
                    closeOnClickOutside: false
                })    
                );
                this.props.history.push('/finish');
            })
        });
    }
    handleNext(event){
        event.preventDefault();
        this.getAns();
        document.getElementById('num'+(this.state.activeQues+1)).classList.add('active');
        document.getElementById("curr_question").innerHTML = document.getElementById("q"+(this.state.activeQues+1)).innerHTML;
        this.setState({ activeQues: (this.state.activeQues+1)});    
    }
    handleSubmit(event){
        event.preventDefault();
        swal({
            text: "Are you sure you want to submit your test ?",  
            icon: "info",
            buttons: true
        })
        .then((res)=>{
            if(res){
                this.completeAns();
            }
        });
    }
    handleClose(event){
        event.preventDefault();
        swal("", "You cannot close the test without submitting your results", "info")
        //alert("Your answer has been submitte Please press Alt+F4");
    }
    render(){
        document.onkeydown = function(e){
            if(
                ((e.which || e.keyCode)==115 && e.altKey) || 
                ((e.which || e.keyCode)==87 && e.ctrlKey) ||
                ((e.which || e.keyCode)==37 && e.altKey)
                ){
                e.preventDefault();
            }
        }
        return (
            <div>
                <button className="btn btn-danger" style={{position: "absolute", top: "1px", right: "3px"}} onClick={this.handleClose}>&ensp;Exit&ensp;</button>
                <Nav_Student roll={this.state.rollno}/>
                <div  id="start" className="container" style={{paddingLeft: "200px", paddingRight: "200px", paddingTop: "30px"}}>
                    <ul id="mytab" className="nav nav-tabs">
                        <li className="active"><a data-toggle="tab">1</a></li>
                        <li id="num2"><a data-toggle="tab">2</a></li>
                        <li id="num3"><a data-toggle="tab">3</a></li>
                        <li id="num4"><a data-toggle="tab">4</a></li>
                        <li id="num5"><a data-toggle="tab">5</a></li>
                        <li id="num6"><a data-toggle="tab">6</a></li>
                        <li id="num7"><a data-toggle="tab">7</a></li>
                        <li id="num8"><a data-toggle="tab">8</a></li>
                        <li id="num9"><a data-toggle="tab">9</a></li>
                        <li id="num10"><a data-toggle="tab">10</a></li>
                    </ul> <br/><br/>
                    <div className="tab-content">
                        {
                            this.state.questions.map( function(question, index){
                                return <Question question={question} key={question.id} index={index}/>
                            })
                        }
                    </div>
                    <div id="curr_question" style={{backgroundColor: "white", borderRadius: "10px", boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)"}}></div>
                </div>
                <br/>
                <label className="control-label col-sm-offset-1 col-sm-2"></label>
                {(this.state.activeQues!=10)?(<button type="button" className="btn btn-info qb" onClick={this.handleNext}>Next</button>):null}
                &emsp;<button type="button" className="btn btn-danger qb" onClick={this.handleSubmit}>Submit</button>
                <br/>
            </div>
            
        );
    }
}
