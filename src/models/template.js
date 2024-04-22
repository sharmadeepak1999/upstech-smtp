const db = require("../config/database");

const Template = {
  findById: (id) => {
    return db.promise().query("SELECT * FROM templates WHERE id = ?", [id]);
  },
};

module.exports = Template;
