import React from "react";
import { Typography, SxProps, Theme } from "@mui/material";
import { pdfjs, Document, Page } from "react-pdf";
import LottieSpinner from "../spinner";
import animationdata from "../spinner/animation.json";
import { imageBaseUrl } from "../../types/common";
import useColors from "../../hooks/useColors";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/legacy/build/pdf.worker.min.js",
  import.meta.url
).toString();

type SuccessProps = {
  numPages: number;
};

const PdfViewer = ({ url, }: Readonly<{ url: string; boxSx?: SxProps<Theme> }>) => {
  const [isLoaded, setIsLoaded] = React.useState<boolean>(false);
  const [numPages, setNumPages] = React.useState<number>(0);

  function onDocumentLoadSuccess(pdf: SuccessProps | null): void {
    setNumPages(pdf?.numPages ?? 0);
    setTimeout(() => {
      setIsLoaded(true);
    }, 300);
  }

  const colors = useColors();

  return (
    <Document
      file={`${imageBaseUrl}/${url}`}
      loading={<LottieSpinner animationData={animationdata} />}
      onLoadSuccess={onDocumentLoadSuccess}
      error={
        <>
          <></>
          <Typography
            sx={{
              fontWeight: "500",
              color: colors.redAccent[500],
              padding: "10px",
            }}
          >
            Error Occurred...,
          </Typography>
        </>
      }
      noData={
        <>
          <></>
          <Typography
            sx={{
              fontWeight: "500",
              color: colors.redAccent[500],
              padding: "10px",
            }}
          >
            No Data Found.
          </Typography>
        </>
      }
      onSourceError={(error) => {
        console.log("source error", error);
      }}
      onLoadError={(error) => {
        console.log("onload error", error);
      }}
    >
      {isLoaded && numPages
        ? Array.from(new Array(numPages), (_, index) => (
            <Page
              pageNumber={index + 1}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              loading={""}
              key={`page${index + 1}`}
              // renderMode="canvas"
              // width={900}
            />
          ))
        : null}
    </Document>
  );
};

export default PdfViewer;
