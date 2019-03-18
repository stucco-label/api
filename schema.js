import { gql } from 'apollo-server-express';

const typeDefs = gql`

type Artist {
  _id: String!
  name: String!
  description: String
  product: [Product]
}


type Product {
  _id: String!
  title: String!
  description: String!
  price: Float!
  qty: Int!
  artist: Artist
  artistId: Artist
  category: Category
  categoryId: Category
}

type Category {
  _id: String!
  name: String!
  product: [Product]
}


input ProductInput {
  title: String!
  artist: String
  description: String!
  price: Float!
  qty: Int!
  category: String!
  categoryId: String
}

input CategoryInput {
  name: String
}

type Query {
  getAllProducts: [Product!]
  getAllArtists: [Artist!]
  getProduct(_id: String): Product!
  getArtist(_id: String): Artist!
  getAllCategories: [Category!]
  getCategory(_id: String): Category!
  getProductsByCategory(category: String): [Product]
  getProductsByArtist(artist: String): [Product]
}

type Mutation {
  createProduct(input: ProductInput): Product!
  createCategory(name: String!): Category!
  createArtist(name: String!): Artist!
  deleteProduct(_id: String!): [Product!]
  deleteCategory(_id: String!): [Category!]
  deleteArtist(name: String!): Artist!
  updateProduct(_id: ID!, input: ProductInput): Product!
  updateCategory(_id: ID!, input: CategoryInput): Category!
  updateArtist(_id: ID!, name: String): Artist!
}`;

module.exports = typeDefs;
