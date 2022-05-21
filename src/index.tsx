import * as React from 'react';
import {
  OpenDBCallbacks,
  openDB,
  IDBPDatabase,
  IndexNames,
  StoreNames,
} from 'idb';
import Model from './model';
// import * as Yup from 'yup';
export type IDBProviderModels<ModelNames extends string, DBTypes = any> = {
  [Model in ModelNames]: {
    name: StoreNames<DBTypes>;
    keyPath?: IDBObjectStoreParameters['keyPath'];
    autoIncrement?: IDBObjectStoreParameters['autoIncrement'];
    indexes?: [
      IndexNames<DBTypes, StoreNames<DBTypes>>,
      string | string[],
      IDBIndexParameters?
    ][];
    schema?: {
      [key: string]: any;
    };
  };
};
interface ContextInterface<DBTypes, ModelNames extends string = string> {
  db?: IDBPDatabase<DBTypes>;
  models: { [key in ModelNames]: Model<DBTypes, StoreNames<DBTypes>> };
}

const IDBContext = React.createContext<ContextInterface<any>>({
  db: undefined,
  models: {},
});

interface IDBProviderProps<DBTypes, ModelNames extends string = string> {
  children: React.ReactNode;
  name: string;
  version?: number;
  upgrade?: OpenDBCallbacks<DBTypes>['upgrade'];
  blocked?: OpenDBCallbacks<DBTypes>['blocked'];
  blocking?: OpenDBCallbacks<DBTypes>['blocking'];
  terminated?: OpenDBCallbacks<DBTypes>['terminated'];
  models: IDBProviderModels<ModelNames, DBTypes>;
}
export function IDBProvider<DBTypes>(props: IDBProviderProps<DBTypes>) {
  const { children, name, version, models: modelsProp, ...callbacks } = props;
  const [db, setDb] = React.useState<IDBPDatabase<DBTypes>>();
  const [models, setModels] = React.useState<{
    [key: string]: Model<DBTypes>;
  }>({});

  // Create DB
  React.useEffect(() => {
    (async () => {
      if (!callbacks.upgrade) {
        callbacks.upgrade = db => {
          Object.values(modelsProp).forEach(options => {
            const store = db.createObjectStore(options.name, {
              keyPath: options.keyPath,
              autoIncrement: options.autoIncrement,
            });
            options.indexes?.forEach(args => {
              store.createIndex(...args);
            });
          });
        };
      }
      const db = await openDB(name, version, callbacks);

      const models: { [key: string]: Model<DBTypes> } = {};
      Object.entries(modelsProp).forEach(([modelName, options]) => {
        models[modelName] = new Model(db, options.name);
      });
      console.log({ models });
      console.log(db);
      setModels(models);
      setDb(db);
    })();
  }, [name, version, Object.keys(callbacks).length]);

  return (
    <IDBContext.Provider value={{ db, models: models as any }}>
      salam{children}
    </IDBContext.Provider>
  );
}

export type TypedUseIDBHook<
  ModelNames extends string = string
> = () => ContextInterface<any, ModelNames>;

export function useIDB() {
  return React.useContext(IDBContext);
}
