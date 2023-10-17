import { FontAwesomeIcon as FAI } from "@fortawesome/react-fontawesome";
import { faLock, faTrash, faLockOpen } from "@fortawesome/free-solid-svg-icons";

interface ToolBarProps {
  handleBlockButton: Function;
  handleUnblockButton: Function;
  handleDeleteButton: Function;
}

export default function ToolBar({
  handleBlockButton,
  handleUnblockButton,
  handleDeleteButton,
}: ToolBarProps) {
  return (
    <div className="flex gap-4 ">
      <div
        onClick={() => handleBlockButton()}
        className="standart-button hover:border-red-600 group"
      >
        <span className="mr-1">Block</span>
        <FAI className="group-hover:text-red-600 duration-500" icon={faLock} />
      </div>
      <div
        onClick={() => handleUnblockButton()}
        className="standart-button hover:border-green-600 group"
      >
        <span className="mr-1">UnBlock</span>
        <FAI
          className="group-hover:text-green-600 duration-500"
          icon={faLockOpen}
        />
      </div>
      <div
        onClick={() => handleDeleteButton()}
        className="standart-button hover:border-red-600 group"
      >
        <span className="mr-1">Delete</span>
        <FAI className="group-hover:text-red-600 duration-500" icon={faTrash} />
      </div>
    </div>
  );
}
