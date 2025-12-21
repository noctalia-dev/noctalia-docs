import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

// Helper function to generate ID from question text
function generateId(question: string): string {
  return question
    .toLowerCase()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .trim();
}

// Helper function to extract text from HTML tags
function extractText(html: string): string {
  return html
    .replace(/<[^>]*>/g, '') // Remove HTML tags
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .trim();
}

export const GET: APIRoute = async () => {
  try {
    // Get the FAQ page from the docs collection
    const faqPages = await getCollection('docs', ({ id }) => {
      return id === 'getting-started/faq';
    });

    if (faqPages.length === 0) {
      return new Response(
        JSON.stringify({ error: 'FAQ page not found' }),
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Read the FAQ file directly for parsing
    // Get the project root directory
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const projectRoot = path.resolve(__dirname, '../../..');
    const filePath = path.join(projectRoot, 'src', 'content', 'docs', 'getting-started', 'faq.mdx');
    
    let body: string;
    try {
      body = await fs.readFile(filePath, 'utf-8');
    } catch (fileError) {
      // Fallback: try using process.cwd() if available
      try {
        const altPath = path.join(process.cwd(), 'src', 'content', 'docs', 'getting-started', 'faq.mdx');
        body = await fs.readFile(altPath, 'utf-8');
      } catch {
        return new Response(
          JSON.stringify({ error: 'Could not read FAQ file' }),
          {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
          }
        );
      }
    }

    // Parse the markdown to extract FAQs
    const faqs: Array<{
      id: string;
      question: string;
      answer: string;
      category: string;
    }> = [];

    // Split by category headings (## ...)
    const categoryRegex = /^## (.+)$/gm;
    const sections = body.split(categoryRegex);
    
    let currentCategory = 'general';
    let i = 0;

    // Process sections (odd indices are category names, even indices are content)
    while (i < sections.length) {
      if (i % 2 === 1) {
        // This is a category name
        currentCategory = sections[i].trim().toLowerCase().replace(/\s+/g, '-');
      } else if (i > 0) {
        // This is content for the previous category
        const content = sections[i];
        
        // Extract all <details> blocks
        const detailsRegex = /<details>([\s\S]*?)<\/details>/g;
        let match;
        
        while ((match = detailsRegex.exec(content)) !== null) {
          const detailsContent = match[1];
          
          // Extract question from <summary>
          const summaryMatch = detailsContent.match(/<summary>([\s\S]*?)<\/summary>/);
          if (!summaryMatch) continue;
          
          const questionHtml = summaryMatch[1];
          const question = extractText(questionHtml);
          
          // Extract answer (everything after </summary>)
          const answerHtml = detailsContent.replace(/<summary>[\s\S]*?<\/summary>/, '').trim();
          
          // Convert markdown in answer to plain text (remove HTML tags, keep content)
          let answer = extractText(answerHtml);
          
          // Clean up the answer - remove excessive whitespace
          answer = answer.replace(/\n\s*\n\s*\n/g, '\n\n').trim();
          
          if (question && answer) {
            faqs.push({
              id: generateId(question),
              question,
              answer,
              category: currentCategory,
            });
          }
        }
      }
      i++;
    }

    // If no FAQs were found with the category approach, try a simpler approach
    if (faqs.length === 0) {
      // Fallback: extract all details blocks without category grouping
      const detailsRegex = /<details>([\s\S]*?)<\/details>/g;
      let match;
      
      while ((match = detailsRegex.exec(body)) !== null) {
        const detailsContent = match[1];
        
        const summaryMatch = detailsContent.match(/<summary>([\s\S]*?)<\/summary>/);
        if (!summaryMatch) continue;
        
        const questionHtml = summaryMatch[1];
        const question = extractText(questionHtml);
        
        const answerHtml = detailsContent.replace(/<summary>[\s\S]*?<\/summary>/, '').trim();
        let answer = extractText(answerHtml);
        answer = answer.replace(/\n\s*\n\s*\n/g, '\n\n').trim();
        
        if (question && answer) {
          faqs.push({
            id: generateId(question),
            question,
            answer,
            category: 'general',
          });
        }
      }
    }

    return new Response(
      JSON.stringify(faqs),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Cache-Control': 'public, max-age=300', // Cache for 5 minutes
        },
      }
    );
  } catch (error) {
    console.error('Error fetching FAQs:', error);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch FAQs' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
};

