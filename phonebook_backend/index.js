require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const Person = require("./models/person");

const app = express();

app.use(cors());
app.use(express.json());

morgan.token("type", (req, res) => {
  return JSON.stringify(req.body);
});

app.use(morgan(":method :url :status - :response-time ms :type"));
app.use(express.static("dist"));

let data = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Bulaga!</h1>");
});

// info numbers for phonebook persons
app.get("/info", (req, res) => {
  const date = new Date();

  res.send(`<div>
    <p>Phonebook has info for ${data.length} people</p>
    <p>${date.toString()}</p>
    </div>`);
});

// get all phonebook persons
app.get("/api/persons", (req, res) => {
  Person.find({}).then((person) => {
    res.json(person);
  });
});

// get single phonebook person
app.get("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  const person = data.find((person) => person.id === id);

  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

// delete single phonebook person
app.delete("/api/persons/:id", (req, res) => {
  const id = req.params.id;

  data = data.filter((person) => person.id !== id);

  res.status(204).end();
});

// genereate unique id
const generateId = () => {
  const Id =
    new Date().valueOf().toString(36) + Math.random().toString(36).substring(2);

  return Id;
};

// create single phonebook person
app.post("/api/persons", (req, res) => {
  const body = req.body;

  // not accepting missing inputs
  if (!body.name || !body.number) {
    return res.status(400).json({
      error: "missing input",
    });
  }

  Person.findOne({ name: body.name }).then((existingPerson) => {
    if (existingPerson) {
      return res.status(400).json({ error: "name must be unique" });
    }

    const newPerson = new Person({
      name: body.name,
      number: body.number,
    });

    newPerson.save().then((savedPerson) => {
      res.json(savedPerson);
    });
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
