import React, { Component } from 'react';
import axios from 'axios';
import exampleImage from '../../assets/images/cover1.jpg';
import CaseItem from './caseitem';
import './caselist.scss';

class CaseList extends Component {
    state = {
        cases: []
    };

    async componentDidMount(){
        const result = await axios.get('/api/caselist');
        //console.log('data from caselist:', result.data);
        this.setState({
            cases: result.data.data
        })
    }

    render(){
        //console.log('caselist state', this.state.cases);
        if(this.state.cases.length === 0){
            return(
                <div>Loading</div>
            );
        }
        const { caseType, location, id } = this.state.cases;

        const caseItemArray = this.state.cases.map(item => {
            return <CaseItem key={id} coverImg={exampleImage} location={location} caseType={caseType}/>
        });

        return(
            <div className="caseListContainer">
                {caseItemArray}
            </div>
        );
    }
}
export default CaseList;

