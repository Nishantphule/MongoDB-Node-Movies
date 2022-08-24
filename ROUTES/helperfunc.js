import { client } from '../index.js';

export async function updateMovieById(id, data) {
    return await client.db("Nishant").collection("movies").updateOne({ _id: id }, { $set: data });
}
export async function createMovies(data) {
    return await client.db("Nishant").collection("movies").insertMany(data);
}
export async function deleteMovieById(id) {
    return await client.db("Nishant").collection("movies").deleteOne({ _id: id });
}
export async function getMovieById(id) {
    return await client.db("Nishant").collection("movies").findOne({  _id: id });
}
export async function getAllMovies(req) {
    return await client
        .db("Nishant")
        .collection("movies")
        .find(req.query) // req.query to apply filter from url -> e.g.->  ?language=english
        .toArray();
}
