import https from "https";

export const HOST = "34.124.235.0";

export const agent = new https.Agent({
    rejectUnauthorized: false,
});
