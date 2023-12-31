"use client";
import { useState } from "react";
import OptionsDropdown, { options } from "../ui/OptionsDropdown";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCard } from "@/app/store/cards";
import EditCardModal from "./EditCardModal";
import { useTranslations } from "next-intl";

interface CardProps {
  id: string;
  setId: string;
  front: string;
  back: string;
  canEdit: boolean;
  favorite?: boolean;
}

const Card: React.FC<CardProps> = ({
  id,
  setId,
  front,
  back,
  canEdit,
  favorite,
}) => {
  const queryClient = useQueryClient();
  const t = useTranslations("Cards.sets");

  const [options, setOptions] = useState<options>({
    Edit: {
      label: t("edit"),
      active: false,
    },
    Delete: {
      label: t("delete"),
      active: false,
    },
  });

  const deleteCardMutation = useMutation({
    mutationFn: () => deleteCard(setId, id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cardSet", setId],
      });
    },
  });

  const handleSelectOption = (option: string) => {
    if (option === "Delete") {
      deleteCardMutation.mutate();
    }
    setOptions((prev) => {
      return {
        ...prev,
        [option]: {
          label: prev[option].label,
          active: true,
        },
      };
    });
  };

  const handleCloseEditModal = () => {
    setOptions((prev) => {
      return {
        ...prev,
        Edit: {
          label: prev.Edit.label,
          active: false,
        },
      };
    });
  };

  return (
    <div className="bg-white border-2 border-gray rounded-xl py-2 p-4">
      <EditCardModal
        isOpen={options.Edit.active}
        handleClose={handleCloseEditModal}
        setId={setId}
        currentCardId={id}
        currentFrontText={front}
        currentBackText={back}
      />
      <div className="flex justify-between">
        <h3 className="text-lg font-semibold text-dark line-clamp-1 ">
          {front}
        </h3>
        {canEdit && (
          <OptionsDropdown
            options={options}
            onSelect={handleSelectOption}
            style="dropdown-end"
          />
        )}
      </div>
      <div className="h-[1.75px] w-full bg-gray/30 rounded-full my-1"></div>
      <p className="line-clamp-1">{back}</p>
    </div>
  );
};
export default Card;
