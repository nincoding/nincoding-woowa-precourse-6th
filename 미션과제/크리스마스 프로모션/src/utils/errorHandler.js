const errorHandler = async (action, printError) => {
  while (true) {
    try {
      await action();
      break;
    } catch ({ message }) {
      printError(message);
    }
  }
};

export default errorHandler;
