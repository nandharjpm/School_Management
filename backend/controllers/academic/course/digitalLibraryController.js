import axios from 'axios';
import { InferenceClient } from "@huggingface/inference";

export default async function digitalLibraryController(req, res){
    try{
        const query = req.query.query;

        if(!query){
            return res.status(400).json({message:"Book or related name is required"})
        }

        const googleRes = await axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&key=${process.env.GOOGLE_BOOKS_API_KEY}`);
        const books = googleRes.data.items || [];
        
        

        const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);
        const prompt = `summarize the given book about ${query} which can easily understand and show the content user firendly Interface and just provide the content of given book dont use * or # -- like that`;

        const chatCompletion = await client.chatCompletion({
        model: "zai-org/GLM-4.6",
        messages: [{ role: "user", content: prompt }],
        });

        const summary = chatCompletion?.choices?.[0]?.message?.content || 'No Content';
        
        return res.status(200).json({books, summary});
        
    }catch(err){
        return res.status(500).json({err});
    }
}