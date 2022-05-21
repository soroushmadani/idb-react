import { IDBPDatabase, StoreKey, StoreNames, StoreValue } from 'idb';

interface IDBTransactionOptions {
  /**
   * The durability of the transaction.
   *
   * The default is "default". Using "relaxed" provides better performance, but with fewer
   * guarantees. Web applications are encouraged to use "relaxed" for ephemeral data such as caches
   * or quickly changing records, and "strict" in cases where reducing the risk of data loss
   * outweighs the impact to performance and power.
   */
  durability?: 'default' | 'strict' | 'relaxed';
}

export default class Model<
  DBTypes,
  Name extends StoreNames<DBTypes> = StoreNames<DBTypes>
> {
  constructor(private db: IDBPDatabase<DBTypes>, private name: Name) {}

  createObjectStore(optionalParameters?: IDBObjectStoreParameters) {
    return this.db.createObjectStore(this.name, optionalParameters);
  }
  deleteObjectStore() {
    return this.db.deleteObjectStore(this.name);
  }
  transaction(mode?: IDBTransactionMode, options?: IDBTransactionOptions) {
    return this.db.transaction(this.name, mode, options);
  }
  add(
    value: StoreValue<DBTypes, Name>,
    key?: StoreKey<DBTypes, Name> | IDBKeyRange
  ) {
    return this.db.add(this.name, value, key);
  }
  clear() {
    return this.db.clear(this.name);
  }
  count(key?: StoreKey<DBTypes, Name> | IDBKeyRange | null) {
    return this.db.count(this.name, key);
  }
  countFromIndex() {}
  delete() {}
  get() {}
  getFromIndex() {}
  getAll() {
    return this.db.getAll(this.name);
  }
  getAllFromIndex() {}
  getAllKeys() {}
  getAllKeysFromIndex() {}
  getKey() {}
  getKeyFromIndex() {}
  put() {}
}
