const serverUrl = process.env.SERVER_URL ?? "http://localhost:8080";

const response = await fetch(serverUrl);
const text = await response.text();

console.log(`Client connected to ${serverUrl}`);
console.log(`Server response: ${text}`);
