import React, { Component } from "react";
import axios from "axios";

class DailyImage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      description: {},
    };
  }

  getBase64 = (url) => {
    return axios
      .get(url, {
        responseType: "arraybuffer",
      })
      .then((response) =>
        Buffer.from(response.data, "binary").toString("base64")
      )
      .then((res) => console.log(res));
  };

  componentDidMount() {
    axios
      .get(
        "https://api.nasa.gov/planetary/apod?api_key=1hCYjjaKyBhRaQ90zt0IlmxD54UcuASaovNziYKd"
      )
      .then((res) => {
        console.log(res.data);
        this.setState({
          description: res.data,
        });
      })

      .catch((err) => {
        console.log(err);
      });
  }
  render() {
    return (
      <div className="container-fluid pt-4">
        <div className="row justify-content-md-center">
          <div className="col-l-6">
            <figure class="figure ">
              <img
                src={this.state.description.url}
                className="figure-img img-fluid rounded "
                alt="A generic square placeholder with rounded corners in a figure."
              />
              <figcaption class="figure-caption">
                {this.state.description.title}
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    );
  }
}

export default DailyImage;
