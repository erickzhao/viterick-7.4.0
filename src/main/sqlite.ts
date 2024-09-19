import Database from "better-sqlite3";
import { app } from "electron";
import path from "node:path";

export function newDB() {
  const userDataPath = app.getPath("userData");
  const dbPath = path.resolve(userDataPath, "cats.db");
  const db = new Database(dbPath, { verbose: console.log });
  db.pragma("journal_mode = WAL");
  db.exec(
    "CREATE TABLE IF NOT EXISTS cats (name VARCHAR(255) PRIMARY KEY, age INT)"
  );

  //   const insert = db.prepare(
  //     "INSERT INTO cats (name, age) VALUES (@name, @age)"
  //   );

  //   const insertMany = db.transaction((cats) => {
  //     for (const cat of cats) insert.run(cat);
  //   });

  //   insertMany([
  //     { name: "Joey", age: 2 },
  //     { name: "Sally", age: 4 },
  //     { name: "Junior", age: 1 },
  //   ]);

  const stmt = db.prepare("SELECT name, age FROM cats");
  const info = stmt.all();
  console.log(info);
}
