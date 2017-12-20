import React from "react";
import axios from "axios";
import ip from '../../../ip';
import Workbook from 'react-excel-workbook';

export default class Result extends React.Component{
    constructor(props){
        super(props);
        this.state = {results: []}
        this.handleBack = this.handleBack.bind(this);
    }
    componentDidMount(){
        axios.get('http://'+ip.ip_address+':8585/api/teacher/result')
        .then((response)=>{
            if(response.data.key==false){
                return swal("", response.data.message, "error");
            }
            this.setState({results: response.data});
        })
    }
    handleBack(event){
        window.history.back();
    }
    render(){
        return (
            <div>
            <div className="row text-center" style={{marginTop: '20%'}}>
            <Workbook filename={"Results.xlsx"} element={<button className="btn btn-info qb"> Download Result</button>}>
              <Workbook.Sheet data={this.state.results} name="Sheet A">
                <Workbook.Column label="Roll Number" value="rollno"/>
                <Workbook.Column label="Marks" value="marks"/>
              </Workbook.Sheet>
            </Workbook>
            &nbsp;&nbsp;<button id="back" className="btn qb" onClick={this.handleBack}>Back</button>
          </div>
        </div>
        );
    }
}
