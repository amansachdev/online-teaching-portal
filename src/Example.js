import React, { Component } from "react";
import { Input, Button,Card, CardImg, CardText, CardBody,
    CardTitle, CardSubtitle } from "reactstrap";
    import './Studentdashboard.css';


class Example extends Component {
  handle = event => {
    console.log(event.keyCode);
    if (event.keyCode === 27) {
      event.preventDefault();
      alert("You hit esc!");
    }
  };
  render() {
    return (
      <div className="buttonStyle">
        <Button id="custom_button" onKeyDown={this.handle}></Button>{' '}
        </div>
    );
  }
}

export default Example;
