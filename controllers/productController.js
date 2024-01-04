export const test = (request, response) => {
  const successMessage = "Test successfully handled Product routes correctly";

  response.send({
    msg: successMessage,
  });
};
