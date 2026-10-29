
import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

import {
  ArrowUpRight,
  Building2,
  ExternalLink,
  Globe,
  Users,
  Mail,
  MapPin,
  X,
} from 'lucide-react';

import apiClient from '@/core/apiClient';

const fallbackLogo = '/Images/y4c_logo.png';

const defaultPartners = [
  {
    id: 'udsm',
    name: 'University of Dar es Salaam',
    logo: '/Images/udsm-logo.png',
    category: 'Academic Partner',
    description:
        'The University of Dar es Salaam is a leading higher learning institution in Tanzania, supporting education, research, innovation and the development of future professionals.',
    website: 'https://www.udsm.ac.tz/',
    location: 'Dar es Salaam, Tanzania',
  },
  {
    id: 'unicef',
    name: 'UNICEF',
    logo: '/Images/unicef.png',
    category: 'Development Partner',
    description:
        'UNICEF works to protect children’s rights and improve their access to essential services, education, health care and opportunities for development.',
    website: 'https://www.unicef.org/',
    location: 'International',
  },
  {
    id: 'amref',
    name: 'Amref Health Africa',
    logo: '/Images/amref.png',
    category: 'Health Partner',
    description:
        'Amref Health Africa works with communities and partners to improve health outcomes and strengthen health systems across Africa.',
    website: 'https://amref.org/',
    location: 'Africa',
  },
];

