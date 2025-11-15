export async function uploadImageCloudinary(base64: string) {
  try {
    const cloudName = process.env.EXPO_PUBLIC_CLOUDINARY_NAME;
    const preset = process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

    const uploadUrl = `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`;

    const data = new FormData();
    data.append("file", `data:image/jpeg;base64,${base64}`);
    data.append("upload_preset", preset);

    const response = await fetch(uploadUrl, {
      method: "POST",
      body: data
    });

    const result = await response.json();
    console.log("Cloudinary RESULT:", result);

    return result.secure_url;
  } catch (error) {
    console.error("ERRO NO CLOUDINARY:", error);
    return null;
  }
}
