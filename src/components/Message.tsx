import { cn } from "@/lib/utils";
import { Bot, User } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ReactMarkdown from "react-markdown";

interface MessageProps {
  content: string;
  isUserMessage: boolean;
}

export const Message = ({ content, isUserMessage }: MessageProps) => {
  const sanitizedContent = content
    .replace(/\n{3,}/g, "\n\n") // Replace 3 or more newlines with 2
    .replace(/(?<!`)`([^`]+)`(?!`)/g, "$1"); // Remove single backticks while preserving text

  return (
    <div className="dark:bg-zinc-800 bg-white">
      <div className="p-6">
        <div className="max-w-3xl mx-auto flex items-start gap-2.5">
          <div
            className={cn(
              "size-10 shrink-0 aspect-square rounded-full border border-zinc-700 dark:bg-zinc-900 bg-white flex justify-center items-center",
              {
                "dark:bg-violet-950 bg-violet-700 border-violet-700 text-zinc-200":
                  !isUserMessage,
              }
            )}
          >
            {isUserMessage ? (
              <User className="size-5 dark:text-white text-zinc-900" />
            ) : (
              <Bot className="size-5" />
            )}
          </div>

          <div className="flex flex-col ml-6 w-full">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-semibold text-gray-900 dark:text-white">
                {isUserMessage ? "You" : "Solana GPT"}
              </span>
            </div>

            <div className="text-sm font-normal py-2.5 text-gray-900 dark:text-white">
              <ReactMarkdown
                components={{
                  a: ({ node, ref, ...props }) => (
                    <Link
                      {...props}
                      href={props.href ?? ""}
                      className="text-primary hover:underline"
                    />
                  ),
                  p: ({ node, ...props }) => {
                    return <p {...props} className="mt-3 first:mt-0" />;
                  },
                  ul: ({ node, ...props }) => {
                    return (
                      <ul
                        {...props}
                        className="mt-3 list-inside list-disc first:mt-0"
                      />
                    );
                  },
                  li: ({ node, ...props }) => {
                    return <li {...props} className="mt-1" />;
                  },
                  code: ({ node, inline, className, children, ...props }) => {
                    return (
                      <div className="my-2">
                        <CodeBlock
                          inline={inline}
                          className={className}
                          content={String(children)}
                          {...props}
                        />
                      </div>
                    );
                  },
                }}
              >
                {sanitizedContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CodeBlock = ({
  inline,
  className,
  content,
  ...props
}: {
  inline?: boolean;
  className?: string;
  content: string;
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  if (inline) {
    return (
      <code
        {...props}
        className={`dark:bg-zinc-950 bg-zinc-100 dark:text-white text-zinc-900 px-1 py-0.5 rounded-[px]`}
      >
        {content}
      </code>
    );
  }

  return (
    <div className="relative group">
      <pre
        {...props}
        className={`dark:bg-zinc-950 bg-zinc-100 dark:text-white text-zinc-900 p-4 rounded-[px] overflow-x-auto whitespace-pre md:w-full sm:w-[525px] w-[225px]`}
      >
        <code className={`${className} whitespace-pre-wrap`}>{content}</code>
      </pre>
      <button
        onClick={handleCopy}
        className="absolute top-2 right-2 dark:bg-zinc-800 bg-white dark:text-white text-zinc-900 px-2 py-1 text-xs rounded-[px] opacity-0 group-hover:opacity-100 transition-opacity"
      >
        {copied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};
