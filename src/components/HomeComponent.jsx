import { Link } from "react-router-dom";
import "../styles/HomeComponent.css";
import TodaysShowsComponent from "./TodaysShowsComponent";
import RecentlyAddedConcertsComponent from "./RecentlyAddedConcertsComponent";

function HomeComponent() {
  return (
    <div className="main">
      <div className="mainpic">
        <img src="src/assets/Livefanatic.png" alt="" />
      </div>
      <div>
        <RecentlyAddedConcertsComponent/>
        <TodaysShowsComponent />
      </div>
    </div>
  );
}

export default HomeComponent;
