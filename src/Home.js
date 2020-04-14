import React from "react";
import "./Home.css";
import Cards from "./components/Cards/Cards";
import Ranking from "./components/Ranking/Ranking";

class Home extends React.Component {
  state = {
    time: 0,
    attempts: 0
  };
  componentDidMount() {
    // alert()
  }

  setAttempts = (attempts) => {
    this.setState({ attempts: attempts })
  }

  render() {
    return (
      <div id="App">
        <div id="jogo">
          <div style={{ marginTop: "20px", textAlign: "start", fontWeight: "bold" }}>
            <text id="text" style={{ textAlign: "start", fontSize: "15px", marginLeft: "20px" }}>
              TIME: {this.state.time}
            </text>
            <text id="text" style={{ textAlign: "start", fontSize: "15px", marginLeft: "20px" }}>
              ATTEMPTS: {this.state.attempts}
            </text>
          </div>
          <Cards setAttemptsFunction={this.setAttempts}></Cards>

        </div>
        <Ranking></Ranking>
      </div>
    );
  }
}

export default Home;
