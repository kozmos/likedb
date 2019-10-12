import { default as indexeddb, IDB, IStore } from "indexeddb"
import { IDBOptions } from "./types"

let dbref: IDB | null = null

export const db = (options?: IDBOptions): IDB => {
  if (dbref !== null) {
    return dbref
  }

  const dbname =
    options && options.testing ? "likedb-test-" + Date.now() : "likedb"

  dbref = indexeddb(dbname, {
    version: (options && options.version) || 1
  })

  return dbref as IDB
}

export const bookmarks = (options: IDBOptions) => {
  return db().store("bookmarks", {
    key: "url",
    indexes: [
      { name: "tags", options: { multiEntry: true, unique: false } },
      "cleanTitle",
      "cleanUrl",
      "createdAt"
    ]
  })
}

export const collections = (options: IDBOptions) => {
  return db().store("collections", {
    key: "title",
    indexes: ["id", "desc", "createdAt"]
  })
}

export const collectionLinks = (options: IDBOptions) => {
  return db().store("collection-links", {
    key: "key",
    indexes: ["collection", "createdAt"]
  })
}

export function reset() {
  dbref = null
}