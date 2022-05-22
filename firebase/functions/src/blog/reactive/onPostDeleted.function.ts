import * as functions from "firebase-functions";
import fetchPosts from "../../handlers/fetchPosts"

exports.onPostDeleted = functions.storage
  .bucket(functions.config().fb.storage_bucket)
  .object()
  .onDelete(fetchPosts);