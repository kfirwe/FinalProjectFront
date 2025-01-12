import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import CommentsDialog from "./CommentsDialog";
import "./PostCard.css";

interface PostProps {
  id: string;
  title: string;
  price: number;
  image: string; // Base64 image string
  description: string;
  likes: number;
  comments: number;
}

const PostCard: React.FC<PostProps> = ({
  id,
  title,
  price,
  image,
  description,
  likes,
  comments,
}) => {
  const [showDialog, setShowDialog] = useState(false);
  const [showComments, setShowComments] = useState(false);

  const handleShowDialog = () => setShowDialog(true);
  const handleCloseDialog = () => setShowDialog(false);

  const handleShowComments = () => setShowComments(true);
  const handleCloseComments = () => setShowComments(false);

  return (
    <>
      <div
        className="post-card card shadow-sm"
        onClick={handleShowDialog}
        style={{ cursor: "pointer" }}
      >
        {image ? (
          <img
            src={`data:image/${getImageType(image)};base64,${image}`}
            alt={title}
            className="card-img-top post-image"
          />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate">{title}</h5>
          <p className="card-text text-truncate">{description}</p>
          <p className="card-text mb-2">${price.toFixed(2)}</p>
          <div className="d-flex justify-content-between mt-auto">
            <button
              className="btn btn-light"
              onClick={(e) => {
                e.stopPropagation(); // Prevent dialog from opening
                handleShowComments();
              }}
            >
              <i className="fas fa-heart"></i> {likes}
            </button>
            <button
              className="btn btn-light"
              onClick={(e) => {
                e.stopPropagation(); // Prevent dialog from opening
                handleShowComments();
              }}
            >
              <i className="fas fa-comment"></i> {comments}
            </button>
          </div>
        </div>
      </div>

      {/* Dialog Modal */}
      <Modal show={showDialog} onHide={handleCloseDialog} centered>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {image ? (
            <img
              src={`data:image/${getImageType(image)};base64,${image}`}
              alt={title}
              className="img-fluid rounded"
            />
          ) : (
            <div className="placeholder-image text-center">No Image</div>
          )}
          <p className="mt-3">
            <strong>Price:</strong> ${price.toFixed(2)}
          </p>
          <p>
            <strong>Description:</strong> {description}
          </p>
          <div className="d-flex justify-content-between mt-3">
            <button className="btn btn-light">
              <i className="fas fa-heart"></i> {likes} Likes
            </button>
            <button className="btn btn-light" onClick={handleShowComments}>
              <i className="fas fa-comment"></i> {comments} Comments
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Comments Dialog */}
      <Modal show={showComments} onHide={handleCloseComments}>
        <CommentsDialog postId={id} onClose={handleCloseComments} />
      </Modal>
    </>
  );
};

// Function to detect image type
const getImageType = (base64String: string) => {
  if (base64String.startsWith("/9j/")) return "jpeg"; // Matches JPEG
  if (base64String.startsWith("iVBORw0KGgo")) return "png"; // Matches PNG
  return "jpeg"; // Default to JPEG
};

export default PostCard;
