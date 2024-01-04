export const test = (request, response) => {
  const successMessage = "Test successfully handled Sales routes correctly";

  response.send({
    msg: successMessage,
  });
};
