export const dummyAuth = (req, res, next) => {
  req.user = {
    id: "65f1caa111234567890abcd1",
  };
  next();
};
