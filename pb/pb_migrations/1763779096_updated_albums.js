/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3287366145")

  // add field
  collection.fields.addAt(4, new Field({
    "convertURLs": true,
    "hidden": false,
    "id": "editor1156222427",
    "maxSize": 0,
    "name": "remarks",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "editor"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3287366145")

  // remove field
  collection.fields.removeById("editor1156222427")

  return app.save(collection)
})
