import React from "react";
import "./Cards.css";
import Functions from "./Functions"

class Cards extends React.Component {

  state = {
    Cards: [],
    callInitImage: true,
    qtdFlipped: 0,  //quantidade de cartas "flippadas" (máx 2)
    score: 0, //máx = metade da qtd de cartas
    backGroundSong: "off",
    attempts: 0,
    isProcessing: false //usado para impedir que mais de 2 cartas sejam flippadas
  };

  componentDidMount() {

    if (this.state.callInitImage === true) {
      var Cards_copy = Functions.initCards(this.state.Cards);
      this.setState({ Cards: Cards_copy })
      this.setState({ callInitImage: false })
    }
  }

  //função para lidar com click nos Botões  
  handleOnClick(item) {

    if (item.isFlipped !== true && this.state.isProcessing === false) {

      let Cards_copy = Functions.flippImage(this.state.Cards, this.state.qtdFlipped, this.state.Cards.indexOf(item))

      this.setState({ Cards: Cards_copy.Cards, qtdFlipped: Cards_copy.qtdFlipped }, () => {

        if (this.state.qtdFlipped === 2) {
          this.setState({ isProcessing: true })
          setTimeout(() => {  //timeout que espera para verificar o "match" das cartas

            Cards_copy = Functions.handleFlipped(this.state.Cards, this.state.qtdFlipped, this.state.score)
            let attempts = this.state.attempts + 1
            this.setState({ Cards: Cards_copy.Cards, score: Cards_copy.score, qtdFlipped: 0, attempts: attempts })
            this.handlePropsFunction()
            this.setState({ isProcessing: false })
          }, 300)
        }

      });

    }
  }

  //função que lida em qual imagem renderizar (em verso ou a verdadeira) dependendo do estado
  handleImageRender(item) {
    if (item.isFlipped === false) {
      return (
        <img src={require("../../images/carta-verso.png")} id="image" alt="icon"></img>
      );
    }
    else {
      return <img src={item.img} id="image" alt="icon"></img>;
    }
  }

  //função que recebe as função recebidas como props através do Home.js 
  handlePropsFunction() {
    this.props.setAttemptsFunction(this.state.attempts)
  }

  render() {
    //primeira linha
    const Cards1 = this.state.Cards.slice(0, 4).map((item) => (
      <button key={item.id} id="card" onClick={() => this.handleOnClick(item)}>
        {this.handleImageRender(item)}
      </button>
    ));
    //segunda linha
    const Cards2 = this.state.Cards.slice(4, 8).map((item) => (
      <button key={item.id} id="card" onClick={() => this.handleOnClick(item)}>
        {this.handleImageRender(item)}
      </button>
    ));
    //terceira linha
    const Cards3 = this.state.Cards.slice(8, 12).map((item) => (
      <button key={item.id} id="card" onClick={() => this.handleOnClick(item)}>
        {this.handleImageRender(item)}
      </button>
    ));

    //roda a música de fundo
    if (this.state.backGroundSong === "off") {

      // var sound = new Howl({ src: require('../../sounds/Jou beats-brazil.mp3'), volume: 0.3, loop: true })
      // sound.play()
      // this.setState({ backGroundSong: "on" })
    }

    //mensagem de fim de jogo
    if (this.state.score >= (this.state.Cards.length / 2) && this.state.qtdFlipped >= Cards.length) {
      this.props.handleEndGameFunction(this.state.score, Cards.length / 2)
    }

    return (
      <div>
        <div id="line">{Cards1}</div>
        <div id="line">{Cards2}</div>
        <div id="line">{Cards3}</div>
      </div>
    );
  }
}

export default Cards;
