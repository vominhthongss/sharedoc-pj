/* eslint-disable react-hooks/exhaustive-deps */
import { Link, useNavigate, useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import { IMGPATH, PDFPATH, SERVER } from "../constant/api";
function DocumentDetail(props) {
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  const [nguoidung_tennguoidung, setnguoidung_tennguoidung] = useState(
    localStorage.getItem("nguoidung_tennguoidung") || ""
  );
  const navigate = useNavigate();
  const [thichs, setThichs] = useState([]);
  const [numPages, setNumPages] = useState(null);
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };
  const [doc, setDoc] = useState([]);
  const [relative, setRelative] = useState([]);
  const [newDoc, setNewDoc] = useState([]);
  const { tailieu_id } = useParams();
  const [binhluan_noidung, setBinhLuanNoiDung] = useState();
  const [binhluanList, setBinhLuanList] = useState([]);
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
  const handleComment = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:3002/binhluan/", {
      binhluan_noidung: binhluan_noidung,
      nguoidung_tennguoidung: localStorage.getItem("nguoidung_tennguoidung"),
      tailieu_id: tailieu_id,
    });
    let temp = {
      nguoidung_anhdaidien: localStorage.getItem("nguoidung_anhdaidien"),
      binhluan_noidung: binhluan_noidung,
    };
    setBinhLuanList([temp, ...binhluanList]);
    setBinhLuanNoiDung('');
  };
  const displayComments = binhluanList.map((binhluan, index) => {
    return (
      <div className="bg-blue-300 rounded-md p-1 my-5 ">
        <div className="flex space-x-2 justify-start items-center">
          <img
            className="w-12 h-12 object-cover my-2 border rounded-full "
            src={SERVER + IMGPATH + binhluan.nguoidung_anhdaidien}
            alt="avatar"
          />
          <div className="font-bold text-gray-700">
            {binhluan.nguoidung_hoten}
          </div>
        </div>
        <div className="bg-white rounded-md p-2 font-thin">
          {binhluan.binhluan_noidung}
        </div>
      </div>
    );
  });
  const updateDownload = async () => {
    const res = await axios.put(
      `http://localhost:3002/taixuongtailieu/${tailieu_id}`
    );
  };

  const [like, setlike] = useState(false);
  const relativeDocs = relative.map((tailieu, index) => {
    const datetime = new Date(tailieu.tailieu_ngaydang);

    const tailieu_ngaydang = datetime.toLocaleDateString();
    return (
      <div key={index} className="px-1">
        <Link
          to={"/documentdetail/" + tailieu.tailieu_id.toString()}
          className="hover:text-blue-500 text-lg"
        >
          {tailieu.tailieu_ten} ({tailieu_ngaydang})
        </Link>
      </div>
    );
  });
  const newDocs = newDoc.map((tailieu, index) => {
    const datetime = new Date(tailieu.tailieu_ngaydang);

    const tailieu_ngaydang = datetime.toLocaleDateString();
    return (
      <div key={index} className="px-1">
        <Link
          to={"/documentdetail/" + tailieu.tailieu_id.toString()}
          className="hover:text-blue-500 text-lg"
        >
          {tailieu.tailieu_ten} ({tailieu_ngaydang})
        </Link>
      </div>
    );
  });
  useEffect(() => {
    const fetchTuKhoaList = async () => {
      const res = await axios.get("http://localhost:3002/tukhoa");
      const tukhoas = [];
      res.data.forEach((element) => {
        if(tukhoas.length<5 && doc.tailieu_ten.toLowerCase().include(tukhoas.toLowerCase())){
          tukhoas.push(element);
        }
      });
      settukhoas(tukhoas);
    };
    fetchTuKhoaList();
    const fetchLike = async () => {
      const res = await axios.get("http://localhost:3002/thich");
      setThichs(res.data);
      res.data.forEach((element) => {
        if (
          element.tailieu_id.toString() === tailieu_id.toString() &&
          element.nguoidung_tennguoidung ===
            localStorage.getItem("nguoidung_tennguoidung")
        ) {
          setlike(true);
        }
      });
    };

    fetchLike();

    // const updateTraffic = async () => {
    //   const res = await axios.put(
    //     `http://localhost:3002/truycaptailieu/${tailieu_id}`
    //   );
    // };
    // updateTraffic();

    const fetchDocuments = async () => {
      const res = await axios.get(
        `http://localhost:3002/tailieu/${tailieu_id}`
      );
      setDoc(res.data);
    };
    fetchDocuments();

    const fetchDocLeftRight = async () => {
      const res = await axios.get(`http://localhost:3002/tailieu/`);
      let tempx = [];
      let tempy = [];
      res.data.forEach((element, index) => {
        if (
          element.monhoc_id.toString() === doc.monhoc_id.toString() &&
          element.khoa_id.toString() === doc.khoa_id.toString() &&
          tempx.length < 5
        ) {
          tempx.push(element);
        }
        if (
          element.loaitailieu_id.toString() === doc.loaitailieu_id.toString() &&
          element.khoa_id.toString() === doc.khoa_id.toString() &&
          tempy.length < 5 && element.tailieu_id.toString()!==doc.tailieu_id.toString()
        ) {
          tempy.push(element);
        }
      });
      setRelative(tempx);
      setNewDoc(tempy);
    };
    fetchDocLeftRight();

    const fetchComments = async () => {
      const res = await axios.get("http://localhost:3002/binhluan/");
      let temp = [];
      res.data.forEach((element) => {
        if (element.tailieu_id.toString() === tailieu_id.toString()) {
          temp.push(element);
        }
      });
      setBinhLuanList(temp);
    };
    fetchComments();
  }, [doc.khoa_id, doc.loaitailieu_id, doc.monhoc_id, tailieu_id]);

  const handleLike = async () => {
    const res = await axios.post("http://localhost:3002/thich/", {
      tailieu_id: tailieu_id,
      nguoidung_tennguoidung: localStorage.getItem("nguoidung_tennguoidung"),
    });
    if (res.data) {
      setlike(true);
    }
  };
  const handleUnLike = async () => {
    const res = await axios.delete(
      `http://localhost:3002/thich/${tailieu_id}/${localStorage.getItem(
        "nguoidung_tennguoidung"
      )}`
    );
    if (res.data) {
      setlike(false);
    }
  };

  const handleDownload = () => {
    if (localStorage.getItem("numberOfDownload") > 5) {
      localStorage.removeItem("nguoidung_tennguoidung");
      setnguoidung_tennguoidung(null);
      alert("Bạn đã đạt đến giới hạn tải tối đa của mình");
      navigate("/login");
    } else {
      localStorage.setItem(
        "numberOfDownload",
        parseInt(localStorage.getItem("numberOfDownload")) + 1
      );

      const pdfUrl = SERVER + PDFPATH + doc.tailieu_duongdan;
      updateDownload();
      axios({
        url: pdfUrl,
        method: "GET",
        responseType: "blob",
      }).then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${doc.tailieu_ten}.pdf`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      });
    }
  };
  return (
    <div>
      <div className="ml-2 mt-2">
        <Link to={"/home"}>Trang chủ</Link>
        {" > "}
        <Link
          onClick={localStorage.setItem("index", "Các khoa")}
          to={"/department/" + doc.khoa_id + "/Tất cả"}
        >
          {doc.khoa_ten}
        </Link>
        {" > "}
        <Link
          onClick={localStorage.setItem("index", "Các khoa")}
          to={"/department/"+doc.khoa_id+'/' + doc.loaitailieu_ten}
        >
          {doc.loaitailieu_ten}
        </Link>
        {" > "}
        <span className="font-bold">{doc.monhoc_ten}</span>
      </div>
      <div className="w-full flex justify-center items-center space-x-3">
        {nguoidung_tennguoidung ? (
          <button
            onClick={handleDownload}
            className="mt-4 w-26 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-[12px]"
          >
            Tải tài liệu xuống
          </button>
        ) : (
          <Link
            onClick={() => {
              localStorage.setItem(
                "currentDocumentId",
                doc.tailieu_id.toString()
              );
            }}
            to={"/login"}
            className="mt-4 w-26 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-[12px]"
          >
            Tải tài liệu xuống
          </Link>
        )}
      </div>
      <div className="w-full flex flex-col justify-center items-center">
        <span className="font-bold text-xl px-24 py-2 text-center">{doc.tailieu_ten}</span>
      </div>
      <div className="w-full flex flex-col justify-center items-center py-2">
        <div className="flex space-x-12">
          <div className="border bg-[#eaece7] w-64 space-y-10">
            <div className="bg-[#3f85f5] w-full text-center px-4 py-2  text-xl font-bold text-white">
              Tài liệu liên quan
            </div>
            {relativeDocs}
          </div>
          <div className="w-fit h-[700px] overflow-y-scroll border px-5 shadow-lg ">
            <Document
              className="my-5 border shadow-md"
              file={SERVER + PDFPATH + doc.tailieu_duongdan}
              onLoadSuccess={onDocumentLoadSuccess}
            >
              {Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} />
              ))}
            </Document>
          </div>
          <div className="border bg-[#eaece7] w-64 space-y-10">
            <div className="bg-[#3f85f5] w-full text-center px-4 py-2  text-xl font-bold text-white">
              Tài liệu mới nhất
            </div>
            {newDocs}
          </div>
        </div>
        <div className="w-[600px] flex justify-start items-center">
          <span>Like tài liệu:</span>
          {like === false ? (
            <button
              onClick={handleLike}
              className="p-3 hover:bg-gray-300 rounded-full ml-1 flex justify-center items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="svg-icon"
                height="16"
                width="16"
                viewBox="0 0 1024 1024"
                version="1.1"
              >
                <path d="M939.516933 410.236936H666.879976C772.478959 19.839997 591.998988 0 591.998988 0c-73.598989 0-58.239991 59.519991-63.99999 69.759989 0 191.99797-202.877968 340.476947-202.877969 340.476947v541.436915c0 53.119992 74.879988 72.319989 101.759984 72.319989h409.596936c38.399994 0 69.759989-101.119984 69.759989-101.119984 101.118984-344.957946 101.118984-447.99693 101.118985-447.99693a63.99999 63.99999 0 0 0-68.47999-63.99999z m-725.754886 0H49.922072a33.279995 33.279995 0 0 0-33.918995 33.279995l33.919995 545.916914a33.919995 33.919995 0 0 0 34.559995 34.559995h141.438978c29.439995 0 29.439995-23.039996 29.439995-23.039996V451.836929a40.319994 40.319994 0 0 0-41.599993-41.599993z" />
              </svg>
            </button>
          ) : (
            <button
              onClick={handleUnLike}
              className="p-2 hover:bg-gray-300 rounded-full ml-1 flex justify-center items-center space-x-2"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="svg-icon"
                height="16"
                width="16"
                fill="blue"
                viewBox="0 0 1024 1024"
                version="1.1"
              >
                <path d="M939.516933 410.236936H666.879976C772.478959 19.839997 591.998988 0 591.998988 0c-73.598989 0-58.239991 59.519991-63.99999 69.759989 0 191.99797-202.877968 340.476947-202.877969 340.476947v541.436915c0 53.119992 74.879988 72.319989 101.759984 72.319989h409.596936c38.399994 0 69.759989-101.119984 69.759989-101.119984 101.118984-344.957946 101.118984-447.99693 101.118985-447.99693a63.99999 63.99999 0 0 0-68.47999-63.99999z m-725.754886 0H49.922072a33.279995 33.279995 0 0 0-33.918995 33.279995l33.919995 545.916914a33.919995 33.919995 0 0 0 34.559995 34.559995h141.438978c29.439995 0 29.439995-23.039996 29.439995-23.039996V451.836929a40.319994 40.319994 0 0 0-41.599993-41.599993z" />
              </svg>
              <span className="italic text-gray-600">
                bạn đã thích tài liệu này !
              </span>
            </button>
          )}
        </div>

      </div>

      <div className="px-28 my-10 ">
        {localStorage.getItem("nguoidung_tennguoidung") ? (
          <form onSubmit={(e) => handleComment(e)} className="flex flex-col">
            <textarea
              className="border"
              cols="30"
              rows="5"
              value={binhluan_noidung}
              onChange={(e) => setBinhLuanNoiDung(e.target.value)}
            ></textarea>
            <div className="w-44">
              <button
                type="submit"
                className="mt-4 w-26 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-[12px]"
              >
                Bình luận
              </button>
            </div>
          </form>
        ) : (
          "Hãy đăng nhập để bình luận"
        )}
        <div className="my-4 font-normal text-xl">
          {binhluanList.length} bình luận
        </div>
        <div className=" max-h-[700px] overflow-y-auto">{displayComments}</div>
      </div>
    </div>
  );
}

export default DocumentDetail;
