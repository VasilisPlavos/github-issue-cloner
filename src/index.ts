import 'dotenv/config';
import { Cloner } from "./cloner";

async function process(){
const cloner = new Cloner();
await cloner.cloneIssues();
}

process();