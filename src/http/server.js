import http from "http";

http
  .createServer(function (req, res) {
    res.setHeader("Content-Type", "application/json");
    res.writeHead(200);
    res.end(JSON.stringify({ message: "This is a JSON response" }));
  })
  .listen(7000, () => console.log(`Server running on port 7000`));
