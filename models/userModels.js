const connection = require("../db/connection");

const checkAuser = username => {
  return connection("users")
    .where("username", username)
    .then(data => {
      if (data.length === 0)
        return Promise.reject({ message: "Not Found", status: 404 });
      else return true;
    });
};

const fetchAuser = ({username}) => {
  return connection('users')
    .where('username', username)
};

module.exports = { fetchAuser, checkAuser };
