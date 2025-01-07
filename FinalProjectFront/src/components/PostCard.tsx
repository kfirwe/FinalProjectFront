import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import CommentsDialog from "./CommentsDialog";

interface PostProps {
  id: string;
  title: string;
  price: number;
  image: string;
  likes: number;
  comments: number;
}

const PostCard: React.FC<PostProps> = ({
  id,
  title,
  price,
  image,
  likes,
  comments,
}) => {
  const [showComments, setShowComments] = useState(false);

  const handleShowComments = () => setShowComments(true);
  const handleCloseComments = () => setShowComments(false);

  return (
    <div className="card mb-3" style={{ width: "18rem" }}>
      <img src={image} className="card-img-top" alt={title} />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">${price.toFixed(2)}</p>
        <div className="d-flex justify-content-between">
          <button className="btn btn-light">
            <i className="fas fa-heart"></i> {likes}
          </button>
          <button className="btn btn-light" onClick={handleShowComments}>
            <i className="fas fa-comment"></i> {comments}
          </button>
        </div>
      </div>

      {/* Comments Dialog */}
      <Modal show={showComments} onHide={handleCloseComments}>
        <CommentsDialog postId={id} onClose={handleCloseComments} />
      </Modal>
    </div>
  );
};

export default PostCard;
