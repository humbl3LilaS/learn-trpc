import {client} from "../client.ts";

export const getSayHi = async () => {
    const message = await client.sayHi.query();

    return message;
}