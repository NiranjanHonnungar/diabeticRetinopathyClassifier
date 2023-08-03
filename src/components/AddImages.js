import { Paper } from "@mui/material";
import { useCallback, useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { TbFileUpload } from "react-icons/tb";
import { Button } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@emotion/react";
import ReactPDF, { PDFViewer } from "@react-pdf/renderer";

import MyDocument from "./MyDocument";

const AddImages = () => {
  const [pdf, setPdf] = useState(false);
  const [res, setRes] = useState([]);
  const theme = createTheme({
    palette: {
      primary: {
        main: "#9d9df1",
      },
    },
  });

  const thumbsContainer = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 3,
  };

  const thumb = {
    display: "inline-flex",
    borderRadius: 2,
    border: "3px solid #eaeaea",
    marginBottom: 8,
    marginRight: 8,
    width: 150,
    height: 150,
    padding: 4,
    boxSizing: "border-box",
  };

  const thumbInner = {
    display: "flex",
    minWidth: 0,
    overflow: "hidden",
  };

  const img = {
    display: "block",
    width: "auto",
    height: "100%",
  };
  const [thumbs, setThumbs] = useState([]);

  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    setThumbs(
      acceptedFiles.map((file) => (
        <div style={thumb} key={file.name}>
          <div style={thumbInner}>
            <img src={file.preview} style={img} />
          </div>
        </div>
      ))
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept: { "image/*": [] },
      minSize: 0,
    });

  const onGenerate = () => {
    const formData = new FormData();
    acceptedFiles.forEach((file) => {
      formData.append("files[]", file);
    });

    //   fetch("http://localhost:5000/api/upload", {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((response) => response.text())
    //     .then((data) => {
    //       console.log(data); // Handle server response
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });

    //   fetch("http://localhost:5000/api/predict", {
    //     method: "POST",
    //     body: formData,
    //   })
    //     .then((response) => response.json())
    //     .then((data) => {
    //       console.log(data);
    //       setRes(data);
    //       setPdf(true); // Handle server response
    //     })
    //     .catch((error) => {
    //       console.error("Error:", error);
    //     });

    fetch("http://localhost:5000/api/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data); // Handle server response

        // Start the second fetch request
        fetch("http://localhost:5000/api/predict", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setRes(data);
            setPdf(true); // Handle server response
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <div>
      <Paper
        sx={{
          cursor: "pointer",
          background: "#fafafa",
          color: "#bdbdbd",
          border: "5px dashed #4c4ca3",
          "&:hover": { border: "5px solid #7f7fd4" },
        }}
      >
        <div style={{ padding: "16px", color: "#000054" }} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p style={{ color: "green" }}>Drop the files here...</p>
          ) : (
            <p>Drag 'n' Drop some files here, or click to select files</p>
          )}
          <em>(images with *.jpeg, *.png, *.jpg extension will be accepted)</em>
          <br />
          <br />
          <em>
            <TbFileUpload fontSize={"30px"} color="#000054" marginTop="5px" />
          </em>
        </div>
        <aside style={thumbsContainer}>{thumbs}</aside>
      </Paper>
      <ThemeProvider theme={theme}>
        <div className="report">
          <Button
            style={{ margin: "20px" }}
            variant="contained"
            onClick={onGenerate}
          >
            {" "}
            Generate{" "}
          </Button>
        </div>
        <div>{pdf ? <MyDocument files={acceptedFiles} res={res} /> : ""}</div>
      </ThemeProvider>
    </div>
  );
};

export default AddImages;
