const admin = require("firebase-admin");
const path = require('path');
const { readdirSync, readFileSync, rmSync, mkdirSync, existsSync, writeFileSync } = require('fs');
const matter = require("gray-matter");

const contentDir = "content";
const publicDir = "public/content";
const storageContent = "blog/articles";
const storageImages = "blog/images";
const contentJSON = 'content.json';

async function fetchPosts() {
  if (!existsSync(`${contentDir}/`)) mkdirSync(contentDir);
  if (!existsSync(`${publicDir}/`)) mkdirSync(publicDir);
  if (existsSync(`.next`)) rmSync('.next', { recursive: true, force: true });

  admin.initializeApp({
    credential: admin.credential.cert(JSON.parse(process.env.FIREBASE_ADMIN_CREDENTIAL || "")),
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  });

  const bucketFiles = [];
  
  const contentBucket = await admin.storage().bucket().getFiles({ directory: storageContent });
  contentBucket[0].forEach(file => {
    const filePath = file.name || "";
    const fileExtension = path.extname(filePath);
    if(!!fileExtension) bucketFiles.push(file);
  });

  const imagesBucket = await admin.storage().bucket().getFiles({ directory: storageImages });
  imagesBucket[0].forEach(file => {
    const filePath = file.name || "";
    const fileExtension = path.extname(filePath);
    if(!!fileExtension) bucketFiles.push(file);
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
      const createPath = getPath(file.name || "");
      try {
        admin.storage()
          .bucket()
          .file(file.name)
          .download({ destination: createPath });
        // let fileContent = "";
        // file
        //   .createReadStream()
        //   .on("data", (chunk) => {
        //     fileContent += chunk.toString();
        //   })
        //   .on("end", async () => {
        //     writeFileSync(createPath, fileContent);
        //     console.log(`Created: ${createPath}`);
        //     resolve(true);
        //   });
      } catch (err) {
        console.log("Error:", createPath);
        console.log(err);
        resolve(false);
      }
    });
  }));

  await Promise.all(fileUpdates.removed.map((fileName) => {
    return new Promise(resolve => {
      const removePath = getPath(fileName || "");
      if (existsSync(removePath)) rmSync(removePath);
      console.log(`Removed: ${removePath}`);
      resolve(removePath);
    })
  }));

  createContentJSON();
}

const getPath = function (filePath) {
  const fileExtension = path.extname(filePath);
  const baseFileName = path.basename(filePath, fileExtension);
  return `${fileExtension == '.md' ? contentDir : publicDir}/${baseFileName}${fileExtension}`;
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
    const downloaded = contentFiles.find(fileName => file.name == `${storageContent}/${fileName}` || file.name == `${storageImages}/${fileName}`);
    if (!downloaded) result.added.push(file);
  });
  contentFiles.forEach((fileName) => {
    if (fileName == contentJSON) return;
    const uploaded = bucketFiles.find((file) => file.name == `${storageContent}/${fileName}` || file.name == `${storageImages}/${fileName}`);
    if (!uploaded) result.removed.push(fileName);
  });
  return result;
}

module.exports = {
  fetchPosts,
  createContentJSON
}