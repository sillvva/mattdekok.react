const fs = require("fs");

const dir = "./.next";

if (fs.existsSync(dir)) {
  fs.rm(dir, { recursive: true }, () => console.log(`${dir} removed`));
}
