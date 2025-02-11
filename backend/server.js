const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const typeDefs = require("./schema");
const resolvers = require("./resolvers");

const app = express();
app.use(cors());

// CORS for Frontend
app.use(cors({
    origin: ["https://travel-booking-frontend-sable.vercel.app"],
    methods: ["POST"],
    credentials: true
}));

async function startServer() {
  try {
    const server = new ApolloServer({ typeDefs, resolvers });
    await server.start();
    server.applyMiddleware({ app });

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    const PORT = process.env.PORT || 4000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (error) {
    console.error("erver startup error:", error);
  }
}

startServer();
