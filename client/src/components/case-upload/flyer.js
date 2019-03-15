import React, {Component} from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import { FacebookShareButton, FacebookIcon, GooglePlusShareButton, GooglePlusIcon, TwitterShareButton, TwitterIcon } from 'react-share';
import './upload.scss';

class FlyerCode extends Component {

    state = {
        data: null,
        error: false
    }

    printFlyer = () => {
        window.print();
        return false;
    }

    async componentDidMount() {
        try {
            const { caseid } = this.props.match.params;

            const response = await axios.get('/api/casedetails?id=' + caseid);
            console.log('response: ', response);

            this.setState({
                data: response.data.data
            });
        } catch (error) {
            this.setState({error: true});
        }
    }

    render() {

        const errorMessage = <h5>We're sorry.  An error has occurred.  Please try again.</h5>;

        try {
            const {data, error} = this.state;

            if (error) {
                return errorMessage;
            }

            if (data === null) {
                return <div>Loading</div>
            }

            const {phone} = data;
            const {location, city, state, zipcode} = data.location;
            const {animalType, description, size} = data.animalDetail;

            const url = `http://pawsfindhome.com/casedetails/${data.id}`;
            const animalTypeDisplay = animalType === 'other' ? 'pet' : animalType;
            const caseTypeDisplay = data.caseType[0].toUpperCase() + data.caseType.slice(1);
            const socialMediaTitle = data.caseType === 'found' ?
                `Please help me identify found ${animalType}` :
                `Please help find my ${animalType}`;

            return (
                <div id="flyer">
                    <div className="buttons center">
                        <FacebookShareButton url={url}>
                            <FacebookIcon size={40} round />
                        </FacebookShareButton>
                        <GooglePlusShareButton url={url}>
                            <GooglePlusIcon size={40} round />
                        </GooglePlusShareButton>
                        <TwitterShareButton url={url} title={socialMediaTitle}>
                            <TwitterIcon size={40} round />
                        </TwitterShareButton>
                        <button onClick={this.printFlyer} className="btn-floating"><i className="material-icons">print</i></button>
                    </div>
                    <div className="row">
                        <div className="col s10 offset-s1 center title">
                            <h2>{caseTypeDisplay.toUpperCase()} {animalTypeDisplay.toUpperCase()}</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s10 offset-s1 m8 offset-m2 center image-container">
                            <img src={data.coverImg} className="responsive-img"/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12 bottom">
                            <div className="details">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td><i className="material-icons">phone</i></td>
                                            <td><a href={'tel:+1' + phone}>{phone.slice(0, 3)}-{phone.slice(3, 6)}-{phone.slice(6)}</a></td>
                                        </tr>
                                        <tr>
                                            <td><i className="material-icons">location_on</i></td>
                                            <td>{city} {state} {zipcode}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="qrcode">
                                <QRCode
                                    value={url}
                                    size={128}
                                    fgColor='#000000'
                                    bgColor='#ffffff'
                                    level='L'
                                    renderAs='svg'
                                    includeMargin={true}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col s12">
                        <span className="label">DESCRIPTION:</span> <span className="description">{caseTypeDisplay} on {data.date}. Size: {size}.  Last seen near {location}. {description}</span>
                        </div>
                    </div>
                    <div className="row footer">
                        <div className="col s12 center">
                        Generated by PAWSFindHome.com
                        </div>
                    </div>

                    <div className="row center">
                        <form>
                            <div className="input-field col s12">
                                <textarea className="materialize-textarea" id="text"/>
                                <label htmlFor="text">Please enter your message to send an email.</label>
                            </div>
                            <button className="btn-floating waves-light waves-effect btn"><i className="material-icons">email</i></button>
                        </form>
                    </div>
            </div>
            )
        } catch (error) {
            return errorMessage;
        }
    }
}

export default FlyerCode;