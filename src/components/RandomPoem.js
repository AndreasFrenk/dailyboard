import React, { Component } from "react";


class RandomPoem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  componentDidMount() {
    const request = new XMLHttpRequest();
    request.open('GET', 'https://www.poemist.com/api/v1/randompoems');
    request.responseType = 'json';

      request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
          const firstPoem = request.response[0];
          this.setState({
            title: firstPoem.title,
            content: this.formatPoem(firstPoem.content),
            poet: firstPoem.poet.name
          });
        }
      }
      request.send();
  }

  formatPoem(poem) {
    //Find better solution other than §
    const poemF = poem.replace(/\n/ig, '§');
    const poemArray = poemF.split('');
    
    const formattedPoem = <p> {poemArray.map((character) => (
      character !== "§" ? character : <br />
    ))} <br /></p>

    return formattedPoem;
  }
  render() {
    return (
      <div className="container-fluid pt-4">
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <h1 style={{'text-align': 'center', color:'#329af3'}}>{this.state.title}</h1>
            <blockquote className="blockquote text-center">
              <i className="d-inline fa fa-quote-left  text-success" />
              {this.state.content}
              <footer className="blockquote-footer">
                {this.state.poet}
              </footer>
            </blockquote>

          </div>
        </div>
      </div>
    );
  }
}

export default RandomPoem;
