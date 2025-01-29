import supabase, { supabaseUrl } from "./supabase";
export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCabinById(id) {
  const { data, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id);
  if (error) {
    throw new Error(error.message);
  }
  return data[0];
}

export async function createEditCabin(cabin, id) {
  const hasImagePath = cabin.image?.startsWith?.(supabaseUrl) ?? false;
  const imageName = `${Math.random()}-${cabin.image.name}`.replaceAll("/", "");
  const imagePath = hasImagePath
    ? cabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // CREATE
  let query = supabase.from("cabins");
  if (!id) {
    query = query.insert([{ ...cabin, image: imagePath }]);
  }

  // EDIT
  else {
    let newCabin = { ...cabin };
    if (!hasImagePath) {
      newCabin.image = imagePath;
    }
    query = query.update(newCabin).eq("id", id);
  }

  const { data, error } = await query.select().single();

  if (error) {
    throw new Error(error.message);
  }

  // Upload image to storage

  if (hasImagePath) {
    return data;
  }
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("cabin-images")
    .upload(imageName, cabin.image);
  if (uploadError) {
    await supabase.from("cabins").delete().eq("id", data[0].id);
    throw new Error(uploadError.message);
  }

  return data;
}

export async function updateCabin(cabin) {
  const { data, error } = await supabase
    .from("cabins")
    .update(cabin)
    .eq("id", cabin.id);
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function deleteCabin(id) {
  console.log("cabinID", id);
  console.log("typeof id", typeof id);
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Cabin could not be deleted");
  }

  return data;
}
