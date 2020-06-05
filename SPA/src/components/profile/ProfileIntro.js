import React, { Component } from "react";
import { Container, Card } from "reactstrap";
import "./profileStyle.css";

export default class ProfileIntro extends Component {
  render() {
    return (
      <div >
        <Card style={{ background: "#242526" ,marginTop : '5px'}} >
          <p  style={{ color:'white' ,margin : "5px"}}>
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
          <p  style={{ color:'white' ,margin : "5px"}}>
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
          <p  style={{ color:'white' ,margin : "5px"}}>
            This is a modified jumbotron that occupies the entire horizontal
            space of its parent.
          </p>
        </Card>
      </div>
    );
  }
}
