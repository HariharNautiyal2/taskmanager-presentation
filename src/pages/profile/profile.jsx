import "./profile.scss";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  updateProfile,
  updatePassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
} from "firebase/auth";
import { toast } from "react-toastify";
import { auth } from "../../firebase";
import { getUserById, updateUser, deleteUserAccount } from "../../queries/user";

const Profile = () => {
  const [uploadStatus, setUploadStatus] = useState("Idle");
  const { user } = useContext(AuthContext);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(
    user?.photoURL ??
      "https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
  );
  const [showPasswordFields, setShowPasswordFields] = useState(false);
  const [showUsernameFields, setShowUsernameFields] = useState(false);
  const [showDeleteFields, setShowDeleteFields] = useState(false);

  useEffect(() => {
    if (user) {
      getUserById(user.uid).then((userData) => {
        setUsername(userData.username || user.displayName);
      });
    }
  }, [user]);

  function handleProfileUpdate(e) {
    const file = e.currentTarget?.files[0];
    if (!file) return;

    setUploadStatus("Uploading");
    const storage = getStorage();
    const storageRef = ref(storage, `profile-pictures/${file.name}`);

    uploadBytes(storageRef, file)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .then((downloadURL) => {
        setUploadStatus("Uploaded");

        updateProfile(auth.currentUser, { photoURL: downloadURL }).then(() => {
          setPhoto(downloadURL);
          toast.success("Profile updated successfully!");
        });
      })
      .catch((error) => {
        setUploadStatus("Error");
        console.log(`Failed to upload file, please try again. ${error}`);
      })
      .finally(() => {
        setUploadStatus("Uploaded");
      });
  }

  function handleChangePassword() {
    if (!oldPassword) {
      toast.error("Please enter your old password.");
      return;
    }

    if (!newPassword || !confirmPassword) {
      toast.error("Please enter password.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    const creds = EmailAuthProvider.credential(
      auth.currentUser.email,
      oldPassword
    );

    toast.loading("Updating your password...");

    reauthenticateWithCredential(auth.currentUser, creds)
      .then(() => {
        updatePassword(auth.currentUser, newPassword)
          .then(() => {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
            setShowPasswordFields(false);

            toast.dismiss();
            toast.success("Password updated successfully.");
          })
          .catch((error) => {
            console.log(error);
            toast.dismiss();
            toast.error("Password update failed.");
          });
      })
      .catch((error) => {
        toast.dismiss();
        console.log(error);
        toast.error("Wrong password.");
      });
  }

  function handleChangeUsername() {
    updateUser(user.uid, { username })
      .then(() => {
        toast.success("Username updated successfully!");
        setShowUsernameFields(false);
      })
      .catch((error) => {
        toast.error("Could not change your username, please try again!");
        console.log(error);
      });
  }

  function handleDeleteAccount() {
    if (!oldPassword) {
      toast.error("Please enter your password to confirm.");
      return;
    }

    const creds = EmailAuthProvider.credential(
      auth.currentUser.email,
      oldPassword
    );

    toast.loading("Deleting your account...");

    reauthenticateWithCredential(auth.currentUser, creds)
      .then(() => {
        deleteUserAccount(user.uid)
          .then(() => {
            toast.dismiss();
            toast.success("Account deleted successfully.");
          })
          .catch((error) => {
            console.log(error);
            toast.dismiss();
            toast.error("Account deletion failed.");
          });
      })
      .catch((error) => {
        toast.dismiss();
        console.log(error);
        toast.error("Wrong password.");
      });
  }

  return (
    <div className="profile">
      <div className="profileContainer">
        <div className="profileContent">
          <div className="profileImage">
            <b className="text-2xl">Profile</b><br/>
            <div>
              <img src={photo} alt="" className="avatar" />
            </div>
            <div>
              <label className="addButton" htmlFor="profilePicture">
                +
                <input
                  id="profilePicture"
                  type="file"
                  className="hidden"
                  onChange={handleProfileUpdate}
                />
              </label>
            </div>
          </div>
          <div className="profileDetails">
            <h2><b>{username}</b></h2>
            <h2><b>USER</b></h2>
            {showPasswordFields ? (
              <div className="profileDetails">
                <h5>Enter Old Password</h5>
                <input
                  type="password"
                  placeholder="Enter"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="password-box"
                />
                <h5>Enter New Password</h5>
                <input
                  type="password"
                  placeholder="Enter"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="password-box"
                />
                <h5>Confirm New Password</h5>
                <input
                  type="password"
                  placeholder="Enter"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="password-box"
                />
                <button
                  className="update-delete-button"
                  onClick={handleChangePassword}
                >
                  Update Password
                </button>
              </div>
            ) : (
              <div>
                <button onClick={() => setShowPasswordFields(true)}>
                  <b>Change Password</b>
                </button>
                <br />
                <br />
                <br />
              </div>
            )}

            {showUsernameFields ? (
              <div className="profileDetails">
                <h5>New Username</h5>
                <input
                  type="text"
                  placeholder="Enter"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="username-box"
                />
                <button onClick={handleChangeUsername}>Update Username</button>
              </div>
            ) : (
              <div>
                <button onClick={() => setShowUsernameFields(true)}>
                  <b>Change Username</b>
                </button>
                <br />
                <br />
                <br />
              </div>
            )}

            {showDeleteFields ? (
              <div className="profileDetails">
                <h5>Enter Password to Confirm</h5>
                <input
                  type="password"
                  placeholder="Enter"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="password-box"
                />
                <button onClick={handleDeleteAccount}>Delete Account</button>
              </div>
            ) : (
              <div>
                <button onClick={() => setShowDeleteFields(true)}>
                  <b>Delete Account</b>
                </button>
                <br />
                <br />
                <br />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
