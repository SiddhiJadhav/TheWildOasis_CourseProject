import supabase, { supabaseUrl, supabaseKey } from './supabase';

export async function getCabins() {
  let { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be deleted');
  }

  return data;
}

export async function insertOrEditCabin(newCabin, id) {
  debugger;
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  //https://frjroarqxikqotyaxqwf.supabase.co/storage/v1/object/sign/cabins-images/cabin-001.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbnMtaW1hZ2VzL2NhYmluLTAwMS5qcGciLCJpYXQiOjE3MzMxNzQ3MTUsImV4cCI6MTczMzc3OTUxNX0.lzu9sz06xsF-kbYWwPq0bRax5j_qbtJsjRrEhD6L8R8&t=2024-12-02T21%3A25%3A15.759Z

  const imagePath = `${supabaseUrl}/storage/v1/object/sign/cabins-images/${imageName}?token=${supabaseKey}`;

  let query = supabase.from('cabins');
  //Create
  if (!id) {
    query = query.insert([{ ...newCabin, image: imagePath }]);
  }
  //Edit
  if (id) {
    query = query.update({ ...newCabin, image: imagePath }).eq('id', id);
  }

  //Adding data to table
  const { data, error } = await query.select().single();

  console.log(data);

  if (error) {
    console.error(error);
    if (!id) throw new Error('Cabins could not be inserted');
    else throw new Error('Cabin could not be edited');
  }

  //Adding Image to storage
  const { data: storageData, error: storageError } = await supabase.storage
    .from('cabins-images')
    .upload(imagePath, newCabin.image);

  console.log(storageData);

  //If image upload fails, delete the inserted record
  if (storageError) {
    debugger;
    console.log(storageError);

    await supabase.from('cabins').delete().eq('id', data.id);
    throw new Error(
      'Cabin image could not be uploaded and cabin was not created'
    );
  }

  return data;
}
