import toast from "react-hot-toast";

function Comment({comment}) {
    return (
        <div className="border border-slate-400 p-3 mb-4 rounded-md shadow-md flex justify-between">
            <div className='flex gap-3 items-center'>
                <div className='bg-stone-200 rounded px-2 py-1 text-sm'>
                    <p>{comment.user.first_name} {comment.user.last_name}</p>
                    <p className='text-xs'>{new Date(comment.created_at).toDateString()}</p>
                </div>
                <p className='font-medium'>{comment.text}</p>
            </div>
    
        </div>
    )
}


export default Comment