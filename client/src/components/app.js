import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../assets/css/app.scss';
import React from 'react';
import CaseList from './caselist';
import CaseDetails from './caseDetails';
import CaseMap from './casemap';
import Upload from './upload';
import Resource from './resource';
import Landing from './landing';
import LostLanding from './lostlanding';
import FoundLanding from './foundlanding';
import TypeSelection from './typeselection';
import SizeSelection from './sizeselection';
import Nav from './nav';
import {Route} from 'react-router-dom';


const App = () => (
    <div>
        <Nav/>
        <div className="container">
            <Route exact path="/" component={Landing}/>
            <Route path="/caselist" component={CaseList}/>
            <Route path="/casemap" component={CaseMap}/>
            <Route path="/upload" component={Upload}/>
            <Route path="/resource" component={Resource}/>

            <Route path="/lostlanding" component={LostLanding}/>
            <Route path="/foundlanding" component={FoundLanding}/>
            <Route path="/typeselection" component={TypeSelection}/>
            <Route path="/sizeselection" component={SizeSelection}/>
            <Route path="/casedetails" component={CaseDetails}/>
        </div>
    </div>
);

export default App;