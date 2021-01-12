export const DBConfig = {
    name: 'weather-db',
    version: 1,
    objectStoresMeta: [
      {
        store: 'users',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'username', keypath: 'username', options: { unique: true } },
          { name: 'password', keypath: 'password', options: { unique: false } }
        ]
      },
      {
        store: 'cities',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'name', keypath: 'username', options: { unique: true } },
        ]
      },
      {
        store: 'usercities',
        storeConfig: { keyPath: 'id', autoIncrement: true },
        storeSchema: [
          { name: 'userid', keypath: 'userid', options: { unique: false } },
          { name: 'cityid', keypath: 'cityid', options: { unique: false } }
        ]
      }
    ]
  };