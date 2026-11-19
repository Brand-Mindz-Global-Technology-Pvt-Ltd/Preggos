
import { X, Upload, Cloud, Plus, Trash2 } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MdOutlineFileDownloadDone } from "react-icons/md";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { BiSolidCartDownload } from "react-icons/bi"; 


export default function ProductCreate({ productId, onClose, onSuccess }) {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [rating, setRating] = useState(1);
  const [ramValue, setRamValue] = useState("");
  const [rams, setRams] = useState([]);
  const [sizeValue, setSizeValue] = useState("");
  const [sizes, setSizes] = useState([]);
  const [weightValue, setWeightValue] = useState("");
  const [weightUnit, setWeightUnit] = useState("g");
  const [images, setImages] = useState([]);
  const imageRef = useRef(null);
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [price, setPrice] = useState("");
  const [oldPrice, setOldPrice] = useState("");
  const [stock, setStock] = useState("");
  const [brand, setBrand] = useState("");
  const [discount, setDiscount] = useState("");
  const [description, setDescription] = useState("");
  const [colorValue, setColorValue] = useState("");
  const [colors, setColors] = useState([]);
  const [open, setOpen] = useState(false);
  const isEdit = Boolean(productId);
  const [productIds, setProductId] = useState("");

  const generateProductId = (lastNumber) => {
    const next = lastNumber + 1;
    return `PROD-${String(next).padStart(4, "0")}`;
  };

  const units = [
    { value: "g", label: "Gram" },
    { value: "kg", label: "Kilogram" },
    { value: "L", label: "Liter" },
    { value: "m", label: "Meter" },
    { value: "pc", label: "Piece" },
    { value: "mm", label: "Millimeter" },
    { value: "cm", label: "Centimeter" },
    { value: "in", label: "Inch" },
    { value: "ft", label: "Foot" },
    { value: "pac", label: "Pack" },
    { value: "box", label: "Box" },
    { value: "dozen", label: "Dozen" },
    { value: "set", label: "Set" },
  ];

  const [productName, setProductName] = useState("");
  const [slug, setSlug] = useState("");

  const generateSlug = (name) => {
    const baseSlug = name
      .toString()
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    return `${baseSlug}-${randomNumber}`;
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/categories`
      );
      if (!isEdit) {
        setProductId(res.data.productId);
      }
      const formatted = res.data.data.map((cat) => ({
        label: cat.name,
        value: cat.slug,
      }));
      setCategories(formatted);
    } catch (err) {
      console.error("Category fetch failed", err);
    }
  };

  useEffect(() => {
    if (category) {
      fetchSubCategories(category);
    } else {
      setSubCategories([]);
    }
  }, [category]);

  const fetchSubCategories = async (categorySlug) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/categories/${categorySlug}/subcategories`
      );
      const formatted = res.data.data.map((sub) => ({
        label: sub.name,
        value: sub.slug,
      }));
      setSubCategories(formatted);
    } catch (err) {
      console.error("Subcategory fetch failed", err);
      setSubCategories([]);
    }
  };

  const handleAddSize = () => {
    if (!sizeValue) return;
    setSizes([...sizes, sizeValue]);
    setSizeValue("");
  };

  const id = JSON.parse(localStorage.getItem("admin"))?.id;

  const handleClose = () => {
    if (isEdit) {
      onClose();
    } else {
      navigate(`/admin/products?id=${id}`);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 4) {
      alert("Maximum 4 images allowed");
      return;
    }
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...images, ...newImages]);
    imageRef.current.value = "";
  };

  const handleSubmit = async () => {
    if (submitting) return;

    try {
      setSubmitting(true);

      const formData = new FormData();

      if (!isEdit) {
        formData.append("productId", productIds || "");
      }
      formData.append("name", productName || "");
      formData.append("description", description || "");
      formData.append("category", category || "");
      formData.append("subCategory", subCategory || "");
      formData.append("price", String(price || ""));
      formData.append("oldPrice", String(oldPrice || ""));
      formData.append("stock", String(stock || ""));
      formData.append("brand", brand || "");
      formData.append("discount", String(discount || ""));
      formData.append("rating", String(rating || 1));
      formData.append("weightValue", String(weightValue || ""));
      formData.append("weightUnit", weightUnit || "");
      formData.append("rams", JSON.stringify(rams || []));
      formData.append("sizes", JSON.stringify(sizes || []));
      formData.append("colors", JSON.stringify(colors || []));

      const existingImages = images
        .filter((img) => !img.file)
        .map((img) => img.url || img.preview);

      formData.append("existingImages", JSON.stringify(existingImages));

      images.forEach((img) => {
        if (img.file) {
          formData.append("images", img.file);
        }
      });

      const token = localStorage.getItem("token");

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      };

      if (isEdit) {
        await axios.put(
          `${import.meta.env.VITE_API_URL}/products/${productId}`,
          formData,
          config
        );
        alert("Product updated successfully");
      } else {
        await axios.post(
          `${import.meta.env.VITE_API_URL}/products`,
          formData,
          config
        );
        alert("Product created successfully");
      }

      if (typeof onSuccess === "function") {
        onSuccess();
      }

      navigate(`/admin/products?id=${id}`);

    } catch (err) {
      console.error("Axios error:", err);
      if (err.response) {
        console.error("Backend:", err.response.data);
        alert(err.response.data?.message || "Backend Error");
      } else {
        alert(err.message);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const fetchProductById = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/products/${productId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const p = res.data.data;
      setProductId(p.productId || "");
      setProductName(p.name || "");
      setSlug(p.slug || "");
      setDescription(p.description || "");
      setCategory(p.category || "");
      setSubCategory(p.subCategory || "");
      setPrice(p.price || "");
      setOldPrice(p.oldPrice || "");
      setStock(p.stock || "");
      setBrand(p.brand || "");
      setDiscount(p.discount || "");
      setRating(p.rating || 1);
      setWeightValue(p.weight?.value || "");
      setWeightUnit(p.weight?.unit || "g");
      setRams(p.rams || []);
      setSizes(p.sizes || []);
      setColors(p.colors || []);
      setImages(
        (p.images || []).map((url) => ({
          preview: url,
        }))
      );
    } catch (err) {
      console.error("Fetch product failed", err);
      alert("Failed to load product");
    }
  };

  useEffect(() => {
    if (isEdit && productId) {
      fetchProductById();
    }
  }, [isEdit, productId]);


  return (
    <div className="h-full flex flex-col">
      <div className="bg-white w-full h-full flex flex-col overflow-hidden">

        {/* ================= HEADER ================= */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 border-b bg-slate-50">

          <h2 className="text-lg font-semibold">
            {isEdit ? (
              "Edit Product"
            ) : (
              <span className="flex items-center gap-2 text-[20px]">
                <BiSolidCartDownload size={30} /> Product
              </span>
            )}
          </h2>

          <button
            onClick={handleClose}
            className="text-red-600 hover:bg-red-600 hover:text-white rounded-full"
          >
            <AiOutlineCloseCircle size={25} />
          </button>
        </div>

        {/* ================= BODY ================= */}
        <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6 space-y-6">

          {/* NAME + ID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm mb-1">Product Name</label>
              <input
                value={productName}
                onChange={(e) => {
                  const value = e.target.value;
                  setProductName(value);
                  if (!isEdit) {
                    setSlug(generateSlug(value));
                  }
                }}
                placeholder="Enter product name"
                className="w-full border rounded px-3 sm:px-4 py-2 text-sm sm:text-base"
              />
              {slug && (
                <p className="text-xs text-gray-500 mt-1">
                  Slug: <span className="text-blue-600">{slug}</span>
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm mb-1">Product ID</label>
              <input
                value={productIds}
                readOnly
                className="w-full border rounded px-3 sm:px-4 py-2 text-sm sm:text-base bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm mb-1">Product Description</label>
            <textarea
              rows="4"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded px-4 py-2 resize-none"
              placeholder="Enter product description"
            />
          </div>

          {/* ================= GRID 3×3 ================= */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">

            <Input
              label="Product Category"
              select
              options={categories}
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />

            <Input
              label="Product Sub Category"
              select
              options={subCategories}
              value={subCategory}
              onChange={(e) => setSubCategory(e.target.value)}
            />
            <Input
              label="Product Price"
              value={price}
              placeholder="Ex:5000"
              onChange={(e) => setPrice(e.target.value)}
            />

            <Input
              label="Product Old Price"
              value={oldPrice}
              placeholder="Ex:4000"
              onChange={(e) => setOldPrice(e.target.value)}
            />

            <Input
              label="Product Stock"
              value={stock}
              placeholder="Ex:100"
              onChange={(e) => setStock(e.target.value)}
            />

            <Input
              label="Product Brand"
              value={brand}
              placeholder="Ex:SONY"
              onChange={(e) => setBrand(e.target.value)}
            />

            <Input
              label="Product Discount"
              value={discount}
              placeholder="Ex:5"
              onChange={(e) => setDiscount(e.target.value)}
            />

            {/* RAMS */}
            <div>
              <label className="block text-sm mb-1">Product RAMS</label>
              <div className="flex gap-2">
                <input
                  value={ramValue}
                  onChange={(e) => setRamValue(e.target.value)}
                  placeholder="Ex: 8GB"
                  className="flex-1 border rounded px-4 py-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!ramValue) return;
                    setRams([...rams, ramValue]);
                    setRamValue("");
                  }}
                  className="bg-[#162A78] text-white px-3 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 max-w-full">
                {rams.map((ram) => (
                  <span key={ram} className="bg-gray-100 px-3 py-1 rounded-full text-sm">
                    {ram}
                    <button
                      onClick={() => setRams(rams.filter((r) => r !== ram))}
                      className="ml-1 text-red-500"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div className="w-full">
              <label className="block text-sm mb-1">Product Quantity</label>
              <div className="flex flex-col md:flex-row w-full">
                <input
                  type="number"
                  value={weightValue}
                  onChange={(e) => setWeightValue(e.target.value)}
                  placeholder="Enter weight"
                  className="w-full border px-4 py-2 text-sm rounded-t md:rounded-l md:rounded-t-none md:flex-1"
                />

                <div className="relative md:w-[120px] w-full">
                  <button
                    type="button"
                    onClick={() => setOpen(!open)}
                    className="w-full h-[40px] bg-[#162A78] text-white px-4 text-sm rounded md:rounded-r flex items-center justify-between"
                  >
                    {weightUnit}
                    <span>⌄</span>
                  </button>

                  {open && (
                    <div className="absolute right-0 mt-1 w-full bg-[#162A78] rounded shadow max-h-[240px] overflow-y-auto z-50">
                      {units.map((unit) => (
                        <div
                          key={unit.value}
                          onClick={() => {
                            setWeightUnit(unit.value);
                            setOpen(false);
                          }}
                          className="px-4 py-2 text-white text-sm hover:bg-blue-600 cursor-pointer"
                        >
                          {unit.label}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* SIZE */}
            <div>
              <label className="block text-sm mb-1">Product Size</label>
              <div className="flex gap-2">
                <input
                  value={sizeValue}
                  onChange={(e) => setSizeValue(e.target.value)}
                  placeholder="Ex: S, M, L, XL or 42"
                  className="flex-1 border rounded px-4 py-2"
                />
                <button
                  type="button"
                  onClick={handleAddSize}
                  className="bg-[#162A78] text-white px-3 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {sizes.map((s) => (
                  <span
                    key={s}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center gap-1"
                  >
                    {s}
                    <button
                      type="button"
                      onClick={() => setSizes(sizes.filter((x) => x !== s))}
                      className="text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* COLORS */}
            <div>
              <label className="block text-sm mb-1">Product Colors</label>
              <div className="flex gap-2">
                <input
                  value={colorValue}
                  onChange={(e) => setColorValue(e.target.value)}
                  placeholder="Ex: Red"
                  className="flex-1 border rounded px-4 py-2"
                />
                <button
                  type="button"
                  onClick={() => {
                    if (!colorValue) return;
                    setColors([...colors, colorValue]);
                    setColorValue("");
                  }}
                  className="bg-[#162A78] text-white px-3 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="flex flex-wrap gap-2 mt-2 max-w-full">
                {colors.map((color) => (
                  <span
                    key={color}
                    className="bg-gray-100 px-3 py-1 rounded-full text-sm flex items-center"
                  >
                    {color}
                    <button
                      onClick={() => setColors(colors.filter((c) => c !== color))}
                      className="ml-2 text-red-500 font-bold"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            {/* RATING */}
            <div>
              <label className="block text-sm mb-2">Product Rating</label>
              <div className="flex gap-1 mt-2">
                {[1, 2, 3, 4, 5].map((i) => (
                  <span
                    key={i}
                    onClick={() => setRating(i)}
                    className={`cursor-pointer text-2xl ${
                      i <= rating ? "text-yellow-400" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>

          </div>

          {/* ================= MEDIA ================= */}
          <div>
            <h3 className="font-semibold mb-3">Media & Images</h3>
            <div className="flex flex-wrap gap-4">
              {images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32"
                >
                  <img
                    src={img.preview}
                    className="w-full h-full object-cover rounded-lg"
                  />
                  <button
                    onClick={() => setImages(images.filter((_, x) => x !== i))}
                    className="absolute top-1 right-1 bg-red-600 text-white p-1 rounded-full"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}

              {images.length < 4 && (
                <label className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer">
                  <input
                    ref={imageRef}
                    type="file"
                    multiple
                    hidden
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  <Upload />
                </label>
              )}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Upload minimum <b>1</b> image and maximum <b>4</b> images
            </p>
          </div>
        </div>

        {/* ================= FOOTER ================= */}
        <div className="sticky bottom-0 border-t bg-white px-6 py-4">
          <button
            onClick={handleSubmit}
            disabled={submitting}
            className={`
              w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-lg
              text-sm sm:text-base flex items-center justify-center gap-2
              ${submitting ? "opacity-70 cursor-not-allowed" : ""}
            `}
          >
            {submitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                {isEdit ? "UPDATING..." : "PUBLISHING..."}
              </>
            ) : (
              <>
                <MdOutlineFileDownloadDone size={25} />
                {isEdit ? "UPDATE PRODUCT" : "PUBLISH AND VIEW"}
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

/* ================= INPUT ================= */
function Input({
  label,
  value,
  onChange,
  placeholder = "",  
  type = "text",
  select,
  options = [],
}) {
  return (
    <div className="w-full">
      <label className="block text-sm mb-1">{label}</label>

      {select ? (
        <select
          value={value}
          onChange={onChange}
          className="w-full border rounded px-4 py-2"
        >
          <option value="">Select</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full border rounded px-4 py-2"
        />
      )}
    </div>
  );
}