import { arrayMove as dndKitArrayMove } from "@dnd-kit/sortable";
export const removeAtIndex = (array: string[], index: number) => {
  return [...array.slice(0, index), ...array.slice(index + 1)];
};

export const insertAtIndex = (array: string[], index: number, item: string) => {
  return [...array.slice(0, index), item, ...array.slice(index)];
};

export const arrayMove = (
  array: string[],
  oldIndex: number,
  newIndex: number
) => {
  return dndKitArrayMove(array, oldIndex, newIndex);
};
