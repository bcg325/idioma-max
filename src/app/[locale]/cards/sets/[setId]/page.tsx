"use client";
import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getCardSet,
  updateCardSet,
  deleteCardSet,
  saveCardSet,
  unsaveCardSet,
} from "@/app/store/cards";
import { useSession } from "next-auth/react";
import { useCourse } from "@/hooks/useCourse";
import { useRouter } from "next-intl/client";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { FiPlus } from "react-icons/fi";
import { BsFillPlayFill } from "react-icons/bs";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import Link from "next-intl/link";
import Card from "@/components/cards/Card";
import OptionsDropdown, { options } from "@/components/ui/OptionsDropdown";
import EditCardModal from "@/components/cards/EditCardModal";
import { useTranslations } from "next-intl";

interface LessonPageProps {
  params: {
    setId: string;
  };
}
const SetPage: React.FC<LessonPageProps> = ({ params }) => {
  const { setId } = params;
  const t = useTranslations("Cards.sets");
  const router = useRouter();
  const { data: session, status } = useSession();
  const { courses, course } = useCourse();
  const queryClient = useQueryClient();
  const [showNewCardModal, setShowNewCardModal] = useState(false);
  const [options, setOptions] = useState<options>({
    Rename: {
      label: t("rename"),
      active: false,
    },
    Delete: {
      label: t("delete"),
      active: false,
    },
  });
  const [rename, setRename] = useState("");
  const [saved, setSaved] = useState(false);

  const {
    isLoading,
    error,
    data: cardSet,
  } = useQuery({
    queryKey: ["cardSet", setId],
    queryFn: () => getCardSet(setId),
    onSuccess: (data) => {
      setRename(data.name);
      setSaved(data.saved || false);
    },
  });

  const deleteSet = useMutation({
    mutationFn: () => deleteCardSet(setId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userSets"],
      });
    },
  });

  const updateName = useMutation({
    mutationFn: () => updateCardSet(setId, rename),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cardSet", setId],
      });
    },
  });

  const toggleSave = useMutation({
    mutationFn: () => {
      if (saved) {
        return saveCardSet(setId);
      } else {
        return unsaveCardSet(setId);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["userSets"],
      });
      queryClient.invalidateQueries({
        queryKey: ["cardSet", setId],
      });
    },
  });

  useEffect(() => {
    if (options.Delete.active) {
      router.push("/cards");
    }
  }, [options, router]);

  if (!cardSet) {
    return;
  }

  const handleSelectOption = (option: string) => {
    if (option === "Delete") {
      deleteSet.mutate();
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

  const handleRename = () => {
    setOptions((prev) => {
      return {
        ...prev,
        Rename: {
          label: prev.Rename.label,
          active: false,
        },
      };
    });
    if (rename.length === 0) {
      setRename("Untitled");
    }
    if (rename === cardSet.name) {
      return;
    }
    updateName.mutate();
  };

  const handleRenameEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRename();
    }
  };

  const handleToggleSave = () => {
    setSaved((prev) => !prev);
    toggleSave.mutate();
  };

  const canEdit = session?.user.id === cardSet.creatorId;
  const canSave = session?.user.id && !canEdit;

  return (
    <div className="container h-full pt-7 lg:max-w-4xl">
      <EditCardModal
        isOpen={showNewCardModal}
        handleClose={() => setShowNewCardModal(false)}
        setId={setId}
      />

      <div className="flex flex-col items-center gap-3">
        <Image
          src={cardSet.imageUrl || "/placeholder.jpg"}
          width={150}
          height={150}
          alt="cardSet photo"
          className="rounded-xl"
        />
        <div className="text-center">
          <div className="mb-1">
            {options.Rename.active ? (
              <input
                autoFocus={true}
                type="text"
                value={rename}
                className="input input-sm input-ghost text-center text-2xl font-bold"
                onChange={(e) => setRename(e.target.value)}
                onKeyDown={handleRenameEnter}
                onBlur={handleRename}
              ></input>
            ) : (
              <h1 className="text-2xl font-bold">{cardSet.name}</h1>
            )}
          </div>
          <span className="flex items-center justify-center gap-2">
            <TbCards size={20} />
            {cardSet._count.cards} {t("cards")}
          </span>
        </div>
      </div>
      <div className="flex gap-2 my-2">
        <div className="flex items-center justify-center gap-2">
          {cardSet.cards.length > 0 && (
            <Link href={`/cards/sets/${cardSet.id}/review`}>
              <Button className=" bg-secondary400 rounded-2xl flex items-center gap-2 text-white px-4">
                <BsFillPlayFill size={20} className="relative left-[1px]" />
                <span>{t("review")}</span>
              </Button>
            </Link>
          )}
          {canEdit && (
            <OptionsDropdown options={options} onSelect={handleSelectOption} />
          )}
          {canSave && (
            <button onClick={handleToggleSave} className="btn btn-circle">
              {cardSet.saved ? (
                <FaBookmark className="text-primary400" size={26} />
              ) : (
                <FaRegBookmark className="text-primary400" size={26} />
              )}
            </button>
          )}
        </div>
      </div>
      {canEdit && (
        <div>
          <Button
            onClick={() => setShowNewCardModal(true)}
            color="white border-2 border-primary500"
            rounding="rounded-3xl"
            className="bg-white text-primary500 w-full text-md rounded-3xl py-1 "
          >
            <div className="flex items-center justify-center space-x-2 ">
              <FiPlus size={22} />
              <span>{t("newCard")}</span>
            </div>
          </Button>
        </div>
      )}
      <div className="flex flex-col gap-3 mt-6">
        {cardSet.cards.map((card) => (
          <Card
            key={card.id}
            id={card.id}
            setId={setId}
            front={card.frontText}
            back={card.backText}
            canEdit={canEdit}
          />
        ))}
      </div>
    </div>
  );
};
export default SetPage;
