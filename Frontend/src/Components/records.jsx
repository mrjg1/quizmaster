import React from "react";
import axios from "axios";
import ip from '../../../ip';
import Workbook from 'react-excel-workbook';

export default class Record extends React.Component{
    constructor(props){
        super(props);
        this.state = {user: props.match.params.username, records: [], questions: [], date: ''}
        this.handleBack = this.handleBack.bind(this);
    }
    componentDidMount(){
        var today = new Date();
        this.setState({date: today.toUTCString()})
        axios.get('http://'+ip.ip_address+':8585/api/teacher/questions/'+this.state.user)
        .then((response)=>{
            if(response.data.key==false){
                return swal("", response.data.message, "error");
            }
            this.setState({questions: response.data});
            axios.get('http://'+ip.ip_address+':8585/api/teacher/record')
            .then((resp)=>{
                if(resp.data.key==false){
                    return swal("", resp.data.message, "error");
                }
                this.setState({records: resp.data});
            })
        })
    }
    handleBack(event){
        window.history.back();
    }
    render(){
        return (
            <div>
            <div className="row text-center" style={{marginTop: '20%'}}>
            <Workbook filename={this.state.date+"-Records.xlsx"} element={<button className="btn btn-info qb"> Download Records</button>}>
              <Workbook.Sheet data={this.state.records} name="Sheet A">
                <Workbook.Column label="Roll Number" value="rollno"/>
                <Workbook.Column label="Answers" value="answers"/>
                <Workbook.Column label="Marks" value="marks"/>
                <Workbook.Column label="IP Address" value="ipaddress"/>
              </Workbook.Sheet>
              <Workbook.Sheet data={this.state.questions} name="Sheet B">
                <Workbook.Column label="Question" value="question_text"/>
                <Workbook.Column label="Option A" value="optiona"/>
                <Workbook.Column label="Option B" value="optionb"/>
                <Workbook.Column label="Option C" value="optionc"/>
                <Workbook.Column label="Option D" value="optiond"/>
                <Workbook.Column label="Correct Option" value="correct"/>
              </Workbook.Sheet>
            </Workbook>
            &nbsp;&nbsp;<button id="back" className="btn qb" onClick={this.handleBack}>Back</button>
          </div>
        </div>
        );
    }
}
