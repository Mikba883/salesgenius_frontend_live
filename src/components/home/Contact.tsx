import React, { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { z } from 'zod';

const contactSchema = z.object({
  name: z.string().trim().min(1, 'Name is required').max(100, 'Name must be less than 100 characters'),
  email: z.string().trim().email('Invalid email address').max(255, 'Email must be less than 255 characters'),
  message: z.string().trim().min(1, 'Message is required').max(1000, 'Message must be less than 1000 characters'),
});

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setSubmitStatus('idle');

    // Client-side validation
    try {
      const validatedData = contactSchema.parse(formData);
      
      setIsSubmitting(true);

      // Call Edge Function
      const { data, error } = await supabase.functions.invoke('contact-form', {
        body: validatedData,
      });

      if (error) throw error;

      setSubmitStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path[0]) {
            fieldErrors[err.path[0] as string] = err.message;
          }
        });
        setErrors(fieldErrors);
      } else {
        setSubmitStatus('error');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };
  return (
    <section id="support" className="pb-24 lg:pb-32 xl:pb-40 scroll-mt-17">
      <div className="w-full">
        <div className="relative z-10 overflow-hidden bg-dark pt-40">
          {/* grid row */}
          <div className="flex justify-center gap-7.5 absolute left-1/2 -translate-x-1/2 -top-[16%] w-full -z-1 opacity-40">
            {[12, 7, 3, 0, 0, 0, 2, 5, 8].map((bottom, i) => (
              <div
                key={i}
                className={`max-w-[50px] w-full h-[250px] relative pricing-grid pricing-grid-border ${bottom > 0 ? `bottom-${bottom}` : ''}`}
              ></div>
            ))}
          </div>

          {/* stars */}
          <div className="w-full h-60 overflow-hidden absolute z-[5] -top-30 left-1/2 -translate-x-1/2">
            <div className="stars"></div>
            <div className="stars2"></div>
          </div>

          {/* bg shapes */}
          <div className="absolute inset-0 overflow-visible pointer-events-none -z-10">
            <span className="absolute top-0 -left-40 -z-1">
              <img src="/images/blur/blur-19.svg" alt="blur-sm" className="max-w-none w-[150%]" />
            </span>
            <span className="absolute top-0 -translate-x-1/2 left-1/2 -z-1">
              <img src="/images/blur/blur-20.svg" alt="blur-sm" className="max-w-none w-[150%]" />
            </span>
            <span className="absolute top-0 -right-40 -z-1">
              <img src="/images/blur/blur-21.svg" alt="blur-sm" className="max-w-none w-[150%]" />
            </span>
          </div>

          {/* section title */}
          <div className="relative mb-16 text-center z-[1] px-4 sm:px-8">
            <span className="hero-subtitle-gradient relative mb-4 font-medium text-sm inline-flex items-center gap-2 py-2 px-6 rounded-full">
              <img src="/images/hero/icon-title.svg" alt="icon" />
              <span className="hero-subtitle-text">Need Any Help?</span>
            </span>
            <h2 className="text-white mb-4.5 text-2xl font-extrabold sm:text-4xl xl:text-heading-2">
              Contact With Us
            </h2>
            <p className="max-w-[714px] mx-auto font-medium">
              Our AI writing tool is designed to empower you with exceptional writing capabilities, 
              making the writing process more efficient, accurate, and enjoyable.
            </p>
          </div>

          {/* support form */}
          <div className="max-w-[1104px] mx-auto px-4 sm:px-8 xl:px-0">
            <div className="form-box-gradient relative overflow-hidden rounded-[25px] bg-dark p-6 sm:p-8 xl:p-15">
              <form className="relative z-10" onSubmit={handleSubmit}>
              <div className="flex flex-wrap -mx-4 xl:-mx-10">
                <div className="w-full px-4 xl:px-5 md:w-1/2">
                  <div className="mb-9.5">
                    <label htmlFor="name" className="text-white mb-2.5 block font-medium">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your Name"
                      className="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-hidden text-white"
                    />
                    {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                  </div>
                </div>
                <div className="w-full px-4 xl:px-5 md:w-1/2">
                  <div className="mb-9.5">
                    <label htmlFor="email" className="text-white mb-2.5 block font-medium">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your Email"
                      className="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-3 px-6 outline-hidden text-white"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                <div className="w-full px-4 xl:px-5 mt-6">
                  <div className="mb-10">
                    <label htmlFor="message" className="text-white mb-2.5 block font-medium">
                      Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Type your message"
                      rows={6}
                      className="rounded-lg border border-white/[0.12] bg-white/[0.05] focus:border-purple w-full py-5 px-6 outline-hidden text-white"
                    ></textarea>
                    {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                  </div>
                </div>
                <div className="w-full px-4 xl:px-5">
                  {submitStatus === 'success' && (
                    <p className="text-green-400 text-center mb-4">Thank you! We'll get back to you soon.</p>
                  )}
                  {submitStatus === 'error' && (
                    <p className="text-red-400 text-center mb-4">Something went wrong. Please try again.</p>
                  )}
                  <div className="text-center">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="inline-flex py-3 font-medium text-white duration-300 ease-in rounded-lg hero-button-gradient px-7 hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </div>
                </div>
              </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
