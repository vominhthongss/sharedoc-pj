import { Link, useParams } from "react-router-dom";
import { Menu } from "@headlessui/react";
import Dropdown from "./Dropdown";
import UserMenu from "./UserMenu";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
/* eslint-disable array-callback-return */
function Navigation(props) {
  const [currentNav, setCurrentNav] = useState("");
  const [khoas, setKhoaList] = useState([]);
  const [keyword, setKeyword] = useState("");
  const handleInputChange = (event) => {
    setKeyword(event.target.value);
  };
  const navigate = useNavigate();
  const handleKeyDown = (event) => {
    if (event.keyCode === 13) {
      if (keyword !== "") {
        fetch("http://localhost:3002/tukhoa", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ tukhoa_noidung: keyword }),
        })
          .then((response) => {})
          .catch((error) => {});
        navigate(`/search/${keyword}`);
      }
    }
  };
  const handleSearch = (event) => {
    event.preventDefault();

    if (keyword !== "") {
      fetch("http://localhost:3002/tukhoa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ tukhoa_noidung: keyword }),
      })
        .then((response) => {})
        .catch((error) => {});
      navigate(`/search/${keyword}`);
    }
  };

  const handleClearKeyword = () => {
    setKeyword("");
  };
  const [tukhoas, settukhoas] = useState([]);
  const keywordList = tukhoas.map((keyword) => {
    return (
      <button
        key={keyword.tukhoa_noidung}
        onClick={(e) => {
          setKeyword(keyword.tukhoa_noidung);
          handleSearch(e);
        }}
        className="border rounded-lg px-2 mt-2 hover:bg-[#3f85f5] w-fit hover:scale-125"
      >
        {keyword.tukhoa_noidung}
      </button>
    );
  });

  const Dropdown = () => {
    const list = khoas.map((khoa) => {
      return (
        <Menu.Item key={khoa.khoa_id}>
          {({ active }) => (
            <Link
              onClick={() => setCurrentNav("Các khoa")}
              to={"department/" + khoa.khoa_id + "/Tất cả"}
              className={`${
                active ? "bg-[#3f85f5] text-white" : "text-gray-900"
              } block px-4 py-2`}
            >
              {khoa.khoa_ten}
            </Link>
          )}
        </Menu.Item>
      );
    });

    return (
      <Menu className="z-20">
        <div className="">
          <Menu.Button
            className={`${
              currentNav === "Các khoa" ? "bg-blue-700" : "bg-[#3f85f5]"
            } p-3  cursor-pointer text-white font-bold`}
          >
            Các khoa
          </Menu.Button>
          <Menu.Items className="p-2 absolute left-0 right-0 w-full h-fit max-h-[400px] overflow-y-auto bg-[#3f85f5]  rounded-md shadow-lg focus:outline-none grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2">
            {list}
          </Menu.Items>
        </div>
      </Menu>
    );
  };

  useEffect(() => {
    const fetchKhoaList = async () => {
      const res = await axios.get("http://localhost:3002/khoa");
      setKhoaList(res.data);
    };
    fetchKhoaList();

    const fetchTuKhoaList = async () => {
      const res = await axios.get("http://localhost:3002/tukhoa");
      const tukhoas = [];
      res.data.forEach((element) => {
        tukhoas.push(element);
      });
      settukhoas(tukhoas);
    };
    fetchTuKhoaList();
  }, []);
  return (
    <div className=" flex flex-col justify-center items-center">
      <img className="absolute top-0 w-full -z-10" src="/header.jpg" alt="" />
      <div className="flex w-full">
        <div className="h-36 w-36 ml-10">
          <img src="/logo.png" alt="Logo" className="w-full h-full" />
        </div>
        <div className="w-full justify-center items-center flex flex-col space-x-2 mt-6 pr-4">
          <div className="flex justify-between items-center  relative w-96 ">
            <svg
              className="absolute left-2 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M9 3a6 6 0 015.196 8.91l4.387 4.386a1 1 0 01-1.414 1.414l-4.386-4.387A6 6 0 119 3zm0 2a4 4 0 100 8 4 4 0 000-8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="w-full h-8 rounded-l-lg pl-8 border-2 border-blue-400 border-solid"
              value={keyword}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder="Tìm tài liệu tại đây..."
            />
            <button
              onClick={handleSearch}
              className="w-26 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r-lg text-[12px]"
            >
              Tìm
            </button>

            {keyword !== "" ? (
              <svg
                onClick={handleClearKeyword}
                className="absolute right-14 h-5 w-5 cursor-pointer"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M6.293 6.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 011.414 1.414L11.414 10l2.293 2.293a1 1 0 01-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 01-1.414-1.414L8.586 10 6.293 7.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              ""
            )}
          </div>
        </div>
        <div className="mr-10 flex items-center">
          <UserMenu />
        </div>
      </div>
      <div className="flex space-x-2 p-1 text-xl bg-[#3f85f5] w-full justify-start pl-36 z-10">
        <Link
          onClick={() => {
            setCurrentNav("Trang chủ");
            localStorage.removeItem("index");
          }}
          to="/home"
          className="bg-[#3f85f5] p-3 text-white font-bold cursor-pointer"
        >
          Trang chủ
        </Link>

        {/* <Dropdown></Dropdown> */}
        <Link
          onClick={() => {
            setCurrentNav("Các khoa");
            localStorage.setItem("index", "Các khoa");
          }}
          to={"department/" + localStorage.getItem("khoa_id") + "/Các khoa"}
          className={`${
            localStorage.getItem("index") === "Các khoa"
              ? "bg-blue-700"
              : "bg-[#3f85f5]"
          } text-white font-bold block px-4 py-2 mt-1`}
        >
          Các khoa
        </Link>
        <Link
          onClick={() => {
            setCurrentNav("Đề thi");
            localStorage.setItem("index", "Đề thi");
          }}
          to={"department/" + localStorage.getItem("khoa_id") + "/Đề thi"}
          className={`${
            localStorage.getItem("index") === "Đề thi"
              ? "bg-blue-700"
              : "bg-[#3f85f5]"
          } text-white font-bold block px-4 py-2 mt-1`}
        >
          Đề thi
        </Link>
        <Link
          onClick={() => {
            setCurrentNav("Bài giảng");
            localStorage.setItem("index", "Bài giảng");
          }}
          to={"department/" + localStorage.getItem("khoa_id") + "/Bài giảng"}
          className={`${
            localStorage.getItem("index") === "Bài giảng"
              ? "bg-blue-700"
              : "bg-[#3f85f5]"
          } text-white font-bold block px-4 py-2 mt-1`}
        >
          Bài giảng
        </Link>
        <Link
          onClick={() => {
            setCurrentNav("Đề cương");
            localStorage.setItem("index", "Đề cương");
          }}
          to={"department/" + localStorage.getItem("khoa_id") + "/Đề cương"}
          className={`${
            localStorage.getItem("index") === "Đề cương"
              ? "bg-blue-700"
              : "bg-[#3f85f5]"
          } text-white font-bold block px-4 py-2 mt-1`}
        >
          Đề cương
        </Link>
        <Link
          onClick={() => {
            setCurrentNav("Báo cáo");
            localStorage.setItem("index", "Báo cáo");
          }}
          to={"department/" + localStorage.getItem("khoa_id") + "/Báo cáo"}
          className={`${
            localStorage.getItem("index") === "Báo cáo"
              ? "bg-blue-700"
              : "bg-[#3f85f5]"
          } text-white font-bold block px-4 py-2 mt-1`}
        >
          Báo cáo
        </Link>
        <Link
          onClick={() => {
            setCurrentNav("Giáo trình");
            localStorage.setItem("index", "Giáo trình");
          }}
          to={"department/" + localStorage.getItem("khoa_id") + "/Giáo trình"}
          className={`${
            localStorage.getItem("index") === "Giáo trình"
              ? "bg-blue-700"
              : "bg-[#3f85f5]"
          } text-white font-bold block px-4 py-2 mt-1`}
        >
          Giáo trình
        </Link>
        {/* <Dropdown title="Đề thi" list={khoas} />
        <Dropdown title="Bài giảng" list={khoas} />
        <Dropdown title="Đề cương" list={khoas} />
        <Dropdown title="Báo cáo" list={khoas} />
        <Dropdown title="Giáo trình" list={khoas} /> */}
      </div>
    </div>
  );
}

export default Navigation;
