import React, { Component } from 'react';
import './App.css';
import {FormControl, FormGroup, ControlLabel, Button, Modal} from 'react-bootstrap';
import Iframe from 'react-iframe';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      street: "",
      city: "",
      state: "",
      postalCode: "",
      country: "",
      phone: "",
      modalvisible: false
    };
  }

  makeData() {
    return {
      "business":{
        "business_name":this.state.name,
        "locations":[
          {
            "city":this.state.city,
            "country":this.state.country,
            "phones":[
              {
                "number":this.state.phone,
                "type":"phone"
              }
            ],
            "postal_code":this.state.postalCode,
            "state":this.state.state,
            "street":this.state.street
          }
        ]
      }
    };
  }

  toggleModal() {
    this.setState({ modalvisible: !this.state.modalvisible });
  }

  render() {
    function FieldGroup({ id, label, ...props }) {
      return (
        <FormGroup controlId={id}>
          <ControlLabel>{label}</ControlLabel>
          <FormControl {...props} />
        </FormGroup>
      );
    }
    const generateFieldGroup = function (name, stateName) {
      return FieldGroup({
        id: 'field' + name.replace(" ", "_"),
        label: name,
        type: "text",
        placeholder: "Enter " + name,
        value: this.state[stateName],
        onChange: (e) => {
          const change = {};
          change[stateName] = e.target.value;
          this.setState(change);
        }
      });
    }.bind(this);
    const height = Math.max (window.innerHeight - 183, 200);
    return (
      <div className="App">
        <div className="App-header">
          <h2>Devhub takehome, Ryan Mandel</h2>
        </div>
        <div className="form">
          {generateFieldGroup("Business Name", "name")}
          {generateFieldGroup("Street Address", "street")}
          {generateFieldGroup("City", "city")}
          {generateFieldGroup("State", "state")}
          {generateFieldGroup("Postal Code", "postalCode")}
          {generateFieldGroup("Country", "country")}
          {generateFieldGroup("Phone Number", "phone")}
          <Button onClick={() => this.toggleModal()}>View Preview Site</Button>
        </div>
        <Modal show={this.state.modalvisible} onhide={() => this.toggleModal()}>
          <Modal.Header>
            <Modal.Title>Preview Site</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Iframe url={"http://cloudtemplates.cloudfrontend.net/app/live-preview/?clone_id=1576931&site=" 
              +JSON.stringify(this.makeData()).replace('"', "%22")}
              width="100%"
              height={height+"px"}
              display="initial"
              position="relative"/>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.toggleModal()}>Close</Button>
            <Button bsStyle="primary" onClick={() => console.log(this.makeData())}>Export</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default App;
