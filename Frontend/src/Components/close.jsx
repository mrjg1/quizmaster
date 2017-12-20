import React from "react";

export default class Close extends React.Component{
    constructor(props){
        super(props);
        this.handleClose=this.handleClose.bind(this);
    }
    handleClose(event){
        event.preventDefault();
        window.close();
        swal("Press Alt+F4");
    }
    render(){
        return (
            <button className="btn btn-danger" style={{position: "absolute", top: "1px", right: "3px"}} onClick={this.handleClose}>Close</button>
        );
    }
}