/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("jbzxvie5c27b6od")

  // update collection data
  unmarshal({
    "listRule": "@request.auth.email=\"site@breadone.net\"",
    "viewRule": "@request.auth.email=\"site@breadone.net\""
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("jbzxvie5c27b6od")

  // update collection data
  unmarshal({
    "listRule": null,
    "viewRule": null
  }, collection)

  return app.save(collection)
})
