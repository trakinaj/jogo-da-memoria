import React from "react";
import "./Ranking.css";
import api from '../../services/api'

class Ranking extends React.Component {
  state = {
    Data: []
  };

  componentDidMount() {
    this.getBestPlayers()
  }

  async getBestPlayers() {
    let response = await api.get('Players')
    var BestPlayers = response.data;

    //coloca o vetor em ordem de menor quantidade de tentativas 
    BestPlayers.sort((a, b) => {
      return a.attempts < b.attempts ? -1 : a.attempts > b.attempts ? 1 : 0

    })

    if (BestPlayers.length < 10) {
      for (let i = BestPlayers.length; i < 10; i++) {
        BestPlayers = BestPlayers.concat({})
        BestPlayers[i].name = 'none' + i
        BestPlayers[i].attempts = 'none' + i
      }
    }
    console.log(BestPlayers)
    this.setState({ Data: BestPlayers })
  }

  render() {
    const PlayersData = this.state.Data.map((item) => (
      <div id="PlayerData" key={item.name}>
        <text style={{ fontSize: 15 }}> NAME: {item.name} </text>
        <text style={{ paddingLeft: 10, fontSize: 15 }}> ATTEMPTS: {item.attempts}</text>
      </div>
    ));

    return (
      <div id="ranking">
        <header id="text">RANKING</header>
        {/*  TOP MELHORES JOGADORES */}
        {PlayersData}
      </div>
    );
  }
}

export default Ranking;
