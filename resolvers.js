import { Artist, Product, Category } from './index';


const resolver = {

  Artist: {
    product: async ({ name }) => Product.find({ artist: name }).toArray(),
  },

  Category: {
    product: async ({ _id }) => Product.find({ categoryId: _id }).toArray(),
  },

  Product: {
    category: async (productid) => {
      // eslint-disable-next-line no-underscore-dangle
      const _id = productid.category;
      return Category.findOne({ _id });
    },
  },

  Mutation: {
    createCategory: async (_, name) => {
      const newRecord = new Category(name);
      return newRecord.save();
    },

    createProduct: async (_, { input }) => {
      const newRecord = new Product(input);
      return newRecord.save();
    },

    createArtist: async (_, name) => {
      const newRecord = new Artist(name);
      return newRecord.save();
    },

    deleteProduct: (_, _id) => Product.findByIdAndDelete(_id),

    deleteCategory: (_, _id) => Category.findByIdAndDelete(_id),

    deleteArtist: (_, name) => Artist.findByIdAndDelete(name),

    updateProduct: (_, { _id, input }) => Product.findOneAndUpdate({ _id }, input, { new: true }),

    updateCategory: (_, { _id, input }) => Category.findOneAndUpdate({ _id }, input, { new: true }),

    updateArtist: (_, { _id, name }) => Artist.findOneAndUpdate({ _id }, name, { new: true }),
  },

  Query: {
    getAllProducts: () => Product.find({}),
    getProduct: (i, _id) => Product.findOne(_id),

    getAllCategories: () => Category.find({}),
    getCategory: (i, _id) => Category.findOne(_id),

    getAllArtists: () => Artist.find({}),
    getArtist: (i, name) => Artist.findOne(name),

    getProductsByCategory: (_, category) => {
      const product = Product.find(category);
      return product;
    },

    getProductsByArtist: (_, artist) => {
      const product = Product.find(artist);
      return product;
    },

  },
};

module.exports = resolver;
