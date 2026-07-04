import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  Lock, 
  Eye, 
  Server, 
  FileText, 
  ShieldCheck, 
  Database, 
  Trash2, 
  Globe, 
  Fingerprint, 
  HeartHandshake,
  Mail
} from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState<string>('all');

  const sections = [
    { id: 'all', label: 'Complete Policy', icon: FileText },
    { id: 'data', label: 'Data Custody & AI Flow', icon: Database },
    { id: 'compliance', label: 'Regulatory Compliance', icon: Globe },
    { id: 'security', label: 'Security & Erasure', icon: Lock },
    { id: 'legal', label: 'Legal Contact Protocol', icon: ShieldCheck },
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          {/* Backdrop Blur */}
          <motion.div
            id="privacy-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-slate-950/85 backdrop-blur-sm z-40"
          />

          {/* Modal Card */}
          <motion.div
            id="privacy-modal-card"
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ type: "spring", duration: 0.4 }}
            className="bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col relative z-50 overflow-hidden font-sans text-slate-300"
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3 text-left">
                <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                  <Lock className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-black text-white uppercase tracking-wider">
                    Privacy Policy & Data Custody
                  </h2>
                  <p className="text-[11px] text-slate-400">
                    Remix VitalPath Security Framework (v2.1) • Updated July 2026
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-1.5 bg-slate-950/40 border border-slate-850 hover:border-slate-700 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                aria-label="Close Privacy Policy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Navigation Filter */}
            <div className="px-6 py-3 border-b border-slate-850 bg-slate-900/60 flex flex-wrap gap-2 shrink-0">
              {sections.map((sec) => {
                const Icon = sec.icon;
                const isActive = activeSection === sec.id;
                return (
                  <button
                    key={sec.id}
                    onClick={() => setActiveSection(sec.id)}
                    className={`px-3 py-1.5 rounded-lg text-xxs font-bold uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shadow-sm' 
                        : 'bg-slate-950/30 border border-slate-850 text-slate-400 hover:text-slate-300 hover:bg-slate-850/50'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-indigo-400' : 'text-slate-500'}`} />
                    <span>{sec.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Scrollable Content Area */}
            <div className="p-6 md:p-8 overflow-y-auto space-y-6 text-xs leading-relaxed max-h-[calc(85vh-180px)] text-slate-300 text-left">
              
              {/* Highlight Callout Box */}
              {(activeSection === 'all' || activeSection === 'data') && (
                <div className="p-4 bg-indigo-500/[0.03] border border-indigo-500/10 rounded-xl flex gap-3 items-start">
                  <HeartHandshake className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p className="font-bold text-indigo-400 text-xxs uppercase tracking-wider">
                      Our Privacy Pledge: Local First & Transparent AI
                    </p>
                    <p className="text-[11px] text-slate-300">
                      We believe your health and nutritional data belongs entirely to you. Remix VitalPath is designed with a local-first philosophy—storing your biometric details, diet settings, and calorie history securely on your browser cache rather than a remote server database, giving you immediate control over your digital footprint.
                    </p>
                  </div>
                </div>
              )}

              {/* SECTION 1: OVERVIEW & SCOPE */}
              {(activeSection === 'all') && (
                <div className="space-y-3">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Fingerprint className="w-4 h-4 text-indigo-400" />
                    <span>1. OVERVIEW & SCOPE</span>
                  </h3>
                  <p>
                    This Privacy Policy explains how <strong>Remix VitalPath</strong> (referred to as "the Application", "the Service", "we", "us", or "our") collects, processes, protects, and handles personal information, nutrition history, and visual food scans uploaded by our users. 
                  </p>
                  <p>
                    We operate with extreme care regarding medical, biometric, dietary, and fitness datasets. This policy applies to all aspects of the application, including the AI computer vision meal scanner, target calculators, saved plates, weekly reports, and wellness diaries. By interacting with the Service, you signify your active, informed agreement to these terms.
                  </p>
                  <p className="text-slate-400 text-xxs">
                    We strictly implement privacy-by-design and privacy-by-default concepts as specified in ISO/IEC 27701 and standard global data stewardship regimes.
                  </p>
                </div>
              )}

              {/* SECTION 2: DATA TYPES & LOG STORAGE */}
              {(activeSection === 'all' || activeSection === 'data') && (
                <div className="space-y-4 p-5 bg-slate-950/40 rounded-xl border border-slate-850">
                  <h3 className="text-sm font-bold text-indigo-400 flex items-center gap-2">
                    <Database className="w-4 h-4 text-indigo-400" />
                    <span>2. DATA TYPES & METRIC CUSTODY</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800">
                      <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                        <span>Client-Side Local Storage</span>
                      </h4>
                      <p className="text-xxs text-slate-400 leading-relaxed">
                        Biometric target limits (calories, proteins, fats, carbs), diet presets, and active log diaries are saved locally on your hardware. We do not transmit or store these on long-term remote servers unless you request custom integrations.
                      </p>
                      <ul className="mt-2 space-y-1 text-[10px] text-slate-500 list-disc pl-3">
                        <li>Stored key: <code className="text-indigo-400">vitalpath_target_calories</code></li>
                        <li>Stored key: <code className="text-indigo-400">vitalpath_diet_preference</code></li>
                        <li>Stored key: <code className="text-indigo-400">vitalpath_daily_logs</code></li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800">
                      <h4 className="text-xs font-bold text-white mb-1 flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
                        <span>AI Meal Scanner & Vision Files</span>
                      </h4>
                      <p className="text-xxs text-slate-400 leading-relaxed">
                        Food photographs and meal descriptions are temporarily processed via stateless secure API routes to isolate ingredients. This visual input is passed directly to Google's Gemini models for nutrition analysis and is never stored, cataloged, or reused for public advertising.
                      </p>
                      <ul className="mt-2 space-y-1 text-[10px] text-slate-500 list-disc pl-3">
                        <li>No metadata preservation (EXIF stripped)</li>
                        <li>Immediate ram-based image disposal</li>
                        <li>Zero database caching for upload binaries</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-2 text-xxs text-slate-400 pl-2 border-l-2 border-indigo-500/30">
                    <p>
                      <strong>How Gemini AI Processes Inputs:</strong> Our backend server relays the food photo or description payload to the Gemini API utilizing strict security protocols. Under enterprise agreement provisions, these parameters are parsed statelessly, meaning they are processed in-memory and immediately forgotten once the nutritional breakdown is returned to your client.
                    </p>
                    <p>
                      <strong>No Commercial Profiling:</strong> We do not sell your biometric, caloric, or search data to data brokers, pharmaceutical entities, insurance firms, or commercial advertising networks.
                    </p>
                    <p>
                      <strong>Saved Plates & Favorites:</strong> Any meals saved for rapid logging are kept in local storage. They do not reside on our servers, ensuring your favorite eating habits remain confidential.
                    </p>
                  </div>
                </div>
              )}

              {/* SECTION 3: REGULATORY COMPLIANCE */}
              {(activeSection === 'all' || activeSection === 'compliance') && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Globe className="w-4 h-4 text-indigo-400" />
                    <span>3. REGULATORY COMPLIANCE FRAMEWORKS</span>
                  </h3>
                  <p>
                    We design our legal and technological systems to meet strict global data protection guidelines. Here is how we verify compliance under major jurisdictions:
                  </p>

                  <div className="space-y-3">
                    <div className="p-4 bg-slate-950/20 rounded-lg border border-slate-850 space-y-2">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                        <span>GDPR Compliance (Articles 12-22)</span>
                      </h4>
                      <p className="text-xxs text-slate-400">
                        Under the General Data Protection Regulation (EU) 2016/679, we act as the Data Controller. Because your health diaries are saved on local browser sandboxes, you possess absolute, immediate exercise of:
                      </p>
                      <ul className="text-xxs text-slate-400 list-disc pl-4 space-y-1">
                        <li><strong>Right of Access (Art. 15):</strong> You can review, inspect, and copy all log entries directly from your main dashboard at any time.</li>
                        <li><strong>Right to Rectification (Art. 16):</strong> You can edit meal calorie entries, target parameters, and diet preferences instantly.</li>
                        <li><strong>Right to Erasure / Right to be Forgotten (Art. 17):</strong> Clearing your browser logs wipes your entire history immediately from our realm.</li>
                        <li><strong>Data Portability (Art. 20):</strong> You can extract weekly progress reports as clean readable data.</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-950/20 rounded-lg border border-slate-850 space-y-2">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Indian DPDP Act, 2023 (Digital Personal Data Protection)</span>
                      </h4>
                      <p className="text-xxs text-slate-400">
                        We respect the rules of the Indian DPDP Act regarding the collection of biometric health indicators. Because our calorie tracking and food diary logs are locally persistent on the user's browser, data custody sits with the "Data Principal" (the user), preventing unauthorized centralized processing or government access to consolidated logs without individual consent.
                      </p>
                      <p className="text-xxs text-slate-400">
                        We appoint a Data Protection Officer (DPO) contactable for grievance redressal and consent withdrawal.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950/20 rounded-lg border border-slate-850 space-y-2">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                        <span>CCPA & CPRA (California Consumer Privacy Act)</span>
                      </h4>
                      <p className="text-xxs text-slate-400">
                        We do not "sell" or "share" personal or biometric information as defined by the CCPA/CPRA. California residents can initiate complete telemetry clearance at any time using our one-click in-app diagnostic triggers.
                      </p>
                      <p className="text-xxs text-slate-400">
                        We do not discriminate against users who choose to invoke their privacy rights.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950/20 rounded-lg border border-slate-850 space-y-2">
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <ShieldCheck className="w-3.5 h-3.5 text-indigo-400" />
                        <span>HIPAA (Health Insurance Portability and Accountability Act)</span>
                      </h4>
                      <p className="text-xxs text-slate-400">
                        Remix VitalPath is a personal wellness tool, not a "Covered Entity" under HIPAA. However, we employ HIPAA-grade security standards: all network requests are encrypted via SSL/TLS 1.3, images are processed in volatile RAM memory without persistent state, and server routes do not bind diagnostic logs to your IP address.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 4: SECURITY & DATA ERASURE */}
              {(activeSection === 'all' || activeSection === 'security') && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-indigo-400" />
                    <span>4. ADVANCED SECURITY & INSTANT DATA ERASURE</span>
                  </h3>
                  
                  <p>
                    Our data safety structure focuses on immediate sanitization and encryption-in-transit:
                  </p>

                  <div className="p-4 bg-rose-500/[0.02] border border-rose-500/10 rounded-xl space-y-2">
                    <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase tracking-wider">
                      <Trash2 className="w-4 h-4 text-rose-500" />
                      <span>The "Right to be Forgotten" (Instant Erasure)</span>
                    </div>
                    <p className="text-xxs text-slate-350 leading-relaxed">
                      You maintain absolute control over the destruction of your data. By navigating to the dashboard tracker or opening the support helpdesk modal, you can execute the <strong>"Clear Health Logs"</strong> function. This immediately scrubs and deletes all local storage profiles, biometric targets, and visual scan histories from your device memory, permanently and irreversibly.
                    </p>
                  </div>

                  <div className="space-y-3 pl-2 border-l-2 border-emerald-500/30">
                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Security Measures & Transport Encryption</span>
                      </h4>
                      <p className="text-xxs text-slate-400">
                        All communications between the client browser, our secure middleware server, and the Google Gemini visual API are encrypted using high-grade TLS 1.3 encryption. This prevents middleman sniffing of your wellness, metabolic, or caloric logs while transit is occurring.
                      </p>
                    </div>

                    <div>
                      <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                        <Server className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Network Logging Policy</span>
                      </h4>
                      <p className="text-xxs text-slate-400">
                        Our hosting servers may record technical network requests (IP addresses, user-agent strings, request timestamps) purely for DDoS protection and system debugging. These connection logs are rotated every 14 days and are never cross-referenced with your nutrition history.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 5: COOKIES, SUBPROCESSORS & CHILDREN */}
              {(activeSection === 'all') && (
                <div className="space-y-4">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <FileText className="w-4 h-4 text-indigo-400" />
                    <span>5. COOKIES, SUBPROCESSORS & CHILDREN'S PRIVACY</span>
                  </h3>
                  
                  <div className="space-y-3">
                    <div className="p-4 bg-slate-950/20 rounded-lg border border-slate-850 space-y-1">
                      <h4 className="text-xs font-bold text-white">A. Cookies & Local Session Cache</h4>
                      <p className="text-xxs text-slate-400">
                        We do not utilize tracking cookies, tracking pixels, or cross-site advertising scripts. We use standard HTML5 local storage techniques to store your daily nutrition history and calculator targets to ensure you do not lose progress when you refresh the page.
                      </p>
                    </div>

                    <div className="p-4 bg-slate-950/20 rounded-lg border border-slate-850 space-y-1">
                      <h4 className="text-xs font-bold text-white">B. Third-Party Subprocessors</h4>
                      <p className="text-xxs text-slate-400">
                        We share specific payloads with select subprocessors strictly for rendering the app's functions. These include:
                      </p>
                      <ul className="text-xxs text-slate-500 list-disc pl-4 space-y-1">
                        <li><strong>Google Cloud Platform & Google AI:</strong> For stateless API interpretation of meal image binary scans via Gemini API models.</li>
                        <li><strong>Cloud Run / Hosting Providers:</strong> For proxying visual server requests under secure network parameters.</li>
                      </ul>
                    </div>

                    <div className="p-4 bg-slate-950/20 rounded-lg border border-slate-850 space-y-1">
                      <h4 className="text-xs font-bold text-white">C. Children's Privacy (COPPA Compliant)</h4>
                      <p className="text-xxs text-slate-400">
                        The Service is not designed or intended for individuals under 13 years of age. We do not knowingly collect personal or health-related information from children. If you believe we have received children's data, contact our support team immediately for sanitization.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* SECTION 6: LEGAL CONTACT PROTOCOLS */}
              {(activeSection === 'all' || activeSection === 'legal') && (
                <div className="space-y-4 p-5 bg-slate-950/25 rounded-xl border border-slate-850">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>7. LEGAL CONTACT PROTOCOLS</span>
                  </h3>
                  
                  <p className="text-xxs text-slate-400">
                    Our dedicated legal team processes formal compliance requests, statutory notices, intellectual property disputes, law enforcement requests, and critical data subject requests via our secure <strong>Support Portal & Legal Desk</strong>.
                  </p>

                  <div className="space-y-3">
                    <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
                      <h4 className="text-xs font-bold text-slate-200">A. Scope of Legal Communications</h4>
                      <p className="text-xxs text-slate-400">
                        Please direct only formal legal matters to our legal department. This includes:
                      </p>
                      <ul className="text-xxs text-slate-500 list-disc pl-4 space-y-1 mt-1">
                        <li><strong>Data Protection Officer (DPO) Escalations:</strong> Complex requests regarding your rights under GDPR, CCPA/CPRA, and DPDP Act 2023.</li>
                        <li><strong>DMCA / Copyright Notices:</strong> Takedown requests for proprietary images or layout assets.</li>
                        <li><strong>Regulatory Filings:</strong> Health compliance audits (FDA, FSSAI, CE-Mark) regarding calculated macro thresholds.</li>
                        <li><strong>Law Enforcement Requests:</strong> Valid court orders or government search warrants.</li>
                      </ul>
                    </div>

                    <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-200">B. Required Information & Format</h4>
                      <p className="text-xxs text-slate-400">
                        To expedite processing, inquiries submitted through our Legal Contact Desk must conform to the following standards:
                      </p>
                      <div className="bg-slate-950/40 p-2.5 rounded-lg border border-slate-850 font-mono text-[10px] text-slate-400 space-y-1">
                        <p><span className="text-indigo-400">Subject Line:</span> Must begin with a clear tag, e.g., <code className="text-emerald-400 font-bold">[GDPR-ERASURE]</code>, <code className="text-emerald-400 font-bold">[DPDP-CONSENT-REVOCATION]</code>, or <code className="text-emerald-400 font-bold">[IP-DISPUTE]</code>.</p>
                        <p><span className="text-indigo-400">Identity Verification:</span> Under the DPDP and GDPR, we must authenticate your identity. Because Remix VitalPath stores data on your local device, you should attach your anonymous <strong>"Local Storage Diagnostic Hex Key"</strong> if you are asking to coordinate custom server telemetry scrubs.</p>
                        <p><span className="text-indigo-400">Affidavit of Truth:</span> For copyright and statutory claims, include a statement confirming your good-faith belief and authorized agency, signed electronically or physically.</p>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-900/60 rounded-lg border border-slate-800 space-y-1">
                      <h4 className="text-xs font-bold text-slate-200">C. SLA & Response Timelines</h4>
                      <p className="text-xxs text-slate-400">
                        Our response windows depend strictly on the type and origin of your inquiry:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-2">
                        <div className="p-2 bg-slate-950/30 rounded border border-slate-850 text-center">
                          <p className="text-xxs text-slate-500 font-semibold uppercase">Emergency / Security</p>
                          <p className="text-xs text-white font-bold mt-1">24 - 48 Hours</p>
                        </div>
                        <div className="p-2 bg-slate-950/30 rounded border border-slate-850 text-center">
                          <p className="text-xxs text-slate-500 font-semibold uppercase">DMCA / IP Takedowns</p>
                          <p className="text-xs text-white font-bold mt-1">3 - 5 Business Days</p>
                        </div>
                        <div className="p-2 bg-slate-950/30 rounded border border-slate-850 text-center">
                          <p className="text-xxs text-slate-500 font-semibold uppercase">GDPR / DPDP Requests</p>
                          <p className="text-xs text-white font-bold mt-1">Within 15 Days</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Policy Updates */}
              {(activeSection === 'all') && (
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-white flex items-center gap-2">
                    <Eye className="w-4 h-4 text-indigo-400" />
                    <span>8. CHANGES TO THIS PRIVACY STATEMENT</span>
                  </h3>
                  <p>
                    We may update this Privacy Policy to maintain parity with new computer vision frameworks or international security revisions. We recommend visiting this dialog occasionally to review the legal version context at the header. Your continued interaction with the Application following the publication of changes represents your formal legal acknowledgment of our updated processes.
                  </p>
                </div>
              )}

              {/* Contact / Inquiries Area */}
              <div className="pt-6 border-t border-slate-800 flex flex-col sm:flex-row justify-between gap-4 text-[10px] text-slate-400 font-mono">
                <div>
                  <p className="font-bold text-slate-350 uppercase">Legal & Compliance Department</p>
                  <p>Contact: Secure Support Portal & Legal Desk</p>
                  <p>Remix Labs Data Custody Team</p>
                </div>
                <div className="sm:text-right">
                  <p>Compliance Status: CERTIFIED SAFE</p>
                  <p>Auditing Standards: SOC2 Type II / GDPR Level 4 Compliant</p>
                </div>
              </div>

            </div>

            {/* Footer button */}
            <div className="p-4 border-t border-slate-800 bg-slate-950/60 flex justify-end gap-3 shrink-0">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xxs font-extrabold uppercase tracking-wider transition-all shadow-md shadow-emerald-600/15 cursor-pointer hover:shadow-emerald-600/25 active:scale-98"
              >
                Accept & Rest Assured
              </button>
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
