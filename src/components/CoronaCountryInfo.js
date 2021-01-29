import React, { Component } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import ListGroup from "react-bootstrap/ListGroup";

class CoronaCountryInfo extends Component {
  params = this.props.match.params;
  countryname = this.params.countryname;
  constructor(props) {
    super(props);
    this.state = {
      summary: [],
      loaded: false,
      countryname: this.countryname ? this.countryname : 1,
      countrydata: [],
    };
  }

  componentDidMount() {
    const request = new XMLHttpRequest();
    request.open(
      "GET",
      "https://api.covid19api.com/country/" + this.state.countryname
    );
    request.responseType = "json";
    request.setRequestHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With, content-type"
    );
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const filteredArray2Weeks = [];
        const newestDay = request.response[request.response.length - 1];
        const DayBeforenewestDay =
          request.response[request.response.length - 2];
        request.response.forEach((dataPerDay, index) => {
          if (index % 14 === 0 || index === request.response.length - 1) {
            dataPerDay["Date"] = this.convertDate(dataPerDay.Date);
            filteredArray2Weeks.push(dataPerDay);
          }
        });
        this.setState({
          countrydata: filteredArray2Weeks,
          loaded: true,
          confirmed: newestDay.Confirmed,
          Deaths: newestDay.Deaths,
          Recovered: newestDay.Recovered,
          todayConfirmed: newestDay.Confirmed - DayBeforenewestDay.Confirmed,
          todayDeaths: newestDay.Deaths - DayBeforenewestDay.Deaths,
          todayRecovered: newestDay.Recovered - DayBeforenewestDay.Recovered,
        });
      }
    };
    request.send();
  }

  convertDate(date) {
    const newDate = new Date(date);
    const month = newDate.getMonth() + 1;
    const day = newDate.getDate() + 1;
    const year = newDate.getFullYear();

    return month + "/" + day + "/" + year;
  }

  render() {
    return (
      <div className="container-fluid pt-4">
        {this.state.loaded ? (
          <div>
            <div style={{ width: "50%", float: "left" }}>
              <LineChart
                width={500}
                height={300}
                data={this.state.countrydata}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="Date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="Confirmed"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                />
                <Line type="monotone" dataKey="Deaths" stroke="#82ca9d" />
              </LineChart>
            </div>
            <div style={{ width: "50%", float: "right" }}>
           <ListGroup>
            <ListGroup.Item>
                {" "}
                Country{" "}
                <span style={{ color: "#0dbcff", paddingRight: "5px" }}>
                  {this.state.countryname}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Total Confirmed{" "}
                <span style={{ color: "#aaa", paddingRight: "5px" }}>
                  {this.state.confirmed}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Total Deaths{" "}
                <span style={{ color: "#696969", paddingRight: "5px" }}>
                  {this.state.Deaths}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Total Recovered{" "}
                <span style={{ color: "#8ACA2B", paddingRight: "5px" }}>
                  {this.state.Recovered}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Today Confirmed{" "}
                <span style={{ color: "#aaa", paddingRight: "5px" }}>
                  {this.state.todayConfirmed}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Today Deaths{" "}
                <span style={{ color: "#696969", paddingRight: "5px" }}>
                  {this.state.todayDeaths}
                </span>
              </ListGroup.Item>
              <ListGroup.Item>
                {" "}
                Today Recovered{" "}
                <span style={{ color: "#8ACA2B", paddingRight: "5px" }}>
                  {this.state.todayRecovered ? 3 : 5}
                </span>
              </ListGroup.Item>
            </ListGroup>
            </div>
          </div>
        ) : (
          <div>
          </div>
        )}
      </div>
    );
  }
}

export default CoronaCountryInfo;
