import { openDB } from 'idb';

export function DBConfig() {
    openDB('weather_db', 1, {
        upgrade(db) {
          var userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true});
          userStore.createIndex('username', 'username', {unique: true});

          var citiesStore = db.createObjectStore('cities', { keyPath: 'id', autoIncrement: true});
          citiesStore.createIndex('userid', 'userid');
        }
    }).then();
}