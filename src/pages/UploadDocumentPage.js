import { useEffect, useState } from "react";

function UploadDocumentPage() {
  const [addedDocument, setAddedDocument] = useState({});
  const currentDate = new Date().toISOString().slice(0, 19).replace("T", " ");
  const [subjects, setSubjects] = useState([]);
  const [documentTypes, setDocumentTypes] = useState([]);
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", addedDocument.file);

    try {
      const fileUploadResponse = await uploadFile(formData);
      const tailieu_duongdan = fileUploadResponse.url;
      const documentData = {
        ...addedDocument,
        tailieu_duongdan,
        nguoidung_tennguoidung: localStorage.getItem("nguoidung_tennguoidung"),
        tailieu_ngaydang: currentDate,
      };

      const addDocumentResponse = await fetch(
        `http://localhost:3002/tailieu/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(documentData),
        }
      );

      if (addDocumentResponse.ok) {
        setAddedDocument(null);
        alert("Bạn đã upload tài liệu thành công! Hãy chờ được duyệt !");
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
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
    async function fetchSubjects() {
      try {
        const response = await fetch("http://localhost:3002/monhoc");
        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }
        const data = await response.json();
        const monhocs = [...data].sort((a, b) =>
          a.monhoc_ten > b.monhoc_ten ? 1 : -1
        );
        setSubjects(monhocs);
      } catch (error) {
        console.log(error);
      }
    }
    fetchSubjects();
    async function fetchDocumentTypes() {
      try {
        const response = await fetch("http://localhost:3002/loaitailieu");
        if (!response.ok) {
          throw new Error("Failed to fetch document types");
        }
        const data = await response.json();
        setDocumentTypes(data);
      } catch (error) {
        console.log(error);
      }
    }

    fetchDocumentTypes();
  }, []);
  return (
    <div className="px-32">
      <form onSubmit={handleAddSubmit}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <h2
            className="text-2xl text-center uppercase leading-6 font-medium text-gray-900"
            id="modal-headline"
          >
            Đăng tải tài liệu 🧑‍🏫
          </h2>

          <div className="mt-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="tailieu_ten"
            >
              Tên tài liệu
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tailieu_ten"
              type="text"
              required
              value={addedDocument.tailieu_ten}
              placeholder="Tên tài liệu"
              onChange={(e) =>
                setAddedDocument({
                  ...addedDocument,
                  tailieu_ten: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="tailieu_ten"
            >
              Mô tả
            </label>
            <input
              required
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tailieu_mota"
              type="text"
              placeholder="Mô tả"
              value={addedDocument.tailieu_mota}
              onChange={(e) =>
                setAddedDocument({
                  ...addedDocument,
                  tailieu_mota: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="tailieu_ngaydang"
            >
              Ngày đăng
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tailieu_ngaydang"
              type="text"
              required
              value={currentDate}
              onChange={(e) =>
                setAddedDocument({
                  ...addedDocument,
                  tailieu_ngaydang: currentDate,
                })
              }
            />
          </div>
          <div className="mt-4 hidden">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="tailieu_duongdan"
            >
              Đường dẫn
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="tailieu_duongdan"
              type="text"
              value={addedDocument.tailieu_duongdan}
              onChange={(e) =>
                setAddedDocument({
                  ...addedDocument,
                  tailieu_duongdan: e.target.value,
                })
              }
            />
          </div>
          <div className="mt-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="monhoc_id"
            >
              Môn học
            </label>
            <select
              id="monhoc_id"
              value={addedDocument.monhoc_id}
              required
              onChange={(e) =>
                setAddedDocument({
                  ...addedDocument,
                  monhoc_id: e.target.value,
                })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">--Chọn môn học--</option>
              {subjects.map((subject) => (
                <option key={subject.monhoc_id} value={subject.monhoc_id}>
                  {subject.monhoc_ten}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="loaitailieu_id"
            >
              Loại tài liệu
            </label>
            <select
              id="monhoc_id"
              value={addedDocument.loaitailieu_id}
              required
              onChange={(e) =>
                setAddedDocument({
                  ...addedDocument,
                  loaitailieu_id: e.target.value,
                })
              }
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            >
              <option value="">--Chọn loại tài liệu--</option>
              {documentTypes.map((documentTypes) => (
                <option
                  key={documentTypes.loaitailieu_id}
                  value={documentTypes.loaitailieu_id}
                >
                  {documentTypes.loaitailieu_ten}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4 hidden">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="nguoidung_tennguoidung"
            >
              Uploader
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="nguoidung_tennguoidung"
              type="text"
              value={localStorage.getItem("nguoidung_tennguoidung")}
              onChange={(e) =>
                setAddedDocument({
                  ...addedDocument,
                  nguoidung_tennguoidung: "admin",
                })
              }
            />
          </div>
          <div className="mt-4">
            <label
              className="block text-gray-700 font-semibold mb-2"
              htmlFor="file"
            >
              Tải tệp
            </label>
            <input
              required
              id="file"
              type="file"
              accept=".pdf"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file.type !== "application/pdf") {
                  alert("Please select a PDF file.");
                  return;
                }
                setAddedDocument({
                  ...addedDocument,
                  file: file,
                });
              }}
            />
          </div>
        </div>
        <div className="px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
          <span className="flex w-full rounded-md shadow-sm sm:ml-3 sm:w-auto space-x-4">
            <button
              type="submit"
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Đăng
            </button>

            <button
              type="button"
              onClick={() => setAddedDocument(null)}
              className="inline-flex justify-center w-full rounded-md border border-transparent px-4 py-2 bg-blue-600 text-base leading-6 font-medium text-white shadow-sm hover:bg-blue-500 focus:outline-none focus:border-blue-700 focus:shadow-outline-blue active:bg-blue-700 transition ease-in-out duration-150 sm:text-sm sm:leading-5"
            >
              Đóng
            </button>
          </span>
        </div>
      </form>
    </div>
  );
}

export default UploadDocumentPage;
