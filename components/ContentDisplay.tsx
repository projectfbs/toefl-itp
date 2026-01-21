
import React from 'react';

// Basic markdown to HTML converter
const markdownToHtml = (text: string): string => {
  let html = text
    // Headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-semibold mt-4 mb-2">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-6 mb-3 border-b pb-2">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-8 mb-4 border-b-2 pb-2">$1</h1>')
    // Bold and Italic
    .replace(/\*\*\*(.*?)\*\*\*/gim, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.*?)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/gim, '<em>$1</em>')
    // Unordered lists
    .replace(/^\s*\n\*/gm, '<ul>\n*')
    .replace(/^(\*.+)\s*\n([^*])/gm, '$1\n</ul>\n$2')
    .replace(/^\* (.*$)/gim, '<li>$1</li>')
    // Ordered lists
    .replace(/^\s*\n\d\./gm, '<ol>\n1.')
    .replace(/^(\d\..+)\s*\n([^\d\.])/gm, '$1\n</ol>\n$2')
    .replace(/^\d\. (.*$)/gim, '<li>$1</li>')
    // Blockquotes
    .replace(/^> (.*$)/gim, '<blockquote class="border-l-4 border-slate-300 pl-4 italic my-4">$1</blockquote>')
    // Line breaks
    .replace(/\n/g, '<br />');

  // Clean up lists that might be at the end of the text
  if (!html.endsWith('</ul>')) {
    html = html.replace(/<\/li><br \/>/g, '</li>');
  }
   if (!html.endsWith('</ol>')) {
    html = html.replace(/<\/li><br \/>/g, '</li>');
  }

  return html;
};


interface ContentDisplayProps {
  content: string;
}

const ContentDisplay: React.FC<ContentDisplayProps> = ({ content }) => {
  const htmlContent = markdownToHtml(content);
  return (
    <div 
      className="prose prose-slate max-w-none lg:prose-lg"
      dangerouslySetInnerHTML={{ __html: htmlContent }}
    />
  );
};

export default ContentDisplay;
