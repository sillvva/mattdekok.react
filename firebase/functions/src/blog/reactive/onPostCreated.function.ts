import * as functions from "firebase-functions";
import fetchPosts from "../../handlers/fetchPosts"

exports.onPostCreated = functions.storage
  .bucket(functions.config().fb.storage_bucket)
  .object()
  .onFinalize(fetchPosts);