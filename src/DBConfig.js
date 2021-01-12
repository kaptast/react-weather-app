import { openDB } from 'idb';

export default async function demo10() {
    const db = await openDB('weather_db', 1, {
        upgrade(db) {
          var userStore = db.createObjectStore('users', { keyPath: 'id', autoIncrement: true});
          userStore.createIndex('username', 'username', {unique: true});
          db.createObjectStore('cities', { keyPath: 'id', autoIncrement: true});
        }
    });
}