"use client"

import { useState } from "react"
import { DownloadIcon, LeafIcon, Loader2Icon, CheckCircle2Icon } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function DownloadModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  })

  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.name.trim()) {
      newErrors.name = "Name is required"
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Email is required"
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email address"
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required"
    } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
      newErrors.phone = "Invalid phone number"
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsSubmitting(true)
    
    // Simulate API call for lead gen (will connect to Google Sheets later)
    await new Promise((resolve) => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSuccess(true)
  }

  const handleDownload = () => {
    // Reset state after a short delay so the modal can be used again
    setTimeout(() => {
      setIsOpen(false)
      // Small delay before resetting to success=false to avoid flash
      setTimeout(() => {
        setIsSuccess(false)
        setFormData({ name: "", email: "", phone: "" })
      }, 300)
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <div className="flex items-center gap-4">
          <Button 
            variant="default" 
            className="hidden bg-[#8A9A82] text-white hover:bg-[#728569] sm:flex h-11 px-6 rounded-full text-base shadow-sm transition-all hover:shadow-md"
          >
            <DownloadIcon className="mr-2 size-5" />
            Download Free Guide
          </Button>
          <Button 
            variant="default" 
            size="icon" 
            className="sm:hidden bg-[#8A9A82] text-white h-10 w-10 rounded-full"
          >
            <DownloadIcon className="size-5" />
          </Button>
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        {!isSuccess ? (
          <>
            <DialogHeader>
              <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-full bg-[#8A9A82]/10 text-[#8A9A82]">
                <LeafIcon className="size-6" />
              </div>
              <DialogTitle className="text-center font-serif text-2xl">Get Your Free Guide</DialogTitle>
              <DialogDescription className="text-center">
                Enter your details to receive our "Principles of Calm Living" PDF guide directly.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className={errors.name ? "border-destructive text-destructive" : ""}
                />
                {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={errors.email ? "border-destructive text-destructive" : ""}
                />
                {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className={errors.phone ? "border-destructive text-destructive" : ""}
                />
                {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
              </div>
              <Button 
                type="submit" 
                className="w-full bg-[#8A9A82] hover:bg-[#728569]" 
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2Icon className="mr-2 size-4 animate-spin" />
                    Preparing your guide...
                  </>
                ) : (
                  "Send me the guide"
                )}
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center space-y-6 py-8">
            <div className="flex size-16 items-center justify-center rounded-full bg-green-100 text-green-600">
              <CheckCircle2Icon className="size-10" />
            </div>
            <div className="text-center">
              <DialogTitle className="font-serif text-2xl">You're All Set!</DialogTitle>
              <DialogDescription className="mt-2 text-base">
                Your free guide is ready for download.
              </DialogDescription>
            </div>
            <a 
              href="/guides/calm-living-guide.pdf" 
              download 
              onClick={handleDownload}
              className="inline-flex w-full items-center justify-center rounded-md bg-[#8A9A82] px-4 py-3 text-sm font-medium text-white ring-offset-background transition-colors hover:bg-[#728569] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
            >
              <DownloadIcon className="mr-2 size-5" />
              Download PDF Now
            </a>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
