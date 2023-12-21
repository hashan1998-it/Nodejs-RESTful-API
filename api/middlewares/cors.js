//Handling CORS errors
const CORS = (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT,POST,PATCH,DELETE,GET");
    console.log("CORS error handled");
    return res.status(200).json({});
  }
  next();
};

module.exports = CORS;
