import React, { Component } from 'react';
import './Bootstrap.min.css';
import './Studentdashboard.css';
import firebaseconfig from './Firebaseconfig';
import swal from 'sweetalert2';
import {firestore} from "./Firebaseconfig.js";
import 'firebase/firestore';

import ReactPlayer from 'react-player';
import Example from './Example';
import FullScreenComponent from 'react-easyfullscreen';
import Chatbot from "react-chatbot-kit";
import config from "./chatbot/config";
import ActionProvider from "./chatbot/ActionProvider";
import MessageParser from "./chatbot/MessageParser";
import QueryBot from './QueryBot';
import CameraM from './cameraM';

import { PrismCode } from 'react-prism';
import { Button } from 'reactstrap';
import {
    Player,
    PlayToggle,
    ControlBar,
    ReplayControl,
    ForwardControl,
    CurrentTimeDisplay,
    TimeDivider,
    PlaybackRateMenuButton,
    VolumeMenuButton
  } from 'video-react';



const style = {
    container: {
      alignItems: 'center',
      display: 'flex',
      flexFlow: 'column wrap',
      justifyContent: 'center',
      width: '80%',
    },
    title: {
      color: '#1f2041',
      textTransform: 'uppercase',
    },
    screen: {
      alignItems: 'center',
      backgroundColor: '#417b5a',
      display: 'flex',
      flexFlow: 'column wrap',
      height: 120,
      justifyContent: 'center',
      margin: 10,
      width: 300,
    },
    button: {
      backgroundColor: '#4b3f72',
      border: 0,
      borderRadius: 4,
      color: '#e9d2c0',
      marginBottom: 5,
      minWidth: 120,
      padding: 5,
    },
    image: {
      cursor: 'pointer',
      width: '50%',
    },
    // bgImage: {
    //   backgroundImage:'url('+ "https://images.pexels.com/photos/34153/pexels-photo.jpg" +')',
    // },
    buttonImage: {
      border: 'none',
      background: 'transparent',
      '&:focus': {
        outline: 'none',
      },
    },
  };

  


