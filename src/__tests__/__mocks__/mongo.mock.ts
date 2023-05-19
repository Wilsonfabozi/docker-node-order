/* eslint-disable max-len */
import mongoose from 'mongoose';

class Mongodb {
  connection: mongoose.Connection;

  url = '';

  constructor(url: string) {
    this.url = url;
    this.connection = mongoose.createConnection(url);
  }

  async connect() {
    await mongoose.connect(this.url);
  }

  async close() {
    await this.connection.close();
  }
}

export default Mongodb;
