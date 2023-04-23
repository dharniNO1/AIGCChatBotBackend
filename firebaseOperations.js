async function addUser(db, user) {
  try {
    const docRef = db.collection("users").doc();
    await docRef.set(user);
    console.log(`User added with ID: ${docRef.id}`);
    return user;
  } catch (error) {
    console.error(error);
    throw new Error("Error adding user");
  }
}

async function updateUserSubmissionCount(db, uid) {
  try {
    const usersCollection = db.collection("users");
    const query = usersCollection.where("uid", "==", uid);
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      console.error(`User with UID ${uid} does not exist`);
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    const userData = userDoc.data();

    const newSubmissionCount = userData.submissionCount - 1;
    await userDoc.ref.update({ submissionCount: newSubmissionCount });

    console.log(`User ${uid} submissionCount updated to ${newSubmissionCount}`);

    // Update the local userData object and return it
    userData.submissionCount = newSubmissionCount;
    return userData;
  } catch (error) {
    console.error("Error updating user submission count: ", error);
    return null;
  }
}

async function getUserInfo(db, uid) {
  try {
    const usersCollection = db.collection("users");
    const query = usersCollection.where("uid", "==", uid);
    const querySnapshot = await query.get();

    if (querySnapshot.empty) {
      console.error(`User with UID ${uid} does not exist`);
      return null;
    }

    const userDoc = querySnapshot.docs[0];
    return userDoc.data();
  } catch (error) {
    console.error("Error fetching user info: ", error);
    return null;
  }
}

module.exports = { addUser, updateUserSubmissionCount, getUserInfo };
