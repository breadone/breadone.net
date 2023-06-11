async function getHeathcliff() {
    // const comps = date.split("-")
    // const year = comps[0]
    // const month = comps[1]
    // const day = comps[2]
    
    const todayComps = new Date().toISOString().substring(0, 10).split("-")
    
    const html = (await (await fetch(`https://www.gocomics.com/heathcliff/${todayComps.join("/")}`)).text());
    
    if (!html.includes("data-image")) {
        // if (todayComps[2] == day) {
        //     // redirect(`/heathcliff/${year}-${month}-${Number(day) - 1}`)
        // } else {
        //     // redirect(`/heathcliff/${todayComps.join("-")}`)
        // }
        
    }
    
    const urlStart = html.indexOf("data-image") + 12
    const imageurl = html.slice(urlStart).split("\"")[0]
    
    console.log(imageurl);

    document.getElementById("heathcliff").src=imageurl
}