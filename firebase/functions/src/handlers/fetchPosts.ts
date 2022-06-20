import * as functions from "firebase-functions";
import * as path from "path";
import axios from "axios";

export default async function fetchPosts(object: functions.storage.ObjectMetadata, context: functions.EventContext) {
  const filePath = object.name || "";
  const fileExtension = path.extname(filePath);
  const fileDir = path.dirname(filePath);

  if (fileDir == "blog/articles" && fileExtension == ".md") {
    console.log(`Storage Trigger: ${context.eventType.replace("google.storage.object.", "")}: ${filePath}`);

    const url = `${functions.config().api.path}/api/cron-blog`;
    let data: any;
    try {
      let result = await axios.post(url, {}, {
        headers: {
          authorization: `Bearer ${functions.config().api.secret_key}`,
        },
      });

      data = result.data;
    } catch (err) {
      const error: any = err;
      data = error?.response?.data;
    }

    console.log('Script Result:', data);
  }

  return true;
}
