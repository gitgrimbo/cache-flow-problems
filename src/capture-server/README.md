# About

The capture server is a simple HTTP/HTTPS server that receives and records
Resource Timing capture data.

It listens for JSON data on the `/resources` endpoint.

# Run

    node src/capture-server

Passing the `--help` option will print the help.

````
Options:
  --captures-dir  The folder to store the captures.                         [default: "./.captures"]
  --https         Port to use for https.                                    [number] [default: 8081]
  --http          Port to use for http.                                     [number] [default: 8080]
  --help          Show help                                                                [boolean]
````

# HTTPS

The [bookmarklet](../client/README.md) needs to load script over HTTPS if a
manual capture is to be made of a page served over HTTPS.  This is due to the
mixed content policies of browsers.

- https://developer.mozilla.org/en-US/docs/Web/Security/Mixed_content
- https://developers.google.com/web/fundamentals/security/prevent-mixed-content/fixing-mixed-content?hl=en

This policy can prevent a couple of things:

- The bookmarklet being able to load the client script into the page via `<script>` tag.
- The client script being able to `POST` the captured data to the server.

In those cases, the bookmarklet must be used to manually collect the
resource timing data.

To generate the required `.pem` files for HTTPS, follow this guide.  The
commands can be executed in Git Bash.

- https://docs.nodejitsu.com/articles/HTTP/servers/how-to-create-a-HTTPS-server/

````bash
openssl genrsa -out key.pem
openssl req -new -key key.pem -out csr.pem
openssl x509 -req -days 9999 -in csr.pem -signkey key.pem -out cert.pem
rm csr.pem
````

Copy the remaining `.pem` files into the same folder as `server.js` (usually `/capture-server`).
