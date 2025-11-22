/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z41ud3ifqqz6s5u")

  // remove
  collection.schema.removeField("rl3ddso9")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("z41ud3ifqqz6s5u")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "rl3ddso9",
    "name": "privacy_policy",
    "type": "editor",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "convertUrls": false
    }
  }))

  return dao.saveCollection(collection)
})
