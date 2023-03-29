// import { Link } from "react-router-dom";
// import { Menu } from "@headlessui/react";
// import { useEffect, useState } from "react";
// function SubjectDepartmentDropdown(props) {
//   const [khoa_id, setkhoa] = useState(1);
//   const [showSubjectList, setshowSubjectList] = useState(false);
//   const subjects = props.subjects.map((monhoc) => {
//     if (khoa_id === monhoc.khoa_id) {
//       return (
//         <Link
//           onClick={() => {
//             setshowSubjectList(false);
//           }}
//           className="hover:text-white"
//           to={"/subjectdepartment/" + khoa_id + "/" + monhoc.monhoc_id}
//         >
//           {monhoc.monhoc_ten}
//         </Link>
//       );
//     }
//   });
//   const handleGetSubject = (khoa_id) => {
//     setshowSubjectList(true);
//     setkhoa(khoa_id);
//   };
//   const departments = props.departments.map((khoa) => {
//     return (
//       <Menu.Item key={khoa.khoa_id}>
//         {({ active }) => {
//           return (
//             <div className="flex">
//               <button
//                 onMouseOver={() => handleGetSubject(khoa.khoa_id)}
//                 className="bg-blue-400 hover:text-white"
//               >
//                 {khoa.khoa_ten}
//               </button>
//             </div>
//           );
//         }}
//       </Menu.Item>
//     );
//   });

//   useEffect(() => {}, [khoa_id, subjects]);
//   return (
//     <Menu className="z-20 relative">
//       <div
//         className="group"
//         onMouseLeave={() => {
//           setshowSubjectList(false);
//         }}
//       >
//         {showSubjectList ? (
//           <div className="hidden absolute z-50 group-hover:flex flex-col space-y-4 left-72 top-20 -mt-4 overflow-auto h-[350px] w-[300px] bg-blue-400">
//             {subjects}
//           </div>
//         ) : (
//           ""
//         )}

//         <Menu.Button className="p-3 hover:bg-white cursor-pointer">
//           {props.title}
//         </Menu.Button>
//         <Menu.Items className="p-2  absolute left-0 right-0 w-[600px] h-fit max-h-[400px] space-y-4 overflow-y-auto bg-blue-400 rounded-md shadow-lg focus:outline-none">
//           {departments}
//         </Menu.Items>
//       </div>
//     </Menu>
//   );
// }

// export default SubjectDepartmentDropdown;
