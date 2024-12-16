import React from "react";

const PreviewPane = ({ content }) => {
  return (
    <div
      className="preview-pane"
      style={{
        border: "1px solid #ccc",
        padding: "10px",
        height: "100%",
        overflowY: "auto",
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    ></div>
  );
};

export default PreviewPane;
