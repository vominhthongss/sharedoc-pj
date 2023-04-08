/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { IMGPATH, SERVER } from "../constant/api";
import "../../src/App";
const HomePage = () => {
  const [documents, setDocuments] = useState([]);
  const [documentFeedsPerPage] = useState(5);
  const [pageNumber, setPageNumber] = useState(0);
  const [documentFeeds, setDocumentFeeds] = useState([]);
  const pagesFeedVisited = pageNumber * documentFeedsPerPage;
  const pageFeedsCount = Math.ceil(documentFeeds.length / documentFeedsPerPage);
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  const changePage = ({ selected }) => {
    setPageNumber(selected);
    scrollToTop();
  };
  const navigate = useNavigate();
  const [tukhoas, settukhoas] = useState([]);
  const keywordList = tukhoas.map((keyword, index) => {
    return (
      <button
        key={index}
        onClick={(e) => {
          handleSearch(e, keyword.tukhoa_noidung);
        }}
        className=" hover:underline w-fit text-[#3f85f5]"
      >
        {keyword.tukhoa_noidung}/
      </button>
    );
  });
  const updateTraffic = async (tailieu_id) => {
    const res = await axios.put(
      `http://localhost:3002/truycaptailieu/${tailieu_id}`
    );
  };
  const handleSearch = (event, keyword) => {
    event.preventDefault();

    if (keyword !== "") {
      fetch("http://localhost:3002/tukhoa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tukhoa_noidung: keyword }),
      })
        .then((response) => {
          // handle response
        })
        .catch((error) => {
          // handle error
        });
      navigate(`/search/${keyword}`);
    }
  };
  const displayDocumentFeeds = documentFeeds
    .slice(pagesFeedVisited, pagesFeedVisited + documentFeedsPerPage)
    .map((documentFeed, index) => {
      return (
        <div key={index} className="flex-col mb-2">
          <div className="w-full flex start">
            <div className="w-full px-[155px]">
              <div className="px-2 shadow-md bg-[#3f85f5] text-white text-xl text-center flex justify-between">
                <div className="flex justify-start items-center">
                  <img
                    className="w-12 h-12 object-cover my-1"
                    src={SERVER + IMGPATH + documentFeed.khoa.khoa_logo}
                    alt="avatar"
                  />

                  <Link
                    to={"/department/" + documentFeed.khoa.khoa_id + "/Tất cả"}
                    className="ml-1"
                  >
                    {documentFeed.khoa.khoa_ten}
                  </Link>
                </div>

                <div className="space-x-5 flex justify-end items-center">
                  <Link
                    onClick={() => {
                      localStorage.setItem("index", "Bài giảng");
                    }}
                    to={
                      "/department/" + documentFeed.khoa.khoa_id + "/Bài giảng"
                    }
                  >
                    Bài giảng
                  </Link>
                  <Link
                    onClick={() => {
                      localStorage.setItem("index", "Đề thi");
                    }}
                    to={"/department/" + documentFeed.khoa.khoa_id + "/Đề thi"}
                  >
                    Đề thi
                  </Link>
                  <Link
                    onClick={() => {
                      localStorage.setItem("index", "Đề cương");
                    }}
                    to={
                      "/department/" + documentFeed.khoa.khoa_id + "/Đề cương"
                    }
                  >
                    Đề cương
                  </Link>
                  <Link
                    onClick={() => {
                      localStorage.setItem("index", "Giáo trình");
                    }}
                    to={
                      "/department/" + documentFeed.khoa.khoa_id + "/Giáo trình"
                    }
                  >
                    Giáo trình
                  </Link>
                  <Link
                    onClick={() => {
                      localStorage.setItem("index", "Báo cáo");
                    }}
                    to={"/department/" + documentFeed.khoa.khoa_id + "/Báo cáo"}
                  >
                    Báo cáo
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full ">
            <div className="w-full px-[155px] grid grid-cols-2 gap-5 my-5 ">
              {documentFeed.tailieu.map((tailieu, index) => {
                if (index < 8) {
                  const datetime = new Date(tailieu.tailieu_ngaydang);

                  const tailieu_ngaydang = datetime.toLocaleDateString();
                  return (
                    <div key={index} className="flex flex-row">
                      <div className="w-full cursor-pointer">
                        <Link
                          onClick={() => updateTraffic(tailieu.tailieu_id)}
                          className="hover:text-[#3f85f5] text-[24px] font-semibold "
                          to={`/documentdetail/${tailieu.tailieu_id}`}
                        >
                          <div class="block w-full overflow-hidden truncate-2-lines">
                            {tailieu.tailieu_ten}
                          </div>
                        </Link>
                        <div className="flex space-x-2 mt-5">
                          <span className="text-sm">{tailieu_ngaydang}</span>
                          <span className="text-sm text-[#3f85f5]">
                            {tailieu.so_binhluan} bình luận
                          </span>
                          <span className="text-sm">
                            {tailieu.tailieu_truycap} lượt xem
                          </span>
                          <span className="text-sm">
                            {tailieu.tailieu_taixuong} lượt download
                          </span>
                          <span className="text-sm">
                            {tailieu.so_luot_thich} lượt thích
                          </span>
                        </div>
                      </div>
                      <span className="text-red-500 text-sm animate-pulse font-extrabold mt-2">
                        New
                      </span>
                    </div>
                  );
                }
              })}
            </div>
          </div>
          <Link
            onClick={() => {
              localStorage.setItem("index", "Các khoa");
            }}
            to={"/department/" + documentFeed.khoa.khoa_id + "/Tất cả"}
            className="font-bold text-blue-700 animate-pulse w-full pl-[155px]"
          >
            Xem thêm
          </Link>
        </div>
      );
    });

  useEffect(() => {
    localStorage.removeItem("index");

    const fetchDocuments = async () => {
      const res = await axios.get("http://localhost:3002/tailieu");
      let temp = [];
      res.data.forEach((x) => {
        if (x.tailieu_trangthai === "đã duyệt") {
          temp.push(x);
        }
      });
      setDocuments(res.data);
    };
    fetchDocuments();

    const fetchDepartment = async () => {
      const res = await axios.get("http://localhost:3002/khoa");
      if (res.data) {
        let tempDocumentFeeds = [];
        const danhsachkhoa = res.data;
        localStorage.setItem("khoa_id", danhsachkhoa[0].khoa_id);
        danhsachkhoa.forEach((khoa) => {
          let tempTailieu = [];
          documents.forEach((tailieu) => {
            if (tailieu.khoa_id === khoa.khoa_id) {
              tempTailieu.push(tailieu);
            }
          });
          tempDocumentFeeds.push({ khoa: khoa, tailieu: tempTailieu });
        });
        setDocumentFeeds(tempDocumentFeeds);
      }
    };
    fetchDepartment();
    const fetchTuKhoaList = async () => {
      const res = await axios.get("http://localhost:3002/tukhoa");
      settukhoas(res.data);
    };
    fetchTuKhoaList();
  }, [documentFeeds]);
  return (
    <div className="py-5">
      {documentFeeds.length !== 0 ? (
        <div className="w-full">{displayDocumentFeeds}</div>
      ) : (
        <div className="w-full flex justify-center items-center h-[500px] text-xl">
          <span>Xin lỗi, hiện chưa có tài liệu này.</span>
        </div>
      )}
      <div className="w-full flex justify-start items-center py-5 px-36">
        <span className="italic font-bold mr-3">Những từ khoá phổ biến:</span>

        {keywordList}
      </div>

      {documentFeeds.length !== 0 ? (
        <ReactPaginate
          previousLabel={"Trước"}
          nextLabel={"Sau"}
          pageCount={pageFeedsCount}
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

export default HomePage;
