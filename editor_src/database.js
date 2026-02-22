const db = {
    _db: null,

    async _getDB() {
        if (this._db) return this._db;
        return new Promise((resolve, reject) => {
            const request = indexedDB.open("NotesApp", 1);
            request.onupgradeneeded = e => {
                const db = e.target.result;
                const store = db.createObjectStore("notes", { keyPath: "id", autoIncrement: true });
                store.createIndex("updatedAt", "updatedAt");
            };
            request.onsuccess = e => { this._db = e.target.result; resolve(this._db); };
            request.onerror = e => reject(e.target.error);
        });
    },

    async save(id, content) {
        const database = await this._getDB();
        return new Promise((resolve) => {
            const tx = database.transaction("notes", "readwrite");
            const store = tx.objectStore("notes");
            const data = { content, updatedAt: Date.now() };
            if (id) data.id = Number(id); // Приводим к числу на случай, если пришла строка

            const request = store.put(data);
            request.onsuccess = () => resolve(request.result);
        });
    },
    async load() {
        const database = await this._getDB();
        return new Promise((resolve) => {
            const tx = database.transaction("notes", "readonly");
            const store = tx.objectStore("notes");
            const index = store.index("updatedAt");
            const notes = [];

            // Используем курсор с направлением "prev" для сортировки
            const request = index.openCursor(null, "prev");

            request.onsuccess = (e) => {
                const cursor = e.target.result;
                if (cursor) {
                    notes.push(cursor.value);
                    cursor.continue(); // Переходим к следующей записи
                } else {
                    resolve(notes); // Больше записей нет
                }
            };
        });
    },


    async delete(id) {
        const database = await this._getDB();
        return new Promise((resolve) => {
            const tx = database.transaction("notes", "readwrite");
            const store = tx.objectStore("notes");
            const request = store.delete(Number(id));
            request.onsuccess = () => resolve(true);
        });
    }
};

const kv = {
    get: (key, default_) => {
        const v = localStorage.getItem(key)
        return v == null ? default_ : v
    },
    set: (k, v) => localStorage.setItem(k, v)
}

var noteid = Number.parseInt(kv.get('noteid', null))
if (Number.isNaN(noteid)) noteid = null
