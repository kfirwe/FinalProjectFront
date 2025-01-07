import React, { useState, useEffect } from "react";

interface Comment {
  id: string;
  userId: string;
  text: string;
}

interface CommentsDialogProps {
  postId: string;
  onClose: () => void;
}

const CommentsDialog: React.FC<CommentsDialogProps> = ({ postId, onClose }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    // Fetch comments for the post (replace with API call)
    setComments([
      { id: "1", userId: "me", text: "Great post!" },
      { id: "2", userId: "other", text: "Is this still available?" },
    ]);
  }, [postId]);

  const handleAddComment = () => {
    // Add comment (API call here)
    const comment = { id: String(Date.now()), userId: "me", text: newComment };
    setComments((prev) => [...prev, comment]);
    setNewComment("");
  };

  const handleEditComment = (id: string, newText: string) => {
    // Update comment (API call here)
    setComments((prev) =>
      prev.map((comment) =>
        comment.id === id ? { ...comment, text: newText } : comment
      )
    );
  };

  const handleDeleteComment = (id: string) => {
    // Delete comment (API call here)
    setComments((prev) => prev.filter((comment) => comment.id !== id));
  };

  return (
    <div>
      <h5>Comments</h5>
      <ul className="list-group">
        {comments.map((comment) => (
          <li key={comment.id} className="list-group-item">
            <strong>{comment.userId === "me" ? "You" : "User"}:</strong>{" "}
            {comment.text}
            {comment.userId === "me" && (
              <div>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() =>
                    handleEditComment(comment.id, prompt("Edit comment:") || "")
                  }
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDeleteComment(comment.id)}
                >
                  Delete
                </button>
              </div>
            )}
          </li>
        ))}
      </ul>
      <input
        type="text"
        className="form-control mt-3"
        placeholder="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <button className="btn btn-success mt-2" onClick={handleAddComment}>
        Add Comment
      </button>
      <button className="btn btn-secondary mt-2" onClick={onClose}>
        Close
      </button>
    </div>
  );
};

export default CommentsDialog;
