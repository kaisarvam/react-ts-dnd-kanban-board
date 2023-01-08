import { TaskModel, DragItem } from './../utils/models';
import { ColumnType, ItemType } from './../utils/enums';
import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import { dropTheTask } from '../features/columnTasks/columnTasksSlice';

type useDropOnColumnProp ={
    columnName:ColumnType;
}

const useDropOnColumn = ({columnName}:useDropOnColumnProp)=>{

    const dispatch = useDispatch();

    const [{isOver},dropRef] = useDrop<DragItem,void,{isOver:Boolean}>({
        accept:ItemType.Task,
        drop:(dragItem)=>{
            if(!dragItem|| dragItem.from===columnName){
                return ;
            }

          //  dropTaskFrom(dragItem.from,dragItem.id);
          const dropTaskprop = {
            column:columnName,
            from:dragItem.from,
            Id:dragItem.id
          }

          dispatch(dropTheTask(dropTaskprop))

        },
        collect:(monitor)=>{
            return{
                isOver:monitor.isOver()
            }
        }

    })


    return{
        isOver,
        dropRef
    }

}

export default useDropOnColumn;