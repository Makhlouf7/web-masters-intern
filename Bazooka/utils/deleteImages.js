const fs = require("fs/promises");
const path = require("path");

const deleteImages = async (images) => {
  await Promise.all(
    images.map(async (originalname) =>
      fs.unlink(path.join(__dirname, `../uploads/${originalname}`))
    )
  );
};

module.exports = deleteImages;
