const path = require('path');
const axios = require('axios');
const matter = require("gray-matter");
const firebase = require('./firebase.js');

const storageContent = "blog/articles";

async function fetchPosts() {
  const { ref, getDownloadURL, getMetadata, list } = firebase;
  const { doc, setDoc, getDoc } = firebase;

  const storageRef = ref(storage, storageContent);
  const contentList = await list(storageRef);

  console.log(`Found ${contentList.items.length} files`);

  const docRef = doc(firestore, `${storageContent}`);
  const store = await getDoc(docRef);
  const files = store.data() || {};

  let changes = 0;
  for(const file of contentList.items) {
    const metadata = await getMetadata(file);
    const timeCreated = new Date(metadata.timeCreated).toISOString();
    const ext = path.extname(metadata.name);
    const slug = path.basename(metadata.name);
    if (ext != '.md') continue;
    
    const fsItem = files[slug];
    if (fsItem && (!fsItem.timeCreated || timeCreated > fsItem.timeCreated)) {
      console.log(`Updating: ${slug}`);
      changes++;
    }
    else if (!fsItem) {
      console.log(`Adding: ${slug}`);
      changes++;
    }
    else continue;
    
    const url = await getDownloadURL(file);
    const result = await axios.get(url);
    const parsedMD = matter(result.data);
    files[slug] = {
      name: metadata.name,
      path: metadata.fullPath,
      url: url,
      timeCreated: timeCreated.toISOString(),
      data: parsedMD.data
    };
  }
  
  if (changes) {
    console.log('Storing metadata to Firestore');
    await setDoc(docRef, files);
  }
  else console.log('No changes found');
  process.exit();
}

module.exports = {
  fetchPosts
}