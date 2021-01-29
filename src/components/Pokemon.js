import React, { Component } from "react";
import deepai from "deepai";
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

deepai.setApiKey("5d87d5bb-3dd4-4670-8c0d-2ff09e82e2c3");

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonID: 1,
      imageURL: "",
      pokemonName: "",
      inputText: "I was alone at home when suddenly",
    };
    this.deepaiCall = this.deepaiCall.bind(this);
  }

  async deepaiCall() {
    // const result = await deepai.callStandardApi("sentiment-analysis", {
    //     text: "I am very happy to play with the newest APIs!"
    // });
    // console.log(result);
    // console.log()
    console.log(this.state);
    var resp = await deepai.callStandardApi("text-generator", {
      text: this.state.inputText,
    });

    this.setState({
      generatedText: resp.output,
    });
    console.log(resp);
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

  componentDidMount() {
    // deepai.setApiKey(this.state.deepaiAPIKey);
    // this.deepaiCall();
    // this.deepaiImageCall();
    const randomId = Math.floor(Math.random() * 151 + 1);
    const request = new XMLHttpRequest();
    console.log(randomId);
    request.open("GET", "http://pokeapi.co/api/v2/pokemon/" + randomId + "/");
    request.responseType = "json";
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const res = request.response;
        console.log(res.name);
        this.setState({
          pokemonID: randomId,
          imageURL:
            "https://pokeres.bastionbot.org/images/pokemon/" +
            randomId +
            ".png",
          pokemonName: res.name,
        });
      }
    };
    request.send();
  }

  setInputText = (event) => {
    console.log(event.target.value);
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
                src={this.state.imageURL}
                className="figure-img img-fluid rounded "
                alt="A generic square placeholder image with rounded corners in a figure."
              />
              <figcaption class="figure-caption">
                {this.state.pokemonName}
              </figcaption>
              {/* <img
                src={this.state.generatedImageURL}
                className="figure-img img-fluid rounded "
                alt="A generic square placeholder image with rounded corners in a figure."
              /> */}
              <figcaption class="figure-caption">
                {this.state.generatedText}
              </figcaption>
            </figure>
            <InputGroup>
              <InputGroup.Prepend>
                <InputGroup.Text>With textarea</InputGroup.Text>
              </InputGroup.Prepend>
              <FormControl as="textarea" aria-label="With textarea" onChange={this.setInputText}/>
            </InputGroup>
            <Button variant="dark" onClick={this.deepaiCall}>Dark</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default Pokemon;
