import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
function RegisterPage() {
  const navigate = useNavigate();
  const [nguoidung_tennguoidung, setnguoidung_tennguoidung] = useState("");
  const [nguoidung_matkhau, setnguoidung_matkhau] = useState("");
  const [nguoidung_hoten, setnguoidung_hoten] = useState("");
  const [nguoidung_gioitinh, setnguoidung_gioitinh] = useState("nam");
  const [nguoidung_mail, setnguoidung_mail] = useState("");
  const [nguoidung_ngaysinh, setnguoidung_ngaysinh] = useState("");
  const [khoa_id, setkhoa_id] = useState("");
  const [nienkhoa_id, setnienkhoa_id] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [khoaOpt, setKhoaOpt] = useState([]);
  const [nienkhoaOpt, setNienKhoaOpt] = useState([]);
  const handleRegister = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/nguoidung/", {
        nguoidung_tennguoidung: nguoidung_tennguoidung,
        nguoidung_matkhau: nguoidung_matkhau,
        nguoidung_hoten: nguoidung_hoten,
        nguoidung_gioitinh: nguoidung_gioitinh,
        nguoidung_mail: nguoidung_mail,
        nguoidung_ngaysinh: nguoidung_ngaysinh,
        nguoidung_anhdaidien: "avatar1.png",
        khoa_id: khoa_id,
        nienkhoa_id: nienkhoa_id,
      });
      if (response.status === 200) {
        if (response.data.nguoidung_tennguoidung) {
          localStorage.setItem(
            "nguoidung_tennguoidung",
            response.data.nguoidung_tennguoidung
          );

          localStorage.setItem(
            "nguoidung_anhdaidien",
            response.data.nguoidung_anhdaidien
          );
          navigate("/home");
          window.location.reload();
        } else {
          alert("Đăng ký không thành công, do trùng tên đăng nhập !");
        }
      }
    } catch (error) {
      alert("Đăng ký không thành công, do trùng tên đăng nhập !");
    }
  };

  useEffect(() => {
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
  }, []);
  return (
    <div className="left-0 top-0 z-20 w-full h-full fixed">
      <div className="h-screen bg-white flex flex-col justify-center sm:px-6 lg:px-8">
        <Link to={"/home"}>
          <div className="sm:mx-auto sm:w-full sm:max-w-md flex">
            <div className="h-24 w-24 ml-10">
              <img src="/logo2.png" alt="Logo" className="w-full h-full" />
            </div>
            <span className="mt-8 ml-2 text-center text-2xl font-extrabold text-gray-900">
              Đăng ký HNUE Share
            </span>
          </div>
        </Link>
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-2" onSubmit={handleRegister}>
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên đăng nhập
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={nguoidung_tennguoidung}
                    onChange={(event) =>
                      setnguoidung_tennguoidung(event.target.value)
                    }
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Mật khẩu
                </label>
                <div className="mt-1 relative rounded-md shadow-sm">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={nguoidung_matkhau}
                    onChange={(event) =>
                      setnguoidung_matkhau(event.target.value)
                    }
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <span
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
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

              <div>
                <label
                  htmlFor="fullname"
                  className="block text-sm font-medium text-gray-700"
                >
                  Họ tên
                </label>
                <div className="mt-1">
                  <input
                    id="fullname"
                    name="fullname"
                    type="text"
                    autoComplete="fullname"
                    required
                    value={nguoidung_hoten}
                    onChange={(event) => setnguoidung_hoten(event.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="sex"
                  className="block text-sm font-medium text-gray-700"
                >
                  Giới tính
                </label>
                <div className="mt-2 -mb-1">
                  <input
                    id="sex"
                    name="sex"
                    type="text"
                    autoComplete="sex"
                    required
                    value={nguoidung_gioitinh}
                    onChange={(event) =>
                      setnguoidung_gioitinh(event.target.value)
                    }
                    className="hidden appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  {" Nam "}
                  <input
                    checked={nguoidung_gioitinh === "nam"}
                    type="checkbox"
                    value={"nam"}
                    onChange={(event) =>
                      setnguoidung_gioitinh(event.target.value)
                    }
                  />
                  {" Nữ "}
                  <input
                    checked={nguoidung_gioitinh === "nữ"}
                    type="checkbox"
                    value={"nữ"}
                    onChange={(event) =>
                      setnguoidung_gioitinh(event.target.value)
                    }
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="mail"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <div className="mt-1">
                  <input
                    id="mail"
                    name="mail"
                    type="text"
                    autoComplete="mail"
                    required
                    value={nguoidung_mail}
                    onChange={(event) => setnguoidung_mail(event.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="birthday"
                  className="block text-sm font-medium text-gray-700"
                >
                  Ngày sinh
                </label>
                <div className="mt-1">
                  <input
                    id="birthday"
                    name="birthday"
                    type="text"
                    autoComplete="birthday"
                    required
                    value={nguoidung_ngaysinh}
                    onChange={(event) =>
                      setnguoidung_ngaysinh(event.target.value)
                    }
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="khoa_ten"
                >
                  Khoa
                </label>
                <select
                  required
                  onChange={(e) => setkhoa_id(e.target.value)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled selected>
                    Chọn khoa
                  </option>
                  {khoaOpt.map((khoa, index) => {
                    return (
                      <option value={khoa.khoa_id} key={index}>
                        {khoa.khoa_ten}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <label
                  className="block text-gray-700 font-semibold mb-2"
                  htmlFor="nienkhoa_ten"
                >
                  Niên khoá
                </label>
                <select
                  required
                  onChange={(e) => setnienkhoa_id(e.target.value)}
                  className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="" disabled selected>
                    Chọn niên khoá
                  </option>
                  {nienkhoaOpt.map((nienkhoa, index) => {
                    return (
                      <option value={nienkhoa.nienkhoa_id} key={index}>
                        {nienkhoa.nienkhoa_ten}
                      </option>
                    );
                  })}
                </select>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Đăng ký
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
