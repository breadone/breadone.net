/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z41ud3ifqqz6s5u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cv8fgqw4",
    "name": "platforms",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 6,
      "values": [
        "iOS",
        "web",
        "lib",
        "macos",
        "linux",
        "windows"
      ]
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z41ud3ifqqz6s5u")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cv8fgqw4",
    "name": "platforms",
    "type": "select",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "maxSelect": 6,
      "values": [
        "ios",
        "web",
        "lib",
        "macos",
        "linux",
        "windows"
      ]
    }
  }))

  return dao.saveCollection(collection)
})
