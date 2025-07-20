import app from "./app.js";
app.use(express.static('public')); 
app.listen("4001", () => {
    console.log("Listening on 4001");
});


