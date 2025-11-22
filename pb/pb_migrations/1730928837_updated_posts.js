/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jbzxvie5c27b6od")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "v7tapdp9",
    "name": "og_image",
    "type": "file",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "mimeTypes": [
        "image/png",
        "image/jpeg"
      ],
      "thumbs": [],
      "maxSelect": 1,
      "maxSize": 5242880,
      "protected": false
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jbzxvie5c27b6od")

  // remove
  collection.schema.removeField("v7tapdp9")

  return dao.saveCollection(collection)
})
