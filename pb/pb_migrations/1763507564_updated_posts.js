/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("jbzxvie5c27b6od")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "ecgjqmlq",
    "maxSelect": 5,
    "name": "tags",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "games",
      "stuff",
      "tv",
      "tech",
      "music",
      "fluff"
    ]
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("jbzxvie5c27b6od")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "ecgjqmlq",
    "maxSelect": 5,
    "name": "tags",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "select",
    "values": [
      "games",
      "stuff",
      "tv",
      "tech",
      "music"
    ]
  }))

  return app.save(collection)
})
