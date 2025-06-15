require('dotenv').config()
const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Listing = require('./models/Listing.js')
const Cart = require('./models/Cart.js')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


const { title } = require("process");

mongoose.connect(process.env.MONGO_URL)
  .then(() => { console.log("MONGODB CONNECTED"); })
  .catch((err) => { console.log(err); });



async function getdata (query) {
  const data = await Listing.find({"category":query});
  return(data);
}

app.get("/", (req, res) => {
  res.redirect("/main")
});

app.get("/main", async (req, res) => {
  const allListing = await Listing.find({});
  res.render("home.ejs", { allListing });
});

app.get("/shirts" , async (req , res) => {
  let shirts = await getdata("shirts")
  res.render("tshirt.ejs" , {shirts});
})

app.get("/jeans" , async (req , res) => {
  let jeans = await getdata("jeans")
  res.render("jeans.ejs" , {jeans});
})


app.get("/book" , async (req , res) => {
  let books = await getdata("books")
  res.render("book.ejs" , {books});
})

app.get("/sports" , async (req , res) => {
  let sports = await getdata("sports items")
  res.render("sports.ejs" , {sports});
})

app.get("/mobiles" , async (req , res) => {
  let mobiles = await getdata("mobiles")
  res.render("mobile.ejs" , {mobiles});
})

app.get("/kitchen" , async (req , res) => {
  let kitchens = await getdata("kitchenware")
  res.render("kitchen.ejs" , {kitchens});
})

app.get("/furniture" , async (req , res) => {
  let furnitures = await getdata("furniture")
  res.render("furniture.ejs" , {furnitures});
})

app.get("/footwear" , async (req , res) => {
  let footwears = await getdata("footwear")
  res.render("footwear.ejs" , {footwears});
})

app.get("/appliances" , async (req , res) => {
  let electrical_appliances = await getdata("electrical appliances")
  res.render("Electrical appliances.ejs" , {electrical_appliances});
})

app.get("/cosmetics" , async (req , res) => {
  let cosmetics = await getdata("cosmetics")
  res.render("cosmetic.ejs" , {cosmetics});
})

app.post('/cart/add', async (req, res) => {
  const {
    productId,
    productTitle,
    productImage,
    productPrice,
    productDescription,
    productCategory,
    productQuantity
  } = req.body;

  const qty = Math.max(1, parseInt(productQuantity, 10) || 1);

  let existing = await Cart.findOne({ productTitle }); 

  if (existing) {
    existing.quantity += qty;
    await existing.save();
  } else {
    const cartItem = new Cart({
      title: productTitle,
      description: productDescription,
      image: productImage,
      price: productPrice,
      category: productCategory,
      quantity: qty
    });
    await cartItem.save();
  }

  res.redirect(req.get('Referrer') || '/');
});


app.get("/cart", async (req, res) => {
  const products = await Cart.find({});
  const total = products.reduce((sum, item) => {
    return sum + item.price *.18;
  }, 0);
  res.render("cart", { products });
});

app.post('/cart/remove', async (req, res) => {
  const { itemId } = req.body;
  if (!itemId) {
    return res.status(400).send('Missing item ID');
  }
  try {
    await Cart.findByIdAndDelete(itemId);
    res.redirect('/cart');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});


app.listen(3000, () => {
  console.log("http://localhost:3000");
});
