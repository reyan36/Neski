// At the top of the file
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');

const app = express();
app.use(cors());
app.use(express.json());
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// ---------------- HEALTH CHECK ROUTE ----------------
app.get('/api/health', (req, res) => {
  res.json({ ok: true });
});

// ---------------- AI RECOMMENDATIONS ROUTE ----------------
app.post('/api/recommendations', async (req, res) => {
    console.log("🚀 Starting AI Recommendation (via Groq)...");

    try {
        const { userId } = req.body;

        // 1. Get User Data
        const { data: profile } = await supabase
            .from('profiles')
            .select('interests')
            .eq('id', userId)
            .single();

        console.log("👤 User Interests:", profile?.interests);
        
        // --- NEW CHECK: Stop here if no interests exist ---
        if (!profile || !profile.interests || profile.interests.length === 0) {
            console.log("User has no interests. Skipping AI.");
            return res.json({ recommendations: [] });
        }
        // -------------------------------------------------
        // 2. Get Service Data
        const { data: services } = await supabase
            .from('services')
            .select('id, title, description, type'); // Sending specific fields

        // 3. Call GROQ API
        const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROK_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { 
                        role: "system", 
                        content: "You are a smart semantic matching engine. You output ONLY a JSON array of IDs." 
                    },
                    { 
                        role: "user", 
                        content: `
                        User Interests: ${profile.interests ? profile.interests.join(', ') : 'None'}.
                        
                        Available Services:
                        ${JSON.stringify(services)}
                        
                        *** MATCHING RULES ***
                        1. **Semantic Matching:** Understand context. 
                           - If interest is "Coding", match with "Web Design", "Software", "React", "PC".
                           - If interest is "Cooking", match with "Baking", "Food", "Chef".
                        
                        2. **Title Priority:** The 'title' is the most important field. If the Title is a strong match, ignore a bad description (like "123" or "test").
                        
                        3. **Strict Filtering:** 
                           - If the user likes "Cooking", DO NOT return "Gardening".
                           - If the user likes "Tech", DO NOT return "Cleaning".
                           - If no services match the interests, return an empty array [].
                        
                        4. **Quantity:** Return a maximum of 3 items. It is better to return 0 or 1 strong match than 3 weak matches.
                        
                        Return ONLY the JSON array of IDs.
                        ` 
                    }
                ],
                temperature: 0.1
            })
        });

        const aiData = await groqResponse.json();

        if (!groqResponse.ok) {
            console.error("❌ Groq API Error:", aiData);
            return res.status(500).json({ error: "AI Provider Error", details: aiData });
        }

        // 4. Parse Response
        let aiContent = aiData.choices[0].message.content;
        
        // --- X-RAY LOGS: SEE WHAT THE AI SAID ---
        console.log("🤖 Raw AI Output:", aiContent); 
        // ----------------------------------------

        aiContent = aiContent.replace(/```json/g, '').replace(/```/g, '').trim();
        const recommendedIds = JSON.parse(aiContent);
        
        console.log("🔑 Parsed IDs:", recommendedIds);

        // 5. Filter Services
        // Ensure we compare Strings to Strings to avoid Type Mismatch
        const recommendedServices = services.filter(s => 
            recommendedIds.map(String).includes(String(s.id))
        );
        
        console.log(`✨ Success! Returning ${recommendedServices.length} matches.`);
        res.json({ recommendations: recommendedServices });

    } catch (error) {
        console.error("🔥 Critical Error:", error.message);
        res.json({ recommendations: [] }); 
    }
});
// --- AI WAND ROUTE (Combined: Creator + Polisher) ---
app.post('/api/generate-description', async (req, res) => {
    try {
        const { title, type, hours, userDraft } = req.body;

        // 1. Validation
        if (!title) {
            return res.status(400).json({ error: "Title is required" });
        }

        console.log(`🪄 AI Request: "${title}" | Type: ${type} | Draft Length: ${userDraft ? userDraft.length : 0}`);

        // 2. Determine Mode (Create vs Rewrite)
        let modeInstruction = "";
        
        // If user typed more than 5 characters, we REWRITE what they wrote
        if (userDraft && userDraft.length > 5) {
            modeInstruction = `
            The user has written a rough draft: "${userDraft}".
            TASK: Rewrite and polish this draft. Fix grammar, make it sound professional yet friendly.
            Do not change the underlying meaning, just improve the delivery.`;
        } 
        // Otherwise, we CREATE from scratch
        else {
            modeInstruction = `
            The user has not written a description.
            TASK: Write a creative, inviting description from scratch based on the Title.`;
        }

        // 3. Determine Tone (Offer vs Request)
        let contextInstruction = "";
        if (type === 'offer' || type === 'volunteer') {
            contextInstruction = "Context: The user is OFFERING help. Sound reliable, skilled, and neighborly.";
        } else {
            contextInstruction = "Context: The user is REQUESTING help. Sound polite, appreciative, and clear.";
        }

        // 4. Call Grok (Llama 3)
        const groqResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROK_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile",
                messages: [
                    { 
                        role: "system", 
                        content: "You are an expert copywriter for a neighborhood app. You write short, punchy, human-sounding text." 
                    },
                    { 
                        role: "user", 
                        content: `
                        Service Details:
                        - Title: "${title}"
                        - Type: ${type || 'Service'}
                        - Time Commitment: ${hours || 'Flexible'} hours
                        
                        ${modeInstruction}
                        
                        Constraints:
                        1. ${contextInstruction}
                        2. Keep it under 30 words.
                        3. Use simple English.
                        4. End with 1 relevant emoji.
                        5. Return ONLY the final text. No quotes.
                        ` 
                    }
                ],
                temperature: 0.7
            })
        });

        const aiData = await groqResponse.json();
        
        if (!groqResponse.ok) {
            console.error("AI API Error:", aiData);
            throw new Error("AI Provider failed");
        }

        let generatedText = aiData.choices[0].message.content;
        
        // Clean up quotes
        generatedText = generatedText.replace(/^"|"$/g, '');

        res.json({ description: generatedText });

    } catch (error) {
        console.error("Wand Logic Error:", error.message);
        res.status(500).json({ error: "Failed to generate text" });
    }
});
// ---------------- SERVER ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => console.log(`Backend running on port ${PORT}`));