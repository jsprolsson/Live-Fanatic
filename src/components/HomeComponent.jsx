import { Link } from "react-router-dom";
import "../styles/HomeComponent.css";
import TodaysShowsComponent from "./TodaysShowsComponent";

function HomeComponent() {
  return (
    <div className="main">
      <div className="mainpic">
        <img src="src/assets/Livefanatic.png" alt="" />
      </div>
      <div>
        <TodaysShowsComponent />
      </div>
    </div>
  );
}

export default HomeComponent;
