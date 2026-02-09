const express = require('express');
const cors = require('cors');
require('./db/config');
const Users = require('./db/users');
const Products = require('./db/Product');
const e = require('express');
const Jwt = require('jsonwebtoken');
const jwtKey = "e-comm";

const app = express();

app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  let user = new Users(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
   Jwt.sign({ result }, jwtKey, { expiresIn: "2h" },(err, token) => {
        if (err) {
          res.send({ result: "Something went wrong, please try after sometime" });
        } else {
          res.send({ result, auth: token });
        }
      });
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    let user = await Users.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "2h" },(err, token) => {
        if (err) {
          res.send({ result: "Something went wrong, please try after sometime" });
        } else {
          res.send({ user, auth: token });
        }
      });
    } else {
      res.send({ result: "No User found" });
    }
  } else {
    res.send({ result: "No User found" });
  }
});

app.post("/add-product", async (req, res) => {
  let product = new Products(req.body);
  let result = await product.save();
  res.send(result);
});

app.get("/products", async (req, res) => {
  let products = await Products.find();
  if (products.length > 0) {
    res.send(products);
  }else {
    res.send({ result: "No Products found" });
  }
});

app.delete("/product/:id", async (req, res) => {
  const result = await Products.deleteOne({_id:req.params.id});
  res.send(result);
});

app.get("/product/:id", async (req, res) => {
  try {
    let result = await Products.findOne({ _id: req.params.id });
    if (result) {
      res.send(result);
    } else {
      res.send({ result: "No Product found" });
    }
  } catch (err) {
    res.send({ result: "Invalid Product ID" });
  }
});

app.put("/product/:id", async (req, res) => {
  console.log(req.body);   //  check this

  let result = await Products.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );

  res.send(result);
});

app.get("/search/:key", async (req, res) => {
  let result = await Products.find({
    $or: [
      { name: { $regex: req.params.key, $options: "i" } },
      { company: { $regex: req.params.key, $options: "i" } },
      { category: { $regex: req.params.key, $options: "i" } },
      { price: { $regex: req.params.key, $options: "i" } },
    ],
  });
  res.send(result);
});



  

app.listen(5000);
