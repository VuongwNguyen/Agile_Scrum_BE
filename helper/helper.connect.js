require('dotenv').config();

const COLLECTION_NAME = process.env.COLLECTION_NAME || 'DBSample';

const BaseURL = `mongodb://localhost:27017/${COLLECTION_NAME}`;

const mongoose = require('mongoose');

let name = COLLECTION_NAME + "Sample";

// sample schema
const sampleSchema = new mongoose.Schema({
    field1: String,
    field2: Number,
}, {
    collection: name
});


const SampleModel = mongoose.model(COLLECTION_NAME, sampleSchema);

async function connect() {
    try {
        await mongoose.connect(BaseURL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        // kiêm tra xem collection đã tồn tại chưa
        const collections = await mongoose.connection.db.listCollections({ name: name }).toArray();

        if (collections.length === 0) {
            // tạo mới nêu chưa tồn tại
            await SampleModel.create({ field1: 'test', field2: 0 });
            console.log(`Collection ${COLLECTION_NAME} created.`);
        } else {
            // nếu đã tồn tại 
            // console.log(`Collection ${ COLLECTION_NAME } already exists.`);
        }

        console.log('Connected successfully!!!');
    } catch (error) {
        console.error('Connection failure!!!', error);
    }
}

module.exports = { connect };
