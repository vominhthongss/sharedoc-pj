import { Link } from "react-router-dom";
import { useState } from "react";
function DocumentItem(props) {
  const [document, setDocument] = useState(props.document);
  return (
    <div
      key={document.tailieu_id}
      className="py-4 border w-96 px-5 cursor-pointer shadow-lg rounded-lg hover:bg-blue-400 hover:text-white"
    >
      <Link to={"/documentdetail/" + document.tailieu_id}>
        <span className="text-xl font-bold hover:underline">
          {document.tailieu_ten}
        </span>
      </Link>
      <p className="mt-4">{document.tailieu_mota}</p>
      <p className="text-sm mt-2">Loại tài liệu: {document.loaitailieu_ten}</p>
      <p className="text-sm mt-2">Thuộc khoa: {document.khoa_ten}</p>
      {/* <p className="text-sm mt-2">Ngày đăng: {document.tailieu_ngaydang}</p>
      <p className="text-sm mt-2">
        Người đăng: {document.nguoidung_tennguoidung}
      </p> */}
    </div>
  );
}

export default DocumentItem;
