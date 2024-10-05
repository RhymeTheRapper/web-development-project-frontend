import { IoEllipsisVertical } from "react-icons/io5";
import { BsPlus, BsPlusLg } from "react-icons/bs";
export default function AssignmentControlButtons() {
  return (
    <div className="float-end">
      <span
        style={{
          display: "inline-block",
          borderRadius: "50px",
          border: "1px solid #000",
                  padding: "3px 10px",
          marginRight: "3px",
        }}
      >
        40% of Total
      </span>
      <BsPlusLg style={{ strokeWidth: 0.5, margin: "3px" }} />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
