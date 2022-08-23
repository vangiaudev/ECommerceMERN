module.exports = {
    multipleMongooseToObject: (mongooseArray) => {
        return mongooseArray.map((mongooseItem) => mongooseItem.toObject());
    },
    mongooseToObject: (mongoose) => {
        return mongoose ? mongoose.toObject() : mongoose;
    },
};
