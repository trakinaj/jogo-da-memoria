import React from "react";
import "./Ranking.css";

class Ranking extends React.Component {
  state = {
    Data: [
      { Name: "xxx", Time: 0 },
      { Name: "xxx", Time: 0 },
      { Name: "xxx", Time: 0 },
      { Name: "xxx", Time: 0 },
      { Name: "xxx", Time: 0 },
      { Name: "xxx", Time: 0 },
      { Name: "xxx", Time: 0 },
      { Name: "xxx", Time: 0 },
      { Name: "xxx", Time: 0 },
      { Name: "xxx", Time: 0 },
    ],
  };

  render() {
    const UsersData = this.state.Data.map((item) => (
      <div id="PlayerData" key={item.Name}>
        <text> NAME: {item.Name}</text>
        <text> TIME: {item.Time}</text>
      </div>
    ));

    return (
      <div id="ranking">
        <header id="text">RANKING</header>
        {/*  TOP DE MELHORES JOGADORES */}
        {UsersData}
      </div>
    );
  }
}

export default Ranking;
