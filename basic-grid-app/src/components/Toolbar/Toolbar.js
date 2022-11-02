import {
  DocumentPlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import useGridStore from "../../utils/store";
import "./Toolbar.css";

function Toolbar({ openModal }) {
  const {
    setSearch,
    deleteUser,
    currentUserId,
    setExistingUser,
    setCurrentUserId,
  } = useGridStore(); // zustand store
  return (
    <div className="toolbar" style={{ width: "100vw", height: "20vh" }}>
      <input
        className="search"
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />
      <div className="sep" />
      {currentUserId !== "" ? (
        <TrashIcon
          className="h-12 w-12"
          onClick={() => {
            deleteUser();
            setCurrentUserId("");
            setExistingUser(false);
          }}
        />
      ) : null}
      <div className="sep" />
      {currentUserId !== "" ? (
        <PencilSquareIcon
          className="h-12 w-12"
          onClick={() => {
            setExistingUser(true);
            openModal();
          }}
        />
      ) : null}
      <div className="sep" />
      <DocumentPlusIcon
        className="h-12 w-12"
        onClick={() => {
          setExistingUser(false);
          openModal();
        }}
      />
    </div>
  );
}

export default Toolbar;
