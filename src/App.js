import React from 'react';
import Form from './components/Form';
import Card from './components/Card';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '',
      cardAttr2: '',
      cardAttr3: '',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      deck: [],
      buttonAlwaysDisabled: true,
      buttonAlwaysEnable: false,
    };
    this.onInputChange = this.onInputChange.bind(this);
    this.validate = this.validate.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.makeDeck = this.makeDeck.bind(this);
    this.onClickRemoveCard = this.onClickRemoveCard.bind(this);
    this.validateDeck = this.validateDeck.bind(this);
  }

  onInputChange = ({ target }) => {
    const { id } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [id]: value,
    }, () => this.validate());
  };

  validate = () => {
    const { cardName, cardDescription, cardAttr1, cardAttr2, cardAttr3,
      cardImage } = this.state;
    const arrayText = [cardName, cardDescription, cardImage];
    const arrayNumber = [cardAttr1, cardAttr2, cardAttr3];
    let count = 0;
    const tudoCerto = 6;
    arrayText.forEach((element) => {
      if (element.length > 0) {
        count += 1;
      } else {
        count -= 1;
      }
    });
    let soma = 0;
    const somaMax = 210;
    const max = 90;
    arrayNumber.forEach((element) => {
      if (parseInt(element, 10) >= 0 && parseInt(element, 10) <= max) {
        soma += parseInt(element, 10);
        if (soma <= somaMax) {
          count += 1;
        } else {
          count -= 1;
        }
      }
    });
    if (count === tudoCerto) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  onSaveButtonClick = () => {
    this.makeDeck();
    this.setState({ cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false }, () => this.validateDeck());
  }

  makeDeck = () => {
    const { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      deck } = this.state;
    const newCard = { cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo };
    this.setState({ deck: [...deck, newCard] }, () => this.validateDeck());
  }

  validateDeck = () => {
    const { deck } = this.state;
    const isTrunfoTrue = deck.some(({ cardTrunfo }) => cardTrunfo === true);
    if (isTrunfoTrue === true) {
      this.setState({
        hasTrunfo: true,
      });
    } else {
      this.setState({
        hasTrunfo: false,
      });
    }
  }

  onClickRemoveCard = ({ target }) => {
    const { deck } = this.state;
    const newDeck = deck.splice(target.value, target.value);
    this.setState({ deck: newDeck }, () => this.validateDeck());
    // console.log(deck);
  }

  render() {
    const {
      state: {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
        hasTrunfo,
        isSaveButtonDisabled,
        deck,
        buttonAlwaysDisabled,
        buttonAlwaysEnable,
      },
      onInputChange,
      onSaveButtonClick,
      onClickRemoveCard,
    } = this;
    return (
      <div>
        <h1>Tryunfo</h1>
        <Form
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          isSaveButtonDisabled={ isSaveButtonDisabled }
          onInputChange={ onInputChange }
          onSaveButtonClick={ onSaveButtonClick }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          isButtonDisable={ buttonAlwaysDisabled }
          dCard={ onClickRemoveCard }
          index={ 0 }
        />
        <h2>Deck</h2>
        <div>
          {deck.map((card, index) => (
            <Card
              cardName={ card.cardName }
              cardDescription={ card.cardDescription }
              cardAttr1={ card.cardAttr1 }
              cardAttr2={ card.cardAttr2 }
              cardAttr3={ card.cardAttr3 }
              cardImage={ card.cardImage }
              cardRare={ card.cardRare }
              cardTrunfo={ card.cardTrunfo }
              key={ card.cardName }
              isButtonDisable={ buttonAlwaysEnable }
              index={ index }
              dCard={ onClickRemoveCard }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default App;
