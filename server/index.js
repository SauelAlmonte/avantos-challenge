const http = require('http');
const fs = require('fs');
const path = require('path');

// Create a server
const server = http.createServer((req, res) => {
    if (req.url.match(/\/api\/v1\/[^/]+\/actions\/blueprints\/[^/]+\/graph/)  && req.method === 'GET') {
        const filePath = path.join(__dirname, 'graph.json');

        // Read the graph.json file
        fs.readFile(filePath, 'utf8', (err, data) => {
            if (err) {
                res.writeHead(500, {'Content-Type': 'application/json'});
                res.end(JSON.stringify({error: 'Failed to load graph.json'}));
                return;
            }
            res.writeHead(200, {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'});
            res.end(data);
        });
    } else {
        // Handle 404 for other routes
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end(JSON.stringify({error: 'Resource not found!'}));
    }
});

// Start the server on port 3000
server.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});