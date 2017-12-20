import React from "react";

export default class Message extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        var x = this.props.offset;
        if(this.props.keys==true){
            return(
                <div className={"col-sm-offset-"+x+" col-sm-3 alert alert-success"}>{this.props.message}</div>        
            );
        }
        else{
            return(
                <div className={"col-sm-offset-"+x+" col-sm-3 alert alert-warning"}>{this.props.message}</div>        
            );
        }
    }
}