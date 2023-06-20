from urllib import request as req


def lambda_handler(event, context):
    # check is date has been passed in the event, else use today
    if ('body' in event) and ('comicDate' in event['body']):
        date = event['body']['comicDate']
        return comicWithDate(date)

    r = req.Request('https://www.creators.com/read/heathcliff', headers={'User-Agent': 'Mozilla/5.0'})
    html = req.urlopen(r).read().decode("utf8")

    urlStart = html.index('https://cdn.alphacomedy.com')
    imageUrl = html[urlStart:].split("\"")[0]

    response = {
        'statusCode': 200,
        'body': imageUrl
    }
    
    return response


# date is a string, formatted as %Y/%m/%d
def comicWithDate(date):
    r = req.Request(f"https://www.gocomics.com/heathcliff/{date}", headers={'User-Agent': 'Mozilla/5.0'})
    
    html = req.urlopen(r).read().decode("utf8") 

    # check to make sure image exists today
    if "data-image" in html:
        urlStart = html.index("data-image") + 12
        imageUrl = html[urlStart:].split("\"")[0]
    else:
        return {
            'statusCode': 404,
            'body': 'https://cdn.discordapp.com/attachments/760773607550353428/1120629965721960498/heathcliff_notfound.png'
        }
    
    response = {
        'statusCode': 200,
        'body': imageUrl
    }
    
    return response
