import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function ForgetPasswordPage() {
  const [email, setemail] = useState("");
  const [username, setusername] = useState();
  const handleForgotPassword = async (e) => {
    try {
      const response = await axios.post(
        "http://localhost:3002/forgot-password/",
        {
          email: email,
          username: username,
        }
      );
      alert("Đã gửi mail, hãy kiểm tra mail của bạn!");
    } catch (error) {
      alert("Có lỗi xảy ra !");
    }
  };
  return (
    <div className="left-0 top-0 z-20 w-full h-full fixed">
      <div className="h-screen bg-white flex flex-col justify-center sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md flex">
          <span className="mt-8 ml-2 text-center text-2xl font-extrabold text-gray-900">
            Nhập địa chỉ mail của bạn !
          </span>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-gray-200 py-8 px-4 shadow sm:rounded-lg sm:px-10">
            <form
              className="space-y-6"
              onSubmit={(e) => handleForgotPassword(e)}
            >
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-700"
                >
                  Tên người dùng
                </label>
                <div className="mt-1">
                  <input
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    required
                    value={username}
                    onChange={(event) => setusername(event.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Địa chỉ mail
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(event) => setemail(event.target.value)}
                    className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-400 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Xác nhận
                </button>
              </div>
            </form>
            <Link className="text-[#3f85f5] hover:underline" to={"/home"}>
              Trở về trang chủ
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPasswordPage;
