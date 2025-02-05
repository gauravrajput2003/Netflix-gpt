import { GoogleGenerativeAI } from "@google/generative-ai";
import { GPT_API } from "./Contsant";

const genAI = new GoogleGenerativeAI(GPT_API); // Replace with your actual API key
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export { model };