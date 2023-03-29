import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-[#3f85f5] mb-4">404</h1>
        <p className="text-xl mb-4">Oops! Trang này không tìm thấy.</p>
        <Link
          to={"/home"}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
