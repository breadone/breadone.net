import json
from datetime import datetime as dt
import urllib.request as req

# hosted on an AWS Lambda instance

def getHeathcliff(event, context):
    # check is date has been passed in the event, else use today
    if len(event.keys()) == 0:
        date = dt.today().strftime('%Y/%m/%d')
        dateComps = date.split("/")
    else:
        date = event["date"]
        dateComps = date.split("/")

    fp = req.urlopen(f"https://www.gocomics.com/heathcliff/{date}")
    mybytes = fp.read()

    html = mybytes.decode("utf8")
    fp.close()

    # check to make sure image exists today
    if "data-image" in html:
        urlStart = html.index("data-image") + 12
        imageUrl = html[urlStart:].split("\"")[0]
    else:
        newEvent = { # ⬇️ wtf python
            "date": '/'.join([dateComps[0], dateComps[1], str(int(dateComps[2])-1)]) # use yesterdays date if not there
        }
        return getHeathcliff(newEvent, context)

    return {
        'statusCode': 200,
        'body': imageUrl
    }


if __name__ == "__main__":
    print( getHeathcliff({}, {}) )