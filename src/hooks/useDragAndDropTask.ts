import { useRef } from "react";
import { useDrag, useDrop, XYCoord } from "react-dnd";
import { useDispatch } from "react-redux";
import { dropHoverHandle } from "../features/columnTasks/columnTasksSlice";
import { ItemType } from "../utils/enums";
import { TaskModel, DragItem } from "./../utils/models";

type useDragAndDropTaskProps = {
  index: number;
  task: TaskModel;
};

const useDragAndDropTask = <T extends HTMLElement>({
  index,
  task,
}: useDragAndDropTaskProps) => {
  const dispatch = useDispatch();
  const ref = useRef<T>(null);
  const [{ isDragging }, drag] = useDrag<
    DragItem,
    void,
    { isDragging: boolean }
  >({
    type: ItemType.Task,
    item: { from: task.column, id: task.id, index },
    collect: (monitor) => {
      return {
        isDragging: monitor.isDragging(),
      };
    },
  });
  const [_, drop] = useDrop<DragItem, void, unknown>({
    accept: ItemType.Task,
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const draggedItemIndex = item.index;
      const hoveredItemIndex = index;
      if (draggedItemIndex === hoveredItemIndex) {
        return;
      }
      const isDraggedItemAboveHovered = draggedItemIndex < hoveredItemIndex;
      const isDraggedItemBelowHovered = !isDraggedItemAboveHovered;
      // mouse cordinate finding
      const { x: mouseX, y: mouseY } = monitor.getClientOffset() as XYCoord;

      //get hover item box
      const hoveredBoundingRect = ref.current.getBoundingClientRect();

      // get hover item's height in middle position
      const hoveredMiddleHeight =
        (hoveredBoundingRect.bottom - hoveredBoundingRect.top) / 2;

      const mouseYRelativeToHovered = mouseY - hoveredBoundingRect.top;

      const isMouseYAboveHoveredMiddleHeight =
        mouseYRelativeToHovered < hoveredMiddleHeight;
      const isMouseYBelowHoveredMiddleHeight =
        mouseYRelativeToHovered > hoveredMiddleHeight;

      //only moves when mouse has crossed half of the item's height
      // when draging below , only move when the cursor is below 50%
      // when dragging upwards , only move when the cursor is above 50%

      if (isDraggedItemAboveHovered && isMouseYAboveHoveredMiddleHeight) {
        return;
      }

      if (isDraggedItemBelowHovered && isMouseYBelowHoveredMiddleHeight) {
        return;
      }

      const dropOverHandleProp = {
        column: task.column,
        i: draggedItemIndex,
        j: hoveredItemIndex,
      };
      dispatch(dropHoverHandle(dropOverHandleProp));
      item.index = hoveredItemIndex;
    },
  });

  drag(drop(ref));

  return {
    ref,
    isDragging,
  };
};

export default useDragAndDropTask;
