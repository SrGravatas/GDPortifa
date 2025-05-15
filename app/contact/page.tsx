import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin } from "lucide-react"

export default function Contact() {
  return (
    <div className="container py-8 md:py-12 max-w-screen-2xl mx-auto px-4">
      <h1 className="text-3xl md:text-4xl font-bold mb-4 md:mb-8">Contact Me</h1>
      <p className="text-base md:text-lg text-muted-foreground mb-6 md:mb-10 max-w-3xl">
        I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
      </p>

      <div className="flex justify-center">
        {/* Contact Information */}
        <Card className="max-w-md w-full">
          <CardHeader>
            <CardTitle>Connect With Me</CardTitle>
            <CardDescription>The best way to reach me</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center">
              <div className="bg-[#0077B5]/10 p-3 rounded-full mr-4">
                <Linkedin className="h-6 w-6 text-[#0077B5]" />
              </div>
              <div>
                <h3 className="font-medium">LinkedIn</h3>
                <a
                  href="https://www.linkedin.com/in/andrefvargas/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline break-all"
                >
                  linkedin.com/in/andrefvargas
                </a>
              </div>
            </div>

            <div className="mt-8">
              <p className="text-muted-foreground">
                LinkedIn is the best way to connect with me professionally. I check my messages regularly and look
                forward to discussing potential collaborations.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
