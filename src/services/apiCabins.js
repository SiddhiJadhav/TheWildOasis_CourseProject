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

export async function insertCabin(newCabin) {
  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    '/',
    ''
  );
  //https://frjroarqxikqotyaxqwf.supabase.co/storage/v1/object/sign/cabins-images/cabin-001.jpg?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cmwiOiJjYWJpbnMtaW1hZ2VzL2NhYmluLTAwMS5qcGciLCJpYXQiOjE3MzMxNzQ3MTUsImV4cCI6MTczMzc3OTUxNX0.lzu9sz06xsF-kbYWwPq0bRax5j_qbtJsjRrEhD6L8R8&t=2024-12-02T21%3A25%3A15.759Z

  //https://frjroarqxikqotyaxqwf.supabase.co/storage/v1/object/sign/cabins-images/0.36518613997076543-kitten.png?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZyanJvYXJxeGlrcW90eWF4cXdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMxNzA1MTcsImV4cCI6MjA0ODc0NjUxN30.1OteLRAOwNpdndE6YNHUo9RuzMlGo10YBUkBwQRHrDc

  const imagePath = `${supabaseUrl}/storage/v1/object/sign/cabins-images/${imageName}?token=${supabaseKey}`;

  //Adding data to table
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select();

  console.log(data);

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be inserted');
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
