// Require er ikke støttet i NODE >= 14
import { createRequire } from 'module';
const require = createRequire(import.meta.url);

// SQLITE krever requrie
const sqlite = require('sqlite3').verbose();

export const db = new sqlite.Database("./testdb.db", sqlite.OPEN_READWRITE | sqlite.OPEN_CREATE, (err) => {
    if(err) {
        console.error(err.message);
    }
    console.log("Connected to database!");
});