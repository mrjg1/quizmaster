
import React from "react";
import * as ReactDOM from "react-dom";
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Close from "./Components/close"
import Welcome_Page from "./Components/welcome"
import Admin_Key from "./Components/admin_key"
import Teacher_Login from "./Components/teacher_login"
import Teacher_Logged from "./Components/teacher_logged"
import Add_Question from "./Components/add_question"
import View_Question from "./Components/view_question"
import Student_Login from "./Components/student_login"
import Instructions from "./Components/instructions"
import Test from "./Components/test"
import Finish from "./Components/finish"
import Result from "./Components/results"
import Record from "./Components/records"
import swal from 'sweetalert';

class QuizMaster extends React.Component{
    render(){
        document.onkeydown = function(e){
            if((e.which || e.keyCode)==116){
                e.preventDefault();
            }
        }
    return (
        <BrowserRouter>
        <div>
        <Close/>
        <Route exact path='/' component={Welcome_Page} />
        <Route exact path='/admin' component={Admin_Key} />
        <Route exact path='/teacher' component={Teacher_Login} />
        <Route exact path='/teacher/home/:username' component={Teacher_Logged} />
        <Route exact path='/teacher/add/:username' component={Add_Question} />
        <Route exact path='/teacher/update/:username' component={View_Question} />
        <Route exact path='/results' component={Result} />
        <Route exact path='/records/:username' component={Record} />
        <Route exact path='/instructions' component={Instructions} />
        <Route exact path='/student' component={Student_Login} />
        <Route exact path='/student/test/:timer/:rollno' component={Test} />
        <Route exact path='/finish' component={Finish} />
        <p style={{color: "#07417d", position: "absolute", bottom: "10px", left: "44%"}}>Developed by: Jayesh Goyal</p>
        </div>
        </BrowserRouter>
        );
    }
}

var elem = <QuizMaster/>;
var node = document.getElementById("app");

ReactDOM.render(elem, node);