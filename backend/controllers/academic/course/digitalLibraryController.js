import axios from 'axios';
import { InferenceClient } from "@huggingface/inference";

export default function digitalLibraryController(req, res){

    const AI_KEY = process.env.HUGGINGFACE_API_KEY;

    try{
        const {query} = req.body;

        const client = new InferenceClient(process.env.HUGGINGFACE_API_KEY);
        
        const prompt = `summarize the given topic/book of ${query} about the given content explain very simple note with detaily`;

        const chatCompletion = await client.chatCompletion({
        model: "zai-org/GLM-4.6",
        messages: [{ role: "user", content: prompt }],
        });

        finalContent = chatCompletion?.choices?.[0]?.message?.content;

        if(finalContent){
            return res.status(200).json({finalContent});
        }
        return res.status(404).json({message:"Given Content is Not Available"});


    }
}