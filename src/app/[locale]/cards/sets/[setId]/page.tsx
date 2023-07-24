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
import Loading from "@/components/ui/Loading";

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

  if (isLoading) {
    return <Loading />;
  }
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
    <div className="container h-full pt-5 lg:max-w-4xl">
      <EditCardModal
        isOpen={showNewCardModal}
        handleClose={() => setShowNewCardModal(false)}
        setId={setId}
      />

      <div className="flex flex-col items-center text-center gap-4 sm:flex-row sm:items-stretch sm:text-start">
        <Image
          src={cardSet.imageUrl || "/placeholder.jpg"}
          width={150}
          height={150}
          alt="cardSet photo"
          className="rounded-2xl shadow-lg"
          priority={true}
        />
        <div className="flex flex-col flex-grow w-full">
          <div className="mb-1">
            {options.Rename.active ? (
              <input
                autoFocus={true}
                type="text"
                value={rename}
                className="input input-sm py-4 input-ghost text-3xl font-bold my-2"
                onChange={(e) => setRename(e.target.value)}
                onKeyDown={handleRenameEnter}
                onBlur={handleRename}
              ></input>
            ) : (
              <h2 className="text-3xl font-bold">{cardSet.name}</h2>
            )}
            <span className="flex items-center justify-center gap-2 sm:justify-start">
              <TbCards size={20} />
              {cardSet._count.cards} {t("cards")}
              {cardSet._count.cards > 1 ? "s" : ""}
            </span>
          </div>
          <div className="flex gap-2 mt-4 sm:mt-auto">
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
                <OptionsDropdown
                  options={options}
                  onSelect={handleSelectOption}
                />
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
        </div>
      </div>
      {canEdit && (
        <div>
          <Button
            onClick={() => setShowNewCardModal(true)}
            color="white border-2 border-primary500"
            rounding="rounded-xl"
            className="bg-white text-primary500 w-full text-md rounded-3xl mt-4 shadow-md "
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
