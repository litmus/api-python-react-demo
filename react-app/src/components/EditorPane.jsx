import React, { useEffect, useRef } from "react";
import CodeMirror from "codemirror";
import "codemirror/mode/xml/xml";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/monokai.css";

const EditorPane = React.memo(({ onChange }) => {
  const editorRef = useRef(null);
  const codeMirrorInstance = useRef(null);

  useEffect(() => {
    if (!codeMirrorInstance.current) {
      codeMirrorInstance.current = CodeMirror.fromTextArea(editorRef.current, {
        mode: "text/html",
        theme: "monokai",
        lineNumbers: true,
      });

      // Listen for changes and invoke onChange
      codeMirrorInstance.current.on("change", (editor) => {
        onChange(editor.getValue());
      });


      // Set initial value to the html from sample-email.html
      fetch("sample-email.html")
        .then((response) => response.text())
        .then((data) => {
          codeMirrorInstance.current.setValue(data);
        });

    }

    return () => {
      if (codeMirrorInstance.current) {
        codeMirrorInstance.current.toTextArea();
      }
    };
  }, [onChange]);

  return (
    <textarea
      ref={editorRef}      
      style={{ display: "none" }} // Hide the original textarea
    />
  );
});

export default EditorPane;
