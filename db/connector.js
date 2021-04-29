const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const password = process.env.MONGO_PASS;
mongoose.connect(
  `mongodb+srv://minraws:${password}@oneshotcluster.jzpwd.mongodb.net/oneshot?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  }
);
module.exports = {
  connection: mongoose.connection,
};
