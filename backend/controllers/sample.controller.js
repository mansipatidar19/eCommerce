const ProductModel = require("../models/product.model");
const UserModel = require("../models/user.model");
const bcrypt = require("bcrypt");

// Seed Sample Users
const seedUsers = async (req, res) => {
  try {
    const saltRounds = 10;
    const user1 = {
      name: "Mansi",
      email: "mansi@gmail.com",
      password: await bcrypt.hash("Mansi123", saltRounds),
      address: "Neemuch,M.P.",
      isAdmin: true,
      orders: [],
    };
    const user2 = {
      name: "Niharika",
      email: "niharika@gmail.com",
      password: await bcrypt.hash("Niharika123", saltRounds),
      address: "Indore,M.P.",
      isAdmin: false,
      orders: [],
    };
    const user3 = {
      name: "Rudra",
      email: "rudra@gmail.com",
      password: await bcrypt.hash("Rudra123", saltRounds),
      address: "Ujjain,M.P.",
      isAdmin: false,
      orders: [],
    };
    const user4 = {
      name: "Dipanshi",
      email: "dipanshi@gmail.com",
      password: await bcrypt.hash("Dipanshi123", saltRounds),
      address: "Ratlam,M.P.",
      isAdmin: false,
      orders: [],
    };
    const user5 = {
      name: "Bharti",
      email: "bharti@gmail.com",
      password: await bcrypt.hash("Bharti123", saltRounds),
      address: "Bhopal,M.P.",
      isAdmin: false,
      orders: [],
    };
    const users = [user1, user2, user3, user4, user5];
    await UserModel.insertMany(users);
    res.status(200).json({ Message: "5 Users added successfully!" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ Message: error });
  }
};

// Seed Sample Products
const seedProducts = async (req, res) => {
  const product1 = {
    title: "The Alchemist",
    description: "by Paulo Coelho (Author)",
    quantity: 50,
    price: 200,
    image: "https://m.media-amazon.com/images/I/51bVNTqHFlL._SY522_.jpg",
  };
  const product2 = {
    title: "The Book of Life",
    description: "by J krishnamurti (Author)",
    quantity: 50,
    price: 150,
    image: "https://m.media-amazon.com/images/I/61WVRpAeALL._SY522_.jpg",
  };
  const product3 = {
    title: "The Power of One Thought", 
    description: "by BK Shivani (Author)",
    quantity: 100,
    price: 300,
    image: "https://m.media-amazon.com/images/I/410kZOXam1L._SY445_SX342_.jpg",
  };
  const product4 = {
    title: "Being Love",
    description: "by BK Shivani (Author)",
    quantity: 30,
    price: 299,
    image: "https://m.media-amazon.com/images/I/71drrByZaQL._SY522_.jpg",
  };
  const product5 = {
    title: "Happiness Unlimited",
    description: "by BK Shivani (Author)",
    quantity: 60,
    price: 200,
    image: "https://m.media-amazon.com/images/I/81XyqJtHmKL._SY522_.jpg",
  };
  const product6 = {
    title: "I Know How to Live, I know How to Die",
    description: "by Neville Hodgkinson (Author)",
    quantity: 100,
    price: 250,
    image: "https://m.media-amazon.com/images/I/61mC0OHtSiL._SY522_.jpg",
  };
  const product7 = {
    title: "The Power of Thoughts",
    description: "by SWAMI MUKUNDANANDA (Author)",
    quantity: 80,
    price: 190,
    image: "https://m.media-amazon.com/images/I/416fbaugphL._SY445_SX342_.jpg",
  };
  const product8 = {
    title: "The Art of Resilience",
    description: "by Gauranga Das Prabhu (Author)",
    quantity: 90,
    price: 200,
    image: "https://m.media-amazon.com/images/I/51MRA3VfNzS._SY445_SX342_.jpg",
  };
  const product9 = {
    title: "The Psychology of Money",
    description: "by Paulo Coelho (Author)",
    quantity: 100,
    price: 290,
    image: "https://m.media-amazon.com/images/I/41+tJ4avt6L._SY445_SX342_.jpg",
  };
  const product10 = {
    title: "Power of Your Subconscious Mind",
    description: "by Joseph Murphy (Author)",
    quantity: 50,
    price: 150,
    image: "https://m.media-amazon.com/images/I/71sBtM3Yi5L._SY522_.jpg",
  };
  const product11 = {
    title: "You Cant",
    description: "by George Matthew Adams (Author)",
    quantity: 70,
    price: 100,
    image: "https://m.media-amazon.com/images/I/61aJc8wQX4L._SY522_.jpg",
  };
  const product12 = {
    title: "Believe in Yourself",
    description: "by Dr Joseph Murphy (Author)",
    quantity: 90,
    price: 105,
    image: "https://m.media-amazon.com/images/I/51JoXgnIciL._SY522_.jpg",
  };
  const product13 = {
    title: "The Art of Being Alone",
    description: "by Renuka Gavrani (Author)",
    quantity: 80,
    price: 200,
    image: "https://m.media-amazon.com/images/I/61Ktyy7KymL._SY522_.jpg",
  };
  const product14 = {
    title: "The 5 AM Club",
    description: "by Paulo Coelho (Author)",
    quantity: 90,
    price: 260,
    image: "https://m.media-amazon.com/images/I/618ZOX7UNNL._SY522_.jpg",
  };
  const product15 = {
    title: "Focus on What Matters",
    description: "by Darius Foroux (Author)",
    quantity: 70,
    price: 240,
    image: "https://m.media-amazon.com/images/I/71cjI4kaaZL._SY522_.jpg",
  };
  const products = [
    product1,
    product2,
    product3,
    product4,
    product5,
    product6,
    product7,
    product8,
    product9,
    product10,
    product11,
    product12,
    product13,
    product14,
    product15,
  ];
  await ProductModel.insertMany(products);
  res.status(200).json({ Message: "15 Products added successfully!" });
};

module.exports = { seedProducts, seedUsers };
