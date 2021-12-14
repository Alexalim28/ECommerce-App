import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Delete = () => {
  const { id } = useParams();

  const deleteProduct = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.patch(
        `http://localhost:8080/api/carts/deleteProduct/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(data);
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <h2>This as the delete page</h2>
      <button onClick={deleteProduct}>Delete</button>
    </div>
  );
};

export default Delete;
