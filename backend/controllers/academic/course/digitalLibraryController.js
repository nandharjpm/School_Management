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
        
        

        // if(books.length == 0){
        //     return res.status(404).json({message:"No Books Found"})
        // }

        const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);
        const prompt = `summarize the given topic of ${query} content explain very simple a person can easily understand and show the content user firendly Interface and just provide the content dont make any unnecessary data like 'of course or user friendly summary and so on'`;

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