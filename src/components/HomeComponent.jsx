import { Link } from "react-router-dom";
import "../styles/homeComponent.css";

const HomeComponent = () => {
  return (
    <>
      <div class="main">
        <container class="mainpic">
          <img src="src/assets/Livefanatic.png" alt="" />
        </container>
        <div class="subpic">
          <img src="src/assets/KonsertGen.jpg"></img>
          <div class="cinfo">Type your band info here</div>
        </div>
      </div>
    </>
  );
};

export default HomeComponent;
