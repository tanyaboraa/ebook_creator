const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc    Generate a book outline
// @route   POST /api/ai/generate-outline
// @access  Private
const generateOutline = async (req, res) => {
  try {
    const { topic, style, numChapters, description } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Please provide a topic" });
    }

    const prompt = `You are an expert book outline generator. Create a comprehensive book outline based on the following requirements:

Topic: "${topic}"
${description ? `Description: ${description}` : ""}
Writing Style: ${style}
Number of Chapters: ${numChapters || 5}

Requirements:
1. Generate exactly ${numChapters || 5} chapters
2. Each chapter title should be clear and engaging
3. Each chapter description should be 2-3 sentences
4. Chapters should follow a logical progression

Return ONLY a valid JSON array.

Example:
[
  {
    "title": "Chapter 1: Introduction",
    "description": "Overview of the topic."
  }
]`;

    // ✅ Updated model
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
      });

    const result = await model.generateContent(prompt);
    const response = result.response;
    const text = response.text();

    const startIndex = text.indexOf("[");
    const endIndex = text.lastIndexOf("]");

    if (startIndex === -1 || endIndex === -1) {
      return res.status(500).json({ message: "Failed to parse AI response." });
    }

    const jsonString = text.substring(startIndex, endIndex + 1);

    try {
      const outline = JSON.parse(jsonString);
      res.status(200).json({ outline });
    } catch (e) {
      res.status(500).json({ message: "AI response was not valid JSON." });
    }
  } catch (error) {
    console.error("Error generating outline:", error);
    res
      .status(500)
      .json({ message: "Server error during AI outline generation" });
  }
};

// @desc    Generate content for a chapter
// @route   POST /api/ai/generate-chapter-content
// @access  Private
// @desc    Generate content for a chapter
// @route   POST /api/ai/generate-chapter-content
// @access  Private
// @desc    Generate content for a chapter
// @route   POST /api/ai/generate-chapter-content
// @access  Private
const generateChapterContent = async (req, res) => {
    try {
      const { chapterTitle, chapterDescription, style } = req.body;
  
      if (!chapterTitle) {
        return res
          .status(400)
          .json({ message: "Please provide a chapter title" });
      }
  
      const prompt = `You are an expert writer specializing in ${style} content. Write a complete chapter for a book with the following specifications:

Chapter Title: "${chapterTitle}"
${chapterDescription ? `Chapter Description: ${chapterDescription}` : ""}
Writing Style: ${style}
Target Length: Comprehensive and detailed (aim for 1500-2500 words)

Requirements:
1. Write in a ${style.toLowerCase()} tone throughout the chapter
2. Structure the content with clear sections and smooth transitions
3. Include relevant examples, explanations, or anecdotes as appropriate for the style
4. Ensure the content flows logically from introduction to conclusion
5. Make the content engaging and valuable to readers
${chapterDescription ? `6. Cover all points mentioned in the chapter description` : ""}

Format Guidelines:
- Start with a compelling opening paragraph
- Use clear paragraph breaks for readability
- Include subheadings if appropriate for the content length
- End with a strong conclusion or transition to the next chapter
- Write in plain text without markdown formatting

Begin writing the chapter content now:`;
  
      const model = genAI.getGenerativeModel({
        model: "gemini-2.5-flash-lite",
      });
      
      const result = await model.generateContent(prompt);
      const response = result.response;
      const content = response.text();
      
      res.status(200).json({ content });
    } catch (error) {
      console.error("Error generating chapter:", error);
      res
        .status(500)
        .json({ message: "Server error during AI chapter generation" });
    }
  };

module.exports = {
  generateOutline,
  generateChapterContent,
};