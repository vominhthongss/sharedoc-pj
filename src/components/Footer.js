import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      <div className="flex space-x-2 p-1 bg-blue-400 w-full justify-between text-sm px-5">
        <div className="flex flex-col items-center justify-center text-xl">
          <span>Email: hnueshare@hnue.edu.vn</span>
          <span>Hiện tại mọi tài liệu đều chia sẻ miễn phí</span>
        </div>
        <div className="flex flex-col items-center text-xl">
          <span>Thông tin</span>
          <span>Giới thiệu</span>
          <span>Chính sách bảo mật</span>
        </div>
        <div className="flex flex-col items-center justify-center text-xl">
          <span>Truy cập cánh cửa tương lai</span>
        </div>
      </div>
    </div>
  );
}

export default Footer;
