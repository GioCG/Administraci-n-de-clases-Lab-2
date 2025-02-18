import {Schema, model} from "mongoose";

const ClassSchema = Schema({
    name: { type: String, required: true },
    description: { type: String, required: [true, "Descripción es requerida"], },
    teacher: {type: Schema.Types.ObjectId,ref: "User",required: [true, "Maestro requerido"],},
    students: [{type: Schema.Types.ObjectId,ref: "User",},]
},
{timestamps: true,versionKey: false,})

export default model('Class', ClassSchema);
