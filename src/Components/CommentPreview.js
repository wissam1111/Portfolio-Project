import React from 'react';

const CommentPreview = (props) => {
  return (
    <div className="border p-2 mb-2 rounded-md bg-gray-100">
      <h1>{props.text}</h1>
    </div>
  );
};

export default CommentPreview;
