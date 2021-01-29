import React, { Component } from "react";
import deepai from "deepai";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

deepai.setApiKey("5d87d5bb-3dd4-4670-8c0d-2ff09e82e2c3");

class GenerateImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imageURL: "",
      inputText: "I was alone at home when suddenly",
    };
    this.deepaiImageCall = this.deepaiImageCall.bind(this);
  }

  async deepaiImageCall() {
    var resp = await deepai.callStandardApi("text2img", {
      text: this.state.inputText,
    });

    this.setState({
      generatedImageURL: resp.output_url,
    });
    console.log(resp);
  }


  setInputText = (event) => {
    this.setState({
      inputText: event.target.value
    })
  }

  render() {
    return (
      <div className="container-fluid pt-4">
        <div className="row justify-content-md-center">
          <div className="col-l-6">
            <figure class="figure ">
              <img
                src={this.state.generatedImageURL}
                className="figure-img img-fluid rounded "
                alt="A generic square placeholder image with rounded corners in a figure."
              />
            </figure>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>With textarea</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" aria-label="With textarea" onChange={this.setInputText}/>
            </InputGroup>
            <Button variant="dark" onClick={this.deepaiImageCall}>Generate Image</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default GenerateImage;
