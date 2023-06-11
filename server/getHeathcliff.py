import json
from datetime import datetime as dt
import urllib.request as req

# hosted on an AWS Lambda instance

def getHeathcliff(event, context):
    if event.date == None:
        date = dt.today().strftime('%Y/%m/%d')
    else:
        date = "2023/01/01"

    fp = req.urlopen(f"https://www.gocomics.com/heathcliff/{date}")
    mybytes = fp.read()

    html = mybytes.decode("utf8")
    fp.close()

    urlStart = html.index("data-image") + 12
    imageUrl = html[urlStart:].split("\"")[0]

    return {
        'statusCode': 200,
        'body': json.dumps(imageUrl)
    }


if __name__ == "__main__":
    getHeathcliff("2023/01/03")