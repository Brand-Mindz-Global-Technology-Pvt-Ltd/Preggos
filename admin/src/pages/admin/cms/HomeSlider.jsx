
import { useState, useCallback } from "react";
import Cropper from "react-easy-crop";
import {
  Trash2,
  ImagePlus,
  CloudUpload,
  Crop,
  ArrowRight,
} from "lucide-react";
import { useSlider } from "../../../context/SliderContext";
import { getCroppedImg } from "../../../utils/imageCrop";

export default function HomeSlider() {
  const { images, loading, addImage, removeImage } = useSlider();

  /* ================= STATE ================= */
  const [open, setOpen] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const [finalPreview, setFinalPreview] = useState(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [aspect, setAspect] = useState(2500 / 750);
  const [croppedPixels, setCroppedPixels] = useState(null);
  const [publishing, setPublishing] = useState(false);

  /* ================= FILE UPLOAD ================= */
  const onFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result);
    reader.readAsDataURL(file);
  };

  /* ================= CROP ================= */
  const onCropComplete = useCallback((_, pixels) => {
    setCroppedPixels(pixels);
  }, []);

  const applyCrop = async () => {
    if (!imageSrc || !croppedPixels) return;

    const file = await getCroppedImg(imageSrc, croppedPixels);
    setFinalImage(file);
    setFinalPreview(URL.createObjectURL(file));
  };

  /* ================= SAVE ================= */
  const publishImage = async () => {
    if (!finalImage) return;

    try {
      setPublishing(true);
      await addImage(finalImage);
      closeModal();
    } finally {
      setPublishing(false);
    }
  };

  const closeModal = () => {
    setOpen(false);
    setImageSrc(null);
    setFinalImage(null);
    setFinalPreview(null);
    setZoom(1);
    setCrop({ x: 0, y: 0 });
  };

  /* ================= UI ================= */
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded-xl shadow">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Home Slider Images</h2>
        <button
          onClick={() => setOpen(true)}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          <ImagePlus size={18} />
          Add Image
        </button>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <table className="w-full border text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2">#</th>
              <th className="border px-3 py-2">Preview</th>
              <th className="border px-3 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {images.length === 0 && (
              <tr>
                <td colSpan="3" className="text-center py-6 text-gray-400">
                  No images found
                </td>
              </tr>
            )}

            {images.map((img, i) => (
              <tr key={img._id}>
                <td className="border text-center">{i + 1}</td>
                <td className="border text-center">
                  <img
                    src={img.image}
                    alt=""
                    className="h-16 mx-auto rounded object-cover"
                  />
                </td>
                <td className="border text-center">
                  <button
                    onClick={() => removeImage(img._id)}
                    className="p-2 rounded-full text-red-600 hover:bg-red-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MODAL */}
      {open && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white w-full max-w-5xl rounded-lg max-h-[90vh] overflow-y-auto">
            {/* HEADER */}
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <div>
                <h3 className="text-lg font-semibold">Upload Slider Image</h3>
                <p className="text-xs text-gray-500">
                  Crop image before publishing
                </p>
              </div>
              <button
                onClick={closeModal}
                className="text-xl px-2 hover:text-red-600"
              >
                ×
              </button>
            </div>

            {/* BODY */}
            <div className="p-6">
              {/* FILE PICK */}
              {!imageSrc && (
                <label className="block border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:border-blue-500">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                    className="hidden"
                  />
                  <p className="text-sm text-gray-600">
                    Click to upload image
                  </p>
                </label>
              )}

              {/* CROP */}
              {imageSrc && !finalImage && (
                <>
                  <div className="relative w-full h-[350px] mt-6 bg-gray-100 rounded overflow-hidden">
                    <Cropper
                      image={imageSrc}
                      crop={crop}
                      zoom={zoom}
                      aspect={aspect}
                      onCropChange={setCrop}
                      onZoomChange={setZoom}
                      onCropComplete={onCropComplete}
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-6">
                    <div className="md:col-span-2">
                      <label className="text-sm font-medium">Zoom</label>
                      <input
                        type="range"
                        min={1}
                        max={3}
                        step={0.1}
                        value={zoom}
                        onChange={(e) => setZoom(e.target.value)}
                        className="w-full"
                      />
                    </div>

                    <div>
                      <label className="text-sm font-medium">
                        Aspect Ratio
                      </label>
                      <select
                        value={aspect}
                        onChange={(e) =>
                          setAspect(Number(e.target.value))
                        }
                        className="w-full border rounded px-3 py-2"
                      >
                        <option value={2500 / 750}>2500 × 750</option>
                        <option value={16 / 9}>16 : 9</option>
                        <option value={4 / 3}>4 : 3</option>
                        <option value={1}>1 : 1</option>
                      </select>
                    </div>

                    <div className="md:col-span-3 flex justify-end">
                      <button
                        onClick={applyCrop}
                        className="flex gap-2 bg-blue-600 text-white px-6 py-2 rounded"
                      >
                        Next <ArrowRight size={18} />
                      </button>
                    </div>
                  </div>
                </>
              )}

              {/* PREVIEW */}
              {finalImage && (
                <>
                  <img
                    src={finalPreview}
                    alt=""
                    className="w-full rounded border mt-6"
                  />

                  <div className="flex justify-end gap-3 mt-4">
                    <button
                      onClick={() => setFinalImage(null)}
                      className="flex gap-2 border px-4 py-2 rounded"
                    >
                      <Crop size={18} /> Edit
                    </button>

                    <button
                      onClick={publishImage}
                      disabled={publishing}
                      className={`flex gap-2 px-4 py-2 rounded text-white ${publishing
                          ? "bg-green-400"
                          : "bg-green-600 hover:bg-green-700"
                        }`}
                    >
                      <CloudUpload size={18} />
                      {publishing ? "Publishing..." : "Publish"}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
