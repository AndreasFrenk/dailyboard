import React, { Component } from "react";
import axios from "axios";
import NewsCards from "./newsComponent/NewsCards";

const API_KEY = "3176e205dabdaa119b24d3552f973d29";
const URL = "http://api.mediastack.com/v1/news";

export class News extends Component {
  constructor(props) {
    super(props);
    this.state = {
      news: [],
      loaded: false,
    };
  }

  componentDidMount() {
    let date = new Date();
    date =
      date.getFullYear() + "-" + date.getMonth() + 1 + "-" + date.getDate();
    console.log(date);
    axios
      .get(URL, {
        params: {
          access_key: API_KEY,
          languages: "de",
          limit: 9,
          date: date,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        this.setState({
          news: res.data.data,
          loaded: true,
        });
      });
  }

  render() {
    this.state.loaded && console.log(this.state.news[0].image);
    return (
      <div className="m-3 row">
        <NewsCards loaded={this.state.loaded} news={this.state.news} />
      </div>
    );
  }
}

export default News;
