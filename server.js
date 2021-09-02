const express = require('express');
const axios = require("axios");
const cors = require("cors");

const app = express();

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 8000;

const {
  MongoClient
} = require("mongodb");

const uri =
  "mongodb://localhost:27017?writeConcern=majority";

const client = new MongoClient(uri);

const database = client.db("marvel");
const characters = database.collection("characters");

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({
  extended: true
}));

app.get('/marvelCharacters', (req, res) => {
  let skip = Number(req.query.skip);
  let limit = Number(req.query.limit);
  findCharacters(skip, limit, res).catch(console.dir);
});

app.listen(port, host, () => {
  console.log(`Server listening on http://${host}:${port}, Ctrl+C to stop`)
});


//functions
const findCharacters = async (skip, limit, res) => {
  try {
    await client.connect();
    const result = await characters.find({}, {
      name: 1,
      thumbnail: 1,
      _id: 0
    }).skip(skip).limit(limit).toArray();

    const countCharacters = await characters.countDocuments({});

    let btns = [];
    for (let index = 0; index < countCharacters / limit; index++) {
      let btn = {
        name: index + 1,
        skip: (index) * limit,
        limit: limit,
        class: (index == Math.trunc(skip / limit) ? " is-success" : " is-warning")
      }
      btns.push(btn);
    }
    
    const data = {
      marvelCharacters: result,
      btns: btns
    }

    res.send(data);

  } finally {
    await client.close();
  }
};

const loadCharacters = async () => {
  try {
    console.log("loadCharacters");
    await client.connect();

    if (await characters.countDocuments({}) == 0) {
      const dataCharacters = [];
      let index = 0;
      let total = 0;
      do {

        const {
          data
        } = await axios.get('http://gateway.marvel.com/v1/public/characters?apikey=baa361352d74ff8509119b5d615afa50&hash=17103026bafa75370699dc9d70ffad61&ts=1' + "&offset=" + index + "&limit=100");

        index += 1 * 100;
        total = data.data.total;
        console.log(`get ${index} of ${total} Characters`);

        data.data.results.forEach(element => {

          const item = {
            name: element.name,
            thumbnail: element.thumbnail.path + '/portrait_incredible.' + element.thumbnail.extension
          };
          dataCharacters.push(item);

        });
      }
      while (index <= total);

      const options = {
        ordered: true
      };
      const result = await characters.insertMany(dataCharacters, options);
      console.log(`${result.insertedCount} documents were inserted`);

    }

  } catch (err) {
    console.error(err);
  } finally {
    await client.close();
  }
};

loadCharacters().catch(console.dir);