const Partners = ({ onApplyClick }) => {
  const [partnerList, setPartnerList] = useState(defaultPartners);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let active = true;

    const fetchPublishedPartners = async () => {
      try {
        const response = await apiClient.get(
            '/public/partners/published'
        );

        if (!active) return;

        const published = Array.isArray(response.data)
            ? response.data.map((p, index) => ({
              id: p.id ?? `published-${index}`,
              name: p.institutionName || 'Partner Organization',
              logo: p.logoUrl || fallbackLogo,
              category:
                  p.category ||
                  p.partnershipType ||
                  'Y4C Partner',
              description:
                  p.description ||
                  p.about ||
                  'This organization is part of the Y4C partner community. Contact the organization or visit its official website to learn more.',
              website: p.website || p.websiteUrl || '',
              location: p.location || p.address || '',
              email: p.contactEmail || p.email || '',
            }))
            : [];

        // Keep default organizations and avoid duplicate names.
        const merged = [...defaultPartners];

        published.forEach((partner) => {
          const exists = merged.some(
              (item) =>
                  item.name.trim().toLowerCase() ===
                  partner.name.trim().toLowerCase()
          );

          if (!exists) merged.push(partner);
        });

        setPartnerList(merged);
      } catch (error) {
        console.error('Could not fetch published partners:', error);
      } finally {
        if (active) setLoading(false);
      }
    };

    fetchPublishedPartners();

    return () => {
      active = false;
    };
  }, []);

  // Close the details dialog using the Escape key.
  useEffect(() => {
    if (!selectedPartner) return;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedPartner(null);
    };

    window.addEventListener('keydown', handleKeyDown);

    return () =>
        window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPartner]);

  const openWebsite = (website) => {
    if (!website) return;

    try {
      const url = new URL(website);

      if (!['http:', 'https:'].includes(url.protocol)) return;

      window.open(url.href, '_blank', 'noopener,noreferrer');
    } catch {
      console.error('Invalid partner website URL');
    }
  };

  return (
      <section
          id="partners"
          className="relative overflow-hidden bg-slate-50 py-20 sm:py-24"
      >
        {/* Decorative background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -left-32 top-10 h-72 w-72 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-indigo-100/50 blur-3xl" />

          <div
              className="absolute inset-0 opacity-[0.035]"
              style={{
                backgroundImage:
                    'radial-gradient(#334155 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }}
          />
        </div>

        <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          {/* Section heading */}
          <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="mx-auto mb-14 max-w-3xl text-center"
          >
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white px-4 py-2 text-sm font-semibold text-blue-700 shadow-sm">
              <Users size={17} />
              Our Partners & Collaborators
            </div>

            <h2 className="text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
              Together, We Create
              <span className="block bg-gradient-to-r from-blue-700 via-indigo-600 to-cyan-500 bg-clip-text text-transparent">
              Greater Impact
            </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">
              Meet the institutions and organizations that contribute
              to a stronger ecosystem of education, innovation,
              opportunity and community development through Y4C.
            </p>
          </motion.div>

          {/* Organization cards */}
          <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {partnerList.map((partner, index) => (
                <motion.article
                    key={partner.id || `${partner.name}-${index}`}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.5,
                      delay: Math.min(index % 3, 2) * 0.1,
                    }}
                    whileHover={{ y: -7 }}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-sm transition-shadow duration-300 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-900/10"
                >
                  {/* Logo area */}
                  <div className="relative flex h-48 items-center justify-center overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/70 px-8">
                    <div className="absolute inset-x-10 bottom-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />

                    <div className="absolute right-4 top-4 rounded-full border border-slate-200/70 bg-white/90 p-2 text-slate-400 transition-colors group-hover:text-blue-600">
                      <Building2 size={17} />
                    </div>

                    <div className="flex h-28 w-full items-center justify-center rounded-xl bg-white/80 p-4 transition-transform duration-500 group-hover:scale-105">
                      <img
                          src={partner.logo || fallbackLogo}
                          alt={`${partner.name} logo`}
                          loading="lazy"
                          className="max-h-full max-w-full object-contain"
                          onError={(event) => {
                            if (event.currentTarget.dataset.fallbackApplied) {
                              event.currentTarget.style.visibility = 'hidden';
                              return;
                            }

                            event.currentTarget.dataset.fallbackApplied = 'true';
                            event.currentTarget.src = fallbackLogo;
                          }}
                      />
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="flex flex-1 flex-col p-6 sm:p-7">
                <span className="mb-3 w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-700">
                  {partner.category || 'Y4C Partner'}
                </span>

                    <h3 className="text-xl font-bold leading-snug text-slate-900 transition-colors group-hover:text-blue-700">
                      {partner.name}
                    </h3>

                    <p className="mt-3 line-clamp-3 flex-1 text-sm leading-6 text-slate-600">
                      {partner.description}
                    </p>

                    {partner.location && (
                        <div className="mt-5 flex items-center gap-2 text-sm text-slate-500">
                          <MapPin
                              size={16}
                              className="shrink-0 text-blue-600"
                          />
                          <span className="line-clamp-1">
                      {partner.location}
                    </span>
                        </div>
                    )}

                    <div className="mt-6 border-t border-slate-100 pt-5">
                      <button
                          type="button"
                          onClick={() => setSelectedPartner(partner)}
                          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-200"
                          aria-label={`View details about ${partner.name}`}
                      >
                        View Organization Details
                        <ArrowUpRight
                            size={17}
                            className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                      </button>
                    </div>
                  </div>
                </motion.article>
            ))}
          </div>

          {loading && (
              <p className="mt-6 text-center text-sm text-slate-500">
                Checking for additional partners…
              </p>
          )}

          {/* Bottom message */}
          <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-14 rounded-2xl border border-blue-100 bg-white/80 p-7 text-center shadow-sm sm:p-9"
          >
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Users size={25} />
            </div>

            <h3 className="text-xl font-bold text-slate-900">
              Interested in partnering with Y4C?
            </h3>

            <p className="mx-auto mt-2 max-w-xl text-sm leading-6 text-slate-600 sm:text-base">
              We welcome collaboration with institutions, innovators
              and organizations committed to creating meaningful impact.
            </p>

            {onApplyClick && (
              <button
                type="button"
                onClick={onApplyClick}
                className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-sm px-6 py-3.5 shadow-md transition-all active:scale-95"
              >
                Apply for Partnership ↗
              </button>
            )}
          </motion.div>
        </div>

        {/* Organization details modal */}
        <AnimatePresence>
          {selectedPartner && (
              <motion.div
                  key="partner-modal"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onMouseDown={(event) => {
                    if (event.target === event.currentTarget) {
                      setSelectedPartner(null);
                    }
                  }}
                  className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-950/70 p-4 backdrop-blur-sm"
              >
                <motion.div
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="partner-modal-title"
                    initial={{ opacity: 0, y: 25, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 15, scale: 0.98 }}
                    transition={{ duration: 0.22 }}
                    className="relative my-auto w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl"
                >
                  {/* Modal banner */}
                  <div className="relative flex h-48 items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-10">
                    <button
                        type="button"
                        onClick={() => setSelectedPartner(null)}
                        aria-label="Close organization details"
                        className="absolute right-4 top-4 rounded-full border border-slate-200 bg-white p-2 text-slate-600 transition hover:bg-slate-100"
                    >
                      <X size={20} />
                    </button>

                    <div className="flex h-28 w-full items-center justify-center rounded-2xl bg-white p-5 shadow-sm">
                      <img
                          src={selectedPartner.logo || fallbackLogo}
                          alt={`${selectedPartner.name} logo`}
                          className="max-h-full max-w-full object-contain"
                          onError={(event) => {
                            if (event.currentTarget.dataset.fallbackApplied) {
                              event.currentTarget.style.visibility = 'hidden';
                              return;
                            }

                            event.currentTarget.dataset.fallbackApplied = 'true';
                            event.currentTarget.src = fallbackLogo;
                          }}
                      />
                    </div>
                  </div>

                  {/* Modal information */}
                  <div className="p-6 sm:p-8">
                <span className="inline-flex rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-blue-700">
                  {selectedPartner.category || 'Y4C Partner'}
                </span>

                    <h3
                        id="partner-modal-title"
                        className="mt-4 text-2xl font-extrabold leading-tight text-slate-900"
                    >
                      {selectedPartner.name}
                    </h3>

                    <p className="mt-4 whitespace-pre-line text-sm leading-7 text-slate-600">
                      {selectedPartner.description}
                    </p>

                    <div className="mt-6 space-y-3">
                      {selectedPartner.location && (
                          <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
                            <MapPin
                                size={19}
                                className="mt-0.5 shrink-0 text-blue-700"
                            />
                            <div>
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Location
                              </p>
                              <p className="mt-1 text-sm font-medium text-slate-700">
                                {selectedPartner.location}
                              </p>
                            </div>
                          </div>
                      )}

                      {selectedPartner.email && (
                          <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
                            <Mail
                                size={19}
                                className="mt-0.5 shrink-0 text-blue-700"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Contact
                              </p>
                              <a
                                  href={`mailto:${selectedPartner.email}`}
                                  className="mt-1 block break-all text-sm font-medium text-blue-700 hover:underline"
                              >
                                {selectedPartner.email}
                              </a>
                            </div>
                          </div>
                      )}

                      {selectedPartner.website && (
                          <div className="flex items-start gap-3 rounded-xl bg-slate-50 p-3.5">
                            <Globe
                                size={19}
                                className="mt-0.5 shrink-0 text-blue-700"
                            />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                                Official website
                              </p>
                              <p className="mt-1 break-all text-sm font-medium text-slate-700">
                                {selectedPartner.website}
                              </p>
                            </div>
                          </div>
                      )}
                    </div>

                    <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                      {selectedPartner.website && (
                          <button
                              type="button"
                              onClick={() => openWebsite(selectedPartner.website)}
                              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-3.5 text-sm font-bold text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-200"
                          >
                            Visit Official Website
                            <ExternalLink size={16} />
                          </button>
                      )}

                      <button
                          type="button"
                          onClick={() => setSelectedPartner(null)}
                          className="rounded-xl border border-slate-200 px-5 py-3.5 text-sm font-bold text-slate-700 transition hover:bg-slate-50"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
          )}
        </AnimatePresence>
      </section>
  );
};

export default Partners;