class Studentdashboard extends Component {
    constructor(props) {
        super(props)
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
          }
        this.state = {
            play:"",
            userFullName: "",
            userLocation: "",
            userQualification: "",
            userPercentage: "",
            userPassingYear: "",
            userFb: "",
            userTw: "",
            userGp: "",
            userSite: "",
            userBio: "",
            userData: {},
            showEditForm: false,
            showOtherDivs: {
                jobList: true,
                companyList: false,
            },
            jobsArray: [],
            companyArray: [],
        }
        // Log Out Handler 
        this.logOut = this.logOut.bind(this);
        // Edit Profile Handlers
        this.showEditFormHandler = this.showEditFormHandler.bind(this);
        this.hideEditFormHandler = this.hideEditFormHandler.bind(this);
        this.saveEditFormHandler = this.saveEditFormHandler.bind(this);
        this.userFullNameHandler = this.userFullNameHandler.bind(this);
        this.userLocationHandler = this.userLocationHandler.bind(this);
        this.userQualificationHandler = this.userQualificationHandler.bind(this);
        this.userPercentageHandler = this.userPercentageHandler.bind(this);
        this.userPassingYearHandler = this.userPassingYearHandler.bind(this);
        this.userFbHandler = this.userFbHandler.bind(this);
        this.userTwHandler = this.userTwHandler.bind(this);
        this.userGpHandler = this.userGpHandler.bind(this);
        this.userSiteHandler = this.userSiteHandler.bind(this);
        this.userBioHandler = this.userBioHandler.bind(this);
        this.showOtherDivsHandler = this.showOtherDivsHandler.bind(this);
        this.goToLatestPost= this.goToLatestPost.bind(this);
        this.play= this.play.bind(this);
        this.haveAttend = this.haveAttend.bind(this);
        //this.player.subscribeToStateChange(this.handleStateChange.bind(this));
    }
    goToLatestPost() {
        this.props.history.push('/latest-videos');}

    componentDidMount() {
        let jobsArray = [];
        let companyArray = [];
        let userData;
        var that = this;
        firebaseconfig.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;
                let firebaseRefKey = firebaseconfig.database().ref().child(uid);
                firebaseRefKey.on('value', (dataSnapShot) => {
                    userData = dataSnapShot.val();
                    // userData.uid = uid;
                    // console.log(userData);
                    // console.log(userData.uid);
                    that.setState({
                        userData: userData,
                    })
                })
                let jobRefKey = firebaseconfig.database().ref();

                jobRefKey.once('value', (dataSnapShot) => {
                    for(let key1 in dataSnapShot.val()){
                        if(dataSnapShot.val()[key1].jobs !== undefined){
                            for(let key2 in dataSnapShot.val()[key1].jobs){
                                dataSnapShot.val()[key1].jobs[key2].companyEmail = dataSnapShot.val()[key1].userEmail;
                                jobsArray.push(dataSnapShot.val()[key1].jobs[key2]);                                
                                // console.log(dataSnapShot.val()[key1].jobs[key2]);
                            }
                        }
                    }
                    that.setState({
                        jobsArray: jobsArray,
                    })
                    // console.log(jobsArray.companyEmail)
                })
                
                let companyRefKey = firebaseconfig.database().ref();
                companyRefKey.once('value', (dataSnapShot) => {
                    // console.log(dataSnapShot.val());
                    for(let key in dataSnapShot.val()){
                        if (dataSnapShot.val()[key].userStatus.company === true) {
                            companyArray.push(dataSnapShot.val()[key])
                        }
                    }
                    that.setState({
                        companyArray: companyArray,
                    })
                    // console.log(companyArray)
                })
            } else {
                console.log("User is not logged in")
            }
        });
    }

    userFullNameHandler(event) {
        this.setState({
            userFullName: event.target.value,
        })
    }
    userLocationHandler(event) {
        this.setState({
            userLocation: event.target.value,
        })
    }
    userQualificationHandler(event) {
        this.setState({
            userQualification: event.target.value,
        })
    }
    userPercentageHandler(event) {
        this.setState({
            userPercentage: event.target.value,
        })
    }
    userPassingYearHandler(event) {
        this.setState({
            userPassingYear: event.target.value,
        })
    }
    userFbHandler(event) {
        this.setState({
            userFb: event.target.value,
        })
    }
    userTwHandler(event) {
        this.setState({
            userTw: event.target.value,
        })
    }
    userGpHandler(event) {
        this.setState({
            userGp: event.target.value,
        })
    }
    userSiteHandler(event) {
        this.setState({
            userSite: event.target.value,
        })
    }
    userBioHandler(event) {
        this.setState({
            userBio: event.target.value,
        })
    }
    showEditFormHandler() {
        if (this.state.showEditForm === false) {
            this.setState({
                showEditForm: true,
            })
        }
    }
    hideEditFormHandler() {
        if (this.state.showEditForm === true) {
            this.setState({
                showEditForm: false,
            })
        }
    }

    saveEditFormHandler() {
        let userData;
        var that = this;
        firebaseconfig.auth().onAuthStateChanged(function (user) {
            if (user) {
                var uid = user.uid;
                let firebaseRefKey = firebaseconfig.database().ref().child(uid);
                firebaseRefKey.on('value', (dataSnapShot) => {
                    userData = dataSnapShot.val();
                    userData.userFullName = that.state.userFullName;
                    userData.userLocation = that.state.userLocation;
                    userData.userQualification = that.state.userQualification;
                    userData.userPercentage = that.state.userPercentage;
                    userData.userPassingYear = that.state.userPassingYear;
                    userData.userFb = that.state.userFb;
                    userData.userTw = that.state.userTw;
                    userData.userGp = that.state.userGp;
                    userData.userSite = that.state.userSite;
                    userData.userBio = that.state.userBio;
                    that.setState({
                        userData: userData,
                    })
                })
                firebaseRefKey.set(that.state.userData)
                swal({
                    type: 'success',
                    title: 'Successfully Updated',
                    text: 'Profile has been successfully updated',
                }).then((value) => {
                    that.setState({
                        showEditForm: false,
                    })
                });
            } else {
                console.log("User is not logged in")
            }
        });
    }

    showOtherDivsHandler(event) {
        let showOtherDivs = this.state.showOtherDivs;
        for (let key in showOtherDivs) {
            showOtherDivs[key] = false;
        }
        showOtherDivs[event.target.value] = event.target.checked;
        this.setState({
            showOtherDivs: showOtherDivs
        })
    }
    play(){
        const sleep = (milliseconds) => {
            return new Promise(resolve => setTimeout(resolve, milliseconds))
          }
        this.player.toggleFullscreen()
        this.player.play()
        
        const { player } = this.player.getState();
        console.log(player.currentTime);
        console.log(player.isFullscreen);
        //console.log(this.player.toggleFullscreen);
        console.log(player.ended);
        sleep(5000).then(() => {
            if(player.isFullscreen == true){
                console.log(player.isFullscreen)
            }
            else{
               // alert("stay in full screen")
            }
          })
        if (player.ended == true){
            //prompt("stay in fullscreen mode");
            //this.player.pause()
            console.log("attended")
        }
    }
    
      
    haveAttend(){
        const { player } = this.player.getState();
        if (player.ended == true){
            //prompt("stay in fullscreen mode");
            //this.player.pause()
            console.log("attended")
            firestore.collection("attend").add({
                attended: "companyName"
             })
        }
        else{
            alert("watch full video")
        }

    }
    handleStateChange(state, prevState) {
        // copy player state to this component's state
        this.setState({
          player: state,
          currentTime: state.currentTime
        })}

    logOut() {
        firebaseconfig.auth().signOut().then(() => {
            // Sign-out successful.
            swal({
                type: 'success',
                title: 'Successfully Logged Out',
            }).then((value) => {
                // setTimeout(function(){
                // }, 1000)
                this.props.history.push('/')
            });
        }).catch((error) => {
            // An error happened.
            let errorMessage = error.message;
            swal({
                type: 'error',
                title: 'Error',
                text: errorMessage,
            })
        });
    }
    render() {
        
        

        let jobList = this.state.jobsArray.map((value) => {
            const haveAttended = () => {
                const { player } = this.player.getState();
                if (player.ended == true){
                    //prompt("stay in fullscreen mode");
                    //this.player.pause()
                    console.log("attended")
                    firestore.collection("attend").add({
                        attended: value.companyEmail
                     })
                }
                else{
                    alert("watch full video")
                }
        
            }
            const monitor = () => {
                firestore.collection("attend").add({
                  attended: value.companyEmail
               })
                  .then(function(){
                    console.log("added displayName/Attendance to firebase");
                  })
                };
            return(
                
                <div key={value.jobUid}>
                    
                    <div className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <h2 className="h3 text-dark mb-3">{value.companyName}</h2>
                        <h3 className="h3 text-dark mb-3">{value.jobTitle}</h3>
                        <div id="jobDetails">
                            <strong><p className="text-secondary mb-0">
                                {/* <span>{value.companyName}</span>, */}
                                <span >{value.jobLocation}</span></p></strong>
                            {/* <strong><p className="text-secondary"><span>Apply Now:</span><span className="ml-3">{value.companyEmail}</span></p></strong> */}
                        </div>
                        <p>{value.jobDescription}</p>
                    </div>
                    <div className="col-lg-11 col-md-11 py-2 mb-3 mx-auto border border-primary">
                        <small>
                        
                        {/* <i className="fas fa-dollar-sign text-primary ml-3 mr-2"></i> */}
                        <span>
                        
                        <Player
                        currentSrc
                        ref={player => {
                            this.player = player;
                          }}
                        fluid = {true}   
                        poster=""
                        src= {value.jobSalary}
                        >
                        <ControlBar autoHide={false} disableDefaultControls={true}>
                        
                        </ControlBar>
                        </Player>
                        <div className="py-3">
                        <Button onClick={this.play} className="mr-3">
                            play()
                        </Button>
                        <Button onClick={this.haveAttend} className="mr-3">
                            IhaveAttended()
                        </Button>
                        <Example />
                        
                        </div>
                        
                        <pre>
                        <PrismCode className="language-json">
                        {JSON.stringify(this.state.player, null, 2)}
                        {JSON.stringify(this.state.volume)}
                        
                        
                        </PrismCode>
                        </pre>

                        </span>
                        </small>
                        <small><i className="far fa-calendar-alt text-primary mr-2"></i><span>{value.jobPostDate}</span></small>
                        
                        
                    </div>
                    

                </div>
            )
        })

        // console.log(this.state.companyArray);
        let companyList = this.state.companyArray.map((value) => {
            return(
                <div key={value.userUid}>
                    <div className="col-lg-11 col-md-11 p-3 mx-auto border border-bottom-0 border-primary">
                        <h3 className="h3 text-dark mb-3">{value.userFullName}</h3>
                        <strong><p className="text-secondary"><span>{value.userIndustry}</span><span className="ml-3">{value.userLocation}</span></p></strong>
                        <p>{value.userBio}</p>
                    </div>
                    <div className="col-lg-11 col-md-11 py-2 mb-3 mx-auto border border-primary">
                        <small>
                            <i className="far fa-envelope text-primary mr-2"></i><span>{value.userEmail}</span>
                        </small>
                    </div>
                </div>
            )
        })
        return (
            <div>
                {this.state.showEditForm ?
                    <div className="col-11 mx-auto py-4 px-lg-5 px-md-5 my-5 bg-white shadow border border-primary">
                        <div className="col-lg-6 col-md-6 mx-auto">
                            <h2 className="h2 text-center text-dark mb-3">Edit Profile</h2>
                            <div className="form-group">
                                <label htmlFor="userFullName">Full name</label>
                                <input type="text" value={this.state.userFullName} onChange={this.userFullNameHandler} className="form-control" id="userFullName" placeholder="Name" />
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="userLocation">Year</label>
                                <select name="cars" id="cars" value={this.state.userLocation} onChange={this.userLocationHandler} className="form-control" id="userLocation" placeholder="1">
                                    <option value="First">First</option>
                                    <option value="Second">Second</option>
                                    <option value="Third">Third</option>
                                    <option value="Fourth">Fourth</option>
                                </select>
                                {/* <input type="text" value={this.state.userLocation} onChange={this.userLocationHandler} className="form-control" id="userLocation" placeholder="1" /> */}
                            </div>
                            <div className="form-group">
                                <label htmlFor="userQualification">Sem</label>
                                <select name="cars" id="cars" value={this.state.userQualification} onChange={this.userQualificationHandler} className="form-control" id="userQualification">
                                    <option value="First">First</option>
                                    <option value="Second">Second</option>
                                    <option value="Third">Third</option>
                                    <option value="Fourth">Fourth</option>
                                    <option value="Fifth">Fifth</option>
                                    <option value="Sixth">Sixth</option>
                                    <option value="Seventh">Seventh</option>
                                    <option value="Eight">Eight</option>
                                </select>
                                {/* <input type="text" value={this.state.userQualification} onChange={this.userQualificationHandler} className="form-control" id="userQualification" placeholder="Bachelor Of Engineering"/> */}
                            </div>
                            
                            <div className="form-group">
                                <label htmlFor="userPassingYear">Passing Year</label>
                                <input type="number" value={this.state.userPassingYear} onChange={this.userPassingYearHandler} className="form-control" id="userPassingYear" placeholder="2015" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userPercentage">Percentage</label>
                                <input type="number" value={this.state.userPercentage} onChange={this.userPercentageHandler} className="form-control" id="userPercentage" placeholder="50%" />
                            </div>
                            {/* <div className="form-group">
                                <label htmlFor="userFacebook">Facebook</label>
                                <input type="text" value={this.state.userFb} onChange={this.userFbHandler} className="form-control" id="userFacebook" placeholder="https://www.facebook.com/" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userTwitter">Twitter</label>
                                <input type="text" value={this.state.userTw} onChange={this.userTwHandler} className="form-control" id="userTwitter" placeholder="https://www.twitter.com/" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userGooglePlus">Google Plus</label>
                                <input type="text" value={this.state.userGp} onChange={this.userGpHandler} className="form-control" id="userGooglePlus" placeholder="https://plus.google.com/" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="userSite">Website</label>
                                <input type="text" value={this.state.userSite} onChange={this.userSiteHandler} className="form-control" id="userSite" placeholder="https://www.example.com/" />
                            </div> */}
                            <div className="form-group">
                                <label htmlFor="userBio">Profile Description</label>
                                <textarea value={this.state.userBio} onChange={this.userBioHandler} className="form-control" id="userBio" rows="4"></textarea>
                            </div>
                            <button type="button" className="btn btn-success btn-block text-uppercase mb-3" onClick={this.saveEditFormHandler}>Save Profile</button>
                            <button type="button" className="btn btn-outline-danger btn-block text-uppercase" onClick={this.hideEditFormHandler}>Cancle</button>
                        </div>
                    </div>
                    :
                    <div>
                        <div className="col-11 mx-auto my-4 bg-white shadow border border-primary">
                            <div className="row">
                                <div className="col-lg-8 col-md-8 pt-3 py-lg-3 py-md-3 px-lg-5 px-md-5">
                                    <div className="row">
                                        <div className="col-lg-2 col-md-2 my-lg-4 text-center">
                                            <i className="fas fa-user-graduate graduate-logo text-primary"></i>
                                        </div>
                                        <div className="col-lg-10 col-md-10 my-4">
                                            <h1 className="">{this.state.userData.userFullName}</h1>
                                            <p>{this.state.userData.userBio}</p>
                                            <button type="button" onClick={this.showEditFormHandler} className="btn btn-success mr-3 text-uppercase">Edit Profile</button>
                                            <button type="button" onClick={this.logOut} className="btn btn-outline-danger text-uppercase">Log Out</button>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-4 col-md-4 py-lg-3 py-md-3">
                                    <div className="my-4 pl-4 border-left">
                                        <table>
                                            {/* <tbody> */}
                                                {/* <tr>
                                                    <th className="pb-2">Year:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userLocation}</td>
                                                </tr>
                                                <tr>
                                                    <th className="pb-2">Sem:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userQualification}</td>
                                                </tr>
                                                <tr>
                                                    <th className="pb-2">Percentage:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userPercentage}</td>
                                                </tr>
                                                <tr>
                                                    <th className="pb-2">Passing Year:</th>
                                                    <td className="pl-lg-5 pl-md-5 pl-3 pb-2">{this.state.userData.userPassingYear}</td>
                                                </tr> */}
                                                <CameraM /> 
                                            {/* </tbody> */}
                                        </table>
                                        {/* <div className="my-4">
                                            <a href={this.state.userData.userFb} target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook-f text-primary mr-4" ></i></a>
                                            <a href={this.state.userData.userTw} target="_blank" rel="noopener noreferrer"><i className="fab fa-youtube text-primary mr-4"></i></a>
                                            <a href={this.state.userData.userGp} target="_blank" rel="noopener noreferrer"><i className="fab fa-google-plus-g text-primary mr-4"></i></a>
                                            <a href={this.state.userData.userSite} target="_blank" rel="noopener noreferrer"><i className="fas fa-globe text-primary mr-4"></i></a>
                                        </div> */}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="myNavbar" className="col-11 mx-auto my-4 bg-white shadow border border-primary">
                            <ul className="list-inline m-3">
                                <li className="list-inline-item px-3 border-right border-primary">
                                    <input type="radio" id="jobList" name="showOtherDivs" value="jobList" checked={this.state.showOtherDivs["jobList"]} onChange={this.showOtherDivsHandler}/>
                                    <label className="myNavbarItems m-0" htmlFor="jobList"><strong>Posts</strong></label>
                                </li>
                                <li className="list-inline-item px-3">
                                    <input type="radio" id="companyList" name="showOtherDivs" value="companyList" checked={this.state.showOtherDivs["companyList"]} onChange={this.showOtherDivsHandler}/>
                                    <label className="myNavbarItems m-0" htmlFor="companyList"><strong>Instructor List</strong></label>
                                </li>
                            </ul>
                        </div>
                        {this.state.showOtherDivs.jobList ?
                            <div>
                                <div className="col-11 pt-4 pb-5 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                                    <h2 className="h2 text-center text-dark mb-4">Course</h2>
                                    {/* <div className="col-lg-6 col-md-6 mx-auto mt-3">
                                        <button type="button" className="btn btn-success btn-block text-uppercase mb-3" onClick={this.goToLatestPost}>Latest Posts</button>
                                    </div>
                                    <div className="col-lg-6 col-md-6 mx-auto mt-3">
                                        <button type="button" className="btn btn-success btn-block text-uppercase mb-3" >Old Posts</button>
                                    </div> */}
                                    <Example />
                                    {jobList}
                                    <div className=" flex flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4 w-auto p-3">
                                        <div style={{Width: "600px"}}>
                                            <Chatbot
                                            config={config}
                                            actionProvider={ActionProvider}
                                            messageParser={MessageParser}
                                            width={7120}
                                            />
                                        <div/>
                                        </div>
                                        {/* <div className=" flex flex-col items-center md:flex-row md:items-start border-blue-400 px-3 py-4 w-auto p-3"> */}
                                            {/* <React.StrictMode> */}
                                                
                                            {/* </React.StrictMode> */}
                                        {/* </div> */}
                                    </div>
                                    <div style={{Width: "6px"}}>
                                     <div>
                                     <QueryBot />
                                     </div>
                                 </div>

                                </div>
                            </div> :
                        this.state.showOtherDivs.companyList ?
                            <div>

                                <div className="col-11 pt-4 pb-5 px-lg-5 px-md-5 mx-auto my-4 bg-white shadow border border-primary">
                                    <h2 className="h2 text-center text-dark mb-4">Instructor List</h2>
                                    {companyList}                                
                                </div>
                            </div> : null
                        }


                    </div>
                }
            </div>
        )
    }
}
export default Studentdashboard;
