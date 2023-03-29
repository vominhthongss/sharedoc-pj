// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import ReactPaginate from "react-paginate";
// import DocumentItem from "../components/DocumentItem";
// import axios from "axios";

// const GeneralSubjectPage = () => {
//   const { monhoc_id } = useParams();

//   const [documents, setDocuments] = useState([]);

//   const [documentsPerPage] = useState(10);
//   const [pageNumber, setPageNumber] = useState(0);

//   const pagesVisited = pageNumber * documentsPerPage;
//   const pageCount = Math.ceil(documents.length / documentsPerPage);
//   const changePage = ({ selected }) => {
//     setPageNumber(selected);
//   };
//   const displayDocuments = documents
//     .slice(pagesVisited, pagesVisited + documentsPerPage)
//     .map((document) => {
//       return (
//         <div>
//           {document.monhoc_id.toString() === monhoc_id.toString() ? (
//             <DocumentItem document={document} />
//           ) : (
//             ""
//           )}
//         </div>
//       );
//     });
//   useEffect(() => {
//     const fetchDocuments = async () => {
//       const res = await axios.get("http://localhost:3002/tailieu");

//       const filteredDocuments = res.data.filter(
//         (doc) =>
//           doc.monhoc_id.toString() === monhoc_id &&
//           doc.monhoc_monchung.toString() === "1"
//       );
//       setDocuments(filteredDocuments);
//     };
//     fetchDocuments();
//   }, [monhoc_id]);

//   return (
//     <div className="p-5">
//       {documents.length !== 0 ? (
//         <div className="w-full flex-col justify-center grid xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 px-10">
//           {displayDocuments}
//         </div>
//       ) : (
//         <div className="w-full flex justify-center items-center h-[500px] text-xl">
//           <span>Xin lỗi, hiện chưa có tài liệu này.</span>
//         </div>
//       )}
//       {documents.length !== 0 ? (
//         <ReactPaginate
//           previousLabel={"Trước"}
//           nextLabel={"Sau"}
//           pageCount={pageCount}
//           onPageChange={changePage}
//           containerClassName={"flex justify-center py-5 space-x-5"}
//           previousLinkClassName={"bg-gray-300 rounded-l-full px-3 py-1"}
//           nextLinkClassName={"bg-gray-300 rounded-r-full px-3 py-1"}
//           disabledClassName={"text-gray-500"}
//           activeClassName={
//             "font-bold text-white bg-blue-500 rounded-md px-3 py-1 -mt-1"
//           }
//         />
//       ) : (
//         ""
//       )}
//     </div>
//   );
// };

// export default GeneralSubjectPage;
