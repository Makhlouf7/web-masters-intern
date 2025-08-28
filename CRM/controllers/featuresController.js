const tinyUrl = require("tinyurl");

const urlShorten = (req, res, next) => {
  const url = req.query.url;
  tinyUrl.shorten(url, (result, err) => {
    if (err) {
      res.status(500).json({
        status: "fail",
        errors: err,
      });
    }

    res.status(200).json({
      status: "success",
      result,
    });
  });
};

module.exports = { urlShorten };
