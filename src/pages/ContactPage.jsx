import React from 'react';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Contact from '@/components/Contact';
import Breadcrumbs from '@/components/Breadcrumbs';

const ContactPage = () => {
  return (
    <>
      <Helmet>
        <title>Contact Us - Y4C Innovation Lab</title>
        <meta name="description" content="Get in touch with the Youth For Children Innovation Lab. We're here to answer your questions and explore collaboration opportunities." />
      </Helmet>
      <Header />
      <main className="min-h-screen bg-slate-50 dark:bg-gray-950 pt-24 lg:pt-32">
        <div className="container mx-auto px-4 mb-4">
          <Breadcrumbs />
        </div>
        <Contact />
      </main>
      <Footer />
    </>
  );
};

export default ContactPage;
