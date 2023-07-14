import { Modal } from "./Modal";

interface RemoveQuestionModalProps {
  isOpen: boolean;
  closeModal: () => void;
  handleDeleteQuestion: (e: React.MouseEvent<HTMLButtonElement>, questionId?:string) => Promise<void>;
}

export const RemoveQuestionModal = ({ isOpen, closeModal, handleDeleteQuestion }: RemoveQuestionModalProps) => {
  return <Modal 
          isOpen={isOpen} 
          onClose={closeModal} 
          title="Delete Question" 
          content="Are you sure you want to delete this question?" 
          textButton="Delete" 
          textButtonCancel="Cancel" 
          handleDeleteQuestion={handleDeleteQuestion} />;
}