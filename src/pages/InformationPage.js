import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IMGPATH, SERVER } from "../constant/api";
import { Navigate } from "react-router-dom";
import axios from "axios";

function InformationPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [matkhaucu, setMatKhauCu] = useState("");
  const [matkhaumoi, setMatKhauMoi] = useState("");
  const [matkhaumoi2, setMatKhauMoi2] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPassword2, setShowNewPassword2] = useState(false);
  const toggleShowOldPassword = () => setShowOldPassword(!showOldPassword);
  const toggleShowNewPassword = () => setShowNewPassword(!showNewPassword);
  const toggleShowNewPassword2 = () => setShowNewPassword2(!showNewPassword2);
  const [khoaOpt, setKhoaOpt] = useState([]);
  const [nienkhoaOpt, setNienKhoaOpt] = useState([]);
  const { username } = useParams();
  const [nguoidung_matkhau, setnguoidung_matkhau] = useState(
    localStorage.getItem("nguoidung_matkhau") || null
  );
  const handleEditSubmit = (event) => {
    event.preventDefault();
    const editUser = {
      ...user,
      nguoidung_matkhau: nguoidung_matkhau,
    };
    fetch(`http://localhost:3002/nguoidung/${username}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editUser),
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(editUser);
        alert("Cập nhật thông tin thành công");
      })
      .catch((error) => console.error(error));
  };
  const handleChangePasswordSubmit = (event) => {
    event.preventDefault();
    if (nguoidung_matkhau !== matkhaucu) {
      alert("Sai mật khẩu cũ !");
    } else if (matkhaumoi !== matkhaumoi2) {
      alert("Mật khẩu xác nhận không đúng !");
    } else {
      const editUser = {
        ...user,
        nguoidung_matkhau: matkhaumoi,
      };

      fetch(`http://localhost:3002/nguoidung/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser),
      })
        .then((response) => response.json())
        .then((data) => {
          setUser(editUser);
          setnguoidung_matkhau(matkhaumoi);
          localStorage.setItem("nguoidung_matkhau", matkhaumoi);
          alert("Đổi mật khẩu thành công");
          setMatKhauCu("");
          setMatKhauMoi("");
          setMatKhauMoi2("");
        })
        .catch((error) => console.error(error));
    }
  };
  const [userAvatar, setUserAvatar] = useState("");
  const [fileAvatar, setFileAvatar] = useState(null);
  const handleChangeAvatarSubmit = async () => {
    const formData = new FormData();
    const currentDate = new Date().toLocaleString();

    const fileName = user.nguoidung_tennguoidung + currentDate;
    formData.append("file", fileAvatar);
    const fileUploadResponse = await uploadFile(formData);
    const editUser = {
      ...user,
      nguoidung_matkhau: nguoidung_matkhau,
      nguoidung_anhdaidien: fileUploadResponse.url,
    };
    try {
      const rs = await fetch(`http://localhost:3002/nguoidung/${username}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editUser),
      });
      if (rs.ok) {
        setUser(editUser);
        localStorage.setItem("nguoidung_anhdaidien", fileUploadResponse.url);
      }
    } catch (error) {}
  };
  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    setFileAvatar(file);
    reader.onloadend = () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      const newAvatarSrc = "data:image/png;base64," + base64String;
      setUserAvatar(newAvatarSrc); // set the new avatar source in the component state
    };

    reader.readAsDataURL(file);
  };

  const uploadFile = async (formData) => {
    const response = await fetch("http://localhost:3002/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to upload file.");
    }

    const data = await response.json();
    return data;
  };

  useEffect(() => {
    fetch(`http://localhost:3002/nguoidung/${username}`)
      .then((response) => response.json())
      .then((data) => {
        if (
          localStorage.getItem("nguoidung_tennguoidung") !==
          data.nguoidung_tennguoidung
        ) {
          navigate("/404");
        }
        setUser(data);
      })
      .catch((error) => console.error(error));

    const fetchKhoa = async () => {
      const rs = await axios.get("http://localhost:3002/khoa");
      if (rs.data) {
        setKhoaOpt(rs.data);
      }
    };
    fetchKhoa();
    const fetchNienKhoa = async () => {
      const rs = await axios.get("http://localhost:3002/nienkhoa");
      if (rs.data) {
        setNienKhoaOpt(rs.data);
      }
    };
    fetchNienKhoa();
  }, [username]);

  return (
    <div className="flex flex-col items-center justify-center h-full bg-gray-100">
      {user ? (
        <div className="flex justify-between space-x-5 py-10 bg-white rounded-lg shadow-lg my-5">
          <div className="flex">
            <form onSubmit={handleChangeAvatarSubmit}>
              <div className="flex flex-col justify-center items-center">
                <div className="w-64 h-64 relative cursor-pointer group">
                  <img
                    className="w-64 h-64 object-cover my-2 ml-5"
                    src={
                      userAvatar
                        ? userAvatar
                        : SERVER + IMGPATH + user.nguoidung_anhdaidien
                    }
                    alt="avatar"
                  />
                  <div className="w-64 h-64 flex justify-center items-center absolute top-0 left-0 my-2 ml-5 group-hover:bg-gray-400 group-hover:bg-opacity-30">
                    <input
                      type="file"
                      id="avatar-upload"
                      accept="image/jpeg,image/png"
                      className="hidden"
                      onChange={(e) => {
                        handleImageUpload(e);
                      }}
                    />

                    <svg
                      className="group-hover:opacity-100 group-hover:block hidden"
                      onClick={() => {
                        document.getElementById("avatar-upload").click();
                      }}
                      xmlns="http://www.w3.org/2000/svg"
                      version="1.0"
                      width="24"
                      height="24"
                      viewBox="0 0 1280.000000 984.000000"
                      preserveAspectRatio="xMidYMid meet"
                    >
                      <g
                        transform="translate(0.000000,984.000000) scale(0.100000,-0.100000)"
                        fill="#000000"
                        stroke="none"
                      >
                        <path d="M4790 9830 c-238 -42 -424 -193 -600 -490 -37 -63 -220 -420 -406 -792 l-339 -677 -1085 -3 c-1079 -3 -1085 -3 -1183 -25 -306 -70 -526 -190 -743 -407 -216 -216 -339 -443 -406 -749 l-23 -102 0 -2640 c0 -2505 1 -2645 18 -2735 60 -313 218 -600 449 -815 205 -190 463 -319 743 -371 97 -18 260 -19 5185 -19 4925 0 5088 1 5185 19 303 56 562 193 780 411 216 216 354 477 412 777 17 88 18 235 18 2733 l0 2640 -23 102 c-67 305 -191 533 -406 749 -217 217 -437 337 -743 407 -98 22 -104 22 -1183 25 l-1085 3 -339 677 c-186 372 -363 720 -394 772 -160 275 -312 418 -519 488 l-78 27 -1595 1 c-877 1 -1615 -2 -1640 -6z m-3224 -2951 c87 -16 176 -63 248 -129 203 -190 207 -500 10 -698 -111 -111 -269 -165 -416 -142 -244 37 -419 239 -419 483 -1 95 11 148 51 227 56 110 156 197 275 238 95 34 155 39 251 21z m5199 -14 c865 -110 1617 -579 2101 -1307 321 -482 484 -1030 484 -1623 0 -362 -55 -678 -176 -1013 -278 -767 -895 -1408 -1653 -1717 -369 -150 -714 -217 -1121 -217 -553 0 -1044 134 -1518 416 -268 159 -558 409 -765 659 -355 427 -585 971 -652 1543 -20 168 -19 491 0 659 79 677 374 1286 855 1765 506 504 1169 802 1900 854 106 7 426 -4 545 -19z" />
                        <path d="M6230 5404 c-158 -19 -348 -78 -495 -151 -535 -269 -859 -847 -806 -1436 61 -675 536 -1200 1206 -1333 125 -25 405 -25 530 0 467 93 847 378 1055 793 121 243 174 517 150 778 -59 656 -507 1170 -1150 1321 -85 21 -138 26 -280 29 -96 2 -191 1 -210 -1z" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="bg-gray-50 w-full ml-10 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse justify-center pt-5">
                  <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto space-x-4">
                    <button
                      type="submit"
                      className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-400 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                    >
                      Thay đổi ảnh đại diện
                    </button>
                  </span>
                </div>
              </div>
            </form>
            <div className="h-full border w-[1px] ml-10 mr-5"></div>
          </div>

          <div className="flex space-x-5 ">
            <form onSubmit={handleEditSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4  shadow-lg">
                <h2
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Thông tin cá nhân
                </h2>
                <div className="mt-4 hidden">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="nguoidung_matkhau"
                  >
                    Mật khẩu
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nguoidung_matkhau"
                    type="text"
                    value={nguoidung_matkhau}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        nguoidung_matkhau: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="mt-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="nguoidung_hoten"
                  >
                    Họ tên
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nguoidung_hoten"
                    type="text"
                    value={user.nguoidung_hoten}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        nguoidung_hoten: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="nguoidung_gioitinh"
                  >
                    Giới tính
                  </label>
                  <input
                    className="hidden shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nguoidung_gioitinh"
                    type="text"
                    value={user.nguoidung_gioitinh}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        nguoidung_gioitinh: e.target.value,
                      })
                    }
                  />
                  {"Nam "}
                  <input
                    checked={user.nguoidung_gioitinh === "nam"}
                    type="checkbox"
                    value={"nam"}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        nguoidung_gioitinh: e.target.value,
                      })
                    }
                  />
                  {" Nữ "}
                  <input
                    checked={user.nguoidung_gioitinh === "nữ"}
                    type="checkbox"
                    value={"nữ"}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        nguoidung_gioitinh: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="nguoidung_ngaysinh"
                  >
                    Ngày sinh
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nguoidung_ngaysinh"
                    type="text"
                    value={user.nguoidung_ngaysinh}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        nguoidung_ngaysinh: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="nguoidung_mail"
                  >
                    Địa chỉ email
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nguoidung_mail"
                    type="text"
                    value={user.nguoidung_mail}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        nguoidung_mail: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="khoa_ten"
                  >
                    Khoa
                  </label>
                  <select
                    onChange={(e) =>
                      setUser({
                        ...user,
                        khoa_id: e.target.value,
                      })
                    }
                    value={user.khoa_id}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >
                    {khoaOpt.map((khoa, index) => {
                      if (user.khoa_id === khoa.khoa_id) {
                        return (
                          <option value={khoa.khoa_id} key={index} selected>
                            {khoa.khoa_ten}
                          </option>
                        );
                      } else {
                        return (
                          <option value={khoa.khoa_id} key={index}>
                            {khoa.khoa_ten}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="mt-4">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="nienkhoa_ten"
                  >
                    Niên khoá
                  </label>
                  <select
                    onChange={(e) =>
                      setUser({
                        ...user,
                        nienkhoa_id: e.target.value,
                      })
                    }
                    value={user.nienkhoa_id}
                    className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  >

                    {nienkhoaOpt.map((nienkhoa, index) => {
                      if (user.nienkhoa_id === nienkhoa.nienkhoa_id) {
                        return (
                          <option
                            value={nienkhoa.nienkhoa_id}
                            key={index}
                            selected
                          >
                            {nienkhoa.nienkhoa_ten}
                          </option>
                        );
                      } else {
                        return (
                          <option value={nienkhoa.nienkhoa_id} key={index}>
                            {nienkhoa.nienkhoa_ten}
                          </option>
                        );
                      }
                    })}
                  </select>
                </div>
                <div className="mt-4 hidden">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="nguoidung_anhdaidien"
                  >
                    Ảnh đại diện
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nguoidung_anhdaidien"
                    type="text"
                    value={user.nguoidung_anhdaidien}
                    onChange={(e) =>
                      setUser({
                        ...user,
                        nguoidung_anhdaidien: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto space-x-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-400 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Cập nhật thông tin
                  </button>
                </span>
              </div>
            </form>
            <form onSubmit={handleChangePasswordSubmit}>
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4  shadow-lg">
                <h2
                  className="text-lg leading-6 font-medium text-gray-900"
                  id="modal-headline"
                >
                  Đổi mật khẩu
                </h2>
                <div className="mt-4 hidden">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="nguoidung_matkhau"
                  >
                    Mật khẩu
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="nguoidung_matkhau"
                    type="text"
                    value={nguoidung_matkhau}
                  />
                </div>
                <div className="mt-4 relative">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="matkhaucu"
                  >
                    Mật khẩu cũ
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="matkhaucu"
                    type={showOldPassword ? "text" : "password"}
                    value={matkhaucu}
                    onChange={(e) => setMatKhauCu(e.target.value)}
                  />
                  <span
                    className="absolute inset-y-0 right-2 top-9 flex items-center cursor-pointer"
                    onClick={() => setShowOldPassword(!showOldPassword)}
                  >
                    {showOldPassword ? (
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10V7a5 5 0 0110 0v3"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <div className="mt-4 relative">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="matkhaumoi"
                  >
                    Mật khẩu mới
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="matkhaumoi"
                    type={showNewPassword ? "text" : "password"}
                    value={matkhaumoi}
                    onChange={(e) => setMatKhauMoi(e.target.value)}
                  />
                  <span
                    className="absolute inset-y-0 right-2 top-9 flex items-center cursor-pointer"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10V7a5 5 0 0110 0v3"
                        />
                      </svg>
                    )}
                  </span>
                </div>
                <div className="mt-4 relative">
                  <label
                    className="block text-gray-700 font-semibold mb-2"
                    htmlFor="matkhaumoi2"
                  >
                    Nhập lại mật khẩu
                  </label>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="matkhaumoi2"
                    type={showNewPassword2 ? "text" : "password"}
                    value={matkhaumoi2}
                    onChange={(e) => setMatKhauMoi2(e.target.value)}
                  />
                  <span
                    className="absolute inset-y-0 right-2 top-9 flex items-center cursor-pointer"
                    onClick={() => setShowNewPassword2(!showNewPassword2)}
                  >
                    {showNewPassword2 ? (
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="h-6 w-6 text-gray-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M8 10V7a5 5 0 0110 0v3"
                        />
                      </svg>
                    )}
                  </span>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto space-x-4">
                  <button
                    type="submit"
                    className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-400 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
                  >
                    Đổi mật khẩu
                  </button>
                </span>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <div className="text-gray-500">
          <div role="status">
            <svg
              aria-hidden="true"
              class="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default InformationPage;
