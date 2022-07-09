const mongoose = require("mongoose");
const Celebrity = require("../models/celebrity");

// 🔌 Let's connect to our DB
mongoose
  .connect("mongodb://localhost/celebrity-lab")
  .then(function () {
    console.log("connected to the DB");
    // return Book.deleteMany() // 🧽 make sure we start empty
  })
  .catch((err) => console.log("oops connecting", err));

const celebrities = [
  {
    name: "Lescata",
    occupation: "Office Employee",
    catchPhrase: "l'un n'empeche pas l'autre",
  },
  {
    name: "Adriana",
    occupation: "Artist",
    catchPhrase: "Day dreamer",
  },
  {
    name: "Antoine",
    occupation: "Hacker d'acier",
    catchPhrase: "vous aimez le css?",
  },
];

// Persist those datas as DB records
Celebrity.create(celebrities)
  .then(function (celebritiesFromDB) {
    // ✅
    console.log(`${celebritiesFromDB.length} celebritées ont été créés`);

    // Unplug
    mongoose.connection.close();
  })
  .catch((err) => console.log(err));
