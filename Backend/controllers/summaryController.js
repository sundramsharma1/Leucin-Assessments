const supabase = require('../db/supabase');
const { IncomingWebhook } = require('@slack/webhook');
const { Groq } = require("groq-sdk");


const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});


const slackWebhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL);

const generateAndSendSummary = async (req, res) => {
  try {
    
    const { data: todos, error: dbError } = await supabase
      .from('todos')
      .select('*')
      .eq('completed', false)
      .order('created_at', { ascending: false });

    if (dbError) throw new Error(`Database error: ${dbError.message}`);
    if (!todos || todos.length === 0) {
      return res.status(400).json({ 
        success: false,
        message: "No pending todos found" 
      });
    }

    
    const summary = await generateLLMSummary(todos);
    
    
    await sendToSlack(summary);

    res.json({ 
      success: true,
      summary: summary 
    });

  } catch (error) {
    console.error("Summary error:", error);
    
   
    const fallbackSummary = generateFallbackSummary(todos);
    
    res.status(500).json({
      success: false,
      message: error.message,
      fallbackSummary: fallbackSummary 
    });
  }
};


const generateLLMSummary = async (todos) => {
  try {
    const todoList = todos.map(t => `- ${t.task}`).join('\n');
    
    const prompt = `
      Summarize these pending tasks in a professional tone:
      - Keep it under 2 sentences
      
      Todos:
      ${todoList}
    `;

    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "meta-llama/llama-4-scout-17b-16e-instruct", 
      temperature: 0.7,
      max_tokens: 200,
    });

    return response.choices[0]?.message?.content || "No summary generated";

  } catch (error) {
    console.error("Groq API error:", error);
    throw new Error("Failed to generate AI summary");
  }
};


const sendToSlack = async (summary) => {
  try {
    await slackWebhook.send({
      text: `*Todo Summary*\n${summary}`,
      mrkdwn: true,
    });
  } catch (error) {
    console.error("Slack error:", error);
    throw new Error("Message sent but Slack delivery failed");
  }
};


const generateFallbackSummary = (todos) => {
  if (!todos) return "No pending tasks";
  
  const grouped = todos.reduce((acc, todo) => {
    const category = todo.task.includes('buy') ? 'Shopping' :
                     todo.task.includes('call') ? 'Communications' :
                     'Other';
    acc[category] = [...(acc[category] || []), todo.task];
    return acc;
  }, {});

  return Object.entries(grouped)
    .map(([category, tasks]) => 
      `*${category}:*\n${tasks.map(t => `- ${t}`).join('\n')}`
    )
    .join('\n\n');
};

module.exports = {
  generateAndSendSummary
};