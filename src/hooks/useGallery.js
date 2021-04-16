import React from "react";
import useModal from "./useModal";

function useGallery(html) {
  const { Modal, ...params } = useModal(html);

  return {
    Modal,
    ...params,
  };
}

export default useGallery;
