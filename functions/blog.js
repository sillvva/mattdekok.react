const path = require('path');
const axios = require('axios');
const matter = require("gray-matter");
const firebase = require('./firebase.js');
const { writeFileSync } = require('fs');
const { getContentDir } = require('../store/misc.js');

async function fetchPosts() {
  const { ref, getDownloadURL, getMetadata, list } = firebase;
  const { doc, setDoc, getDoc } = firebase;

  const storageRef = ref(firebase.firebaseConfig.blogContent);
  const contentList = await list(storageRef);

  console.log(`Found ${contentList.items.length} files`);

  const docRef = doc(`${firebase.firebaseConfig.blogContent}`);
  const store = await getDoc(docRef);
  const files = store.data() || {};

  let changes = 0;
  let added = [];
  let updated = [];
  let removed = [];

  for(const file of contentList.items) {
    const metadata = await getMetadata(file);
    const timeCreated = new Date(metadata.timeCreated).toISOString();
    const ext = path.extname(metadata.name);
    const slug = path.basename(metadata.name);
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
    
    const url = await getDownloadURL(file);
    const result = await axios.get(url);
    const parsedData = matter(result.data);
    files[slug] = {
      name: metadata.name,
      path: metadata.fullPath,
      url: url,
      timeCreated: timeCreated,
      data: parsedData.data
    };
  }

  for(let [ fileName ] of Object.entries(files)) {
    const storageFile = contentList.items.find(item => item.name === fileName);
    if (!storageFile) {
      console.log(`Removing: ${fileName}`);
      delete files[fileName];
      removed.push(fileName);
      changes++;
    }
  }
  
  writeFileSync(`${getContentDir()}/posts.json`, JSON.stringify(files));
  
  if (changes) {
    console.log('Storing metadata to Firestore');
    await setDoc(docRef, files);
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