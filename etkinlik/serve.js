"use strict";

const { createServer } = require("node:http");
const { readFile } = require("node:fs/promises");
const { resolve, extname } = require("node:path");

const files = new Map([
    ["/", "index.html"],
    ["/etkinlik/", "etkinlik/index.html"],
    ...[
        "index.html", "wallet.js", "wallet.css",
        "etkinlik/index.html", "etkinlik/app.js", "etkinlik/config.js", "etkinlik/style.css",
        "node_modules/ethers/dist/ethers.umd.min.js", "src/EtkinlikKaydiV3.abi.json"
    ].map((file) => ["/" + file, file])
]);
const mime = {
    ".html": "text/html",
    ".js": "text/javascript",
    ".css": "text/css",
    ".json": "application/json"
};

createServer(async (request, response) => {
    const path = request.url.split("?")[0];
    const file = files.get(path);
    if (!file || !["GET", "HEAD"].includes(request.method)) {
        response.writeHead(404).end();
        return;
    }
    try {
        const data = await readFile(resolve(__dirname, "..", file));
        response.writeHead(200, { "Content-Type": mime[extname(file)] + "; charset=utf-8" });
        response.end(request.method === "HEAD" ? undefined : data);
    } catch {
        response.writeHead(404).end();
    }
}).listen(8000, "127.0.0.1", () => {
    console.log("http://127.0.0.1:8000/etkinlik/");
});
