import toast from "react-hot-toast";
import Swal from 'sweetalert2'


function Comment({ comment, setComments, user }) {
  const deleteComment = () => {
    console.log(user);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",

      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes Delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:8000/api/comment/${comment.id}/`, {
            method: "DELETE",
            headers: {
                Authorization: `Token ${user.token}`,
              },
        })

          .then(() => {
            toast.success("Comment deleted");
            setComments((prevComments) =>
              prevComments.filter((c) => c.id !== comment.id)
            );
          });
      }
    });
  };

  return (
    <div className="border border-slate-400 p-3 mb-4 rounded-md shadow-md flex justify-between">
      <div className="flex gap-3 items-center">
        <div className="bg-stone-200 rounded px-2 py-1 text-sm">
          <p>
            {comment.user.first_name} {comment.user.last_name}
          </p>
          <p className="text-xs">
            {new Date(comment.created_at).toDateString()}
          </p>
        </div>
        <p className="font-medium">{comment.text}</p>
      </div>
      {user && comment.user.id== user.id && (
        <div className="flex gap-3">
          <button
            className="border rounded px-4 bg-red-600 text-white"
            onClick={deleteComment}
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default Comment;
