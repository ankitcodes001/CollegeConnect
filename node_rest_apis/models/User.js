const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            require: true,
            min: 5,
            max: 20,
            unique: true,
        },

        email: {
            type: String,
            require: true,
            unique: true,
            max: 50,




        },

        password: {
            type: String,
            require: true,
            unique: true,
            min: 6,
            max: 10,

        },

        profilePicture: {
            type: String,

            default: "",



        },

        coverPicture: {
            type: String,
            default: "",
        },

        follower: {
            type: Array,
            default: [],


        },
        following: {
            type: Array,
            default: [],


        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        desc: {
            type: String,
            max: 50,

        },
        city: {
            type: String,
            max: 20,
        },
        from: {
            type: String,
            max: 20,
        },
        relationship: {
            type: Number,
            enum:[1,2,3,4],
        },


    }, {
        timeStamps: true
    }

);



module.exports = mongoose.model("User", UserSchema)