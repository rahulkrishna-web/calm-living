"use client"

import { Share2Icon, CheckIcon, CopyIcon } from "lucide-react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface ShareButtonProps {
  title: string
  text: string
  url: string
}

export function ShareButton({ title, text, url }: ShareButtonProps) {
  const [copied, setCopied] = useState(false)
  const [isShareSupported, setIsShareSupported] = useState(false)

  useEffect(() => {
    setIsShareSupported(!!navigator.share)
  }, [])

  const handleShare = async () => {
    if (isShareSupported) {
      try {
        await navigator.share({
          title,
          text,
          url,
        })
      } catch (error) {
        if ((error as Error).name !== 'AbortError') {
          console.error('Error sharing:', error)
        }
      }
    } else {
      // Fallback: Copy to clipboard
      try {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      } catch (err) {
        console.error('Failed to copy text:', err)
      }
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-8 gap-2 rounded-full border-border/70 bg-background/50 hover:bg-background h-9 px-4"
          onClick={handleShare}
        >
          {copied ? (
            <>
              <CheckIcon className="size-4 text-green-600" />
              <span className="text-xs font-medium">Link Copied</span>
            </>
          ) : (
            <>
              <Share2Icon className="size-4" />
              <span className="text-xs font-medium">Share Essay</span>
            </>
          )}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-[10px] lowercase tracking-wider">
        {isShareSupported ? "Share via WhatsApp, Email, etc." : "Copy Link"}
      </TooltipContent>
    </Tooltip>
  )
}
