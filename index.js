const express = require ("express");

const urlRoute = require ("./routes/url");
const { connectDB } = require("./db");
const URL= require ('./models/url')
const app = express();
const PORT = 4000;
connectDB("//mongodb url ")
.then(
    ()=>console.log('connected to mongodb successfully')
)
app.use (express.json());
app.use("/url",urlRoute);
app.get('/:shortId',async(req,res)=>{
const shortId =req.params.shortId;
const entry = await URL.findOneAndUpdate({
shortId
},{$push:{
visitHistory:{
    timestamp:Date.now(),
}
}
}
);
res.redirect(entry.redirectURL)
});

app.listen(PORT,()=>console.log(`server is started perfectly:${PORT} `))
