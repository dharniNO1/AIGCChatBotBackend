class User {
  constructor(uid, email, expiryDate, isVIP, submissionCount) {
    this.uid = uid;
    this.email = email;
    this.expiryDate = expiryDate;
    this.isVIP = isVIP;
    this.submissionCount = submissionCount;
  }

  static fromSnapshot(snapshotData) {
    return new User(
      snapshotData.uid,
      snapshotData.email,
      snapshotData.expiryDate,
      snapshotData.isVIP,
      snapshotData.submissionCount
    );
  }

  // Add this method
  toObject() {
    return {
      uid: this.uid,
      email: this.email,
      expiryDate: this.expiryDate,
      isVIP: this.isVIP,
      submissionCount: this.submissionCount,
    };
  }
}

module.exports = { User };
