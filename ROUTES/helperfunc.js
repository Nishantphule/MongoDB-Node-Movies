import { ObjectId } from 'mongodb';
import { client } from '../index.js';

export async function updateMovieById(id, data) {
    return await client.db("Nishant").collection("movies").updateOne({ _id: ObjectId(id) }, { $set: data });
}
export async function createMovies(data) {
    return await client.db("Nishant").collection("movies").insertMany(data);
}
export async function deleteMovieById(id) {
    return await client.db("Nishant").collection("movies").deleteOne({ _id: ObjectId(id) });
}
export async function getMovieById(id) {
    return await client.db("Nishant").collection("movies").findOne({  _id: ObjectId(id) });
}
export async function getAllMovies(req) {
    return await client
        .db("Nishant")
        .collection("movies")
        .find(req.query) // req.query to apply filter from url -> e.g.->  ?language=english
        .toArray();
}


// users
export async function getUserByName(username) {
    return await client.db("Nishant").collection("users").findOne({  username: username });
}

export async function createUser(data) {
    return await client.db("Nishant").collection("users").insertOne(data);
}

