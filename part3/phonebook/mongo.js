const mongoose = require('mongoose');

const [, , password, name, number] = process.argv;

const url = `mongodb+srv://fullstack:${password}@phonebook.kjqtl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model('Person', personSchema);

if (!name) {
  const persons = Person.find({}).then((persons) => {
    console.log(persons);

    mongoose.connection.close();
  });
} else {
  const person = new Person({ name, number });

  person.save().then((result) => {
    console.log(`Added ${person.name} number ${person.number} to phonebook`);

    mongoose.connection.close();
  });
}
