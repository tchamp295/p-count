// import { CldUploadWidget } from "next-cloudinary";

// const ImageUpload = () => {
//   return (
//     <CldUploadWidget uploadPreset="qqh54jyh">
//       {({ open }) => {
//         return <button onClick={() => open()}>Upload an Image</button>;
//       }}
//     </CldUploadWidget>
//   );
// };
// export default ImageUpload;

import { CldUploadWidget } from "next-cloudinary";

const ImageUpload = ({ onUpload }) => {
  return (
    <CldUploadWidget uploadPreset="qqh54jyh" onSuccess={onUpload}>
      {({ open }) => {
        return (
          <button
            type="button"
            onClick={() => open()}
            className="bg-blue-500 text-red-500 px-4 py-2 rounded hover:bg-gray-600"
          >
            Upload an Image
          </button>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
