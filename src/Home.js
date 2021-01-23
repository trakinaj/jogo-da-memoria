import React from "react";
import "./Home.css";
import Cards from "./components/Cards/Cards";
import Ranking from "./components/Ranking/Ranking";
import Login from "./components/Login/Login"
import api from "./services/api"

class Home extends React.Component {
  state = {
    name: '',
    popUpLogin: true,
    time: 0,
    attempts: 0,

  };

  //funções que usam valores que são recebidas de volta do component Cards
  setAttempts = (attempts) => {
    this.setState({ attempts: attempts })
  }
  setName = (name) => {
    this.setState({ name: name }) //alterar para name
  }

  //função que lida com o fim do jogo
  handleEndGame = (score, maxScore) => {
    if (!this.state.popUpLogin) {

      if (score < maxScore) {
        alert("Você não conseguiu terminar no tempo determinado :( Tente novamente recarregando a página.")
        this.AddPlayer()
      }
      else if (score >= maxScore) {
        alert("Parabéns !! Você conseguiu terminar. Recarregue a página e Tente novamente para tentar melhorar sua posição no Ranking.")
        this.AddPlayer()
      }
      // window.location.reload();

    }

  }

  //função que lida com o login dos players
  handlePopUpLogin = () => {
    if (this.state.popUpLogin && this.state.name) {
      if (this.state.name.length > 15) {
        alert("Vamos lá, você consegue um nome/nick menor que esse :)")
      }
      else {
        this.setState({ popUpLogin: false })
      }
    }
    if (!this.state.name) {
      alert("Sim, você é obrigado a inserir um nome :)")
    }
  }

  //função que adiciona um jogador no banco de dados
  async AddPlayer() {
    const response = await api.post('Players', {
      name: this.state.name,
      attempts: this.state.attempts
    })

    console.log(response)
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
          <Cards setAttemptsFunction={this.setAttempts} handleEndGameFunction={this.handleEndGame}></Cards>

          {this.state.popUpLogin ?
            <Login setNameFunction={this.setName} handlePopUpFunction={this.handlePopUpLogin}>
            </Login>
            : null
          }

        </div>
        <Ranking></Ranking>

      </div>
    );
  }
}

export default Home;
