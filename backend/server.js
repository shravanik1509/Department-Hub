const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const authRoutes = require("./routes/auth");


app.use(cors());
app.use(express.json());
app.use("/auth", authRoutes);
mongoose.connect("mongodb://localhost:27017/departmentHub", {
})
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => {
    console.log("❌ MongoDB Error:");
    console.log(err.message);
});
app.use("/auth", require("./routes/auth"));
app.use("/posts", require("./routes/posts"));
app.listen(5000, () => console.log("Server running on port 5000"));