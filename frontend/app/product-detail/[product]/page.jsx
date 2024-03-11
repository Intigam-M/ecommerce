"use client";
import Comment from "@/components/comments";
import { useState, useEffect } from "react";
import WebSocketInstance from '@/utils/webSocketConfig';
import { useSelector } from "react-redux";

const ProductDetailPage = ({ params: { product } }) => {
  const [comments, setComments] = useState({});
  const [newComment, setNewComment] = useState("");
  const [productData, setProductData] = useState({});
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    fetch("http://localhost:8000/api/products/" + product)
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
        setComments(data.comments);
      });
  }, []);

  useEffect(() => {
    const handleIncomingMessage = (event) => {
      const message = JSON.parse(event.data);
      setComments((prevComments) => [message, ...prevComments]);
    };

    WebSocketInstance.connect(
      `ws://localhost:8000/ws/product/${product}/comments/?user_id=${user.id}`
    );
    WebSocketInstance.handleIncomingMessage(handleIncomingMessage);

    return () => {
      WebSocketInstance.disconnect();
    };
  }, [product]);

  const sendComment = (e) => {
    e.preventDefault();
    if (newComment.trim() === "") return;
    WebSocketInstance.sendMessage(
      JSON.stringify({ type: "comment_message", message: newComment })
    );
    setNewComment("");
  };

  return (
    <>
      <div className="font-[sans-serif] bg-gray-600 mb-5">
        <div className="p-6 lg:max-w-5xl max-w-2xl max-lg:mx-auto">
          <div className="grid items-start grid-cols-1 lg:grid-cols-5 gap-12">
            <div className="lg:col-span-3 w-full lg:sticky top-0 text-center">
              <div className="bg-gray-700 px-4 py-5 rounded-xl">
                <img src={productData.image} alt="Product" />
              </div>
            </div>
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-extrabold text-yellow-300">
                {productData.name}
              </h2>
              <div className="flex flex-wrap gap-4 mt-4">
                <p className="text-yellow-300 text-4xl font-bold">
                  {productData.price} $
                </p>
              </div>

              <div className="mt-8">
                <h3 className="text-lg font-bold text-yellow-300">
                  About the {productData.name}
                </h3>
                <p className="text-white py-3">{productData.name}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <form className="flex gap-3">
        <input
          type="text"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          className="border flex-1 rounded p-3 mb-4"
          placeholder="Add comment"
        />
        <div>
          <button
            onClick={sendComment}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold px-4 py-3 rounded"
          >
            Add Comment
          </button>
        </div>
      </form>

      {Object.keys(comments).map((comment, index) => (
        <Comment key={index} comment={comments[comment]} />
      ))}
    </>
  );
};

export default ProductDetailPage;
