// /* eslint-disable react-hooks/exhaustive-deps */
// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";
// import DocumentItem from "../components/DocumentItem";
// import ReactPaginate from "react-paginate";
// import axios from "axios";
// import { Link } from "react-router-dom";

// const SubjectDepartmentPage = () => {
//   const { khoa_id, monhoc_id, loaitailieu_ten } = useParams();
//   const [select_loaitailieu_ten, setselect_loaitailieu_ten] =
//     useState(loaitailieu_ten);

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
//         <div
//           key={document.tailieu_id}
//           className="py-4 border w-96 px-5 cursor-pointer shadow-lg rounded-lg hover:bg-blue-400 hover:text-white"
//         >
//           <Link to={"/documentdetail/" + document.tailieu_id}>
//             <span className="text-xl font-bold hover:underline">
//               {document.tailieu_ten}
//             </span>
//           </Link>
//           <p className="mt-4">{document.tailieu_mota}</p>
//           <p className="text-sm mt-2">
//             Loại tài liệu: {document.loaitailieu_ten}
//           </p>
//           <p className="text-sm mt-2">Thuộc khoa: {document.khoa_ten}</p>
//         </div>
//       );
//     });

//   const handleSelectChange = (event) => {
//     const value = event.target.value;
//     setselect_loaitailieu_ten(value);
//   };

//   useEffect(() => {
//     const fetchDocuments = async () => {
//       const res = await axios.get("http://localhost:3002/tailieu");
//       if (
//         select_loaitailieu_ten === "" ||
//         select_loaitailieu_ten === "Các khoa" ||
//         select_loaitailieu_ten === "Các môn chung"
//       ) {
//         const filteredDocuments = res.data.filter(
//           (doc) =>
//             doc.khoa_id.toString() === khoa_id.toString() &&
//             doc.monhoc_id.toString() === monhoc_id.toString()
//         );
//         setDocuments(filteredDocuments);
//       } else {
//         const filteredDocuments = res.data.filter(
//           (doc) =>
//             doc.khoa_id.toString() === khoa_id.toString() &&
//             doc.monhoc_id.toString() === monhoc_id.toString() &&
//             doc.loaitailieu_ten === select_loaitailieu_ten
//         );
//         setDocuments(filteredDocuments);
//       }
//     };
//     fetchDocuments();
//   }, [khoa_id, monhoc_id, select_loaitailieu_ten]);

//   return (
//     <div className="p-5">
//       <select
//         className="ml-10 mb-2 border rounded-lg"
//         onChange={handleSelectChange}
//         value={select_loaitailieu_ten}
//       >
//         <option value="">Tất cả</option>
//         <option value="Đề thi">Đề thi</option>
//         <option value="Bài giảng">Bài giảng</option>
//         <option value="Đề cương">Đề cương</option>
//         <option value="Báo cáo">Báo cáo</option>
//         <option value="Giáo trình">Giáo trình</option>
//       </select>
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

// export default SubjectDepartmentPage;
