import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IMGPATH, SERVER } from "../constant/api";
function UserMenu(props) {
  const navigate = useNavigate();

  const [nguoidung_tennguoidung, setnguoidung_tennguoidung] = useState(
    localStorage.getItem("nguoidung_tennguoidung") || null
  );

  const handleLogout = () => {
    localStorage.removeItem("nguoidung_tennguoidung");
    localStorage.removeItem("currentDocumentId");
    setnguoidung_tennguoidung(null);
  };

  useEffect(() => {}, []);
  return (
    <div className="w-26">
      {nguoidung_tennguoidung ? (
        <Menu className="z-20 w-26">
          <div className="relative">
            <Menu.Button
              className=""
              onClick={localStorage.removeItem("index")}
            >
              <div className="flex justify-center items-center group">
                <span className="hover:underline group-hover:text-[#3f85f5]">
                  {nguoidung_tennguoidung}
                </span>
                <img
                  className="w-12 h-12 object-cover my-2 ml-5 border rounded-full group-hover:border-blue-500"
                  src={
                    SERVER +
                    IMGPATH +
                    localStorage.getItem("nguoidung_anhdaidien")
                  }
                  alt="avatar"
                />
              </div>
            </Menu.Button>
            <Menu.Items className="absolute -ml-10 w-44 py-2 mt-2 bg-white border rounded-md shadow-lg focus:outline-none">
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`/information/${nguoidung_tennguoidung}`}
                    className={`${
                      active ? "bg-blue-400 text-white" : "text-gray-900"
                    } block px-4 py-2`}
                  >
                    Thông tin cá nhân
                  </Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link
                    to={`/uploaddocument`}
                    className={`${
                      active ? "bg-blue-400 text-white" : "text-gray-900"
                    } block px-4 py-2`}
                  >
                    Upload tài liệu
                  </Link>
                )}
              </Menu.Item>

              <Menu.Item>
                {({ active }) => (
                  <Link
                    onClick={handleLogout}
                    to={"/home"}
                    className={`${
                      active ? "bg-blue-400 text-white" : "text-gray-900"
                    } block px-4 py-2`}
                  >
                    Đăng xuất
                  </Link>
                )}
              </Menu.Item>
            </Menu.Items>
          </div>
        </Menu>
      ) : (
        <button
          className="w-[100px] hover:underline hover:text-[#3f85f5]"
          onClick={() => {
            //   setIsShowLogin(true);
            navigate("/login");
          }}
        >
          Đăng nhập
        </button>
      )}

      {/* {isShowLogin ? (
        <div className="left-0 top-0 z-20 w-full h-full fixed">
          <div className="h-screen bg-white flex flex-col justify-center sm:px-6 lg:px-8">
            <button
              onClick={() => {
                setIsShowLogin(false);
              }}
              className="absolute right-3 top-3"
            >
              Đóng
            </button>
            <div className="sm:mx-auto sm:w-full sm:max-w-md flex">
              <div className="h-24 w-24 ml-10">
                <img src="/logo2.png" alt="Logo" className="w-full h-full" />
              </div>
              <span className="mt-8 ml-2 text-center text-2xl font-extrabold text-gray-900">
                Đăng nhập HNUE Share
              </span>
            </div>

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
              </div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )} */}
    </div>
  );
}

export default UserMenu;
