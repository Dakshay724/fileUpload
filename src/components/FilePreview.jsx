import React from "react";
// import CircularProgress from "@material-ui/core/CircularProgress";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const FilePreview = ({ file, onRemove }) => {
  return (
    <div className="file-preview">
      <div
        className="dropZone__img"
        style={{ backgroundImage: `url(${file.preview})` }}
      >
        {/* <FontAwesomeIcon
          className="dropZone__img"
          icon={faTrashAlt}
          color="red"
          onClick={onRemove}
        /> */}
      </div>
      {/* <CircularProgress
        className="centered"
        style={{ width: "25px", height: "25px" }}
        variant="static"
        value={file.percentage || 0}
      /> */}
    </div>
  );
};

export default FilePreview;
