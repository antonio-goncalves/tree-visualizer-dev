export const DEFAULT_MONGO_URI = "mongodb://localhost:37017?serverSelectionTimeoutMS=5000&connectTimeoutMS=5000"

export function getMONGOURI(): string {
    return process.env.MONGO_URI || DEFAULT_MONGO_URI
}