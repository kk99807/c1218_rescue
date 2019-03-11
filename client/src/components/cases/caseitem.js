import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import exampleImage from "../../assets/images/cover1.jpg";

class CaseItem extends Component{

    state = {
        mobile: window.innerWidth < 635
    };

    componentDidMount(){
        window.addEventListener('resize', ()=>{
            this.setState({
                mobile: window.innerWidth < 635
            })
        });


    }

    render(){
        const { caseType, location, id, coverImg, date, description } = this.props;

        const dateObj = new Date(date);
        const dateString = dateObj.toLocaleDateString();

        let prefixForAddress = null;
        if(caseType === 'lost'){
            prefixForAddress = 'Last seen';
        } else {
            prefixForAddress = 'Found';
        }

        return(
            <Link to={"/casedetails/"+id}>
                <div className="card small horizontal">
                    <div className="card-image">
                        <img className="responsive" src={coverImg}/>
                    </div>
                    <div className="card-stacked">
                        <div className="card-content">
                            <div className="contentDiv">
                                <p>{prefixForAddress} in {location.city}, {location.state}</p>
                                <p>On: {dateString}</p>
                                <p className={this.state.mobile ? 'mobile':''}>Description: {description}</p>
                            </div>

                        </div>
                        <div className="card-action">
                            <a href={"/casedetails/"+id}>Details</a>
                        </div>
                    </div>
                </div>
            </Link>

        );
    }
}

export default CaseItem;