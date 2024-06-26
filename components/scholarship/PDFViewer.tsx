import React, { useEffect, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import { Skeleton } from "../Skeleton";
import AppLoader from "../App-loader";
import { useTranslation } from "react-i18next";

// Set up the workerSrc for PDF.js. Adjust the version and path as necessary.
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

type PDFPreviewProps = {
  src: string;
};

const PDFPreview: React.FC<PDFPreviewProps> = ({ src }) => {
  const { t } = useTranslation("scholarships");
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  // const [pdfBuffer, setPdfBuffer] = useState<Uint8Array | null>(null);
  const [isPdfFetching, setIsPdfFetching] = useState<boolean>(true);

  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    async function fetchPdfAsUint8Array(url: string): Promise<Uint8Array> {
      const response = await fetch(url);
      const buffer = await response.arrayBuffer();
      return new Uint8Array(buffer);
    }

    fetchPdfAsUint8Array(src)
      .then((buffer) => {
        // Convert Uint8Array to a Blob
        const pdfBlob = new Blob([buffer], { type: "application/pdf" });

        // Create a URL for the Blob
        setPdfUrl(URL.createObjectURL(pdfBlob));
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsPdfFetching(false);
      });

    return () => {};
  }, [src]);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
  };

  return (
    <div className="">
      {!pdfUrl && !isPdfFetching && (
        <div className="flex flex-col p-6 border rounded-md">
          <p className="text-lg font-medium">
            {/* Preview of the PDF is unavailable */}
            {t("previewOfThePDFIsUnavailable")}
          </p>
          <p>
            {t("pleaseClickThe")}{" "}
            <span className="text-secondary">{t("viewPDF")}</span>
            {t("buttonAboveToDownloadThePDF")}
          </p>
        </div>
      )}
      {isPdfFetching && (
        <div className="p-6">
          <Skeleton className="w-full rounded-md bg-slate-300 h-96" />
        </div>
      )}
      {pdfUrl && !isPdfFetching && (
        <div className="flex flex-col gap-3">
          <Document
            className={"w-full mx-auto overflow-scroll bg-white rounded-md "}
            file={pdfUrl}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={<AppLoader />}
            options={{
              cMapUrl: "cmaps/",
              cMapPacked: true,
            }}
          >
            <Page
              loading={<AppLoader />}
              className={"w-full flex justify-center items-center"}
              key={`page_${pageNumber}`}
              pageNumber={pageNumber}
            />
          </Document>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              className="btn btn-sm"
              disabled={pageNumber === 1}
              onClick={() => setPageNumber(pageNumber - 1)}
            >
              {t("previous")}
            </button>
            <p>
              {t("page")} {pageNumber} {t("of")} {numPages}
            </p>
            <button
              className="btn btn-sm"
              disabled={pageNumber === numPages}
              onClick={() => setPageNumber(pageNumber + 1)}
            >
              {t("next")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFPreview;
