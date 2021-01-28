import React, { Component } from "react";
import DataTable from "react-data-table-component";
import { withRouter  } from "react-router-dom";

const columns = [
  {
    name: "Country",
    selector: "Country",
    sortable: true,
  },
  {
    name: "NewConfirmed",
    selector: "NewConfirmed",
    sortable: true,
  },
  {
    name: "NewDeaths",
    selector: "NewDeaths",
    sortable: true,
  },
  {
    name: "NewRecovered",
    selector: "NewRecovered",
    sortable: true,
  },
  {
    name: "TotalConfirmed",
    selector: "TotalConfirmed",
    sortable: true,
  },
  {
    name: "TotalDeaths",
    selector: "TotalDeaths",
    sortable: true,
  },
  {
    name: "TotalRecovered",
    selector: "TotalRecovered",
    sortable: true,
  },
];

class Corona extends Component {
  constructor(props) {
    super(props);
    this.state = {
      summary: [],
      loaded: false,
    };
  }

  showCountry = (event) => {
    this.props.history.push({
        pathname: `/Corona/Country/` + event.Country,
    });
  };

  componentDidMount() {
    const request = new XMLHttpRequest();
    request.open("GET", "https://api.covid19api.com/summary");
    request.setRequestHeader("Access-Control-Allow-Headers", "X-Requested-With, content-type");
    request.responseType = "json";
    request.onreadystatechange = () => {
      if (request.readyState === 4 && request.status === 200) {
        const res = request.response;
        this.setState({
          summary: res.Countries,
          loaded: true,
        });
      }
    };
    request.send();
  }

  render() {
    return (
      <div className="container-fluid pt-4">
        {this.state.loaded ? (
          <DataTable
            title="Corona"
            columns={columns}
            data={this.state.summary}
            onRowClicked={this.showCountry}
            pagination
            highlightOnHover
          />
        ) : (
          <p>Loading</p>
        )}
      </div>
    );
  }
}

export default withRouter(Corona);
