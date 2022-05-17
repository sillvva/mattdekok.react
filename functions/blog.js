const admin = require("firebase-admin");
const path = require('path');
const { readdirSync, readFileSync, rmSync, mkdirSync, existsSync, writeFileSync, rmdirSync } = require('fs');
const matter = require("gray-matter");

const contentDir = "content";
const publicDir = "public/content";
const storageDir = "blog/articles";
const contentJSON = 'content.json';

async function fetchPosts() {
  if (!existsSync(`${contentDir}/`)) mkdirSync(contentDir);
  if (!existsSync(`${publicDir}/`)) mkdirSync(publicDir);
  // if (existsSync(`.next`)) rmdirSync('.next');

  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL || "")),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });

  const bucket = await admin.storage().bucket().getFiles({ directory: storageDir });
  const bucketFiles = bucket[0].filter(file => {
    const filePath = file.name || "";
    const fileExtension = path.extname(filePath);
    return !!fileExtension;
  });
  const contentFiles = [...readdirSync(contentDir), ...readdirSync(publicDir)];
  const fileUpdates = compareFiles(bucketFiles, contentFiles);

  if (!fileUpdates.added.length && !fileUpdates.removed.length) {
    console.log('No changes detected');
    createContentJSON();
    return;
  }

  await Promise.all(fileUpdates.added.map(file => {
    return new Promise((resolve) => {
      const filePath = file.name || "";
      const fileExtension = path.extname(filePath);
      const baseFileName = path.basename(filePath, fileExtension);
      const createPath = `${fileExtension == '.md' ? contentDir : publicDir}/${baseFileName}${fileExtension}`;
      
      try {
        let fileContent = "";
        file
          .createReadStream()
          .on("data", (chunk) => {
            fileContent += chunk.toString();
          })
          .on("end", async () => {
            writeFileSync(createPath, fileContent);
            console.log(`Created: ${createPath}`);
            resolve(true);
          });
      } catch (err) {
        console.log("Error:", createPath);
        console.log(err);
        resolve(false);
      }
    });
  }));

  await Promise.all(fileUpdates.removed.map((fileName) => {
    return new Promise(resolve => {
      const filePath = fileName || "";
      const fileExtension = path.extname(filePath);
      const baseFileName = path.basename(filePath, fileExtension);
      const removePath = `${fileExtension == '.md' ? contentDir : publicDir}/${baseFileName}${fileExtension}`;
      if (existsSync(removePath)) rmSync(removePath);
      console.log(`Removed: ${removePath}`);
      resolve(removePath);
    })
  }));

  createContentJSON();
}

const createContentJSON = async function() {
  const updatedFiles = await readdirSync(contentDir);
  const createPath = `${contentDir}/${contentJSON}`;
  const content = [];
  updatedFiles.forEach(fileName => {
    if (fileName == contentJSON) return;
    const readPath = `${contentDir}/${fileName}`;
    const file = readFileSync(readPath);
    const m = matter(file);
    const data = {
      slug: fileName.replace('.md', ''),
      ...m.data
    }
    content.push(data);
  });
  writeFileSync(createPath, JSON.stringify(content));
}

function compareFiles(bucketFiles, contentFiles) {
  const result = { added: [], removed: [] };
  bucketFiles.forEach((file) => {
    if (!contentFiles.find(fileName => file.name == `${storageDir}/${fileName}`)) result.added.push(file);
  });
  contentFiles.forEach((fileName) => {
    if (fileName == contentJSON) return;
    if (!bucketFiles.find((file) => file.name == `${storageDir}/${fileName}`)) result.removed.push(fileName);
  });
  return result;
}

module.exports = {
  fetchPosts,
  createContentJSON
}