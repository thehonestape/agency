import MainNavbar from '@/components/navigation/MainNavbar';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <MainNavbar />
      
      <div className="bg-muted">
        <div className="container py-12">
          <h1 className="text-4xl font-bold">About Us</h1>
          <p className="text-lg text-muted-foreground mt-2">
            Learn about Workhorse Design and our mission
          </p>
        </div>
      </div>
      
      <main className="container flex-1 py-12">
        <div className="grid gap-12">
          {/* Story Section */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <p className="text-lg">
                  Workhorse Design was founded in 2023 with a simple mission: to create design systems that are powerful, flexible, and easy to use.
                </p>
                <p>
                  Our team of designers and developers have decades of combined experience working with design systems across industries. We've seen what works, what doesn't, and what's missing in today's design system landscape.
                </p>
                <p>
                  That's why we built our own design system from the ground up — one that prioritizes developer experience without compromising on design quality or customization options.
                </p>
              </div>
              <div className="bg-muted rounded-lg aspect-square flex items-center justify-center">
                <span className="text-muted-foreground text-sm">Company image</span>
              </div>
            </div>
          </section>
          
          {/* Values Section */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">Our Values</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Simplicity</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We believe the best design systems are those that get out of your way. Our components are designed to be intuitive and easy to use, without unnecessary complexity.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Flexibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Every project is unique, so our design system is built to adapt. With extensive customization options, you can make it your own without fighting the system.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    We optimize every component for speed and efficiency. Your users deserve a fast, responsive experience, and our design system delivers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
          
          {/* Team Section */}
          <section>
            <h2 className="text-3xl font-semibold mb-6">Our Team</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { name: 'Alex Johnson', role: 'Founder & Lead Designer' },
                { name: 'Sam Rodriguez', role: 'Lead Developer' },
                { name: 'Jordan Lee', role: 'UX Researcher' },
                { name: 'Taylor Chen', role: 'Design Systems Engineer' }
              ].map(person => (
                <div key={person.name} className="text-center">
                  <div className="bg-muted rounded-full mx-auto w-32 h-32 flex items-center justify-center mb-4">
                    <span className="text-muted-foreground text-sm">Photo</span>
                  </div>
                  <h3 className="font-medium text-lg">{person.name}</h3>
                  <p className="text-muted-foreground">{person.role}</p>
                </div>
              ))}
            </div>
          </section>
          
          {/* Contact Section */}
          <section className="bg-muted p-8 rounded-lg text-center">
            <h2 className="text-3xl font-semibold mb-4">Work With Us</h2>
            <p className="text-lg max-w-2xl mx-auto mb-6">
              Interested in learning more about how Workhorse Design can help your team build better products faster?
            </p>
            <Button size="lg">Contact Us</Button>
          </section>
        </div>
      </main>
      
      <footer className="border-t py-6">
        <div className="container text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Workhorse Design. All rights reserved.
        </div>
      </footer>
    </div>
  );
} 