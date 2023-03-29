import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3002/login/", {
        nguoidung_tennguoidung: username,
        nguoidung_matkhau: password,
      });
      if (response.status === 200) {
        if (response.data.nguoidung_tennguoidung) {
          localStorage.setItem(
            "nguoidung_tennguoidung",
            response.data.nguoidung_tennguoidung
          );

          //  localStorage.setItem("nguoidung_matkhau", password);
          localStorage.setItem(
            "nguoidung_anhdaidien",
            response.data.nguoidung_anhdaidien
          );

          if (localStorage.getItem("currentDocumentId") && localStorage.getItem("currentDocumentId")!=='') {
            localStorage.setItem("numberOfDownload", 1);
            window.location.reload();
            navigate(
              "/documentdetail/" + localStorage.getItem("currentDocumentId")
            );
          } else {
            localStorage.setItem("numberOfDownload", 0);
            navigate("/home");
          }
          window.location.reload();
        } else {
          alert("Sai tên đăng nhập hoặc mật khẩu !");
        }
      }
    } catch (error) {
      alert("Sai tên đăng nhập hoặc mật khẩu !");
    }
  };
  // const [email, setemail] = useState("vominhthongss@gmail.com");
  // const handleForgotPassword = async () => {
  //   try {
  //     const response = await axios.post(
  //       "http://localhost:3002/forgot-password/",
  //       {
  //         email: email,
  //       }
  //     );
  //     if (response.status === 200) {
  //       alert("Đã gửi mail, hãy kiểm tra mail của bạn!");
  //     }
  //   } catch (error) {
  //     alert("Có lỗi xảy ra !");
  //   }
  // };
  return (
    <div className="left-0 top-0 z-20 w-full h-full fixed">
      <div className="h-screen bg-white flex flex-col justify-center sm:px-6 lg:px-8">
        <Link to={"/home"}>
          <div className="sm:mx-auto sm:w-full sm:max-w-md flex">
            <div className="h-24 w-24 ml-10">
              <img src="/logo2.png" alt="Logo" className="w-full h-full" />
            </div>
            <span className="mt-8 ml-2 text-center text-2xl font-extrabold text-gray-900">
              Đăng nhập HNUE Share
            </span>
          </div>
        </Link>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form className="space-y-6" onSubmit={handleLogin}>
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
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
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
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
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
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Đăng nhập
                </button>
              </div>
            </form>
            <div className="flex flex-col">
              <Link
                className="text-[#3f85f5] hover:underline"
                to={"/forgetpassword"}
              >
                Quên mật khẩu?
              </Link>
              <Link className="text-[#3f85f5] hover:underline" to={"/register"}>
                Đăng ký
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
