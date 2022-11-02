import "./App.css";
import Toolbar from "./components/Toolbar/Toolbar";
import Grid from "./components/Grid/Grid";
import UserForm from "./components/UserForm/UserForm.js";
import Modal from "react-modal";
import { useState } from "react";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function App() {
  Modal.setAppElement("#root");
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }
  const [modalIsOpen, setIsOpen] = useState(false);
  return (
    <div className="App">
      <Toolbar openModal={openModal} />
      <Grid />
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <UserForm closeModal={closeModal} />
      </Modal>
    </div>
  );
}

export default App;
