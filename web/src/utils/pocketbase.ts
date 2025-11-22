import PocketBase from "pocketbase";

const pb = new PocketBase(import.meta.env.PUBLIC_PB_URL);
pb.autoCancellation(false)

export const authPB = async () => {
  if (!pb.authStore.isValid) {
    await pb.collection('users').authWithPassword(
    import.meta.env.PB_EMAIL,
    import.meta.env.PB_PW
  );
  }
  return pb;
};
