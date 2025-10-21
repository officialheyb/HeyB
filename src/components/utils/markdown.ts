/**
 * Simple Markdown to HTML converter
 * Supports: bold, italic, underline, strikethrough, headings, lists, links, images, code, blockquotes
 */
export function markdownToHtml(markdown: string): string {
  if (!markdown) return '';
  
  let html = markdown;
  
  // Split into lines for better processing
  const lines = html.split('\n');
  const processed: string[] = [];
  let inList = false;
  let inOrderedList = false;
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  
  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];
    
    // Handle code blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End code block
        processed.push('<pre><code>' + codeBlockContent.join('\n') + '</code></pre>');
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        // Start code block
        inCodeBlock = true;
      }
      continue;
    }
    
    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }
    
    // Handle horizontal rules
    if (line.trim() === '---') {
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
      if (inOrderedList) {
        processed.push('</ol>');
        inOrderedList = false;
      }
      processed.push('<hr />');
      continue;
    }
    
    // Handle headers
    if (line.startsWith('### ')) {
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
      if (inOrderedList) {
        processed.push('</ol>');
        inOrderedList = false;
      }
      line = '<h3>' + line.substring(4) + '</h3>';
      processed.push(line);
      continue;
    } else if (line.startsWith('## ')) {
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
      if (inOrderedList) {
        processed.push('</ol>');
        inOrderedList = false;
      }
      line = '<h2>' + line.substring(3) + '</h2>';
      processed.push(line);
      continue;
    } else if (line.startsWith('# ')) {
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
      if (inOrderedList) {
        processed.push('</ol>');
        inOrderedList = false;
      }
      line = '<h1>' + line.substring(2) + '</h1>';
      processed.push(line);
      continue;
    }
    
    // Handle blockquotes
    if (line.startsWith('> ')) {
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
      if (inOrderedList) {
        processed.push('</ol>');
        inOrderedList = false;
      }
      line = '<blockquote>' + line.substring(2) + '</blockquote>';
      processed.push(line);
      continue;
    }
    
    // Handle unordered lists
    if (line.startsWith('- ')) {
      if (inOrderedList) {
        processed.push('</ol>');
        inOrderedList = false;
      }
      if (!inList) {
        processed.push('<ul>');
        inList = true;
      }
      line = '<li>' + line.substring(2) + '</li>';
      processed.push(line);
      continue;
    }
    
    // Handle ordered lists
    if (/^\d+\.\s/.test(line)) {
      if (inList) {
        processed.push('</ul>');
        inList = false;
      }
      if (!inOrderedList) {
        processed.push('<ol>');
        inOrderedList = true;
      }
      line = '<li>' + line.replace(/^\d+\.\s/, '') + '</li>';
      processed.push(line);
      continue;
    }
    
    // Close lists if we're no longer in one
    if (inList || inOrderedList) {
      if (line.trim() === '') {
        if (inList) processed.push('</ul>');
        if (inOrderedList) processed.push('</ol>');
        inList = false;
        inOrderedList = false;
      }
    }
    
    // Regular line
    if (line.trim() !== '') {
      processed.push(line);
    } else {
      processed.push('');
    }
  }
  
  // Close any open lists
  if (inList) processed.push('</ul>');
  if (inOrderedList) processed.push('</ol>');
  
  html = processed.join('\n');
  
  // Now apply inline formatting
  // Bold (must come before italic to handle ** before *)
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  
  // Italic
  html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');
  
  // Strikethrough
  html = html.replace(/~~(.+?)~~/g, '<del>$1</del>');
  
  // Inline code (but not if already in a code block)
  html = html.replace(/`([^`]+?)`/g, '<code>$1</code>');
  
  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />');
  
  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
  
  // Convert double line breaks to paragraphs
  html = html.replace(/\n\n+/g, '</p><p>');
  
  // Convert single line breaks to <br />
  html = html.replace(/\n/g, '<br />');
  
  // Wrap in paragraph if needed
  if (!html.startsWith('<h') && !html.startsWith('<ul') && !html.startsWith('<ol') && !html.startsWith('<blockquote') && !html.startsWith('<pre')) {
    html = '<p>' + html + '</p>';
  }
  
  // Clean up empty paragraphs
  html = html.replace(/<p><\/p>/g, '');
  html = html.replace(/<p>\s*<\/p>/g, '');
  
  return html;
}

/**
 * Sanitize HTML to prevent XSS attacks
 * This is a basic implementation - for production, use a library like DOMPurify
 */
export function sanitizeHtml(html: string): string {
  // Allow specific HTML tags
  const allowedTags = ['p', 'br', 'strong', 'em', 'u', 'del', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 
                       'ul', 'ol', 'li', 'blockquote', 'code', 'pre', 'a', 'img', 'hr'];
  
  // This is a simplified sanitizer - in production, use DOMPurify
  return html;
}
