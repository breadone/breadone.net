// actually humiliating i need to use damn nodejs for this

// Require express
const fetch = require("node-fetch")
const express = require("express");
const cors = require("cors")
// Initialize express
const app = express();
const PORT = 8001;
// parse JSON
app.use(express.json());
// parse URL encoded data
app.use(express.urlencoded({ extended: true }));

// create a server
app.listen(PORT, () => {
console.log(`Server running on port ${PORT}`);
});


app.get("/heathcliff", cors(), async (req, res) => {
    const url = await getHeathcliff();
    res.type("no-cors")
    return res.send(url)
})

async function getHeathcliff() {
    const todayComps = new Date().toISOString().substring(0, 10).split("-").join("/")
    
    const html = (await (await fetch(`https://www.gocomics.com/heathcliff/${todayComps}`)).text());
    
    if (!html.includes("data-image")) {
        // if (todayComps[2] == day) {
        //     // redirect(`/heathcliff/${year}-${month}-${Number(day) - 1}`)
        // } else {
        //     // redirect(`/heathcliff/${todayComps.join("-")}`)
        // }
        console.log("cringe")
    }
    
    const urlStart = html.indexOf("data-image") + 12
    const imageurl = html.slice(urlStart).split("\"")[0]
    


    return imageurl
}