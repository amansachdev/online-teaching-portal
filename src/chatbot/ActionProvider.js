class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  greet = () => {
    const message = this.createChatBotMessage("Hello friend.");
    this.addMessageToState(message);
  };
  greeet = () => {
    const message = this.createChatBotMessage("Hii friend.");
    this.addMessageToState(message);
  };

  handleJavascriptQuiz = () => {
    const message = this.createChatBotMessage(
      "Fantastic. Here is your quiz. Good luck!",
      {
        widget: "javascriptQuiz",
      }
    );

    this.addMessageToState(message);
  };

  handlePythonQuiz = () => {
    const message = this.createChatBotMessage(
      "Fantastic. Here is your python quiz. Good luck!",
      {
        widget: "PythonQuiz",
      }
    );

    this.addMessageToState(message);
  };

  handleSQLQuiz = () => {
    const message = this.createChatBotMessage(
      "Fantastic. Here is your SQL quiz. Good luck!",
      {
        widget: "SQLQuiz",
      }
    );

    this.addMessageToState(message);
  };

  handleReactQuiz = () => {
    const message = this.createChatBotMessage(
      "Fantastic. Here is your React quiz. Good luck!",
      {
        widget: "ReactQuiz",
      }
    );

    this.addMessageToState(message);
  };

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };
}

export default ActionProvider;
