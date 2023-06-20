from urllib import request as req
import base64

# hosted on aws lambda

def lambda_handler(event, context):
    # check is date has been passed in the event, else use today
    print("EVT", event)
    if ('body' in event):
        b64date = event['body']
        try:
            date = base64.b64decode(b64date).decode("utf8")
        except:
            date = event['body']
        print("sanity check:", date, type(date))
        return comicWithDate(date)

    r = req.Request('https://www.creators.com/read/heathcliff', headers={'User-Agent': 'Mozilla/5.0'})
    html = req.urlopen(r).read().decode("utf8")

    urlStart = html.index('https://cdn.alphacomedy.com')
    imageUrl = html[urlStart:].split("\"")[0]

    return {
        'statusCode': 200,
        'body': imageUrl
    }


# date is a string, formatted as %Y/%m/%d
def comicWithDate(date):
    notFoundURL = 'https://cdn.discordapp.com/attachments/760773607550353428/1120629965721960498/heathcliff_notfound.png'

    html = None
    comicURL = f"https://www.gocomics.com/heathcliff/{date}"

    r = req.Request(comicURL, headers={'User-Agent': 'Mozilla/5.0'})

    try:
        html = req.urlopen(r).read().decode("utf8") 
    except:
        return {
            'statusCode': 404,
            'body': notFoundURL
        }

    # check to make sure image exists today (it REALLY should given the above block but im being cautious)
    if "data-image" in html:
        urlStart = html.index("data-image") + 12
        imageUrl = html[urlStart:].split("\"")[0]
    else:
        return {
            'statusCode': 404,
            'body': notFoundURL
        }
    
    return {
        'statusCode': 200,
        'body': imageUrl
    }