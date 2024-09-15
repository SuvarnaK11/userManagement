import React from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, Paper } from "@mui/material";

const fileUrls = [
  "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
  "https://file-examples.com/wp-content/uploads/2017/02/file-example_DOCX_500kB.docx",
  "https://www.textfiles.com/100/hello.txt",
];

const FilePreview = () => {
  const { index } = useParams();
  const fileUrl = fileUrls[index];

  const renderPreview = () => {
    if (fileUrl.endsWith(".pdf")) {
      return (
        <iframe
          src={fileUrl}
          style={{ width: "100%", height: "80vh" }}
          title="PDF Preview"
        />
      );
    } else if (fileUrl.endsWith(".docx")) {
      return (
        <iframe
          src={fileUrl}
          style={{ width: "100%", height: "80vh" }}
          title="DOCX Preview"
        />
      );
    } else if (fileUrl.endsWith(".txt")) {
      return (
        <Box sx={{ padding: 2 }}>
          <Typography variant="h6">TXT File Content:</Typography>
          <Paper elevation={1} sx={{ padding: 2, marginTop: 2 }}>
            <iframe
              src={fileUrl}
              style={{ width: "100%", height: "80vh" }}
              title="TXT Preview"
            />
          </Paper>
        </Box>
      );
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        File Preview
      </Typography>
      {renderPreview()}
    </Box>
  );
};

export default FilePreview;
