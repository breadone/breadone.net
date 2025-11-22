/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("my9ej2vdwzwoqov")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yi0qgiwo",
    "name": "image",
    "type": "file",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/png",
        "image/vnd.mozilla.apng",
        "image/jpeg"
      ],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 10242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("my9ej2vdwzwoqov")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yi0qgiwo",
    "name": "image",
    "type": "file",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/png",
        "image/vnd.mozilla.apng"
      ],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 10242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
})
