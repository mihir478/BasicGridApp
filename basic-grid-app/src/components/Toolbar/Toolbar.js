import {
  DocumentPlusIcon,
  PencilSquareIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import useGridStore from "../../utils/store";
import "./Toolbar.css";

function Toolbar() {
  const { setSearch, deleteUser, currentUserId } = useGridStore();
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
        <TrashIcon className="h-12 w-12" onClick={deleteUser} />
      ) : null}
      <div className="sep" />
      {currentUserId !== "" ? <PencilSquareIcon className="h-12 w-12" /> : null}
      <div className="sep" />
      <DocumentPlusIcon className="h-12 w-12" />
    </div>
  );
}

export default Toolbar;
