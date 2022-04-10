const { MongoClient } = require("mongodb");
const app = require("./index");

// const uri =
//   "mongodb+srv://ayan:KZuASguNQ9rCZfh2@cluster0.tcz9h.mongodb.net/akacoin?retryWrites=true&w=majority";

// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

// client
//   .connect()
//   .then(() => {
//     console.log("DB connectted successfully!");
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// const database = client.db("akacoin");
// module.exports.Banner = database.collection("heroBanner");

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log("App listening on port", port);
});

// module.exports = client;
