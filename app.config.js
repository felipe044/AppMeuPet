export default {
  expo: {
    name: "MeuPetVacinado",
    slug: "meupetvacinado",

    extra: {
      cloudinaryName: process.env.EXPO_PUBLIC_CLOUDINARY_NAME,
      cloudinaryPreset: process.env.EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    },
  },
};
