import express from 'express';
import mongoose from 'mongoose';

const { ApolloServer } = require('apollo-server-express');
const resolvers = require('./resolvers');

const typeDefs = require('./schema');


const app = express();
const PORT = process.env.PORT || 3000;
const mongo = process.env.MONGODB_URI || 'mongodb://localhost:27017/stucco';

mongoose.connect(mongo, { useNewUrlParser: true, useCreateIndex: true });

export const Artist = mongoose.model('Artist', {
  name: String,
  description: String,
});

export const Product = mongoose.model('Product', {
  title: String,
  artist: String,
  description: String,
  price: Number,
  qty: Number,
  category: String,
});

export const Category = mongoose.model('Category', {
  name: String,
  products: Array,
});


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    Artist, Product, Category,
  },
  introspection: true,
  playground: true,
});
server.applyMiddleware({ app });
app.listen(PORT);
