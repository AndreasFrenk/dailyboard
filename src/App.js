import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import ToDoList from "./components/ToDo";
import RandomQuote from "./components/RandomQuote";
import DailyImage from "./components/DailyImage";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import Corona from './components/Corona';
import CoronaCountryInfo from './components/CoronaCountryInfo';

function App() {
  return (
    <Router>
      <div className="d-inline container-j">
        <Sidebar />
      </div>
      <div className="d-inline container-content">
        <br />
        <Route path="/" exact component={RandomQuote} />
        <Route path="/image" exact component={DailyImage} />
        <Route path="/todo" exact component={ToDoList} />
        <Route path="/Corona" exact component={Corona} />
        <Route path="/Corona/Country/:countryname" exact component={CoronaCountryInfo} />
      </div>
    </Router>
  );
}

export default App;
