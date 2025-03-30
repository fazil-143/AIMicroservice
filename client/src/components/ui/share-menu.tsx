import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Share2 } from "lucide-react";
import { 
  FaTwitter, 
  FaFacebook, 
  FaLinkedin, 
  FaReddit, 
  FaLink, 
  FaEnvelope 
} from "react-icons/fa";

interface ShareMenuProps {
  title: string;
  content: string;
}

export function ShareMenu({ title, content }: ShareMenuProps) {
  // Function to encode content for sharing via URLs
  const getEncodedContent = (fullContent: string) => {
    // Truncate content if it's too long (most platforms have character limits)
    const truncatedContent = fullContent.length > 500 
      ? fullContent.substring(0, 497) + "..." 
      : fullContent;
    
    return encodeURIComponent(`${title}\n\n${truncatedContent}`);
  };

  // Current URL to be replaced with actual URL where content is hosted (if applicable)
  const currentURL = window.location.href;
  
  const encodedTitle = encodeURIComponent(title);
  const encodedContent = getEncodedContent(content);

  // Sharing URLs for different platforms
  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodeURIComponent(currentURL)}`;
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentURL)}&quote=${encodedContent}`;
  const linkedinUrl = `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentURL)}&title=${encodedTitle}&summary=${encodedContent}`;
  const redditUrl = `https://www.reddit.com/submit?url=${encodeURIComponent(currentURL)}&title=${encodedTitle}`;
  const emailUrl = `mailto:?subject=${encodedTitle}&body=${encodedContent}%0A%0A${encodeURIComponent(currentURL)}`;

  // Copy to clipboard function
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`${title}\n\n${content}`);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Share2 className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <DropdownMenuItem asChild>
          <a 
            href={twitterUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center"
          >
            <FaTwitter className="mr-2 h-4 w-4 text-[#1DA1F2]" />
            Share on Twitter
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a 
            href={facebookUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center"
          >
            <FaFacebook className="mr-2 h-4 w-4 text-[#4267B2]" />
            Share on Facebook
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a 
            href={linkedinUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center"
          >
            <FaLinkedin className="mr-2 h-4 w-4 text-[#0A66C2]" />
            Share on LinkedIn
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <a 
            href={redditUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex cursor-pointer items-center"
          >
            <FaReddit className="mr-2 h-4 w-4 text-[#FF4500]" />
            Share on Reddit
          </a>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <a 
            href={emailUrl}
            className="flex cursor-pointer items-center"
          >
            <FaEnvelope className="mr-2 h-4 w-4 text-gray-600" />
            Share via Email
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={copyToClipboard} className="flex cursor-pointer items-center">
          <FaLink className="mr-2 h-4 w-4 text-gray-600" />
          Copy to Clipboard
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}