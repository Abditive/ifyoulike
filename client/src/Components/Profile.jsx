/* eslint-disable */
import { useEffect, useState } from "react";
import axios from "axios";

function Profile(props) {
  const [profileData, setProfileData] = useState([]);

  useEffect(() => {
    axios
      .get("https://ifyoulike.onrender.com/api/profile")
      .then((response) => {
        setProfileData(response.data);
        // Log each saved_recommendation
        for (let item of response.data) {
          console.log(item.saved_recommendation);
        }
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
