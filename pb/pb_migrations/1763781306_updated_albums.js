/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3287366145")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "file3760176746",
    "maxSelect": 99,
    "maxSize": 50000000,
    "mimeTypes": [
      "image/webp"
    ],
    "name": "images",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3287366145")

  // update field
  collection.fields.addAt(5, new Field({
    "hidden": false,
    "id": "file3760176746",
    "maxSelect": 99,
    "maxSize": 0,
    "mimeTypes": [
      "image/webp"
    ],
    "name": "images",
    "presentable": false,
    "protected": false,
    "required": false,
    "system": false,
    "thumbs": [],
    "type": "file"
  }))

  return app.save(collection)
})
