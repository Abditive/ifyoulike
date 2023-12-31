/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";

function Profile(props) {
  const [profileData, setProfileData] = useState([]);

  function handleDelete(id) {
    axios
      .delete(`/api/profile/${id}`)
      .then(() => {
        const updatedProfileData = profileData.filter(
          (item) => item._id !== id
        );
        setProfileData(updatedProfileData);
      })
      .catch((error) => {
        console.error("Error deleting:", error);
      });
  }
  useEffect(() => {
    axios
      .get("/api/profile")
      .then((response) => {
        setProfileData(response.data);
        console.log("inner" + response.data);
      })
      .catch((error) => {
        console.error("Error fetching profile data:", error);
      });
  }, []);

  return (
    <>
      {props.user ? (
        <>
          <h2>Recommendation History</h2>
          <div>
            {profileData.map((item, index) => (
              <div className="recommendation-history" key={index}>
                {item.saved_recommendation}
                <button onClick={() => handleDelete(item._id)}>Delete</button>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2>Log In To See History of Saved Recommendations</h2>
      )}
    </>
  );
}

export default Profile;
