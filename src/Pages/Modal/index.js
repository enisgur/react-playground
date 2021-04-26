import React, { useState } from "react";
import Modal from "../../Components/Modal";

// MAKE SURE ADD DIV ID="PORTAL" IN PUBLIC INDEX.HTML
// MAKE SURE ADD DIV ID="PORTAL" IN PUBLIC INDEX.HTML
// MAKE SURE ADD DIV ID="PORTAL" IN PUBLIC INDEX.HTML

const BUTTON_WRAPPER_STYLES = {
  position: "relative",
  zIndex: 1,
};

const OTHER_CONTENT_STYLES = {
  position: "relative",
  zIndex: 2,
  backgroundColor: "red",
  padding: "10px",
};

function Index() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1>This is example Modal Page</h1>

      <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log("clicked")}>
        <button onClick={() => setIsOpen(true)}>Open Modal</button>

        <Modal open={isOpen} onClose={() => setIsOpen(false)}>
          Fancy Modal
        </Modal>
      </div>

      <div style={OTHER_CONTENT_STYLES}>Other Content</div>
    </div>
  );
}

export default Index;
