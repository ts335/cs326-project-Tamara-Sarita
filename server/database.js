import 'dotenv/config';
import { MongoClient, ServerApiVersion } from 'mongodb';

const uri = "mongodb+srv://tsarita:01763@cluster0.xrflg7s.mongodb.net/?retryWrites=true&w=majority";

export default class PeopleDatabase {

  async connect() {
    this.client = await MongoClient.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverApi: ServerApiVersion.v1,
    });

    // Get the database.
    this.db = this.client.db('people');

    // Init the database.
    await this.init();
  }

  async init() {
    this.collection = this.db.collection('people');

    const count = await this.collection.countDocuments();

    if (count === 0) {
      await this.collection.insertMany([
        { _id: '1', firstname: 'Artemis', lastname: 'A', username: "Art", psw: "abc123" },
        { _id: '2', firstname: 'Parzival', lastname: 'P', username: "Parz", psw: "abc456" },
        { _id: '3', firstname: 'John', lastname: 'J', username: "Jay", psw: "abc789" },
        { _id: '4', firstname: 'Mia', lastname: 'M', username: "Miam", psw: "abc101" },
      ]);
    }
  }

  // Close the pool.
  async close() {
    this.client.close();
  }

  // CREATE a user in the database.
  async createPerson(firstname, lastname, username, psw) {
    const res = await this.collection.insertOne({ firstname, lastname, username, psw });
    // Note: the result received back from MongoDB does not contain the
    // entire document that was inserted into the database. Instead, it
    // only contains the _id of the document (and an acknowledged field).
    return res;
  }

  // READ a user from the database.
  async readPerson(id) {
    const res = await this.collection.findOne({ _id: id });
    return res;
  }

  // UPDATE a user in the database.
  async updatePerson(firstname, username, lastname, psw ) {
    const res = await this.collection.updateOne(
      //{ _id: id },
      { $set: { firstname, username, lastname, psw } }
    );
    return res;
  }

  // DELETE a user from the database.
  async deletePerson(id) {
    // Note: the result received back from MongoDB does not contain the
    // entire document that was deleted from the database. Instead, it
    // only contains the 'deletedCount' (and an acknowledged field).
    const res = await this.collection.deleteOne({ _id: id });
    return res;
  }

  // READ all people from the database.
  async readAllPeople() {
    const res = await this.collection.find({}).toArray();
    return res;
  }
}
