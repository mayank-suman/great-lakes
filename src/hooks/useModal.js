import React from "react";
import Modal from "@material-ui/core/Modal";

export default function useModal(innerHtml) {
  const [isOpen, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ModalComponent = () => (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
      // disableEnforceFocus
    >
      {innerHtml}
    </Modal>
  );

  return { Modal: ModalComponent, handleOpen, handleClose, isOpen };
}
