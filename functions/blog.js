const path = require('path');
const matter = require("gray-matter");
const firebase = require('./firebase.js');
const { writeFileSync } = require('fs');
const { getContentDir } = require('../store/misc.js');

async function fetchPosts() {
  const { firestore, storage, firebaseConfig } = firebase;
  let [contentList] = await storage.getFiles({ prefix: firebaseConfig.blogContent });

  contentList = contentList.filter(file => {
    return file.name.endsWith('.md');
  });

  const doc = firestore.doc(`${firebaseConfig.blogContent}`);
  const store = await doc.get();
  const files = store.data() || {};

  let changes = 0;
  let added = [];
  let updated = [];
  let removed = [];

  for (const file of contentList) {
    const timeCreated = new Date(file.metadata.timeCreated).toISOString();
    const ext = path.extname(file.metadata.name);
    const slug = path.basename(file.metadata.name);
    if (ext != '.md') continue;

    const fsItem = files[slug];
    if (fsItem && (!fsItem.timeCreated || timeCreated > fsItem.timeCreated)) {
      console.log(`Updating: ${slug}`);
      updated.push(slug);
      changes++;
    }
    else if (!fsItem) {
      console.log(`Adding: ${slug}`);
      added.push(slug);
      changes++;
    }
    else continue;

    const result = await new Promise((resolve) => {
      let content = "";
      file.createReadStream({
        encoding: 'UTF-8'
      }).on('data', chunk => {
        content += Buffer.from(chunk);
      }).on("end", () => {
        resolve(content);
      })
    });

    const parsedData = matter(result);
    files[slug] = {
      name: slug,
      path: file.metadata.name,
      timeCreated: timeCreated,
      data: parsedData.data
    };
  }

  for (let [fileName] of Object.entries(files)) {
    const storageFile = contentList.find(item => item.name.endsWith(`/${fileName}`));
    if (!storageFile) {
      console.log(`Removing: ${fileName}`);
      delete files[fileName];
      removed.push(fileName);
      changes++;
    }
  }

  Object.keys(files).forEach(fileName => {
    const file = files[fileName];
    if (file.data.date) file.data.date = new Date(file.data.date._seconds ? file.data.date._seconds * 1000 : file.data.date).toISOString();
    if (file.data.updated) file.data.updated = new Date(file.data.updated._seconds ? file.data.updated._seconds * 1000 : file.data.updated).toISOString();
    files[fileName] = file;
  })

  writeFileSync(`${getContentDir()}/posts.json`, JSON.stringify(files));

  if (changes) {
    console.log('Storing metadata to Firestore');
    await doc.set(files);
  }
  else console.log('No changes found');

  return {
    changes,
    added,
    updated,
    removed
  };
}

module.exports = {
  fetchPosts
}