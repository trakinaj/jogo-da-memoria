import { Howl } from 'howler'

export default {

    //função que randomiza para qual carta certa imagem irá
    randCard(Cards, image) {
        let index;
        var Cards_copy = Cards;

        while (1) {
            index = Math.floor(Math.random() * 12);

            if (Cards_copy[index].img === "") {
                Cards_copy[index].img = image;

                return Cards_copy;
            }
        }
    },

    //função que inicia as imagens das cartas
    initCards(Cards) {
        var Cards_copy = Cards;

        /* 
            isFlipped pode ser:
            - false
            - true
            - "done" (caso já exista um par com aquela carta)
        */

        for (let i = 0; i < 12; i++) {
            Cards_copy = Cards_copy.concat({})
            Cards_copy[i].isFlipped = false;
            Cards_copy[i].id = i;
            Cards_copy[i].img = '';
        }
        Cards_copy = this.randCard(Cards_copy, require("../../images/circ.png"));
        Cards_copy = this.randCard(Cards_copy, require("../../images/circ.png"));
        Cards_copy = this.randCard(Cards_copy, require("../../images/quad.png"));
        Cards_copy = this.randCard(Cards_copy, require("../../images/quad.png"));
        Cards_copy = this.randCard(Cards_copy, require("../../images/tri.png"));
        Cards_copy = this.randCard(Cards_copy, require("../../images/tri.png"));
        Cards_copy = this.randCard(Cards_copy, require("../../images/polig5.png"));
        Cards_copy = this.randCard(Cards_copy, require("../../images/polig5.png"));
        Cards_copy = this.randCard(Cards_copy, require("../../images/losang.png"));
        Cards_copy = this.randCard(Cards_copy, require("../../images/losang.png"));
        Cards_copy = this.randCard(Cards_copy, require("../../images/ret.png"));
        Cards_copy = this.randCard(Cards_copy, require("../../images/ret.png"));


        return Cards_copy;
    },

    //função para "flippar" a imagem quando clickada
    flippImage(Cards, qtdFlipped, index) {
        let qtd = qtdFlipped;
        var Cards_copy = Cards;
        let data;


        if (qtdFlipped < 2) {

            if (Cards_copy[index].isFlipped === false) {
                Cards_copy[index].isFlipped = true;
                qtd = qtdFlipped + 1;
            }
        }
        data = { Cards: Cards_copy, qtdFlipped: qtd };

        return data;
    },

    //função que lida com a verificação se foi formado um par de cartas
    handleFlipped(Cards, qtdFlipped, score) {
        var Cards_copy = Cards;
        let img1 = null;
        let index_img1;
        let img2 = null;
        let index_img2;

        for (let i = 0; i < 12; i++) {
            if (Cards_copy[i].isFlipped === true) {
                if (img1 === null) {
                    img1 = Cards_copy[i].img;
                    index_img1 = i;
                }
                else if (qtdFlipped === 2) {
                    img2 = Cards_copy[i].img;
                    index_img2 = i;
                }
            }
        }

        if (img2 != null) {
            let Score;
            if (img1 === img2) {
                Score = score + 1;
                Cards_copy[index_img1].isFlipped = "done";
                Cards_copy[index_img2].isFlipped = "done";
                this.soundPlay(require("../../sounds/correto.mp3"))

            }
            else {
                Score = score;
                Cards_copy[index_img1].isFlipped = false;
                Cards_copy[index_img2].isFlipped = false;
                this.soundPlay(require("../../sounds/errado.mp3"))
            }

            var data = { Cards: Cards_copy, score: Score }
            return data;

        }

        var data = { Cards: Cards_copy, score: score }
        return data;
    },

    //função para tocar os sons da jogadas
    soundPlay(som) {
        var sound = new Howl({ src: [som], volume: 0.1, })
        sound.play()

    },

}





