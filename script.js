const pg = require("pg");
const { faker } = require("@faker-js/faker");

async function main() {
  const client = new pg.Client({
    connectionString:
      "postgres://hxocevscpppwrz:7abbb6ef253e24d9541dd8968c242cbb26b8c3b979ff6869a2884431907be6d8@ec2-54-83-21-198.compute-1.amazonaws.com:5432/d73snpcsvueg5k",
    ssl: true,
  });

  await client.connect();

  for (let i = 0; i < 1000; i++) {
    await new Promise((resolves) => {
      setTimeout(async () => {
        await client.query("INSERT INTO users (name, age) values ($1, $2)", [
          faker.name.findName(),
          String(Math.floor(faker.random.number({ min: 1, max: 100 }))),
        ]);
        resolves();
      }, 100);
    });
  }
  await client.end();
}
main();
