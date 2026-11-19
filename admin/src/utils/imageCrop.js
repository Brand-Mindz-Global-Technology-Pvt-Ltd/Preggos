export const createImage = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.crossOrigin = "anonymous";
    img.src = url;
  });

export const getCroppedImg = async (imageSrc, cropPixels) => {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");

  canvas.width = cropPixels.width;
  canvas.height = cropPixels.height;

  const ctx = canvas.getContext("2d");
  ctx.drawImage(
    image,
    cropPixels.x,
    cropPixels.y,
    cropPixels.width,
    cropPixels.height,
    0,
    0,
    cropPixels.width,
    cropPixels.height
  );

  return new Promise((resolve) => {
    canvas.toBlob((blob) => {
      resolve(
        new File([blob], `slider-${Date.now()}.jpg`, {
          type: "image/jpeg",
        })
      );
    }, "image/jpeg", 0.9);
  });
};
