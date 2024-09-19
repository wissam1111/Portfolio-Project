import React from 'react';

const CommentPreview = (props) => {
  return (
    <div className="border p-2 mb-2 rounded-md bg-gray-100">
      <p>{props.comment}</p>
    </div>
  );
};

export default CommentPreview;
