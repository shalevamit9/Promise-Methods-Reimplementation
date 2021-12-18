import log from "@ajar/marker";
import { saySomething } from "./myModule.js";

const response = saySomething("hello");
// const response = saySomething(22); // <-- will not compile when - "noEmitOnError": true 
log.magenta(response);

// console.log(process.argv)


