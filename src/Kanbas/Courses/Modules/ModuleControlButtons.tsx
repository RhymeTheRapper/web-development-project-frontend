import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus, BsPlusLg } from "react-icons/bs";
export default function ModuleControlButtons() {
  return (
    <div className="float-end">
      <GreenCheckmark />
      <BsPlusLg style={{ strokeWidth: 0.5, margin:"3px" }} />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
