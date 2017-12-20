import React from "react";
import {Link} from "react-router-dom"

export default class Welcome extends React.Component{
    constructor(props){
        super(props);
    }
    componentDidMount(){
        this.props.history.go(1);
    }
    render(){
        return (
            <div>
            <div style={{backgroundImage: "url('title.png')", width: "329px", height: "57px", position: "absolute", top: "9%", left: "40%"}}></div>
            <div style={{position: "absolute", top: "35%", left: "40%"}}>
            <br/><br/>
            <Link to='/teacher'><button type="button" className="btn btn-info qb">Teacher Login</button></Link>
            &nbsp;&nbsp;
            <Link to='/instructions'><button type="button" className="btn btn-info qb">Student Login</button><br/><br/></Link>
            &nbsp;<Link to='/admin'><button type="button" className="btn btn-info qbl">Administrator Login</button></Link>
            </div>
            </div>
        );
    }
}