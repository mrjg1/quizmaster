import React from "react";
import {Link} from "react-router-dom"

export default class Welcome extends React.Component{
    constructor(props){
        super(props);
        this.handleBack = this.handleBack.bind(this);
    }
    componentDidMount(){
        swal({
            text: "Please read all the instructions carefully before proceeding.",
            icon: "info",
            closeOnClickOutside: false
        }) 
    }
    handleBack(event){
        event.preventDefault();
        this.props.history.push('/');
    }
    render(){
        return (
            <div className="container" style={{paddingLeft: "200px", paddingRight: "200px", paddingTop: "13%"}}>
            <div style={{backgroundImage: "url('title.png')", width: "329px", height: "57px", position: "absolute", top: "9%", left: "40%"}}></div>
            <div style={{backgroundColor: "white", borderRadius: "10px", boxShadow: "0 2px 5px 0 rgba(0,0,0,.26)"}}>
                <p style={{paddingTop: "2%", paddingRight: "2%", paddingBottom: "4%"}}>
                <h3 style={{color: "#07417d"}}>&emsp;Instructions</h3><br/>
                <ul><h5>
                <li>All questions are to be answered sequentially.</li><br/>
                <li>Once clicked <b>Next</b>, the answer cannot be changed for that question.</li><br/>
                <li>Unanswered questions <b>cannot</b> be reviewed later.</li><br/>
                <li>Test cannot be aborted or closed without submission.</li><br/>
                <li><b>Timer</b> wil be displayed in the <b>Top-Right</b> corner of your test screen.</li><br/>
                <li>Test will be auto-submitted when time runs out.</li><br/>
                <li><b>No negative</b> marks will be given for inncorrect or unanswered questions.</li><br/>
                <li>Test cannot be given again, once submitted your answers cannot be replaced.</li><br/>
                <li><b>Never</b> press &nbsp;<b>Alt + &#8701;</b>&nbsp; (back arrow) during the test. Doing so will restart your test but the timer will not be reset.</li><br/>
                <li>Use of <b>Mobile Phones</b> is strictly <b>prohibited.</b></li>
                </h5>
                </ul>
                </p>
            </div>
            <br/>
            <div style={{paddingLeft: "30%"}}>
            <Link to='/student'><button type="button" className="btn btn-info qb">Proceed</button></Link>
            &ensp;
            <button id="back" className="btn qb" onClick={this.handleBack}> Back </button>
            </div>
            </div>
        );
    }
}