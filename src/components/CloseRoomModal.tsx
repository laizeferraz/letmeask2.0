import { Modal } from "./Modal";

interface CloseModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleCloseRoom: () => Promise<void>;
}

export const CloseRoomModal = ({ isOpen, closeModal, handleCloseRoom }: CloseModalProps) => {
  return <Modal 
          isOpen={isOpen} 
          onClose={closeModal} 
          title="Close Room" 
          content="Are you sure you want to close this room?" 
          textButton="Close room" 
          textButtonCancel="Cancel" 
          handleEndRoom={handleCloseRoom} 
        />;
}