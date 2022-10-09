import express from 'express';
import cors from 'cors';

const app = express();

type CorsStaticOrigin = boolean | string | RegExp | boolean[] | string[] | RegExp[];
type CorsRequestOrigin = string | undefined;
type CorsCallback = (err: Error | null, origin?: CorsStaticOrigin) => void;

// Origins allowed to consume your resources
const allowlist = ['https://example.com'];

const corsOptions = {
    origin: (origin: CorsRequestOrigin, callback: CorsCallback) => {
        if(origin !== null && allowlist.indexOf(origin as string) !== 1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOptions));

app.get("/", (request, response) => {
    return response.json({
        message: "Hello, world!"
    })
});

app.listen(8080, () => {
    console.log("Server is running")
});