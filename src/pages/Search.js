/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";

const SearchPage = () => {
  const { keyword } = useParams();

  const [documents, setDocuments] = useState([]);

  const [documentsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);

  const pagesVisited = pageNumber * documentsPerPage;
  const pageCount = Math.ceil(documents.length / documentsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  const displayDocuments = documents
    .slice(pagesVisited, pagesVisited + documentsPerPage)
    .map((document, index) => {
      return (
        <div key={index} className="py-4 w-full px-5 cursor-pointer ">
          <Link
            className="hover:text-[#3f85f5] text-2xl font-semibold"
            to={`/documentdetail/${document.tailieu_id}`}
          >
            {document.tailieu_ten}
          </Link>
          <div className="flex space-x-2 my-2">
            <span className="text-sm">{document.tailieu_ngaydang}</span>
            <span className="text-sm text-[#3f85f5]">0 bình luận</span>
            <span className="text-sm">0 lượt xem</span>
            <span className="text-sm">0 lượt download</span>
          </div>
          <div>{document.tailieu_mota}</div>
        </div>
      );
    });
  useEffect(() => {
    const fetchDocuments = async () => {
      const res = await axios.get("http://localhost:3002/tailieu");
      const filteredDocuments = res.data.filter(
        (doc) =>
          (doc.khoa_ten
            .toString()
            .toLowerCase()
            .includes(keyword.toLowerCase()) ||
            doc.monhoc_ten
              .toString()
              .toLowerCase()
              .includes(keyword.toLowerCase()) ||
            doc.loaitailieu_ten.toLowerCase().includes(keyword.toLowerCase()) ||
            doc.tailieu_ten.toLowerCase().includes(keyword.toLowerCase())) &&
          doc.tailieu_trangthai === "đã duyệt"
      );
      setDocuments(filteredDocuments);
    };
    fetchDocuments();
  }, [keyword]);

  return (
    <div className="p-5">
      {documents.length !== 0 ? (
        <div className="w-full flex-col justify-center grid xl:grid-cols-2 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-5 px-10">
          {displayDocuments}
        </div>
      ) : (
        <span>Hiện chưa có tài liệu</span>
      )}
      {documents.length !== 0 ? (
        <ReactPaginate
          previousLabel={"Trước"}
          nextLabel={"Sau"}
          pageCount={pageCount}
          onPageChange={changePage}
          containerClassName={"flex justify-center py-5 space-x-5"}
          previousLinkClassName={"bg-gray-300 rounded-l-full px-3 py-1"}
          nextLinkClassName={"bg-gray-300 rounded-r-full px-3 py-1"}
          disabledClassName={"text-gray-500"}
          activeClassName={
            "font-bold text-white bg-blue-500 rounded-md px-3 py-1 -mt-1"
          }
        />
      ) : (
        ""
      )}
    </div>
  );
};

export default SearchPage;
