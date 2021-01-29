import React, { Component } from "react";
import deepai from "deepai";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
deepai.setApiKey("5d87d5bb-3dd4-4670-8c0d-2ff09e82e2c3");

class Pokemon extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pokemonID: 1,
      imageURL: "",
      pokemonName: "",
      inputText: "I was alone at home when suddenly",
      textLoaded: false,
      userSendRequest: false,
    };
    this.deepaiCall = this.deepaiCall.bind(this);
  }

  async deepaiCall() {
    this.setState({
      userSendRequest: true,
    });
    const resp = await deepai.callStandardApi("text-generator", {
      text: this.state.inputText,
    });

    this.setState({
      generatedText: resp.output,
      textLoaded: true,
    });
  }

  async deepaiImageCall() {
    const resp = await deepai.callStandardApi("text2img", {
      text: this.state.inputText,
    });

    this.setState({
      generatedImageURL: resp.output_url,
    });
    console.log(resp);
  }

  componentDidMount() {
    const randomId = Math.floor(Math.random() * 151 + 1);
    const request = new XMLHttpRequest();
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
    this.setState({
      inputText: event.target.value,
    });
  };

  render() {
    return (
      <div className="container-fluid pt-4">
        <div className="row justify-content-md-center">
          <div className="col-l-6">
            <figure
              class="figure "
            >
              <img
                src={this.state.imageURL}
                className="figure-img img-fluid rounded "
                alt="A generic square placeholder image with rounded corners in a figure."
                style={{ width: "35vw", float: "left", height: "50vh" }}
              />
            </figure>
            <div style={{ width: "50vw", float: "right", height: "50vh" }}>
              <h7>
                Hey buddy, I'm {this.state.pokemonName}! I'd like to tell you a
                story. Why don't you just start and I'll continue :)
              </h7>
              <InputGroup>
                <FormControl
                  placeholder="Just give me 1-2 sentences..."
                  as="textarea"
                  aria-label="With textarea"
                  onChange={this.setInputText}
                />
              </InputGroup>
              <Button variant="dark" onClick={this.deepaiCall}>
                Continue the story {this.state.pokemonName}!
              </Button>
            </div>
          </div>
        </div>
        {this.state.userSendRequest && !this.state.textLoaded ? (
          <div>
            <p>Nice start! Let me think for a sec...</p>
            <Spinner animation="grow" />
          </div>
        ) : (
          <div></div>
        )}
        {this.state.textLoaded ? (
          <div>
            <h1>Here is the story:</h1>
            <p>{this.state.generatedText}</p>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}

export default Pokemon;
