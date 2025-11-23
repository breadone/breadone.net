/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("my9ej2vdwzwoqov")

  // add field
  collection.fields.addAt(5, new Field({
    "autogeneratePattern": "",
    "hidden": false,
    "id": "text2185543202",
    "max": 0,
    "min": 0,
    "name": "film",
    "pattern": "",
    "presentable": false,
    "primaryKey": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("my9ej2vdwzwoqov")

  // remove field
  collection.fields.removeById("text2185543202")

  return app.save(collection)
})
