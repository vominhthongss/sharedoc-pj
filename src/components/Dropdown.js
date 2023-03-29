import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useState } from "react";
function Dropdown(props) {
  const [currentNav, setCurrentNav] = useState("");
  const list = props.list.map((khoa) => {
    return (
      <Menu.Item key={khoa.khoa_id}>
        {({ active }) => (
          <Link
            onClick={() => setCurrentNav("Các khoa")}
            to={"department/" + khoa.khoa_id + "/Tất cả"}
            className={`${
              active ? "bg-[#3f85f5] text-white" : "text-gray-900"
            } block px-4 py-2`}
          >
            {khoa.khoa_ten}
          </Link>
        )}
      </Menu.Item>
    );
  });

  return (
    <Menu className="z-20">
      <div className="">
        <Menu.Button
          className={`${
            currentNav === "Các khoa" ? "bg-blue-700" : "bg-[#3f85f5]"
          } p-3  cursor-pointer text-white font-bold`}
        >
          {props.title}
        </Menu.Button>
        <Menu.Items className="p-2 absolute left-0 right-0 w-full h-fit max-h-[400px] overflow-y-auto bg-[#3f85f5]  rounded-md shadow-lg focus:outline-none grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-2">
          {list}
        </Menu.Items>
      </div>
    </Menu>
  );
}

export default Dropdown;
