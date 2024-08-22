// import React, { useState } from "react";
// import FilePreview from "./FilePreview";
// // import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// // import { faPlus } from "@fortawesome/free-solid-svg-icons";
// import { uploadFilesToServer } from "../utils/api";

// const FileUpload = () => {
//   const [filesArray, setFilesArray] = useState([]);

//   const appendFiles = (files) => {
//     let updatedFilesArray = [...filesArray];
//     for (let file of files) {
//       if (file.type) {
//         file.preview = URL.createObjectURL(file);
//         updatedFilesArray.push(file);
//       }
//     }
//     setFilesArray(updatedFilesArray);
//   };

//   const removeFile = (index) => {
//     let updatedFilesArray = [...filesArray];
//     updatedFilesArray.splice(index, 1);
//     setFilesArray(updatedFilesArray);
//   };

//   const handleFileUpload = () => {
//     uploadFilesToServer(filesArray, setFilesArray);
//   };

//   return (
//     <div className="file-upload-container">
//       <center>
//         <div className="dropZone__imgs-wrapper">
//           {filesArray.map((file, index) => (
//             <FilePreview
//               key={index}
//               file={file}
//               onRemove={() => removeFile(index)}
//             />
//           ))}
//           <div className="file__add">
//             <label>
//               {/* <FontAwesomeIcon className="file_plus_Icon" icon={"faplus"} /> */}
//               <input
//                 id="file"
//                 type="file"
//                 className="hideFileText"
//                 multiple
//                 onChange={(e) => appendFiles(e.target.files)}
//               />
//             </label>
//           </div>
//         </div>

//         <button onClick={handleFileUpload} className="btn btn-primary mt-3">
//           Upload Files
//         </button>
//       </center>
//     </div>
//   );
// };

// export default FileUpload;

// import React, { useState } from "react";
// import FilePreview from "./FilePreview";
// import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
// import "react-circular-progressbar/dist/styles.css";

// const FileUpload = () => {
//   const [filesArray, setFilesArray] = useState([]);

//   const appendFiles = (files) => {
//     let updatedFilesArray = [...filesArray];
//     for (let file of files) {
//       if (file.type) {
//         file.preview = URL.createObjectURL(file);
//         file.progress = 0; // Initialize progress for each file
//         updatedFilesArray.push(file);
//       }
//     }
//     setFilesArray(updatedFilesArray);
//   };

//   const removeFile = (index) => {
//     let updatedFilesArray = [...filesArray];
//     updatedFilesArray.splice(index, 1);
//     setFilesArray(updatedFilesArray);
//   };

//   const handleFileUpload = () => {
//     filesArray.forEach((file, index) => {
//       uploadFile(file, index);
//     });
//   };

//   const uploadFile = (file, index) => {
//     const xhr = new XMLHttpRequest();
//     const formData = new FormData();
//     formData.append("file", file);
//     formData.append("name", file.name);
//     formData.append("mimetype", file.type);
//     formData.append("size", file.size);

//     xhr.open("POST", "http://localhost:5000/upload", true);

//     xhr.upload.onprogress = (event) => {
//       if (event.lengthComputable) {
//         const progress = (event.loaded / event.total) * 100;
//         updateFileProgress(index, progress);
//       }
//     };

//     xhr.onload = () => {
//       if (xhr.status === 200) {
//         console.log("File uploaded successfully");
//       } else {
//         console.error("Error uploading file");
//       }
//     };

//     xhr.onerror = () => {
//       console.error("Error uploading file----------------");
//     };

//     xhr.send(formData);
//   };

//   const updateFileProgress = (index, progress) => {
//     let updatedFilesArray = [...filesArray];
//     updatedFilesArray[index].progress = progress;
//     setFilesArray(updatedFilesArray);
//   };

