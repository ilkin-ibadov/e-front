import { useEffect, useState } from "react";
import ModalImage from "react-modal-image";
import { toast } from "react-toastify";

const ImageUpload = ({ urlImages, setUrlImages, images, setImages, maxImages = 20, setDeletedImages }) => {

  // console.log(imgUrls)
  const [previews, setPreviews] = useState([]);


  // Minimum image dimensions
  const MIN_WIDTH = 1500;
  const MIN_HEIGHT = 1500;

  // Handle image upload and store both File objects and previews
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);

    if (files?.length + images?.length > maxImages) {
      toast.warning(`You can upload a maximum of ${maxImages} images.`);
      return;
    }

    // Validate each image
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          // Check image dimensions
          //   if (img.width >= MIN_WIDTH && img.height >= MIN_HEIGHT) {
          setPreviews((prev) => [
            ...prev,
            { name: file.name, url: reader.result },
          ]);
          setImages((prevImages) => [...prevImages, file]);
          //   } else {
          //     toast.warning(
          //       `Image "${file.name}" is too small. Minimum dimensions are ${MIN_WIDTH}px by ${MIN_HEIGHT}px.`
          //     );
          //   }
        };
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle image deletion
  const handleDelete = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setPreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  const handleUrlImageDelete = (image, index) => {
    setUrlImages((prevImages) => prevImages.filter((_, i) => i !== index))
    setDeletedImages(prevImages => [...prevImages, image])
  };



  return (
    <div className="mt-3">
      <label className="text-lg lg:text-xl font-medium">
        Upload your pictures!
      </label>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleImageChange}
        className="mt-4 block w-full text-lg text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-lg file:font-semibol file:bg-violet-50 file:text-violet-70 hover:file:bg-violet-100"
      />
      {Boolean(urlImages?.length || previews.length > 0) && (
        <div className="mt-4">
          <h4 className="text-lg font-medium">Uploaded Images:</h4>
          <div className="flex gap-3 overflow-auto">
            {previews.map((image, index) => (
              <div className="flex flex-col items-center gap-2" key={index}>
                <ModalImage
                  hideZoom={true}
                  small={image.url}
                  large={image.url}
                  alt={image.name}
                  className="w-20 h-20 object-cover rounded"
                />
                <span>{image.name}</span>
                <button
                  onClick={() => handleDelete(index)}
                  className="bg-red-500 text-white size-8 rounded-full mt-2"
                >
                  <svg
                    className="size-6 m-auto"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                      stroke="#ffffff"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </button>
              </div>
            ))}
            {urlImages &&
              urlImages.map((image, index) => (
                <div className="flex flex-col items-center gap-2" key={index}>
                  <ModalImage
                    hideZoom={true}
                    small={image}
                    large={image}
                    className="w-20 h-20 object-cover rounded"
                  />

                  <button
                    onClick={() => handleUrlImageDelete(image, index)}
                    className="bg-red-500 text-white size-8 rounded-full mt-2"
                  >
                    <svg
                      className="size-6 m-auto"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M18 6V16.2C18 17.8802 18 18.7202 17.673 19.362C17.3854 19.9265 16.9265 20.3854 16.362 20.673C15.7202 21 14.8802 21 13.2 21H10.8C9.11984 21 8.27976 21 7.63803 20.673C7.07354 20.3854 6.6146 19.9265 6.32698 19.362C6 18.7202 6 17.8802 6 16.2V6M4 6H20M16 6L15.7294 5.18807C15.4671 4.40125 15.3359 4.00784 15.0927 3.71698C14.8779 3.46013 14.6021 3.26132 14.2905 3.13878C13.9376 3 13.523 3 12.6936 3H11.3064C10.477 3 10.0624 3 9.70951 3.13878C9.39792 3.26132 9.12208 3.46013 8.90729 3.71698C8.66405 4.00784 8.53292 4.40125 8.27064 5.18807L8 6"
                        stroke="#ffffff"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </svg>
                  </button>
                </div>
              ))
            }

          </div>
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
