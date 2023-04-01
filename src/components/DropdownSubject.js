import { Link } from "react-router-dom";
import { Menu } from "@headlessui/react";
import { useContext, useState } from "react";
function DropdownSubject(props) {
  const { setMonhoc } = props;
  const [currentNav, setCurrentNav] = useState("");
  const monhocList = props.monhocs.map((monhoc, index) => {
    return (
      <Menu.Item key={index}>
        {({ active }) => (
          <button
            onClick={() => {
              setMonhoc(monhoc.monhoc_ten);
            }}
            className={`${
              active ? "hover:bg-[#1d4ed8]  text-white" : "text-white"
            } block px-4 py-1  text-start bg-[#3f85f5]`}
          >
            {monhoc.monhoc_ten}
          </button>
        )}
      </Menu.Item>
    );
  });

  return (
    <Menu className="z-20">
      <div className="relative">
        <Menu.Button className="p-3  cursor-pointer text-white font-bold flex justify-center items-center space-x-2">
          <span>{props.title}</span>
          <svg
            fill="#FFFFFF"
            height="12px"
            width="12px"
            version="1.1"
            id="Layer_1"
            viewBox="0 0 330 330"
          >
            <path
              id="XMLID_225_"
              d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393  c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393  s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"
            />
          </svg>
        </Menu.Button>
        <Menu.Items className="absolute -left-[37px] w-[200px] h-fit max-h-[400px] overflow-y-auto bg-[#3f85f5]  rounded-b-md shadow-lg focus:outline-none">
          {monhocList}
        </Menu.Items>
      </div>
    </Menu>
  );
}

export default DropdownSubject;
