const connection = require('../db/connection');

exports.fetchAllTopics = () => {
 return connection.select('*').from('topics').then((data) => {return {'topics':data}});
  };




exports.checkATopic = topic => {
        return connection("topics")
          .where("slug", topic)
          .then(data => {
            if (data.length === 0)
              return Promise.reject({ message: "Not Found", status: 404 });
            else return true;
          });
      };