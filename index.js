const express = require("express");
const cors = require("cors");
const pg = require("pg");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
app.use(express.json());
app.use(cors());

app.get("/", async (req, res) => {
  const { query } = req;
  const { user, page } = query;
  const limit = 25;
  const offset = (page || 0) * 25;
  const client = new pg.Client({ ssl: true, connectionString: process.env.DATABASE_URL });
  await client.connect();
  const { rows } = await client.query(
    "SELECT * from users where name like $1 limit $2 offset $3",
    [`${user || ""}%`, limit, offset]
  );
  await client.end();
  return res.json({ data: rows });
});
app.listen(process.env.PORT || "3333", () =>
  console.log("server is listening")
);
