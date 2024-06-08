export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("upload_preset", process.env.NEXT_PUBLIC_UPLOAD_PRESET!);
    formData.append("file", file);
  
    const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL!, {
      method: "POST",
      body: formData,
    });
  
    if (res.ok) {
      const cloudRes = await res.json();
      return cloudRes.secure_url;
    } else {
      throw await res.json();
    }
  };