import React, { useState, useCallback } from "react";
import Navbar from "./Navbar";
import EditorPane from "./EditorPane";
import PreviewPane from "./PreviewPane";
import ConfigurationSelector from "./ConfigSelector";
import LitmusPane from "./LitmusPane";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  const [previewContent, setPreviewContent] = useState("<h1>Hello, World!</h1>");
  const [activeTab, setActiveTab] = useState("preview");
  

  // Use useCallback to memoize the onChange handler
  const handleEditorChange = useCallback((value) => {
    setPreviewContent(value);
  }, []);



  return (
    <div className="container-fluid d-flex flex-column" style={{ height: "100vh" }}>
      <Navbar onTabChange={setActiveTab} />
      <div className="row flex-grow-1 hidden-overflow">
        {/* Editor Column */}
        <div id="editor" className="col-6 p-0">
          <EditorPane onChange={handleEditorChange} />
        </div>

        {/* Preview or Other Content Column */}
        <div className="col-6 p-0 preview-pane">
          {activeTab === "preview" ? (
            <PreviewPane content={previewContent} />
          ) : activeTab === "settings" ? (
            <ConfigurationSelector  />
          ) : activeTab === "litmus" ? (
            <LitmusPane content={previewContent}  />
          ) : (
            <div className="preview-pane p-4">Other Content for Tab: {activeTab}</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
