import React from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";

export default function useModal(innerHtml) {
  const [isOpen, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  function getModalStyle() {
    const top = 50;
    const left = 50;

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
  }

  const useStyles = makeStyles((theme) => ({
    paper: {
      position: "absolute",
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
    },
  }));

  const renderBody = (html) => {
    const classes = useStyles();
    // getModalStyle is not a pure function, we roll the style only on the first render
    const [modalStyle] = React.useState(getModalStyle);

    return (
      <div style={modalStyle} className={classes.paper}>
        {html}
      </div>
    );
  };

  const ModalComponent = () => {
    return (
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        // disableEnforceFocus
      >
        {renderBody(innerHtml)}
      </Modal>
    );
  };

  return { Modal: ModalComponent, handleOpen, handleClose, isOpen };
}
