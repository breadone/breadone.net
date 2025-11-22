/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "z41ud3ifqqz6s5u",
    "created": "2024-10-25 06:12:45.045Z",
    "updated": "2024-10-25 06:12:45.045Z",
    "name": "software",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "wxujbfmv",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "wjbtsobd",
        "name": "description",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "if9876yi",
        "name": "icon",
        "type": "file",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "mimeTypes": [],
          "thumbs": [],
          "maxSelect": 1,
          "maxSize": 5242880,
          "protected": false
        }
      },
      {
        "system": false,
        "id": "zxa3pr8b",
        "name": "getLink",
        "type": "url",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "exceptDomains": [],
          "onlyDomains": []
        }
      },
      {
        "system": false,
        "id": "l7iy4crz",
        "name": "privacyPolicy",
        "type": "editor",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "convertUrls": false
        }
      },
      {
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
      }
    ],
    "indexes": [
      "CREATE INDEX `idx_HIfpJC7` ON `software` (\n  `name`,\n  `platforms`\n)"
    ],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("z41ud3ifqqz6s5u");

  return dao.deleteCollection(collection);
})
