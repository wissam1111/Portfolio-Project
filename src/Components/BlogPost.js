
import React from 'react';

export default function BlogPost(props){
  <div className="bg-white shadow-md rounded-lg p-4 mb-4">
    <h2 className="text-2xl font-bold">{props.title}</h2>
    <p className="mt-2 text-gray-600">{props.content}</p>
    </div>
}