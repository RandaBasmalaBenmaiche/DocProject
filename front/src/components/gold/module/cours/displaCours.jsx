import React, { useState } from "react";
import { Document, Page } from "react-pdf";
import {pdfjs} from 'react-pdf';
import samplePDF from "./Sampleee.pdf";
import { API_ROOT } from "../../../../constants";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
export default function SinglePage(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1); //setting 1 to show fisrt page
  console.log(props.pdf)
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.5rem', }}>


        <button
          style={{
            paddingInline: '15px',
            paddingBlock: '4px',
            backgroundColor: '#443C68',
            color: 'white',
            border: 'none',
            marginInline: '5px',
            borderRadius: '5px',
            fontFamily: 'Bahnschrift SemiBold',
            '&::disabled': {
              backgroundColor: 'black'
            }
          }}
          type="button" disabled={pageNumber <= 1} onClick={previousPage}>
          Presedant
        </button>
        <p style={{ margin: 'auto' }}>
          <b style={{color:'#ff5757'}}> {pageNumber || (numPages ? 1 : "--")}</b> / {numPages || "--"}
        </p>
        <button
          style={{
            paddingInline: '15px',
            paddingBlock: '4px',
            backgroundColor: '#443C68',
            color: 'white',
            fontFamily: 'Bahnschrift SemiBold',
            border: 'none',
            marginInline: '5px',
            borderRadius: '5px',
          }}
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          Suivant
        </button>
        

      </div>
      <div className="PDF" style={{ maxHeight:'75vh', overflowY: 'auto',borderRadius:'5px',boxShadow:'3px 3px 6px rgba(0,0,0,0.3)' }}>
        <Document
          
          file={`${API_ROOT}/uploads/'+props.pdf`}
          options={{ workerSrc: "/pdf.worker.min.js" }}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
        >
          <Page pageNumber={pageNumber} />
        </Document>
      </div>

    </>
  );
}