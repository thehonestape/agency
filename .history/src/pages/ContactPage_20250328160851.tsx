import MainNavbar from '@/components/navigation/MainNavbar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/Card';

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      
      <div className="bg-muted">
        <div className="container py-12">
          <h1 className="text-4xl font-bold">Contact Us</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Get in touch with the Workhorse Design team
          </p>
        </div>
      </div>
      
      <main className="container flex-1 py-12">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-6">Send Us a Message</h2>
            <form className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">Subject</label>
                <select
                  id="subject"
                  className="w-full px-3 py-2 border rounded-md"
                  required
                >
                  <option value="">Select a subject</option>
                  <option value="general">General Inquiry</option>
                  <option value="support">Technical Support</option>
                  <option value="sales">Sales Question</option>
                  <option value="partnership">Partnership Opportunity</option>
                </select>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">Message</label>
                <textarea
                  id="message"
                  placeholder="How can we help you?"
                  className="w-full px-3 py-2 border rounded-md"
                  rows={6}
                  required
                />
              </div>
              
              <Button className="w-full" size="lg">Send Message</Button>
            </form>
          </Card>
          
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-primary">contact@workhorse-design.com</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p>(555) 123-4567</p>
                </div>
                
                <div>
                  <h3 className="font-medium">Address</h3>
                  <address className="not-italic">
                    Workhorse Design, Inc.<br />
                    123 Design Street<br />
                    San Francisco, CA 94103<br />
                    United States
                  </address>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-semibold mb-6">Office Hours</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Monday - Friday</span>
                  <span>9:00 AM - 6:00 PM PST</span>
                </div>
                <div className="flex justify-between">
                  <span>Saturday</span>
                  <span>Closed</span>
                </div>
                <div className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted rounded-lg aspect-video flex items-center justify-center">
              <span className="text-muted-foreground text-sm">Map location</span>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="border-t py-6 mt-12">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Workhorse Design. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 