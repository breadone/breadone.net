/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("jbzxvie5c27b6od")

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "v7tapdp9",
    "maxSelect": 1,
    "maxSize": 5242880,
    "mimeTypes": [
      "image/png",
      "image/jpeg",
      "image/webp"
    ],
    "name": "headerImage",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [
      "1200x630"
    ],
    "type": "file"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("jbzxvie5c27b6od")

  // update field
  collection.fields.addAt(8, new Field({
    "hidden": false,
    "id": "v7tapdp9",
    "maxSelect": 1,
    "maxSize": 5242880,
    "mimeTypes": [
      "image/png",
      "image/jpeg"
    ],
    "name": "headerImage",
    "presentable": false,
    "protected": false,
    "required": true,
    "system": false,
    "thumbs": [
      "1200x630"
    ],
    "type": "file"
  }))

  return app.save(collection)
})
