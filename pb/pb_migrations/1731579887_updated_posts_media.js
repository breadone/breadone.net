/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eys4l76rqwkloyf")

  // remove
  collection.schema.removeField("yfxer1xb")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eys4l76rqwkloyf")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "yfxer1xb",
    "name": "og_post",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "jbzxvie5c27b6od",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
