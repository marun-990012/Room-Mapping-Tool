
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Upload, Loader2 } from "lucide-react";
import LeafletPage from './LeafletPage'
import axios from "../utils/axiosIntance";

export default function SelectPlan() {
    const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [planName,setPlanName] = useState('');
  const [loading, setLoading] = useState(false);
  

  // Handle file selection & auto-upload
  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;

    setFile(selectedFile);
    setPreview(URL.createObjectURL(selectedFile));
    await uploadImage(selectedFile);
  };

  // Upload image to backend
  const uploadImage = async (imageFile) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("file", imageFile);

      const response = await axios.post(
        "/api/image/upload",formData);

      // Save uploaded image URL
      console.log(response.data)
      setImageUrl(response.data);
      const name = prompt('enter plan name');
      setPlanName(name);
    } catch (error) {
      console.error("Image upload failed:", error);
      alert("Failed to upload image!");
    } finally {
      setLoading(false);
    }
  };

//  console.log(imageUrl);
  return (
    <div className="bg-gray-100">
    <div className="flex px-6">
      <div>
        <div className="flex items-center gap-6 bg-white shadow-md rounded-xl mt-5 p-3">
          {/* Upload Button */}
          <div className="flex flex-col items-center gap-3 bg-blue-200 p-1 rounded-lg">
            <label
              htmlFor="file-upload"
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow cursor-pointer transition-all duration-300"
            >
              {loading ? <Loader2 size={18} className="animate-spin" /> : <Upload size={18} />}
              <span>{file ? "Change Room Plan" : "Select Room Plan"}</span>
            </label>
            <input
              id="file-upload"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Image Preview */}
          <div className="flex flex-col items-center">
            {loading ? (
              <div className="w-10 h-10 flex items-center justify-center bg-gray-200 rounded-lg text-gray-500 border border-gray-300">
                <Loader2 className="animate-spin" size={18} />
              </div>
            ) : imageUrl ? (
              <img
                src={imageUrl}
                alt="Uploaded"
                className="w-10 h-10 object-cover rounded-lg border border-gray-300 shadow"
              />
            ) : preview ? (
              <img
                src={preview}
                alt="Preview"
                className="w-10 h-10 object-cover rounded-lg border-1 border-green-300 shadow"
              />
            ) : (
              <div className="w-10 h-10 flex items-center justify-center text-center bg-gray-200 rounded-lg text-gray-400 text-xs border border-gray-300">
                No Plan
              </div>
            )}
          </div>

          <div className="bg-green-200 p-1 rounded-lg">
            <button onClick={()=>navigate('/room-plans')} className="bg-green-500 hover:bg-green-700 rounded-lg text-white px-4 py-2 transition-all duration-300 cursor-pointer">View my plans</button>
          </div>
        </div>
      </div>
    </div>

    <div className="w-full px-6 py-7">
           <LeafletPage key={imageUrl} imageUrl={imageUrl} planName={planName} />
    </div>
    </div>
  );
}
