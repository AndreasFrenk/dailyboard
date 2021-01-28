import React, { Component } from "react";
import axios from "axios";

class RandomPoet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote: [],
    };
  }
  componentDidMount() {
    axios
      .get("https://www.poemist.com/api/v1/randompoems")
      .then((res) => {
        console.log(res.data);
        const firstPoet = res.data[0];
        // const test = <p> test <br /> {this.props.AllLines.map((bus) => (
        //   test
        // ))}</p>
        this.setState({
          title: firstPoet.title,
          // content: firstPoet.content
          // content: <p>{firstPoet.title}<br />Please try another search term.</p>
          content: this.formatPoet(firstPoet.content)
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  formatPoet(poet) {
    // const test = <p> test <br /> {this.props.AllLines.map((bus) => (
    //   test
    // ))}</p>
    // const formattedPoet = [];
    const poetArray = poet.split('');
    console.log(poetArray);
    
    // poetArray.map((character) => (
    //   // console.log(character)
    // ));

    for (let i = 0; i < poetArray.length - 1; i++){
      if(i > 0) {
        if(poetArray === '↵'){
          console.log('!!!!')
        }
        if ((poetArray[i] === " " && poetArray[i-1] === " ") 
        // (poetArray[i] === "," && poetArray[i-1] === " "))
       )
        {
          poetArray[i-1] = 'Absatz';
          console.log('Absatz');
        }
        
      }
    
    }
    const formattedPoet = <p> {poetArray.map((character) => (
      character !== "A" ? character : ""
      // character.length === 1 ? character[0] : (<br /> character[1])
    ))} <br /> test test test</p>

    // console.log(formattedPoet);

    return formattedPoet;
  }
  render() {
    return (
      <div className="container-fluid pt-4">
        <div className="row justify-content-md-center">
          <div className="col-md-6">
            <blockquote className="blockquote text-center">
              <i className="d-inline fa fa-quote-left  text-success" />
              {/* <p className="d-inline mb-0  font-italic lead">
                {this.state.content}
              </p> */}
              {this.state.content}

              <footer className="blockquote-footer">
                {this.state.quote.content}
              </footer>
            </blockquote>
            <p>Example of <br></br>text that is using<br></br>the &lt;br&gt; tag to break<br></br>a paragraph.</p>

          </div>
        </div>
      </div>
    );
  }
}

export default RandomPoet;
