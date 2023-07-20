"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import Modal from "@/components/ui/Modal";
import Button from "../ui/Button";
import { createCard, editCard } from "@/app/store/cards";

interface EditCardModalProps {
  isOpen: boolean;
  handleClose: () => void;
  setId: string;
  currentFrontText?: string;
  currentBackText?: string;
  currentCardId?: string;
}
const EditCardModal: React.FC<EditCardModalProps> = ({
  isOpen,
  handleClose,
  setId,
  currentFrontText,
  currentBackText,
  currentCardId,
}) => {
  const queryClient = useQueryClient();
  const [frontText, setFrontText] = useState(currentFrontText || "");
  const [backText, setBackText] = useState(currentBackText || "");

  const newCardMutation = useMutation({
    mutationFn: () => createCard(setId, frontText, backText),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cardSet", setId],
      });
      queryClient.invalidateQueries({
        queryKey: ["userSets"],
      });
      setFrontText("");
      setBackText("");
    },
  });

  const editCardMutation = useMutation({
    mutationFn: () => editCard(setId, currentCardId!, frontText, backText),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cardSet", setId],
      });
    },
  });

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (currentCardId) {
      if (
        !(currentFrontText === frontText) ||
        !(currentBackText === backText)
      ) {
        editCardMutation.mutate();
      }
    } else {
      newCardMutation.mutate();
    }
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} handleClose={handleClose}>
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6">
          {currentCardId ? "Edit Card" : "New Card"}
        </h1>
        <form className="w-full flex flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="frontText" className="font-medium">
              Front
            </label>
            <textarea
              name="frontText"
              id="frontText"
              onChange={(e) => setFrontText(e.target.value)}
              value={frontText}
              className="textarea textarea-bordered textarea-md border-grayDark resize-none"
            ></textarea>
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="backText" className="font-medium">
              Back
            </label>
            <textarea
              name="backText"
              id="backText"
              onChange={(e) => setBackText(e.target.value)}
              value={backText}
              className="textarea textarea-bordered textarea-md border-grayDark resize-none"
            ></textarea>
          </div>
          <Button
            onClick={handleSubmit}
            disabled={!frontText || !backText}
            className="text-white w-full"
          >
            Done
          </Button>
        </form>
      </div>
    </Modal>
  );
};
export default EditCardModal;
