/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("my9ej2vdwzwoqov")

  // update collection data
  unmarshal({
    "viewRule": "@request.auth.email=\"site@breadone.net\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("my9ej2vdwzwoqov")

  // update collection data
  unmarshal({
    "viewRule": ""
  }, collection)

  return app.save(collection)
})
