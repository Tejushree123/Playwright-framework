//export const BASE_URL = "https://www.saucedemo.com/";
//in real life project each environment have diff URL

const ENV_URL ={
    dev : "https://www.saucedemo.com/",
    qa : "https://www.saucedemo.com/",
    stage : "https://www.saucedemo.com/",
    prod : "https://www.saucedemo.com/",
}

//line that tells us which url to pick
//process is a Node.js object.which stores environment variables.
const ENV = (process.env.ENV || "prod").trim();

const url = ENV_URL[ENV as keyof typeof ENV_URL];

export const BASE_URL =url
export const USERNAME =process.env.SAUCE_USERNAME || "standard_user";
export const PASSWORD=process.env.SAUCE_PASSWORD || "secret_sauce";