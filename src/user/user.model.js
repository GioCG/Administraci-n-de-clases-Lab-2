import { Schema, model } from "mongoose";

const UserSchema = Schema({
    name: { type: String, required: true },
    surname:{type: String, require:true},
    email: { type: String, required: true, unique: true },
    password: { type: String, required: [true, "Password required"], minLength: 8, },
    role: { type: String, enum: ['TEACHER_ROLE', 'STUDENT_ROLE'], default:"STUDENT_ROLE"},
    class: [{type: Schema.Types.ObjectId, ref: "Course",},],
    enrolledCourses: [{type: Schema.Types.ObjectId,ref: "Course",
        validate: [
            {
              validator: function (val) {
                return val.length <= 3; 
              },
              message: "Un estudiante solo puede estar inscrito en un máximo de 3 cursos",
            },
        ],},],
    estado: {type: Boolean,default: true,},
    },
    {timestamps: true,versionKey: false,});


UserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...usuario } = this.toObject();
  usuario.uid = _id;
  return usuario;
};

export default model("User", UserSchema);
