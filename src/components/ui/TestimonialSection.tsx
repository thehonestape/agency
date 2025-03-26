import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

type Testimonial = {
  id: string;
  content: string;
  author: {
    name: string;
    role: string;
    company: string;
    image?: string;
  };
};

type TestimonialSectionProps = {
  title?: string;
  description?: string;
  testimonials?: Testimonial[];
  className?: string;
};

export default function TestimonialSection({
  title = "Trusted by thousands of developers worldwide",
  description = "Read what our customers have to say about our products and services.",
  testimonials = defaultTestimonials,
  className = "",
}: TestimonialSectionProps) {
  return (
    <section className={`bg-white py-24 sm:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{title}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {description}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex flex-col justify-between bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-200">
      <div>
        <Quote className="h-6 w-6 text-primary/60 mb-3" />
        <p className="text-lg font-medium leading-8 text-gray-900">
          "{testimonial.content}"
        </p>
      </div>
      <div className="mt-8 flex items-center gap-x-4">
        <Avatar className="h-12 w-12 rounded-full">
          <AvatarImage src={testimonial.author.image} alt={testimonial.author.name} />
          <AvatarFallback className="bg-primary/10 text-primary">
            {testimonial.author.name.split(' ').map(n => n[0]).join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <div className="font-semibold text-gray-900">{testimonial.author.name}</div>
          <div className="text-gray-600">{testimonial.author.role}, {testimonial.author.company}</div>
        </div>
      </div>
    </div>
  );
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    content: "This platform has completely transformed how we build web applications. The UI components are beautiful and the documentation is outstanding. Highly recommended!",
    author: {
      name: 'Sarah Chen',
      role: 'CTO',
      company: 'Nimbus Tech',
      image: '/placeholders/avatar-1.jpg',
    },
  },
  {
    id: '2',
    content: "I've tried many component libraries, but this one stands out for its attention to detail and ease of customization. It saved us countless hours of development time.",
    author: {
      name: 'Michael Rodriguez',
      role: 'Frontend Lead',
      company: 'Quantum Solutions',
      image: '/placeholders/avatar-2.jpg',
    },
  },
  {
    id: '3',
    content: "The responsive design of these components is exceptional. Everything works beautifully across all screen sizes with minimal tweaking. Will definitely use it for future projects.",
    author: {
      name: 'Alex Johnson',
      role: 'UI Designer',
      company: 'Creative Minds',
      image: '/placeholders/avatar-3.jpg',
    },
  },
]; 