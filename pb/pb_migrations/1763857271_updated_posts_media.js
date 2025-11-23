/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("eys4l76rqwkloyf")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "phojgvgc",
    "maxSelect": 99,
    "maxSize": 2000000,
    "mimeTypes": [],
    "name": "field",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("eys4l76rqwkloyf")

  // update field
  collection.fields.addAt(1, new Field({
    "hidden": false,
    "id": "phojgvgc",
    "maxSelect": 99,
    "maxSize": 5242880,
    "mimeTypes": [],
    "name": "field",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