//   return (
//     <div className="file-upload-container">
//       <div className="dropZone__imgs-wrapper">
//         {filesArray.map((file, index) => (
//           <div key={index} className="file-preview-container">
//             <FilePreview file={file} onRemove={() => removeFile(index)} />
//             <div className="progress-circle" style={{ width: 50, height: 50 }}>
//               <CircularProgressbar
//                 value={file.progress}
//                 text={`${Math.round(file.progress)}%`}
//                 styles={buildStyles({
//                   textSize: "24px", // Adjusted text size
//                   pathColor: "#003366", // Dark blue color for the path
//                   textColor: "#000000", // Black color for the text
//                   trailColor: "#d6d6d6", // Light gray trail color
//                   backgroundColor: "#f3f3f3", // Light background color
//                 })}
//               />
//             </div>
//           </div>
//         ))}
//         <div className="file__add">
//           <label>
//             <input
//               id="file"
//               type="file"
//               className="hideFileText"
//               multiple
//               onChange={(e) => appendFiles(e.target.files)}
//             />
//           </label>
//         </div>
//       </div>
//       <button onClick={handleFileUpload} className="btn btn-primary mt-3">
//         Upload Files
//       </button>
//     </div>
//   );
// };

// export default FileUpload;


// import React, { useState } from 'react';
// import './FileUpload.css'; // Import CSS file for styling

// function FileUpload() {
//   const [filesProgress, setFilesProgress] = useState([]);
//   const [uploading, setUploading] = useState(false);

//   const handleFileChange = (event) => {
//     const files = Array.from(event.target.files);
//     const progressArray = files.map(file => ({
//       file,
//       progress: 0,
//     }));

//     setFilesProgress(progressArray);
//     setUploading(true);

//     // Function to handle the upload of a single file
//     const uploadFile = (index) => {
//       if (index >= files.length) {
//         setUploading(false);
//         return;
//       }

//       const file = files[index];
//       const formData = new FormData();
//       formData.append('files', file);

//       const xhr = new XMLHttpRequest();
//       xhr.open('POST', 'http://localhost:5000/upload', true);

//       xhr.upload.onprogress = (event) => {
//         if (event.lengthComputable) {
//           const percentComplete = ((event.loaded / event.total) * 100).toFixed(2);
//           setFilesProgress((prevProgress) =>
//             prevProgress.map((item, i) =>
//               i === index ? { ...item, progress: percentComplete } : item
//             )
//           );
//         }
//       };

//       xhr.onload = () => {
//         if (xhr.status === 200) {
//           uploadFile(index + 1); // Proceed to next file
//         } else {
//           setUploading(false);
//           alert('File upload failed');
//         }
//       };

//       xhr.onerror = () => {
//         setUploading(false);
//         alert('File upload failed');
//       };

//       xhr.send(formData);
//     };

//     uploadFile(0); // Start uploading the first file
//   };

//   return (
//     <div>
//       <h1>Upload Files Sequentially with Progress:</h1>
//       <input
//         type="file"
//         multiple
//         onChange={handleFileChange}
//       />
//       {uploading && (
//         <div className="progress-container">
//           {filesProgress.map((file, index) => (
//             <div key={index} className="progress-file">
//               <div className="progress-label">File {index + 1}: {file.progress}%</div>
//               <div className="progress-bar">
//                 <div
//                   className="progress-bar-fill"
//                   style={{ width: `${file.progress}%` }}
//                 ></div>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// export default FileUpload;


import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css'; // Import CSS file for styling

function FileUpload() {
  const [filesProgress, setFilesProgress] = useState([]);
  const [status, setStatus] = useState('pending');
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    const progressArray = files.map(file => ({
      file,
      progress: 0,
    }));

    setFilesProgress(progressArray);
    setStatus('uploading');
    setUploading(true);

    const formData = new FormData();
    files.forEach(file => formData.append('files', file));

    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      onUploadProgress: (event) => {
        if (event.lengthComputable) {
          const percentComplete = ((event.loaded / event.total) * 100).toFixed(2);
          setFilesProgress((prevProgress) =>
            prevProgress.map((item) => ({
              ...item,
              progress: percentComplete,
            }))
          );
        }
      }
    })
    .then(() => {
      setStatus('converting');
      // Check conversion status periodically or via another endpoint
    })
    .catch(() => {
      setUploading(false);
      setStatus('failed');
    });
  };

  return (
    <div>
      <h1>Upload and Convert Video Files:</h1>
      <input
        type="file"
        multiple
        onChange={handleFileChange}
      />
      {uploading && (
        <div className="progress-container">
          {filesProgress.map((file, index) => (
            <div key={index} className="progress-file">
              <div className="progress-label">File {index + 1}: {file.progress}%</div>
              <div className="progress-bar">
                <div
                  className="progress-bar-fill"
                  style={{ width: `${file.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div>Status: {status}</div>
    </div>
  );
}

export default FileUpload;





