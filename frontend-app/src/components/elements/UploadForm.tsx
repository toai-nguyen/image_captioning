import React, { useState } from 'react';
import { Upload, X, FileImage } from 'lucide-react';

export default function UploadForm() {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);

  const handleFileSelect = (file: File | null) => {
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0] || null;
    handleFileSelect(file);
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
    setPreviewUrl('');
    // Reset input file với type assertion an toàn
    const fileInput = document.getElementById('file-input') as HTMLInputElement;
    if (fileInput) {
      fileInput.value = '';
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (selectedImage) {
      // Xử lý submit ở đây
      console.log('Uploading image:', selectedImage);
      alert(`Đã upload thành công: ${selectedImage.name}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Upload Image
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Upload Area */}
        <div
          className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 hover:border-gray-400'
          }`}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <input
            id="file-input"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          {!selectedImage ? (
            <div className="space-y-2">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="text-gray-600">
                <p className="text-sm">
                  <span className="font-medium text-blue-600">Choose your image</span> or drag and drop it here
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <FileImage className="mx-auto h-8 w-8 text-green-500" />
              <p className="text-sm text-green-600 font-medium">
                {selectedImage.name}
              </p>
              <p className="text-xs text-gray-500">
                {(selectedImage.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          )}
        </div>

        {/* Preview Image */}
        {previewUrl && (
          <div className="relative">
            <div className="relative bg-gray-100 rounded-lg overflow-hidden">
              <img
                src={previewUrl}
                alt="Preview"
                className="w-full h-64 object-cover"
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-2 text-center">
                Click the <span className="font-medium text-red-500">X</span> to remove the image
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={!selectedImage}
          className={`w-full py-2 px-4 rounded-lg font-medium transition-colors ${
            selectedImage
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'bg-gray-300 text-gray-500 cursor-not-allowed'
          }`}
        >
          {selectedImage ? 'Caption the image' : 'Choose an Image'}
        </button>
      </form>
    </div>
  );
}