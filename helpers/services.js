const { Connect } = require("@/utils/db/ConnectDB");

export async function ConnectDatabase() {
  let isSucces;
  try {
    await Connect();
    isSucces = true;
  } catch {
    isSucces = false;
  }
  return isSucces;
}
