/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("my9ej2vdwzwoqov")

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "yi0qgiwo",
    "maxSelect": 1,
    "maxSize": 50000000,
    "mimeTypes": [
      "image/png",
      "image/vnd.mozilla.apng",
      "image/jpeg",
      "image/webp"
    ],
    "name": "image",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [
      "800x0",
      "1400x0",
      "0x1100"
    ],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("my9ej2vdwzwoqov")

  // update field
  collection.fields.addAt(6, new Field({
    "hidden": false,
    "id": "yi0qgiwo",
    "maxSelect": 1,
    "maxSize": 50000000,
    "mimeTypes": [
      "image/png",
      "image/vnd.mozilla.apng",
      "image/jpeg"
    ],
    "name": "image",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [
      "800x0",
      "1400x0",
      "0x1100"
    ],
    "type": "file"
  }))

  return app.save(collection)
})
