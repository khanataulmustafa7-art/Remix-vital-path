import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Send, Mail, User, MessageSquare, CheckCircle, AlertCircle, 
  Loader2, Sparkles, Trash2, ArrowRight, Check, Zap, Cpu, RefreshCw,
  Fingerprint, Key, BarChart2, Search, PlusCircle, CheckSquare, Shield
} from 'lucide-react';

export interface SupportTicket {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  timestamp: string;
  status: 'Unresolved' | 'Resolved';
  verificationKey: string;
  regulatoryFramework?: string;
  aiAnalysis?: string;
  aiResolution?: string;
  aiActionType?: string;
  aiActionValue?: string;
  adminReply?: string;
}

interface ContactFormProps {
  currentCalories: number;
  onUpdateCalories: (kcal: number) => void;
  currentDiet: string;
  onUpdateDiet: (diet: string) => void;
  onClearLogs: () => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  currentCalories,
  onUpdateCalories,
  currentDiet,
  onUpdateDiet,
  onClearLogs
}) => {
  // Tabs: 'user' or 'admin'
  const [activePortalTab, setActivePortalTab] = useState<'user' | 'admin'>('user');

  // Admin authentication state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [adminAuthError, setAdminAuthError] = useState<string | null>(null);

  // Tickets stored in state & localStorage
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  
  // User Form State
  const [formData, setFormData] = useState({
    name: 'Alex Rivera',
    email: 'alex.rivera@gmail.com',
    requestType: 'Support Inquiry',
    regulatoryFramework: 'None',
    subject: 'Bug Report',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userFormError, setUserFormError] = useState<string | null>(null);
  const [userFormSuccess, setUserFormSuccess] = useState<boolean>(false);
  const [lastSubmittedId, setLastSubmittedId] = useState<string | null>(null);

  // Search & Filter State for Admin Dashboard
  const [adminSearch, setAdminSearch] = useState('');
  const [adminStatusFilter, setAdminStatusFilter] = useState<'All' | 'Unresolved' | 'Resolved'>('All');
  const [adminCategoryFilter, setAdminCategoryFilter] = useState<'All' | 'Support' | 'Legal'>('All');

  // AI Diagnostic Status
  const [isDiagnosingId, setIsDiagnosingId] = useState<string | null>(null);
  const [diagnosticError, setDiagnosticError] = useState<string | null>(null);

  // Custom Admin Reply state
  const [adminRepliesText, setAdminRepliesText] = useState<{ [ticketId: string]: string }>({});

  // Auto-generate high-quality verification key for privacy-by-design
  const [userVerificationKey, setUserVerificationKey] = useState<string>('');

  useEffect(() => {
    // Load / Generate Verification Key on Mount
    let vKey = localStorage.getItem('vitalpath_local_principal_key');
    if (!vKey) {
      vKey = `VPATH-SECURE-${Math.random().toString(36).substring(2, 10).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
      localStorage.setItem('vitalpath_local_principal_key', vKey);
    }
    setUserVerificationKey(vKey);

    // Load Support Tickets
    try {
      const saved = localStorage.getItem('vitalpath_support_tickets');
      if (saved) {
        setTickets(JSON.parse(saved));
      } else {
        const defaultTickets: SupportTicket[] = [
          {
            id: 'ticket-demo-1',
            name: 'Alex Rivera',
            email: 'alex.rivera@gmail.com',
            subject: 'Calorie Threshold Adjustment Needed',
            message: 'My physician recommended moving my calorie threshold to 2300 kcal for athletic rehab. Please adjust my budget.',
            timestamp: new Date(Date.now() - 3600000 * 2.5).toISOString(),
            status: 'Unresolved',
            verificationKey: vKey,
            regulatoryFramework: 'None'
          },
          {
            id: 'ticket-demo-2',
            name: 'Alex Rivera',
            email: 'alex.rivera@gmail.com',
            subject: 'Request to Switch Diet Preset',
            message: 'I want to switch my dietary style preference to Keto to match my fat-loss macro balance.',
            timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
            status: 'Unresolved',
            verificationKey: vKey,
            regulatoryFramework: 'None'
          }
        ];
        setTickets(defaultTickets);
        localStorage.setItem('vitalpath_support_tickets', JSON.stringify(defaultTickets));
      }
    } catch (e) {
      console.error("Failed loading tickets from localStorage", e);
    }
  }, []);

  const saveTickets = (updated: SupportTicket[]) => {
    setTickets(updated);
    localStorage.setItem('vitalpath_support_tickets', JSON.stringify(updated));
  };

  // User quick templates
  const userTemplates = [
    {
      label: "🎯 Calorie Target Adjustment",
      requestType: "Diet Calibration",
      regulatoryFramework: "None",
      subject: "Modify Calorie Goal",
      message: "My daily calorie target is set to 2000 kcal, but my trainer recommended 2450 kcal for muscle recovery. Please adjust my budget.",
    },
    {
      label: "🥗 Switch Diet Focus",
      requestType: "Diet Calibration",
      regulatoryFramework: "None",
      subject: "Switch to High-Protein",
      message: "I want to switch my dietary style to the High-Protein configuration to help with active athletic training.",
    },
    {
      label: "🔒 GDPR Article 20 Portability",
      requestType: "Legal Compliance",
      regulatoryFramework: "GDPR",
      subject: "Data Portability Request",
      message: "Pursuant to GDPR Article 20, I request a secure, structured JSON export of all my nutrition logs, scan metrics, and target data.",
    },
    {
      label: "🧹 CCPA Right to Delete",
      requestType: "Legal Compliance",
      regulatoryFramework: "CCPA",
      subject: "Scrub My Local Diagnostics",
      message: "Pursuant to CCPA/CPRA, I request that you scrub all associated diagnostic logs and completely wipe my meal history logs.",
    }
  ];

  const applyTemplate = (tpl: typeof userTemplates[0]) => {
    setFormData(prev => ({
      ...prev,
      requestType: tpl.requestType,
      regulatoryFramework: tpl.regulatoryFramework,
      subject: tpl.subject,
      message: tpl.message
    }));
    setUserFormSuccess(false);
    setUserFormError(null);
  };

  const handleUserFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (userFormError) setUserFormError(null);
  };

  // Submit Ticket (User)
  const handleUserSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setUserFormError("Please enter your name.");
      return;
    }
    if (!formData.email.trim() || !formData.email.includes("@")) {
      setUserFormError("Please enter a valid email address.");
      return;
    }
    if (formData.message.trim().length < 10) {
      setUserFormError("Please expand your message details (minimum 10 characters).");
      return;
    }

    setIsSubmitting(true);
    setUserFormError(null);

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: `${formData.requestType === 'Legal Compliance' ? '[' + formData.regulatoryFramework + ']' : ''} ${formData.subject}`,
          message: formData.message
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "An error occurred while transmitting your request.");
      }

      const ticketId = data.messageId || `ticket-${Date.now()}`;
      
      const newTicket: SupportTicket = {
        id: ticketId,
        name: formData.name,
        email: formData.email,
        subject: `${formData.requestType === 'Legal Compliance' ? '[' + formData.regulatoryFramework + ']' : ''} ${formData.subject}`,
        message: formData.message,
        timestamp: new Date().toISOString(),
        status: 'Unresolved',
        verificationKey: userVerificationKey,
        regulatoryFramework: formData.requestType === 'Legal Compliance' ? formData.regulatoryFramework : undefined
      };

      const updated = [newTicket, ...tickets];
      saveTickets(updated);

      setUserFormSuccess(true);
      setLastSubmittedId(ticketId);
      setFormData(prev => ({ ...prev, subject: '', message: '' }));
    } catch (err: any) {
      setUserFormError(err.message || "Failed to submit. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Admin Password Login
  const handleAdminLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const correctKeys = ['admin123', 'vitalpath2026', 'remix2026'];
    if (correctKeys.includes(adminPassword.trim().toLowerCase())) {
      setIsAdminAuthenticated(true);
      setAdminAuthError(null);
    } else {
      setAdminAuthError("Invalid Security Key. Try 'admin123' or use bypass.");
    }
  };

  const handleBypassAdminLogin = () => {
    setIsAdminAuthenticated(true);
    setAdminAuthError(null);
  };

  // Run AI Audit on Ticket
  const handleRunAiAudit = async (ticket: SupportTicket) => {
    setIsDiagnosingId(ticket.id);
    setDiagnosticError(null);

    try {
      const response = await fetch('/api/ai-solve-ticket', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          subject: ticket.subject,
          message: ticket.message,
          currentCalories,
          currentDiet,
          currentLang: 'en'
        })
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.error || "API Audit failure.");
      }

      const result = await response.json();

      const updated = tickets.map(t => {
        if (t.id === ticket.id) {
          return {
            ...t,
            aiAnalysis: result.analysis,
            aiResolution: result.resolution,
            aiActionType: result.actionType,
            aiActionValue: result.actionValue
          };
        }
        return t;
      });

      saveTickets(updated);
    } catch (err: any) {
      setDiagnosticError(err.message || "Diagnostic failed.");
    } finally {
      setIsDiagnosingId(null);
    }
  };

  // Execute AI Auto-Fix Trigger
  const handleExecuteFix = (ticket: SupportTicket) => {
    if (!ticket.aiActionType) return;

    try {
      switch (ticket.aiActionType) {
        case 'SET_CALORIES':
          if (ticket.aiActionValue) {
            const val = parseInt(ticket.aiActionValue, 10);
            if (!isNaN(val)) {
              onUpdateCalories(val);
            }
          }
          break;
        case 'SET_DIET':
          if (ticket.aiActionValue) {
            onUpdateDiet(ticket.aiActionValue);
          }
          break;
        case 'CLEAR_LOGS':
          onClearLogs();
          break;
        default:
          break;
      }

      const updated = tickets.map(t => {
        if (t.id === ticket.id) {
          return {
            ...t,
            status: 'Resolved' as const,
            adminReply: ticket.adminReply || `Automated System Fix applied. ${ticket.aiResolution || ''}`
          };
        }
        return t;
      });

      saveTickets(updated);
    } catch (e) {
      console.error("Failed to execute settings auto-fix:", e);
    }
  };

  const handleSendAdminReply = (ticketId: string) => {
    const text = adminRepliesText[ticketId];
    if (!text || !text.trim()) return;

    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: 'Resolved' as const,
          adminReply: text
        };
      }
      return t;
    });

    saveTickets(updated);
    setAdminRepliesText(prev => ({ ...prev, [ticketId]: '' }));
  };

  const toggleTicketStatus = (ticketId: string) => {
    const updated = tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: t.status === 'Resolved' ? 'Unresolved' as const : 'Resolved' as const
        };
      }
      return t;
    });
    saveTickets(updated);
  };

  const handleDeleteTicket = (ticketId: string) => {
    const filtered = tickets.filter(t => t.id !== ticketId);
    saveTickets(filtered);
  };

  // Seed sample interactive data cases
  const handleSeedInquiries = () => {
    const seed: SupportTicket[] = [
      {
        id: `ticket-seed-${Date.now()}-1`,
        name: 'Sarah Jenkins',
        email: 'sarah.jenkins@compliance-inc.eu',
        subject: 'GDPR Article 20 Structural Export Request',
        message: 'Under GDPR Article 20 (Right to Data Portability), please provide a secure structural JSON file containing my full metabolic calibration levels and calorie logs.',
        timestamp: new Date(Date.now() - 600000).toISOString(),
        status: 'Unresolved',
        verificationKey: `VPATH-SECURE-GDPR-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        regulatoryFramework: 'GDPR'
      },
      {
        id: `ticket-seed-${Date.now()}-2`,
        name: 'Michael Gupta',
        email: 'gupta.michael@gmail.com',
        subject: 'Indian DPDP Act Section 6 - Adjust Target Calories',
        message: 'I would like to update my processed biometric parameters. Please set my daily calorie allocation threshold to 2400 kcal.',
        timestamp: new Date(Date.now() - 1200000).toISOString(),
        status: 'Unresolved',
        verificationKey: `VPATH-SECURE-DPDP-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        regulatoryFramework: 'DPDP'
      },
      {
        id: `ticket-seed-${Date.now()}-3`,
        name: 'Emily Davis',
        email: 'emily.davis@health.org',
        subject: 'CCPA Request: Scrub Local Diagnostic Logs',
        message: 'Pursuant to CCPA, please scrub all local cached diagnostics and wipe my entire food diary logs right now.',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        status: 'Unresolved',
        verificationKey: `VPATH-SECURE-CCPA-${Math.random().toString(36).substring(2, 6).toUpperCase()}`,
        regulatoryFramework: 'CCPA'
      }
    ];

    saveTickets([...seed, ...tickets]);
  };

  // Metrics
  const totalCases = tickets.length;
  const pendingCases = tickets.filter(t => t.status === 'Unresolved').length;
  const resolvedCasesCount = tickets.filter(t => t.status === 'Resolved').length;
  const legalCasesCount = tickets.filter(t => t.regulatoryFramework && t.regulatoryFramework !== 'None').length;

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = 
      t.name.toLowerCase().includes(adminSearch.toLowerCase()) ||
      t.email.toLowerCase().includes(adminSearch.toLowerCase()) ||
      t.subject.toLowerCase().includes(adminSearch.toLowerCase()) ||
      t.message.toLowerCase().includes(adminSearch.toLowerCase());

    const matchesStatus = 
      adminStatusFilter === 'All' ? true :
      adminStatusFilter === 'Unresolved' ? t.status === 'Unresolved' :
      t.status === 'Resolved';

    const matchesCategory = 
      adminCategoryFilter === 'All' ? true :
      adminCategoryFilter === 'Support' ? (!t.regulatoryFramework || t.regulatoryFramework === 'None') :
      (t.regulatoryFramework && t.regulatoryFramework !== 'None');

    return matchesSearch && matchesStatus && matchesCategory;
  });

  return (
    <div id="settings-secure-portal-card" className="bg-slate-950/40 border border-slate-800 rounded-2xl p-5 space-y-6">
      
      {/* Header and Toggle tab */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 border-b border-slate-800 pb-4">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-400" />
          <h3 className="text-xs font-black text-white uppercase tracking-wider">
            SaaS Security Support & Legal Desk
          </h3>
        </div>

        <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-850 shrink-0 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setActivePortalTab('user')}
            className={`px-2.5 py-1 rounded text-xxs font-black uppercase transition-all cursor-pointer ${
              activePortalTab === 'user' ? 'bg-indigo-600 text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            User Filing Portal
          </button>
          <button
            type="button"
            onClick={() => setActivePortalTab('admin')}
            className={`px-2.5 py-1 rounded text-xxs font-black uppercase transition-all cursor-pointer flex items-center gap-1 ${
              activePortalTab === 'admin' ? 'bg-emerald-600 text-white' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            Admin Dashboard
            {pendingCases > 0 && <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />}
          </button>
        </div>
      </div>

      {/* PORTAL TAB 1: USER FILING PORTAL */}
      {activePortalTab === 'user' && (
        <div className="space-y-5 text-left">
          
          <div className="p-3 bg-slate-950/40 rounded-xl border border-indigo-950/40 flex items-start gap-2.5">
            <Fingerprint className="w-6 h-6 text-indigo-400 shrink-0 mt-0.5" />
            <div>
              <p className="text-xxs text-slate-400 leading-normal">
                Remix VitalPath processes biometric statistics. This portal establishes a stateless cryptographic principal verification audit to ensure complete regulatory compliance with Indian DPDP Act 2023, GDPR, CCPA, and HIPAA.
              </p>
              <p className="text-[9px] font-mono text-slate-500 mt-1 select-all">
                Key ID: <span className="text-indigo-400 font-bold">{userVerificationKey}</span>
              </p>
            </div>
          </div>

          {/* Quick Select Templates */}
          <div className="space-y-1.5">
            <span className="text-[9px] font-black text-indigo-400 uppercase tracking-wider block">
              💡 Select a Compliance or Calibration Template:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
              {userTemplates.map((tpl, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyTemplate(tpl)}
                  className="p-1.5 border text-left bg-slate-950/20 hover:bg-slate-950/40 text-slate-300 border-slate-850 hover:border-slate-800 rounded-lg transition-all text-[10px] truncate flex items-center justify-between gap-1 cursor-pointer"
                >
                  <span className="truncate">{tpl.label}</span>
                  <PlusCircle className="w-3 h-3 text-slate-500 hover:text-white shrink-0" />
                </button>
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {userFormSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-5 text-center bg-slate-900/40 border border-emerald-500/20 rounded-xl space-y-2.5"
              >
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-xs font-bold text-emerald-400">Case Ingested Successfully!</h4>
                <p className="text-xxs text-slate-400">
                  Your regulatory record was processed. You can review AI diagnostics or execute auto-fixes on the Admin Cases tab.
                </p>
                <button
                  onClick={() => setUserFormSuccess(false)}
                  className="px-2.5 py-1 bg-indigo-600/10 text-indigo-400 rounded-lg text-xxs font-bold border border-indigo-500/15 cursor-pointer"
                >
                  File Another Query
                </button>
              </motion.div>
            ) : (
              <motion.form
                onSubmit={handleUserSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-3"
              >
                {userFormError && (
                  <div className="p-2.5 bg-rose-500/10 border border-rose-500/25 rounded-xl text-xxs text-rose-400 flex items-center gap-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                    <span>{userFormError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Your Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleUserFormChange}
                      className="w-full bg-slate-900 text-xs text-white px-2.5 py-1.5 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleUserFormChange}
                      className="w-full bg-slate-900 text-xs text-white px-2.5 py-1.5 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Filing Channel</label>
                    <select
                      name="requestType"
                      value={formData.requestType}
                      onChange={handleUserFormChange}
                      className="w-full bg-slate-900 text-xs text-white px-2.5 py-1.5 border border-slate-800 rounded-lg focus:outline-none cursor-pointer"
                    >
                      <option value="Support Inquiry">Support / Bug Report</option>
                      <option value="Diet Calibration">Diet & Metric Calibration</option>
                      <option value="Legal Compliance">Formal Compliance Filing</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Regulatory Framework</label>
                    <select
                      name="regulatoryFramework"
                      disabled={formData.requestType !== 'Legal Compliance'}
                      value={formData.regulatoryFramework}
                      onChange={handleUserFormChange}
                      className="w-full bg-slate-900 disabled:bg-slate-950 disabled:text-slate-600 text-xs text-white px-2.5 py-1.5 border border-slate-800 rounded-lg focus:outline-none cursor-pointer font-mono"
                    >
                      <option value="None">None / General</option>
                      <option value="GDPR">GDPR (Data Portability)</option>
                      <option value="CCPA">CCPA (Right to Delete)</option>
                      <option value="DPDP">DPDP Act (Consent Recalls)</option>
                      <option value="HIPAA">HIPAA (Privacy Audit)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Case Subject</label>
                  <input
                    type="text"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleUserFormChange}
                    className="w-full bg-slate-900 text-xs text-white px-2.5 py-1.5 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-bold text-slate-400 uppercase tracking-wider block">Detailed Statement</label>
                  <textarea
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleUserFormChange}
                    rows={2}
                    className="w-full bg-slate-900 text-xs text-white px-2.5 py-1.5 border border-slate-800 rounded-lg focus:outline-none focus:border-indigo-500 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold uppercase tracking-wider text-[10px] rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  <span>File Document & Run AI Diagnosis</span>
                </button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      )}

      {/* PORTAL TAB 2: ADMIN DASHBOARD */}
      {activePortalTab === 'admin' && (
        <div className="space-y-5 text-left">
          
          {!isAdminAuthenticated ? (
            <div className="max-w-xs mx-auto p-4 bg-slate-950/40 rounded-xl border border-slate-850 text-center space-y-3">
              <Lock className="w-8 h-8 text-indigo-400 mx-auto" />
              <p className="text-xxs text-slate-400 leading-normal">
                Administrator access required.
              </p>
              <form onSubmit={handleAdminLoginSubmit} className="space-y-2">
                {adminAuthError && (
                  <p className="text-[9px] text-rose-400">{adminAuthError}</p>
                )}
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Security Key (admin123)"
                  className="w-full bg-slate-900 text-xs text-white px-2 py-1.5 border border-slate-800 rounded-lg text-center"
                />
                <div className="flex gap-1.5">
                  <button
                    type="submit"
                    className="flex-grow py-1.5 bg-indigo-600 text-white text-[10px] font-bold rounded-lg cursor-pointer"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={handleBypassAdminLogin}
                    className="px-2 py-1.5 bg-slate-900 text-slate-400 border border-slate-800 text-[10px] font-bold rounded-lg cursor-pointer"
                  >
                    Bypass
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-4">
              
              {/* Stats Widgets */}
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-850">
                  <span className="text-[8px] text-slate-500 font-bold block uppercase">Total Cases</span>
                  <span className="text-sm font-black text-white mt-0.5 block">{totalCases}</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-850">
                  <span className="text-[8px] text-amber-500 font-bold block uppercase">Open Tasks</span>
                  <span className="text-sm font-black text-amber-400 mt-0.5 block">{pendingCases}</span>
                </div>
                <div className="p-2 bg-slate-900 rounded-xl border border-slate-850">
                  <span className="text-[8px] text-purple-500 font-bold block uppercase">Legal Audits</span>
                  <span className="text-sm font-black text-purple-400 mt-0.5 block">{legalCasesCount}</span>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex items-center justify-between gap-2 p-2 bg-slate-950 rounded-xl border border-slate-850">
                <button
                  type="button"
                  onClick={handleSeedInquiries}
                  className="px-2.5 py-1 bg-emerald-600/10 text-emerald-400 border border-emerald-500/20 text-[9px] font-bold uppercase rounded-lg transition-all flex items-center gap-1 cursor-pointer"
                >
                  <PlusCircle className="w-3 h-3" />
                  <span>Seed Compliance Cases</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdminAuthenticated(false)}
                  className="text-[9px] text-slate-500 hover:text-slate-300 uppercase font-bold"
                >
                  Lock Terminal
                </button>
              </div>

              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  placeholder="Search ledger..."
                  className="flex-grow bg-slate-900 text-[10px] text-white px-2 py-1.5 border border-slate-850 rounded-lg focus:outline-none"
                />
                <select
                  value={adminStatusFilter}
                  onChange={(e) => setAdminStatusFilter(e.target.value as any)}
                  className="bg-slate-900 text-[10px] text-white px-2 py-1.5 border border-slate-850 rounded-lg focus:outline-none cursor-pointer"
                >
                  <option value="All">All Statuses</option>
                  <option value="Unresolved">Open Tickets</option>
                  <option value="Resolved">Resolved Cases</option>
                </select>
              </div>

              {/* Case Cards Grid */}
              <div className="space-y-3 max-h-[40vh] overflow-y-auto pr-1">
                {filteredTickets.length === 0 ? (
                  <p className="text-[10px] text-slate-500 text-center py-4">No matching cases stored.</p>
                ) : (
                  filteredTickets.map(ticket => {
                    const isDiagnosingThis = isDiagnosingId === ticket.id;
                    const hasAiResponse = ticket.aiAnalysis || ticket.aiResolution;
                    const isResolvableAction = ticket.aiActionType && ticket.aiActionType !== 'EXPLAIN_ONLY';

                    return (
                      <div 
                        key={ticket.id} 
                        className={`p-3.5 rounded-xl border ${
                          ticket.status === 'Resolved' ? 'bg-emerald-950/5 border-emerald-500/20' : 'bg-slate-900/60 border-slate-850'
                        }`}
                      >
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-1.5">
                            <span className="text-[8px] font-black uppercase text-indigo-400">
                              {ticket.regulatoryFramework && ticket.regulatoryFramework !== 'None' 
                                ? `${ticket.regulatoryFramework} regulatory compliance`
                                : 'SaaS metric request'}
                            </span>

                            <button
                              type="button"
                              onClick={() => handleDeleteTicket(ticket.id)}
                              className="text-slate-600 hover:text-rose-400 cursor-pointer"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>

                          <h5 className="text-xs font-bold text-white leading-snug">{ticket.subject}</h5>
                          <p className="text-xxs text-slate-300 italic">"{ticket.message}"</p>
                          <p className="text-[8px] font-mono text-slate-500">Sender: {ticket.name} ({ticket.email})</p>

                          {ticket.adminReply && (
                            <div className="p-2 bg-indigo-950/20 border border-indigo-500/10 rounded-lg text-xxs text-slate-300 mt-1.5">
                              <strong>Official Resolution Notice:</strong> {ticket.adminReply}
                            </div>
                          )}

                          {ticket.status !== 'Resolved' && (
                            <div className="pt-2 border-t border-slate-950 space-y-2">
                              {hasAiResponse ? (
                                <div className="p-2 bg-slate-950 rounded-lg border border-slate-900 text-xxs space-y-1">
                                  <p className="text-[10px] font-bold text-indigo-400">AI Diagnostic Rec:</p>
                                  <p className="text-xxs text-slate-400">{ticket.aiResolution}</p>
                                  {isResolvableAction && (
                                    <button
                                      type="button"
                                      onClick={() => handleExecuteFix(ticket)}
                                      className="w-full mt-1.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xxs rounded transition-all cursor-pointer"
                                    >
                                      Execute AI Auto-Fix (Live Update)
                                    </button>
                                  )}
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  disabled={!!isDiagnosingId}
                                  onClick={() => handleRunAiAudit(ticket)}
                                  className="w-full py-1 bg-slate-950 hover:bg-slate-900 border border-slate-850 text-indigo-400 text-xxs font-bold rounded flex items-center justify-center gap-1 cursor-pointer"
                                >
                                  {isDiagnosingThis ? (
                                    <Loader2 className="w-3 h-3 animate-spin text-indigo-400" />
                                  ) : (
                                    <Sparkles className="w-3 h-3 text-indigo-400" />
                                  )}
                                  <span>Analyze with AI Audit</span>
                                </button>
                              )}

                              {/* Manual Answer box */}
                              <div className="relative">
                                <input
                                  type="text"
                                  value={adminRepliesText[ticket.id] || ''}
                                  onChange={(e) => setAdminRepliesText(prev => ({ ...prev, [ticket.id]: e.target.value }))}
                                  placeholder="Manual resolution response..."
                                  className="w-full bg-slate-950 text-xxs text-white px-2 pr-12 py-1 border border-slate-850 rounded-lg focus:outline-none"
                                />
                                <button
                                  type="button"
                                  onClick={() => handleSendAdminReply(ticket.id)}
                                  disabled={!(adminRepliesText[ticket.id] || '').trim()}
                                  className="absolute right-1 top-1 text-[9px] font-bold text-indigo-400 disabled:text-slate-600 hover:text-indigo-300"
                                >
                                  Reply
                                </button>
                              </div>
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => toggleTicketStatus(ticket.id)}
                            className="w-full py-0.5 border border-slate-850 hover:bg-slate-950/20 text-[9px] text-slate-500 rounded font-bold cursor-pointer mt-1"
                          >
                            {ticket.status === 'Resolved' ? 'Reopen Case' : 'Resolve Manually'}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

            </div>
          )}

        </div>
      )}

    </div>
  );
};
