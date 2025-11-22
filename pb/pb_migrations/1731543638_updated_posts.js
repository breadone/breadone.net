/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jbzxvie5c27b6od")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pyx8j5yb",
    "name": "published",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jbzxvie5c27b6od")

  // remove
  collection.schema.removeField("pyx8j5yb")

  return dao.saveCollection(collection)
})
