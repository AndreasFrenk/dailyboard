import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";
import ToDoList from "./components/ToDo";
import RandomQuote from "./components/RandomQuote";
import DailyImage from "./components/DailyImage";
import Sidebar from "./components/Sidebar";
import { BrowserRouter as Router, Route, NavLink } from "react-router-dom";
import RandomPoem from "./components/RandomPoem";
import Corona from './components/Corona';
import CoronaCountryInfo from './components/CoronaCountryInfo';
import Pokemon from "./components/Pokemon";
import GenerateImage from "./components/GenerateImage";
import Wetter from "./components/Wetter";
import News from "./components/News";

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
        <Route path="/RandomPoem" exact component={RandomPoem} />
        <Route path="/Corona" exact component={Corona} />
        <Route path="/Corona/Country/:countryname" exact component={CoronaCountryInfo} />
        <Route path="/Pokemon" exact component={Pokemon}/>
        <Route path="/GenerateImage" exact component={GenerateImage}/>
        <Route path="/weather" exact component={Wetter} />
        <Route path="/news" exact component={News} />
      </div>
    </Router>
  );
}

export default App;
