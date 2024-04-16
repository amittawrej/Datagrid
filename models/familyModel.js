import mongoose from "mongoose";

const familyMemberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  birthdate: { type: Date, required: true },
  maritalStatus: {
    type: String,
    enum: ["Married", "Unmarried"],
    required: true,
  },
  weddingDate: { type: Date },
  education: { type: String, required: false },
  photo: { type: String, required: false },
  mobileNo: { type: String, required: true } 
});

const familySchema = new mongoose.Schema({
  headOfFamily: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    birthdate: { type: Date, required: true },
    mobileNo: { type: String, required: true },
    address: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    pincode: { type: String, required: true },
    maritalStatus: {
      type: String,
      enum: ["Married", "Unmarried"],
      required: true,
    },
    weddingDate: { type: Date },
    hobbies: [{ type: String }]
  },
  familyMembers: [familyMemberSchema] 
});

const Family = mongoose.model("Family", familySchema);

export default Family;
