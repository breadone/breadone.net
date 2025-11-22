/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "eys4l76rqwkloyf",
    "created": "2024-11-07 09:30:17.186Z",
    "updated": "2024-11-07 09:30:17.186Z",
    "name": "posts_media",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "phojgvgc",
        "name": "field",
        "type": "file",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("eys4l76rqwkloyf");

  return dao.deleteCollection(collection);
})
