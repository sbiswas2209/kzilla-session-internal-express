const { ObjectID } = require("bson");
const database = require("../../shared/database");
async function addNote(name, content) {
    try {
        await (await database()).collection("notes").insertOne({ name: name, content: content || "" });
        return true;
    } catch (e) {
        return false;
    }
}

async function getNotes(id) {
    try {
        const data = await (await database()).collection("notes").find(id != undefined ? { _id: new ObjectID(id) } : {}).toArray();
        return data;
    } catch (e) {
        console.warn(e)
        return -1;
    }
}

module.exports = {
    addNote,
    getNotes
}