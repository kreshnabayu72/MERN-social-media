import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UploadPost } from "../store/post/post-action";

function UploadPage() {
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    if (image) {
      setImageUrl(URL.createObjectURL(image));
    }
  }, [image]);

  const user = useSelector((state) => state.auth.loggedUser.user);
  const dispatch = useDispatch();

  const SubmitHandler = async (e) => {
    const formData = new FormData();
    e.preventDefault();
    try {
      formData.append("userId", user._id);
      formData.append("description", description);
      formData.append("image", image);

      dispatch(UploadPost(formData));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <main className="flex-center-center-column">
      <form
        className="flex-center align-center"
        onSubmit={(e) => {
          SubmitHandler(e);
        }}
      >
        <h1>Upload post</h1>
        <input
          type="file"
          name="uploadImage"
          id="uploadImage"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <label className="upload-label flex-center" htmlFor="uploadImage">
          <div className="upload-image flex-center-center">
            {image ? (
              <img src={imageUrl} alt="" />
            ) : (
              <div>
                <i className="bi bi-camera-fill"></i>
              </div>
            )}
          </div>
        </label>

        <div>
          <p>Write something</p>
          <textarea
            onChange={(e) => setDescription(e.target.value)}
            cols="30"
            rows="10"
            value={description}
          ></textarea>
        </div>
        <input type="submit" value="Post" />
      </form>
    </main>
  );
}

export default UploadPage;
