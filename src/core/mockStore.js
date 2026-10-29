// Centralized Mock Store & Persistence for Y4C Innovation Hub
const STORAGE_PREFIX = 'y4c_hub_';

const initialData = {
  users: [
    { id: 1, name: "System Admin", email: "admin@y4c.com", password: "password123", role: "superuser", status: "ACTIVE" },
    { id: 2, name: "Innovation Coordinator", email: "coordinator@y4c.com", password: "password123", role: "coordinator", status: "ACTIVE" },
    { id: 3, name: "Lead Facilitator", email: "facilitator@y4c.com", password: "password123", role: "facilitator", status: "ACTIVE" },
    { id: 4, name: "Baraka Mwangi", email: "member@y4c.com", password: "password123", role: "member", status: "ACTIVE", university: "University of Dar es Salaam", program: "BSc Computer Science", yearOfStudy: "3rd Year" },
    { id: 5, name: "Guest User", email: "guest@y4c.com", password: "password123", role: "guest", status: "ACTIVE" },
    { id: 6, name: "Neema Rashid", email: "neema@udsm.ac.tz", password: "password123", role: "member", status: "PENDING", university: "UDSM CoICT", program: "Electronics & Telecomm", yearOfStudy: "2nd Year" }
  ],
  programs: [
    { id: "tech-skills", title: "Tech Skills Bootcamp", desc: "Master full-stack engineering, mobile, and AI.", duration: "12 Weeks", cohort: "Cohort 4 - 2026", spots: "30 Available" },
    { id: "startup-incubation", title: "Startup Incubation", desc: "Transform campus ideas into fundable ventures.", duration: "6 Months", cohort: "Cohort 2 - 2026", spots: "10 Startups" },
    { id: "leadership", title: "Leadership & HCD Lab", desc: "Human-centered design and social impact leadership.", duration: "8 Weeks", cohort: "Cohort 3 - 2026", spots: "25 Available" }
  ],
  applications: [
    { id: 1, fullName: "Amina Hassan", email: "amina.h@gmail.com", phone: "+255 712 345 678", organization: "UDSM CoICT", programId: "startup-incubation", motivation: "Developing an AI-driven maternal healthcare triage chatbot for rural clinics.", status: "PENDING", submittedAt: "2026-10-25T14:30:00Z" },
    { id: 2, fullName: "Juma Bakari", email: "juma.b@udsm.ac.tz", phone: "+255 754 987 654", organization: "University of Dar es Salaam", programId: "tech-skills", motivation: "I want to master React and IoT to build smart water management sensors.", status: "ACCEPTED", submittedAt: "2026-10-24T09:15:00Z" },
    { id: 3, fullName: "Kelvin Shirima", email: "kelvin.s@gmail.com", phone: "+255 788 112 233", organization: "Ardhi University", programId: "leadership", motivation: "Passionate about human-centered design for urban waste recycling solutions.", status: "INTERVIEW_SCHEDULED", submittedAt: "2026-10-26T11:00:00Z" }
  ],
  events: [
    {
      id: 1,
      title: "UDSM Annual Innovation Hackathon 2026",
      description: "48-hour sprint building tech solutions for local sustainable development goals.",
      date: "2026-11-15T09:00:00",
      timeRange: "9:00 AM - 6:00 PM",
      location: "Y4C Lab, UDSM CoICT Campus, Kijitonyama",
      imageUrl: "/Images/Photo01.jpg",
      images: ["/Images/Photo01.jpg", "/Images/Photo02.jpg"],
      isPublished: true,
      expiryDate: "2026-11-20T23:59:59"
    },
    {
      id: 2,
      title: "Human-Centered Design (HCD) Masterclass",
      description: "Hands-on empathy mapping, rapid prototyping, and user testing with industry leads.",
      date: "2026-11-28T14:00:00",
      timeRange: "2:00 PM - 5:30 PM",
      location: "Y4C Hub Studio A",
      imageUrl: "/Images/Photo02.jpg",
      images: ["/Images/Photo02.jpg", "/Images/Photo03.jpg"],
      isPublished: true,
      expiryDate: "2026-12-01T23:59:59"
    }
  ],
  eventRegistrations: [
    { id: 1, eventId: 1, eventTitle: "UDSM Annual Innovation Hackathon 2026", fullName: "Baraka Mwangi", email: "member@y4c.com", phone: "+255 712 000 111", organization: "UDSM", isStudent: "yes", checkedIn: false, ticketId: "Y4C-TKT-8921", registeredAt: "2026-10-27T10:00:00Z" },
    { id: 2, eventId: 1, eventTitle: "UDSM Annual Innovation Hackathon 2026", fullName: "Zainab Salim", email: "zainab@gmail.com", phone: "+255 765 444 333", organization: "DIT", isStudent: "yes", checkedIn: true, ticketId: "Y4C-TKT-4412", registeredAt: "2026-10-28T12:30:00Z" }
  ],
  contactInquiries: [
    { id: 1, name: "David Kimaro", email: "david.k@ecotech.tz", subject: "Collaborative Research in CleanTech", message: "We would like to partner with Y4C student innovators to prototype solar tracking sensors.", status: "NEW", submittedAt: "2026-10-28T08:20:00Z" },
    { id: 2, name: "Dr. Lilian Mushi", email: "lilian.mushi@udsm.ac.tz", subject: "Guest Lecture on Venture Financing", message: "Available next month to deliver a workshop for the incubation cohort.", status: "REPLIED", replyText: "Thank you Dr. Mushi! We will schedule this for Nov 20th.", submittedAt: "2026-10-25T16:00:00Z" }
  ],
  equipment: [
    { id: 1, name: "Ultimaker S5 Dual 3D Printer", category: "Fabrication", location: "Hardware Lab - Bay 1", totalQuantity: 2, availableQuantity: 1, status: "AVAILABLE", specs: "PLA, ABS, Nylon | Max volume: 330 x 240 x 300 mm" },
    { id: 2, name: "Meta Quest 3 VR Development Kit", category: "AR/VR & Immersive", location: "XR Studio", totalQuantity: 4, availableQuantity: 3, status: "AVAILABLE", specs: "Snapdragon XR2 Gen 2, 512GB, Mixed Reality Color Passthrough" },
    { id: 3, name: "Raspberry Pi 4 (8GB) + IoT Sensor Kit", category: "Embedded Systems", location: "Electronics Shelf B", totalQuantity: 15, availableQuantity: 10, status: "AVAILABLE", specs: "Includes LoRaWAN hat, temperature/humidity, ultrasonic, GPS sensors" },
    { id: 4, name: "Digital Oscilloscope & Soldering Station", category: "Instrumentation", location: "Bench 3", totalQuantity: 3, availableQuantity: 2, status: "AVAILABLE", specs: "Rigol DS1054Z 50MHz, Hakko FX-888D soldering iron" },
    { id: 5, name: "Team Brainstorming Pod A (4-6 Pax)", category: "Lab Space", location: "Co-working Room 102", totalQuantity: 1, availableQuantity: 1, status: "AVAILABLE", specs: "Smart 65-inch 4K Display, Whiteboard, Video Conference Mic" }
  ],
  equipmentBookings: [
    { id: 1, userId: 4, userName: "Baraka Mwangi", userEmail: "member@y4c.com", equipmentId: 1, equipmentName: "Ultimaker S5 Dual 3D Printer", date: "2026-11-02", timeSlot: "10:00 AM - 01:00 PM", purpose: "Prototyping casing for IoT smart irrigation valve", status: "APPROVED", submittedAt: "2026-10-28T11:00:00Z" },
    { id: 2, userId: 6, userName: "Neema Rashid", userEmail: "neema@udsm.ac.tz", equipmentId: 3, equipmentName: "Raspberry Pi 4 (8GB) + IoT Sensor Kit", date: "2026-11-04", timeSlot: "02:00 PM - 05:00 PM", purpose: "Testing environmental sensor mesh network", status: "PENDING", submittedAt: "2026-10-29T09:00:00Z" }
  ],
  incubationMilestones: [
    { id: 1, projectId: 1, projectTitle: "Lishe App - Smart Urban Agriculture", innovatorName: "Michael Chen & Team", currentStage: "Prototyping / MVP", progress: 65,
      milestones: [
        { name: "Problem & Market Validation (HCD)", done: true, feedback: "Excellent interview records with 40 urban farmers." },
        { name: "Hardware IoT Sensor Prototype", done: true, feedback: "Soil moisture and automated valve verified." },
        { name: "Mobile App Pilot (Flutter/React)", done: false, feedback: "Backend API integration currently in progress." },
        { name: "Field Pilot & Farmer Feedback Trial", done: false, feedback: "Scheduled for December 2026." },
        { name: "Investor Pitch Deck & Demo Day", done: false, feedback: "Pending pilot completion." }
      ]
    },
    { id: 2, projectId: 2, projectTitle: "HCD Solutions - Usability Engine", innovatorName: "Sarah Johnson", currentStage: "Validation & Testing", progress: 40,
      milestones: [
        { name: "Problem & Market Validation (HCD)", done: true, feedback: "Institutional need confirmed." },
        { name: "Core Architecture & Wireframing", done: true, feedback: "Validated by lab coordinator." },
        { name: "Beta Release for 3 Hub Cohorts", done: false, feedback: "Under active testing." },
        { name: "Revenue Model & Partner Contracts", done: false, feedback: "In discussion with UDSM innovation directorate." }
      ]
    }
  ],
  experts: [
    { id: 1, name: "Dr. Ndelwa Joseph", role: "AI & Embedded Systems Lead", company: "UDSM CoICT", expertise: ["Artificial Intelligence", "Edge IoT", "Robotics"], availableSlots: ["Tuesdays 2:00 PM - 4:00 PM", "Thursdays 10:00 AM - 12:00 PM"] },
    { id: 2, name: "Maria Massawe", role: "Venture Partner & Legal Counsel", company: "Swahili Ventures", expertise: ["Startup Law", "IP Protection", "Seed Fundraising"], availableSlots: ["Wednesdays 3:00 PM - 5:00 PM", "Fridays 11:00 AM - 1:00 PM"] },
    { id: 3, name: "Godfrey Temu", role: "Principal UX / HCD Strategist", company: "DesignHub Africa", expertise: ["Human-Centered Design", "User Testing", "Product Strategy"], availableSlots: ["Mondays 10:00 AM - 12:00 PM", "Thursdays 3:00 PM - 5:00 PM"] }
  ],
  mentorshipBookings: [
    { id: 1, userId: 4, userName: "Baraka Mwangi", expertId: 1, expertName: "Dr. Ndelwa Joseph", date: "2026-11-03", slot: "Tuesdays 2:00 PM - 4:00 PM", topic: "Reviewing low-power LoRaWAN protocol design", status: "CONFIRMED", meetingLink: "https://meet.google.com/y4c-ment-ndw" }
  ],
  coFounderPosts: [
    { id: 1, authorId: 4, authorName: "Baraka Mwangi", projectName: "Smart Hydroponic Grow System", lookingFor: "Mobile App Developer (Flutter/React Native)", equityOrPerk: "Co-founder Equity (15%) + Hub Stipend", description: "We have built the hardware telemetry sensors and now need an intuitive mobile app for urban growers to control pumps remotely.", tags: ["Mobile", "Flutter", "AgriTech", "IoT"], createdAt: "2026-10-26" },
    { id: 2, authorId: 6, authorName: "Neema Rashid", projectName: "AfyaMama Alert", lookingFor: "UI/UX Designer & Researcher", equityOrPerk: "Co-founder / Certificate of Recognition", description: "Conducting user empathy interviews with midwives in Temeke. Need a designer proficient in Figma and Swahili localization.", tags: ["UI/UX", "Figma", "HealthTech", "HCD"], createdAt: "2026-10-27" }
  ],
  grants: [
    { id: 1, projectTitle: "Lishe App", category: "Prototyping Grant", amountTsh: "2,500,000 TZS", status: "DISBURSED", date: "2026-10-15", purpose: "Purchasing 10 sets of soil sensor probes & enclosure 3D filament", receiptUrl: "/receipts/lishe-grant-01.pdf" },
    { id: 2, projectTitle: "AfyaMama Alert", category: "Seed Exploration Grant", amountTsh: "1,500,000 TZS", status: "APPROVED", date: "2026-10-28", purpose: "Transport and field research allowances for user validation interviews", receiptUrl: null }
  ],
  certificates: [
    { id: "Y4C-CERT-2026-001", recipientName: "Baraka Mwangi", programTitle: "Human-Centered Design Practitioner", issueDate: "October 2026", verificationCode: "Y4C-VERIFY-9921", status: "ISSUED" },
    { id: "Y4C-CERT-2026-002", recipientName: "Sarah Johnson", programTitle: "Startup Incubation Cohort 1 Graduate", issueDate: "September 2026", verificationCode: "Y4C-VERIFY-8834", status: "ISSUED" }
  ],
  learningModules: [
    { id: 1, title: "Module 1: Human-Centered Design & Empathy Mapping", duration: "2 Hours", lessonsCount: 5, completed: true, score: 95, color: "from-blue-500 to-indigo-600" },
    { id: 2, title: "Module 2: Rapid Prototyping & Wireframing with Figma", duration: "3.5 Hours", lessonsCount: 8, completed: true, score: 88, color: "from-amber-500 to-orange-600" },
    { id: 3, title: "Module 3: Fullstack Web & IoT Architecture", duration: "5 Hours", lessonsCount: 12, completed: false, score: 62, color: "from-emerald-500 to-teal-600" },
    { id: 4, title: "Module 4: Business Models & Pitching to Seed Investors", duration: "4 Hours", lessonsCount: 6, completed: false, score: 0, color: "from-purple-500 to-pink-600" }
  ],
  hostingRequests: [
    {
      id: 1,
      userId: 4,
      studentName: "Baraka Mwangi",
      studentEmail: "member@y4c.com",
      projectName: "Lishe App - Smart Urban Agriculture",
      gitRepositoryUrl: "https://github.com/udsm-innovators/lishe-app-telemetry",
      techStack: "React + Node.js + PostgreSQL",
      requestedSubdomain: "lishe",
      databaseNeeded: "PostgreSQL",
      environmentVariables: "PORT=8080\nNODE_ENV=production\nDB_HOST=10.0.4.12",
      deploymentNotes: "Need real-time IoT MQTT broker socket listening on port 8883 for field sensors.",
      status: "ACTIVE",
      liveUrl: "https://lishe.y4chub.udsm.ac.tz",
      serverIp: "196.216.240.42",
      allocatedPort: 8084,
      accessCredentials: "ssh y4c_deploy@196.216.240.42 -p 2202",
      coordinatorRemarks: "Provisioned in UDSM CoICT DMZ server rack. SSL Wildcard certificate attached.",
      requestedAt: "2026-10-25T11:00:00Z",
      provisionedAt: "2026-10-26T09:30:00Z"
    },
    {
      id: 2,
      userId: 6,
      studentName: "Neema Rashid",
      studentEmail: "neema@udsm.ac.tz",
      projectName: "AfyaMama Alert Health Bot",
      gitRepositoryUrl: "https://github.com/neema-r/afyamama-triage-ai",
      techStack: "Python / FastAPI + Docker",
      requestedSubdomain: "afyamama",
      databaseNeeded: "PostgreSQL",
      environmentVariables: "MODEL_PATH=/models/triage_v1.bin\nMAX_WORKERS=4",
      deploymentNotes: "Needs 4GB RAM container for local Swahili NLP transformer inference.",
      status: "PENDING_APPROVAL",
      liveUrl: null,
      serverIp: null,
      allocatedPort: null,
      accessCredentials: null,
      coordinatorRemarks: null,
      requestedAt: "2026-10-29T08:15:00Z",
      provisionedAt: null
    }
  ]
};

class MockStore {
  constructor() {
    this.init();
  }

  init() {
    Object.keys(initialData).forEach((key) => {
      const stored = localStorage.getItem(STORAGE_PREFIX + key);
      if (!stored) {
        localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(initialData[key]));
      }
    });
  }

  get(key) {
    const raw = localStorage.getItem(STORAGE_PREFIX + key);
    try {
      return raw ? JSON.parse(raw) : (initialData[key] || []);
    } catch {
      return initialData[key] || [];
    }
  }

  set(key, data) {
    localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(data));
    return data;
  }

  add(key, item) {
    const list = this.get(key);
    const newItem = { id: Date.now(), ...item };
    list.unshift(newItem);
    this.set(key, list);
    return newItem;
  }

  update(key, id, updates) {
    const list = this.get(key);
    const updated = list.map((item) => (String(item.id) === String(id) ? { ...item, ...updates } : item));
    this.set(key, updated);
    return updated.find((item) => String(item.id) === String(id));
  }

  delete(key, id) {
    const list = this.get(key);
    const filtered = list.filter((item) => String(item.id) !== String(id));
    this.set(key, filtered);
    return true;
  }
}

export const mockStore = new MockStore();
