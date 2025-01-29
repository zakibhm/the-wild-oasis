import supabase, { supabaseUrl } from "./supabase";

export async function signup({ fullName, email, password }) {
  let { data, error } = await supabase.auth.signUp({
    email: `${email}`,
    password: `${password}`,
    options: {
      data: {
        full_name: `${fullName}`,
        avatar: "",
      },
    },
  });

  if (error) {
    console.error(error);
    throw new Error("Signup failed");
  }
  return data;
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email: `${email}`,
    password: `${password}`,
  });

  if (error) {
    console.error(error);
    throw new Error("Login failed");
  }
  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();
  if (error) {
    console.error(error);
    throw new Error("Logout failed");
  }
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session?.session) {
    return null;
  }

  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error(error);
    throw new Error("User could not get loaded");
  }

  return data?.user;
}

export async function updateUserData({ fullName, avatar, password }) {
  let updateData;
  if (password) updateData = { password };
  if (fullName) updateData = { data: { fullName } };
  let { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error("User data could not get updated");

  if (!avatar) return data;

  const fileName = `avatars-${data.user.id}-${Math.random()}`;

  const { error: storageError } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (storageError) throw new Error("Avatar upload failed");

  const { data: updatedUserData, error: error2 } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (error2) throw new Error("User data could not get updated");

  return updatedUserData;
}
