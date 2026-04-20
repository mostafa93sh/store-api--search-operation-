require("dotenv").config();
const express = require("express");
const app = express();

const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const connectDB = require("./db/connect");
const productsRouter = require("./routes/products");

app.use(express.json());

app.use("/api/v1/products", productsRouter);

app.get("/", (req, res) => {
  res.send(`
        <h1>API</h1>
            <a href='/api/v1/products'>products route</a>
        `);
});

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;
const start = async () => {
  try {
    // connect the DB
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log("SERVER LISTEN ON PORT 3000 "));
  } catch (error) {
    console.log(error);
  }
};

start();
