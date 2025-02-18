import {Schema, model} from "mongoose";

const ClassSchema = Schema({
    name: { type: String, required: true },
    description: { type: String },
    teacher: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'User' }],
})

export default model('Class', ClassSchema);
