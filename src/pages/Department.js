/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { IMGPATH, SERVER } from "../constant/api";
import "../App";
import DropdownSubject from "../components/DropdownSubject";
import DropdownYear from "../components/DropdownYear";

const DepartmentPage = () => {
  const [monhocchon, setMonhocchon] = useState("Tất cả");

  const setMonhoc = (monhoc) => {
    setMonhocchon(monhoc);
  };
  const [namchon, setNamchon] = useState("Tất cả");

  const setNam = (nam) => {
    setNamchon(nam);
  };
  const { khoa_id, loaitailieu_ten } = useParams();
  const [documents, setDocuments] = useState([]);
  const [tops, setTops] = useState([]);
  const [department, setDepartment] = useState({});
  const [departments, setDepartments] = useState([]);
  const [monhocs, setMonhocs] = useState([]);


  const [documentsPerPage] = useState(10);
  const [pageNumber, setPageNumber] = useState(0);

  const pagesVisited = pageNumber * documentsPerPage;
  const pageCount = Math.ceil(documents.length / documentsPerPage);
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
  const updateTraffic = async (tailieu_id) => {
    const res = await axios.put(
      `http://localhost:3002/truycaptailieu/${tailieu_id}`
    );
  };
  const DocumentItem = (props) => {
    return (
      <div className="w-full pr-20 py-1 cursor-pointer ">
        <Link
          onClick={() => updateTraffic(props.tailieu.tailieu_id)}
          className="hover:text-[#3f85f5] text-[24px] font-semibold"
          to={`/documentdetail/${props.tailieu.tailieu_id}`}
        >
          <div class="block w-full overflow-hidden truncate-2-lines">
            {props.tailieu.tailieu_ten}
          </div>
        </Link>
        <div className="flex space-x-2 my-2">
          <span className="text-sm">{props.tailieu_ngaydang}</span>
          <span className="text-sm text-[#3f85f5]">
            {props.tailieu.so_binhluan} bình luận
          </span>
          <span className="text-sm">
            {props.tailieu.tailieu_truycap} lượt xem
          </span>
          <span className="text-sm">
            {props.tailieu.tailieu_taixuong} lượt download
          </span>
          <span className="text-sm">
            {props.tailieu.so_luot_thich} lượt thích
          </span>
        </div>
      </div>
    );
  };
  const displayTops = tops.map((tailieu, index) => {
    const datetime = new Date(tailieu.tailieu_ngaydang);

    const tailieu_ngaydang = datetime.toLocaleDateString();
    return (
      <DocumentItem
        key={index}
        tailieu={tailieu}
        tailieu_ngaydang={tailieu_ngaydang}
      ></DocumentItem>
    );
  });
  const displayDocuments = documents
    .slice(pagesVisited, pagesVisited + documentsPerPage)
    .map((tailieu, index) => {
      const datetime = new Date(tailieu.tailieu_ngaydang);

      const tailieu_ngaydang = datetime.toLocaleDateString();

      return (
        <DocumentItem
          key={index}
          tailieu={tailieu}
          tailieu_ngaydang={tailieu_ngaydang}
        ></DocumentItem>
      );
    });
  const leftSidebar = departments.map((khoa, index) => {
    return (
      <div>
        <Link
          onClick={() => {
            setMonhocchon("Tất cả");
            setNamchon("Tất cả");
          }}
          className="space-y-1 hover:text-[#3f85f5] text-lg"
          to={"/department/" + khoa.khoa_id + "/" + loaitailieu_ten}
        >
          {khoa.khoa_ten}
        </Link>
      </div>
    );
  });
  const [currenLoaiTaiLieu, setCurrenLoaiTaiLieu] = useState("");
  useEffect(() => {
    setCurrenLoaiTaiLieu(loaitailieu_ten);
    localStorage.setItem(
      "index",
      loaitailieu_ten === "Tất cả" ? "Các khoa" : loaitailieu_ten
    );
    if (loaitailieu_ten !== currenLoaiTaiLieu) {
      setNamchon("Tất cả");
      setMonhoc("Tất cả");
    }
    const fetchDocuments = async () => {
      const res = await axios.get("http://localhost:3002/tailieu");
      let temp = [];
      res.data.forEach((element) => {
        if (element.tailieu_trangthai === "đã duyệt") {
          if (loaitailieu_ten === "Tất cả" || loaitailieu_ten === "Các khoa") {
            if (element.khoa_id.toString() === khoa_id.toString()) {
              if (monhocchon === "Tất cả") {
                if (element.tailieu_ten.includes(namchon)) {
                  temp.push(element);
                }
                if (namchon === "Tất cả") {
                  temp.push(element);
                }
              } else {
                if (monhocchon === element.monhoc_ten) {
                  if (element.tailieu_ten.includes(namchon)) {
                    temp.push(element);
                  }
                  if (namchon === "Tất cả") {
                    temp.push(element);
                  }
                }
              }
            }
          } else {
            if (
              element.loaitailieu_ten === loaitailieu_ten &&
              element.khoa_id.toString() === khoa_id.toString()
            ) {
              if (monhocchon === "Tất cả") {
                if (element.tailieu_ten.includes(namchon)) {
                  temp.push(element);
                }
                if (namchon === "Tất cả") {
                  temp.push(element);
                }
              } else {
                if (monhocchon === element.monhoc_ten) {
                  if (element.tailieu_ten.includes(namchon)) {
                    temp.push(element);
                  }
                  if (namchon === "Tất cả") {
                    temp.push(element);
                  }
                }
              }
            }
          }
        }
      });
      setDocuments(temp);
    };
    fetchDocuments();
    const fetchTops = async () => {
      const res = await axios.get("http://localhost:3002/tailieu");
      let temp = [];
      res.data.forEach((element) => {
        if (loaitailieu_ten === "Các khoa" || loaitailieu_ten === "Tất cả") {
          if (
            element.khoa_id.toString() === khoa_id.toString() &&
            element.tailieu_trangthai === "đã duyệt" &&
            temp.length < 10
          ) {
            temp.push(element);
          }
        } else {
          if (
            element.khoa_id.toString() === khoa_id.toString() &&
            element.tailieu_trangthai === "đã duyệt" &&
            temp.length < 5
          ) {
            temp.push(element);
          }
        }
      });
      setTops(temp);
    };
    fetchTops();
    const fetchDepartment = async () => {
      const res = await axios.get("http://localhost:3002/khoa");
      setDepartments(res.data);

      res.data.forEach((element) => {
        if (element.khoa_id.toString() === khoa_id.toString()) {
          setDepartment(element);
        }
      });
    };
    fetchDepartment();

    const updateTraffic = async () => {
      const res = await axios.put(
        `http://localhost:3002/truycapkhoa/${khoa_id}`
      );
    };
    const fetchSubject = async () => {
      const res = await axios.get("http://localhost:3002/monhoc");
      let temp = [];
      res.data.forEach((element) => {
        if (element.khoa_id.toString() === khoa_id.toString()) {
          temp.push(element);
        }
      });
      setMonhocs(temp);
    };
    fetchSubject();
    updateTraffic();
  }, [khoa_id, loaitailieu_ten, monhocchon, namchon]);

  return (
    <div className="py-5 px-20 flex space-x-10">
      <div className="w-[250px] bg-[#eaece7] h-fit p-2 rounded-md space-y-2">
        <div className="w-full text-center font-bold ">Các khoa</div>
        {leftSidebar}
      </div>
      <div className="w-4/5">
        <div className="text-black">
          <div className="px-2 shadow-md bg-[#3f85f5] w-full text-white text-xl text-center flex justify-start">
            <div className="w-full flex justify-between items-center pr-7">
              <div className="flex justify-center items-center">
                <img
                  className="w-12 h-12 object-cover my-1"
                  src={SERVER + IMGPATH + department.khoa_logo}
                  alt="avatar"
                />
                <span className="ml-1 font-bold">
                  {loaitailieu_ten==='Các khoa' || loaitailieu_ten==='Tất cả' ? 'Tài liệu': loaitailieu_ten} {department.khoa_ten}
                </span>
              </div>
              <div className="flex justify-center items-center space-x-10 ">
                {loaitailieu_ten === "Đề thi" ? (
                  <DropdownYear title="Năm" setNam={setNam} />
                ) : (
                  ""
                )}
                <DropdownSubject
                  setMonhoc={setMonhoc}
                  title="Môn học"
                  monhocs={monhocs}
                  loaitailieu={loaitailieu_ten}
                />
              </div>
            </div>
          </div>
        </div>
        {documents.length !== 0 ? (
          <div className="w-full justify-start space-y-5">
            {displayDocuments}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center py-20 text-xl">
            <span>Xin lỗi, hiện chưa có tài liệu này.</span>
          </div>
        )}
        {documents.length !== 0 ? (
          <div className="justify-start flex">
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
          </div>
        ) : (
          ""
        )}
        <div className="px-2 shadow-md bg-[#eaece7] w-full text-white text-xl text-center flex justify-center">
          <div className="flex justify-center items-center w-full">
            <span className="ml-1 py-4 text-black font-bold">
              Tài liệu tìm kiếm nhiều nhất
            </span>
          </div>
        </div>
        <div className="w-full space-y-5"> {displayTops}</div>
      </div>
    </div>
  );
};

export default DepartmentPage;
