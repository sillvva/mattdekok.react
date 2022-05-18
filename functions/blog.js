const path = require('path');
const axios = require('axios');
const matter = require("gray-matter");
const firebase = require('./firebase.js');

const storageContent = "blog/articles";

async function fetchPosts() {
  const { storage, ref, getDownloadURL, getMetadata, list } = firebase;
  const { firestore, doc, setDoc } = firebase;

  const storageRef = ref(storage, storageContent);
  const contentList = await list(storageRef);

  console.log(`Found ${contentList.items.length} items`);

  const files = {};
  for(const file of contentList.items) {
    const metadata = await getMetadata(file);
    const url = await getDownloadURL(file);
    const ext = path.extname(metadata.name);
    const slug = path.basename(metadata.name);
    if (ext != '.md') continue;

    console.log(`Parsing: ${slug}`);
    
    const result = await axios.get(url);
    const parsedMD = matter(result.data);
    files[slug] = {
      name: metadata.name,
      path: metadata.fullPath,
      url: url,
      data: parsedMD.data
    };
  }
  
  console.log('Storing metadata to Firestore');
  
  const docRef = doc(firestore, `${storageContent}`);
  await setDoc(docRef, files);
}

module.exports = {
  fetchPosts
}