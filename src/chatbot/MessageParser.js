class MessageParser {
  constructor(actionProvider) {
    this.actionProvider = actionProvider;
  }

  parse(message) {
    console.log(message);
    const lowercase = message.toLowerCase();

    if (lowercase.includes("hello") || lowercase.includes("hmm")) {
      this.actionProvider.greet();
    }

     if (lowercase.includes("hii")) {
      this.actionProvider.greeet();
    }

    if (lowercase.includes("javascript") || lowercase.includes("js")) {
      this.actionProvider.handleJavascriptQuiz();
    }

    if (lowercase.includes("python") || lowercase.includes("py")) {
      this.actionProvider.handlePythonQuiz();
    }

    if (lowercase.includes("SQL") || lowercase.includes("sql data")) {
      this.actionProvider.handleSQLQuiz();
    }

    if (lowercase.includes("React") || lowercase.includes("React js")) {
      this.actionProvider.handleReactQuiz();
    }

  }
}

export default MessageParser;