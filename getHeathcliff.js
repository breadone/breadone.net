async function getHeathcliff(date=new Date()) {
    const comps = date.split("-")
    const year = comps[0]
    const month = comps[1]
    const day = comps[2]
    
    const todayComps = new Date().toISOString().substring(0, 10).split("-")
    
    const html = (await (await fetch(`https://www.gocomics.com/heathcliff/${year}/${month}/${day}`)).text());
    
    if (!html.includes("data-image")) {
        // if the new comic just hasnt been posted today (or isnt available for some reason), just go back to the previous day
        if (todayComps[2] == day) {
            redirect(`/heathcliff/${year}-${month}-${Number(day) - 1}`)
        } else { // or, if the user went to some date in the future, redirect to today
            redirect(`/heathcliff/${todayComps.join("-")}`)
        }
        
    }
    
    const urlStart = html.indexOf("data-image") + 12
    const imageurl = html.slice(urlStart).split("\"")[0]
    
    console.log(imageurl);

    document.getElementById("heathcliff").src=imageurl
}