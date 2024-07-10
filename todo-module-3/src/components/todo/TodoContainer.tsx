import TodoCard from './TodoCard';
import AddTodoModal from './AddTodoModal';
import TodoFilter from './TodoFilter';
import { useAppSelector } from '@/redux/hook';
import { useGetTodosQuery } from '@/redux/api/api';
import { useState } from 'react';

const TodoContainer = () => {

    const [priority, setPriority] = useState('')

    // from local state
    // const {todos} = useAppSelector((state => state.todos) )

    // from server
    // {pollingInterval: 1000}
    const {data: todos, isLoading, isError} = useGetTodosQuery(priority)

    return (
        <div>
            <div className='flex justify-between mb-5'>
                <AddTodoModal></AddTodoModal>
                <TodoFilter priority={priority} setPriority={setPriority}></TodoFilter>
            </div>
            <div className='bg-primary-gradient w-full h-full rounded-xl p-[5px]'>
                <div className='bg-white p-5 w-full h-full rounded-md space-y-3'>
                    {
                        todos?.data?.map(item => <TodoCard {...item}></TodoCard>)
                    }
                </div>
                {/* <div className='bg-white text-2xl font-bold p-3 flex justify-center items-center rounded-md'>
                    <p>There is no task pending</p>
                </div> */}
            </div>
        </div>
    );
};

export default TodoContainer;