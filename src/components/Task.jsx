import { MdDeleteForever } from "react-icons/md";

const Task = ({ text, deleteTask}) => {
  return (
    <div className="border w-full max-w-2xl flex justify-between items-center p-2 text-md md:text-2xl">
      <div className="w-[80%] break-words">
        {text}
      </div>
      <div className="w-[10%]" onClick={deleteTask}>
        <MdDeleteForever role="button" className="w-full text-red-600 hover:scale-110 transition-all duration-500"/>
      </div>
    </div>
  );
};

export default Task;
