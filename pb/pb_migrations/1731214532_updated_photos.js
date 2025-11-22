/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("my9ej2vdwzwoqov")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x9ytobkp",
    "name": "alt",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("my9ej2vdwzwoqov")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "x9ytobkp",
    "name": "alt",
    "type": "text",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  return dao.saveCollection(collection)
})
