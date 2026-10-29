import axios from 'axios';
import { mockStore } from './mockStore';

const apiClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 3000,
});

// Helper for simulated network responses from mockStore
const handleMockFallback = (url, method, data) => {
  const cleanUrl = url.replace(/^\/api/, '').split('?')[0];

  // Auth
  if (cleanUrl === '/auth/login' && method === 'post') {
    const users = mockStore.get('users');
    const user = users.find(
      (u) => u.email?.toLowerCase() === data?.email?.toLowerCase() && u.password === data?.password
    );
    if (user) {
      if (user.status === 'PENDING') {
        throw new Error('Your account is still pending facilitator approval.');
      }
      return { data: user };
    }
    // Default demo fallback if email matches common role
    if (data?.email?.includes('admin') || data?.email?.includes('superuser')) {
      return { data: users.find(u => u.role === 'superuser') || users[0] };
    }
    if (data?.email?.includes('facilitator')) {
      return { data: users.find(u => u.role === 'facilitator') || users[2] };
    }
    if (data?.email?.includes('coordinator')) {
      return { data: users.find(u => u.role === 'coordinator') || users[1] };
    }
    if (data?.email?.includes('guest')) {
      return { data: users.find(u => u.role === 'guest') || users[4] };
    }
    if (data?.email?.includes('member')) {
      return { data: users.find(u => u.role === 'member') || users[3] };
    }
    throw new Error('Invalid email or password.');
  }

  if (cleanUrl === '/auth/register' && method === 'post') {
    const newUser = mockStore.add('users', {
      ...data,
      status: 'PENDING',
      role: data.role || 'member'
    });
    return { data: newUser };
  }

  if (cleanUrl === '/auth/forgot-password' && method === 'post') {
    return { data: { message: 'Reset code sent to your email.' } };
  }

  // Public
  if (cleanUrl === '/public/events' || cleanUrl === '/events') {
    return { data: mockStore.get('events') };
  }

  if (cleanUrl === '/public/experts') {
    return { data: mockStore.get('experts') };
  }

  if (cleanUrl === '/public/content') {
    return { data: [] };
  }

  // Contact Inquiries
  if (cleanUrl === '/contact' && method === 'post') {
    const inquiry = mockStore.add('contactInquiries', {
      ...data,
      status: 'NEW',
      submittedAt: new Date().toISOString()
    });
    return { data: inquiry };
  }
  if (cleanUrl === '/contact' && method === 'get') {
    return { data: mockStore.get('contactInquiries') };
  }
  if (cleanUrl.startsWith('/contact/') && cleanUrl.endsWith('/reply') && method === 'put') {
    const id = cleanUrl.split('/')[2];
    const updated = mockStore.update('contactInquiries', id, {
      status: 'REPLIED',
      replyText: data?.replyText || data
    });
    return { data: updated };
  }

  // Event Registrations & Attendee Check-in
  if (cleanUrl === '/events/register' && method === 'post') {
    const reg = mockStore.add('eventRegistrations', {
      ...data,
      checkedIn: false,
      ticketId: `Y4C-TKT-${Math.floor(1000 + Math.random() * 9000)}`,
      registeredAt: new Date().toISOString()
    });
    return { data: reg };
  }
  if (cleanUrl === '/events/attendees') {
    return { data: mockStore.get('eventRegistrations') };
  }
  if (cleanUrl.startsWith('/events/checkin/') && method === 'put') {
    const id = cleanUrl.split('/')[3];
    const updated = mockStore.update('eventRegistrations', id, { checkedIn: true });
    return { data: updated };
  }

  // Applications
  if (cleanUrl === '/applications' && method === 'post') {
    const app = mockStore.add('applications', {
      ...data,
      status: 'PENDING',
      submittedAt: new Date().toISOString()
    });
    return { data: app };
  }
  if (cleanUrl === '/applications') {
    return { data: mockStore.get('applications') };
  }
  if (cleanUrl.startsWith('/applications/') && method === 'put') {
    const parts = cleanUrl.split('/');
    const id = parts[2];
    const status = parts[3] ? parts[3].toUpperCase() : data.status;
    const updated = mockStore.update('applications', id, { status });
    return { data: updated };
  }

  // Coordinator
  if (cleanUrl === '/coordinator/stats') {
    const users = mockStore.get('users');
    const apps = mockStore.get('applications');
    const events = mockStore.get('events');
    return {
      data: {
        activeMentees: users.filter(u => u.status === 'ACTIVE').length,
        coursesLed: 5,
        avgRating: 4.9,
        liveSessions: 3,
        pendingApps: apps.filter(a => a.status === 'PENDING').length,
        totalEvents: events.length
      }
    };
  }
  if (cleanUrl === '/coordinator/schedule' || cleanUrl === '/facilitator/timetables') {
    return {
      data: [
        { id: 1, day: "Monday", timeSlot: "10:00 AM - 12:00 PM", courseName: "HCD Prototyping Workshop", instructorName: "Godfrey Temu", room: "Studio A" },
        { id: 2, day: "Wednesday", timeSlot: "02:00 PM - 04:00 PM", courseName: "Fullstack Web & APIs", instructorName: "Lead Facilitator", room: "Lab Hall B" },
        { id: 3, day: "Friday", timeSlot: "03:00 PM - 05:00 PM", courseName: "Pitch Practice & Mentorship", instructorName: "Maria Massawe", room: "Innovation Pod 1" }
      ]
    };
  }
  if (cleanUrl === '/coordinator/mentee-progress') {
    const members = mockStore.get('users').filter(u => u.role === 'member');
    return {
      data: members.map((m, idx) => ({
        name: m.name,
        prog: 70 + (idx * 9) % 30,
        color: idx % 2 === 0 ? "bg-udsm-blue" : "bg-udsm-gold"
      }))
    };
  }
  if (cleanUrl === '/coordinator/facilitators/pending') {
    return { data: mockStore.get('users').filter(u => u.role === 'facilitator' && u.status === 'PENDING') };
  }
  if (cleanUrl.includes('/facilitators/') && cleanUrl.endsWith('/admit')) {
    const id = cleanUrl.split('/')[3];
    return { data: mockStore.update('users', id, { status: 'ACTIVE' }) };
  }
  if (cleanUrl === '/coordinator/projects/pending' || cleanUrl === '/facilitator/projects/pending') {
    return {
      data: [
        { id: 101, title: "Smart Soil Moisture Mesh", innovatorName: "Amina Hassan", institution: "UDSM", category: "AgriTech", status: "PENDING", description: "Mesh network sensors for low-cost irrigation monitoring." },
        { id: 102, title: "MamaCare Triage Bot", innovatorName: "Kelvin Shirima", institution: "DIT", category: "HealthTech", status: "PENDING", description: "Swahili-first triage bot for maternal healthcare clinics." }
      ]
    };
  }
  if (cleanUrl.includes('/projects/') && cleanUrl.endsWith('/approve')) {
    const id = cleanUrl.split('/')[3];
    return { data: { id, status: 'APPROVED' } };
  }
  if (cleanUrl === '/coordinator/partners/pending') {
    return { data: [] };
  }
  if (cleanUrl === '/coordinator/experts') {
    return { data: mockStore.get('experts') };
  }

  // Facilitator
  if (cleanUrl === '/facilitator/stats') {
    const users = mockStore.get('users');
    const apps = mockStore.get('applications');
    return {
      data: {
        totalStudents: users.filter(u => u.role === 'member').length,
        activeProjects: 14,
        pendingUsers: users.filter(u => u.status === 'PENDING').length,
        pendingProjects: apps.filter(a => a.status === 'PENDING').length,
        efficiency: 94
      }
    };
  }
  if (cleanUrl === '/facilitator/users/pending') {
    return { data: mockStore.get('users').filter(u => u.status === 'PENDING') };
  }
  if (cleanUrl === '/facilitator/users/active') {
    return { data: mockStore.get('users').filter(u => u.status === 'ACTIVE') };
  }
  if (cleanUrl.includes('/facilitator/users/') && cleanUrl.endsWith('/admit')) {
    const id = cleanUrl.split('/')[3];
    return { data: mockStore.update('users', id, { status: 'ACTIVE' }) };
  }
  if (cleanUrl === '/facilitator/users' && method === 'post') {
    return { data: mockStore.add('users', { ...data, status: 'ACTIVE' }) };
  }
  if (cleanUrl.startsWith('/facilitator/users/') && method === 'delete') {
    const id = cleanUrl.split('/')[3];
    mockStore.delete('users', id);
    return { data: { success: true } };
  }

  // Equipment & Space
  if (cleanUrl === '/equipment') {
    return { data: mockStore.get('equipment') };
  }
  if (cleanUrl === '/equipment' && method === 'post') {
    return { data: mockStore.add('equipment', data) };
  }
  if (cleanUrl === '/equipment/bookings') {
    return { data: mockStore.get('equipmentBookings') };
  }
  if (cleanUrl === '/equipment/book' && method === 'post') {
    const booking = mockStore.add('equipmentBookings', {
      ...data,
      status: 'PENDING',
      submittedAt: new Date().toISOString()
    });
    return { data: booking };
  }
  if (cleanUrl.startsWith('/equipment/bookings/') && method === 'put') {
    const id = cleanUrl.split('/')[3];
    const status = data?.status || 'APPROVED';
    return { data: mockStore.update('equipmentBookings', id, { status }) };
  }

  // Incubation Stage-Gate Milestones
  if (cleanUrl === '/incubation/milestones') {
    return { data: mockStore.get('incubationMilestones') };
  }
  if (cleanUrl.startsWith('/incubation/milestones/') && method === 'put') {
    const id = cleanUrl.split('/')[3];
    return { data: mockStore.update('incubationMilestones', id, data) };
  }

  // Mentorship
  if (cleanUrl === '/mentorship/experts') {
    return { data: mockStore.get('experts') };
  }
  if (cleanUrl === '/mentorship/bookings') {
    return { data: mockStore.get('mentorshipBookings') };
  }
  if (cleanUrl === '/mentorship/book' && method === 'post') {
    const session = mockStore.add('mentorshipBookings', {
      ...data,
      status: 'CONFIRMED',
      meetingLink: 'https://meet.google.com/y4c-live-session'
    });
    return { data: session };
  }

  // Co-founder & Talent Matchmaking
  if (cleanUrl === '/cofounder/posts') {
    return { data: mockStore.get('coFounderPosts') };
  }
  if (cleanUrl === '/cofounder/posts' && method === 'post') {
    return { data: mockStore.add('coFounderPosts', { ...data, createdAt: new Date().toISOString().split('T')[0] }) };
  }

  // Grants & Funding
  if (cleanUrl === '/grants') {
    return { data: mockStore.get('grants') };
  }
  if (cleanUrl === '/grants' && method === 'post') {
    return { data: mockStore.add('grants', { ...data, date: new Date().toISOString().split('T')[0] }) };
  }

  // Certificates
  if (cleanUrl === '/certificates') {
    return { data: mockStore.get('certificates') };
  }
  if (cleanUrl === '/certificates/issue' && method === 'post') {
    const cert = mockStore.add('certificates', {
      ...data,
      id: `Y4C-CERT-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
      verificationCode: `Y4C-VERIFY-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'ISSUED'
    });
    return { data: cert };
  }

  // Learning Modules
  if (cleanUrl === '/learning/modules') {
    return { data: mockStore.get('learningModules') };
  }
  if (cleanUrl.startsWith('/learning/complete/') && method === 'put') {
    const id = cleanUrl.split('/')[3];
    return { data: mockStore.update('learningModules', id, { completed: true, score: 90 }) };
  }

  // Support Requests
  if (cleanUrl === '/member/requests' && method === 'post') {
    return { data: { id: Date.now(), ...data, status: 'PENDING' } };
  }
  if (cleanUrl === '/facilitator/requests/pending') {
    return {
      data: [
        { id: 1, userId: 4, type: "EQUIPMENT", subject: "Request for LoRaWAN gateway in Hub Hall", message: "Need to test 5 outdoor nodes around UDSM campus.", status: "PENDING" },
        { id: 2, userId: 6, type: "MENTORSHIP", subject: "Review of Maternal Health protocol", message: "Need 30 mins with health expert to review questions.", status: "PENDING" }
      ]
    };
  }

  // HCD
  if (cleanUrl === '/hcd/admin/stats') {
    return {
      data: {
        totalFeedback: 42,
        openIssues: 3,
        resolvedIssues: 39,
        avgSatisfaction: 4.8
      }
    };
  }
  if (cleanUrl === '/hcd/admin/insights') {
    return {
      data: [
        { id: 1, type: "RECURRING_PROBLEM", affectedModule: "/programs", frequency: 6, suggestedFix: "Clarify application deadline countdown timer on program page." },
        { id: 2, type: "POSITIVE_SENTIMENT", affectedModule: "/gallery", frequency: 12, suggestedFix: "Members love the community photo showcase; keep adding lab moments." }
      ]
    };
  }

  // Project Hosting & Server Demands
  if (cleanUrl === '/hosting/request' && method === 'post') {
    const newReq = mockStore.add('hostingRequests', {
      ...data,
      status: 'PENDING_APPROVAL',
      requestedAt: new Date().toISOString()
    });
    return { data: newReq };
  }
  if (cleanUrl === '/hosting/requests') {
    return { data: mockStore.get('hostingRequests') };
  }
  if (cleanUrl.startsWith('/hosting/my-requests/')) {
    const userId = cleanUrl.split('/')[3];
    const list = mockStore.get('hostingRequests');
    return { data: list.filter(r => !userId || String(r.userId) === String(userId) || r.studentName === 'Baraka Mwangi') };
  }
  if (cleanUrl.includes('/hosting/requests/') && cleanUrl.endsWith('/approve') && method === 'put') {
    const id = cleanUrl.split('/')[3];
    const req = mockStore.get('hostingRequests').find(r => String(r.id) === String(id));
    const sub = req?.requestedSubdomain ? req.requestedSubdomain.toLowerCase() : 'app-' + id;
    const updated = mockStore.update('hostingRequests', id, {
      status: 'ACTIVE',
      liveUrl: data?.liveUrl || `https://${sub}.y4chub.udsm.ac.tz`,
      serverIp: data?.serverIp || '196.216.240.42',
      allocatedPort: data?.allocatedPort || 8085,
      accessCredentials: data?.accessCredentials || `ssh y4c_deploy@196.216.240.42 -p 2202`,
      coordinatorRemarks: data?.coordinatorRemarks || 'Approved by Innovation Coordinator. Cloud container running in lab data center.',
      provisionedAt: new Date().toISOString()
    });
    return { data: updated };
  }
  if (cleanUrl.includes('/hosting/requests/') && cleanUrl.endsWith('/reject') && method === 'put') {
    const id = cleanUrl.split('/')[3];
    const updated = mockStore.update('hostingRequests', id, {
      status: 'REJECTED',
      coordinatorRemarks: data?.coordinatorRemarks || 'Hosting rejected by coordinator.'
    });
    return { data: updated };
  }

  // Superuser Projects
  if (cleanUrl === '/superuser/projects') {
    return {
      data: [
        { id: 1, name: "Y4C Innovation Lab", title: "Youth For Children Innovation Lab", subtitle: "UDSM Chapter", primaryColor: "#0864AF", secondaryColor: "#166534", accentColor: "#EAB308", isActive: true }
      ]
    };
  }

  // Impact Analytics & M&E Metrics
  if (cleanUrl === '/analytics/impact') {
    const users = mockStore.get('users') || [];
    const attendees = mockStore.get('eventRegistrations') || [];
    const grants = mockStore.get('grants') || [];
    const hosting = mockStore.get('hostingRequests') || [];
    const milestones = mockStore.get('incubationMilestones') || [];

    const totalTrained = 540 + users.length + attendees.length;
    const totalGrantAmount = grants.reduce((sum, g) => sum + (Number(g.amountTzs) || 0), 0);
    const seedCapitalStr = `${((38500000 + totalGrantAmount) / 1000000).toFixed(1)}M TZS`;
    const activeVentures = Math.max(24, hosting.length + milestones.filter(m => m.status === 'COMPLETED' || m.status === 'IN_PROGRESS').length);

    return {
      data: {
        trainedYouth: `${totalTrained}+`,
        femaleInnovators: "48%",
        activeVentures: activeVentures,
        seedCapitalDistributed: seedCapitalStr,
        prototypesTested: 12 + hosting.filter(h => h.status === 'ACTIVE').length,
        ipPatentsFiling: 3,
        jobsCreated: 42 + Math.floor(activeVentures * 1.5),
        sdgAlignment: "100%",
        lastRefreshed: new Date().toLocaleTimeString(),
        demographics: [
          { label: "Engineering & Computer Science (CoICT)", percent: 52, color: "bg-udsm-blue" },
          { label: "Health Sciences & Public Health", percent: 22, color: "bg-forest-green" },
          { label: "Business, Law & Entrepreneurship", percent: 16, color: "bg-udsm-gold" },
          { label: "Agriculture, Nutrition & Climate Tech", percent: 10, color: "bg-purple-500" }
        ]
      }
    };
  }

  return { data: [] };
};

// Intercept requests and automatically fall back if backend server is not running
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    // If connection refused, network error, 404 or 500 in dev demo mode, fall back to mockStore
    if (!error.response || error.code === 'ERR_NETWORK' || error.response.status === 404 || error.response.status === 500 || error.response.status === 502) {
      try {
        const fallbackRes = handleMockFallback(
          error.config.url,
          error.config.method?.toLowerCase(),
          error.config.data ? (typeof error.config.data === 'string' ? JSON.parse(error.config.data) : error.config.data) : null
        );
        return fallbackRes;
      } catch (mockError) {
        return Promise.reject(mockError);
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
