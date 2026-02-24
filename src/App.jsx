import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════════
   ✏️  EDIT YOUR INFO HERE — Change these to your real details
   ═══════════════════════════════════════════════════════════════════ */
const MY_INFO = {
  name: "Your Name",                                      // ← Your real name
  title: "SOC ANALYST • DETECTION ENGINEER",               // ← Your job title
  bio: "Security operations professional passionate about building detection capabilities, automating incident response, and hunting threats. This portfolio showcases hands-on projects across multiple SIEM platforms and IR frameworks, all mapped to the MITRE ATT&CK framework.",
  linkedin: "https://linkedin.com/in/YOUR-ID",             // ← Your LinkedIn URL
  github: "https://github.com/YOUR-USERNAME",              // ← Your GitHub URL
  resume: "/resume.pdf",                                   // ← Drop resume.pdf in the public/ folder
  email: "your.email@gmail.com",                            // ← Your email (just the address, no mailto:)
};

/* ═══════════════════════════════════════════════════════════════════
   ✏️  EDIT YOUR PROJECTS HERE — Add, remove, or change projects
   ═══════════════════════════════════════════════════════════════════ */
const projects = [
  {
    id: 1,
    category: "SIEM",
    title: "Splunk Detection Engineering Lab",
    description:
      "Built a full Splunk SIEM environment with custom detection rules for brute-force attacks, lateral movement (Pass-the-Hash), and data exfiltration. Includes correlation searches, notable events, and adaptive response actions.",
    tags: ["Splunk", "SPL", "Detection Rules", "Correlation Searches"],
    severity: "HIGH",
    status: "DEPLOYED",
    highlights: [
      "15+ custom detection rules",
      "Automated alert triage workflows",
      "MITRE ATT&CK mapped detections",
    ],
    mitre: ["T1110 – Brute Force", "T1550 – Use Alternate Auth Material", "T1048 – Exfiltration Over Alternative Protocol"],
    tools: [
      { name: "Splunk Enterprise", role: "SIEM Platform" },
      { name: "Sysmon", role: "Endpoint Telemetry" },
      { name: "Windows Event Logs", role: "Log Source" },
      { name: "Atomic Red Team", role: "Attack Simulation" },
    ],
    architecture: "Windows Server → Sysmon + WinEventLog → Universal Forwarder → Splunk Indexer → Search Head → Dashboards & Alerts",
    challenges: "Tuning correlation searches to reduce false positives while maintaining detection coverage across multiple attack vectors.",
    outcome: "Achieved a 92% true positive rate across all detection rules with an average alert-to-triage time of under 3 minutes.",
    github: "https://github.com/YOUR-USERNAME/splunk-lab",     // ← Your repo URL
    blogPost: "#",
    writeup: [
      { heading: "Executive Summary", content: "This project involved building a fully functional Splunk SIEM environment from scratch to detect common attack techniques including brute-force authentication attacks, lateral movement via Pass-the-Hash, and data exfiltration over DNS. The lab was designed to simulate a realistic enterprise environment and test detection engineering workflows end to end." },
      { heading: "Objective", content: "The primary goal was to develop, test, and tune custom Splunk detection rules mapped to the MITRE ATT&CK framework. Secondary objectives included building automated triage workflows, creating analyst dashboards for real-time monitoring, and documenting the detection engineering lifecycle." },
      { heading: "Lab Setup", content: "The environment consisted of a Windows Server 2019 Active Directory domain with 3 Windows 10 workstations, all instrumented with Sysmon (SwiftOnSecurity config) and Windows Event Log forwarding. Splunk Enterprise was deployed on an Ubuntu server with a Universal Forwarder on each endpoint. Atomic Red Team was used to simulate adversary techniques." },
      { heading: "Detection Rules Developed", content: "15+ correlation searches were built covering: Brute-force login detection (EventCode 4625 threshold alerting), Pass-the-Hash detection (LogonType 9 + NTLM authentication anomalies), Suspicious PowerShell execution (ScriptBlock logging + encoded command detection), DNS exfiltration (unusually long subdomain queries + high query volume), and Kerberoasting (EventCode 4769 with RC4 encryption requests)." },
      { heading: "Tuning & Optimization", content: "Initial deployment produced a high volume of false positives, particularly from the brute-force and PowerShell rules. Tuning involved establishing baselines for normal authentication patterns, whitelisting known service accounts, adjusting thresholds based on 7-day rolling averages, and adding lookup tables for known-good processes. After tuning, the true positive rate improved from 64% to 92%." },
      { heading: "Key Findings", content: "The lab demonstrated that layered detection significantly outperforms single-rule approaches. Combining process creation logs with network telemetry caught lateral movement attempts that endpoint-only rules missed. DNS exfiltration detection required careful baselining as legitimate CDN queries often triggered false positives." },
      { heading: "Lessons Learned", content: "Sysmon configuration is critical — the default config misses many important events. Detection rules should be tested against both attack simulations AND normal business operations before deployment. Documentation of tuning decisions is essential for handoff to other analysts. Regular review cycles (monthly) help catch detection drift." },
    ],
  },
  {
    id: 2,
    category: "SIEM",
    title: "Microsoft Sentinel Threat Detection",
    description:
      "Configured Azure Sentinel with KQL-based analytics rules to detect suspicious sign-ins, impossible travel, and privilege escalation. Integrated threat intelligence feeds and built automated playbooks via Logic Apps.",
    tags: ["Sentinel", "KQL", "Logic Apps", "Threat Intel"],
    severity: "CRITICAL",
    status: "DEPLOYED",
    highlights: [
      "20+ KQL analytics rules",
      "TI feed integration",
      "SOAR playbook automation",
    ],
    mitre: ["T1078 – Valid Accounts", "T1078.004 – Cloud Accounts", "T1548 – Abuse Elevation Control"],
    tools: [
      { name: "Microsoft Sentinel", role: "Cloud SIEM" },
      { name: "KQL", role: "Query Language" },
      { name: "Logic Apps", role: "SOAR / Automation" },
      { name: "Azure AD", role: "Identity Source" },
    ],
    architecture: "Azure AD + M365 Logs → Log Analytics Workspace → Sentinel Analytics Rules → Logic App Playbooks → Teams/Email Alerts",
    challenges: "Balancing alert volume from impossible travel detections in a global workforce while ensuring genuine compromises were caught.",
    outcome: "Reduced mean-time-to-respond (MTTR) by 60% through automated playbook enrichment and containment actions.",
    github: "https://github.com/YOUR-USERNAME/sentinel-detection",
    blogPost: "#",
    writeup: [
      { heading: "Executive Summary", content: "This project focused on deploying Microsoft Sentinel as a cloud-native SIEM solution and developing KQL-based analytics rules to detect identity-based threats including suspicious sign-ins, impossible travel scenarios, and privilege escalation in an Azure AD environment." },
      { heading: "Objective", content: "Build a detection and response capability using Microsoft Sentinel that leverages Azure AD logs, Microsoft 365 audit logs, and threat intelligence feeds to identify compromised accounts and unauthorized access attempts. Automate initial triage and containment using Logic App playbooks." },
      { heading: "Environment Configuration", content: "A Log Analytics Workspace was configured to ingest data from Azure AD sign-in and audit logs, Microsoft 365 activity logs, Azure Activity logs, and Microsoft Defender for Cloud alerts. Data connectors were enabled for all sources with appropriate retention policies set." },
      { heading: "Analytics Rules Developed", content: "20+ KQL analytics rules were created covering: Impossible travel detection (sign-ins from geographically distant locations within impossible timeframes), Brute-force detection (multiple failed sign-ins followed by a success), MFA fatigue attacks (repeated MFA push notifications), Privilege escalation (unexpected role assignments in Azure AD), Suspicious mailbox forwarding rules, and Sign-ins from anonymizing services (TOR, VPN exit nodes)." },
      { heading: "SOAR Automation", content: "Three Logic App playbooks were built: (1) Auto-enrichment playbook that queries VirusTotal and AbuseIPDB for IP reputation on every high-severity alert, (2) Account containment playbook that disables a user account and revokes sessions when confirmed compromise is detected, (3) Notification playbook that sends formatted alerts to a Teams security channel with one-click response actions." },
      { heading: "Results", content: "The automated enrichment and containment playbooks reduced mean-time-to-respond (MTTR) by 60%. The impossible travel rule required the most tuning due to VPN usage and mobile device location inaccuracies. After implementing a 'known locations' allowlist and minimum distance threshold of 500km, false positives dropped by 80%." },
      { heading: "Lessons Learned", content: "Cloud-native SIEM solutions like Sentinel offer significant advantages in Azure environments due to native log integration. KQL's rich query capabilities enable complex detections that would be difficult in traditional SIEM platforms. SOAR playbooks should always include a human approval step for destructive actions like account disabling." },
    ],
  },
  {
    id: 3,
    category: "SIEM",
    title: "Elastic SIEM Home Lab",
    description:
      "Deployed Elastic Stack (Elasticsearch, Logstash, Kibana) to ingest Windows Event Logs, Sysmon, and Zeek network data. Created dashboards for real-time monitoring and custom alerting rules for IOC detection.",
    tags: ["Elastic", "Kibana", "Sysmon", "Zeek"],
    severity: "MEDIUM",
    status: "ACTIVE",
    highlights: [
      "Multi-source log ingestion",
      "Custom Kibana dashboards",
      "Zeek network analytics",
    ],
    mitre: ["T1059 – Command and Scripting", "T1071 – Application Layer Protocol", "T1105 – Ingress Tool Transfer"],
    tools: [
      { name: "Elasticsearch", role: "Search & Storage" },
      { name: "Logstash", role: "Log Pipeline" },
      { name: "Kibana", role: "Visualization" },
      { name: "Zeek", role: "Network Analysis" },
    ],
    architecture: "VirtualBox VMs → Sysmon + Zeek → Filebeat → Logstash (parsing) → Elasticsearch → Kibana Dashboards",
    challenges: "Normalizing data from multiple sources (Windows Events, Sysmon, Zeek) into a unified schema for cross-source correlation.",
    outcome: "Built 8 real-time dashboards covering network traffic, process creation, DNS queries, and authentication events.",
    github: "https://github.com/YOUR-USERNAME/elastic-siem-lab",
    blogPost: "#",
    writeup: [
      { heading: "Executive Summary", content: "This home lab project involved deploying the full Elastic Stack (Elasticsearch, Logstash, Kibana) as a SIEM solution to ingest, parse, and visualize security telemetry from multiple sources including Windows Event Logs, Sysmon, and Zeek network sensor data." },
      { heading: "Objective", content: "Create a multi-source log ingestion pipeline that normalizes data from endpoint and network sensors into a unified schema, enabling cross-source correlation and real-time threat detection through custom Kibana dashboards and alerting rules." },
      { heading: "Lab Architecture", content: "The lab ran on VirtualBox with 4 VMs: an Ubuntu server hosting the Elastic Stack, a Windows 10 workstation with Sysmon and Filebeat, a second Windows machine for generating attack traffic, and a Linux VM running Zeek as a network sensor monitoring the virtual network bridge. Logstash was configured with custom grok patterns to parse each log source." },
      { heading: "Data Normalization Challenge", content: "The biggest challenge was normalizing data from three very different sources into a coherent schema. Windows Event Logs use EventCode-based identification, Sysmon has its own event ID scheme, and Zeek produces structured TSV logs with its own field names. Custom Logstash filters were written for each source, mapping fields to the Elastic Common Schema (ECS) where possible." },
      { heading: "Dashboards Built", content: "8 real-time Kibana dashboards were created: (1) Authentication Overview — login successes, failures, and anomalies, (2) Process Execution — new process creation with parent-child relationships, (3) Network Connections — outbound connections by destination, port, and protocol, (4) DNS Analysis — query volume, top queried domains, and anomalous patterns, (5) File Activity — file creation, modification, and deletion events, (6) PowerShell Activity — script execution and command-line logging, (7) Threat Overview — aggregated high-severity events across all sources, (8) Network Flow — Zeek connection logs showing traffic patterns and volumes." },
      { heading: "Detection Use Cases", content: "Custom alerting rules were created for: High-volume DNS queries to a single domain (potential C2 or exfiltration), Process execution from unusual directories (e.g., Temp, Downloads), Network connections to known-bad IPs (integrated with abuse.ch threat feeds), and Credential dumping tool signatures in process command lines." },
      { heading: "Lessons Learned", content: "Elastic Stack provides incredible flexibility but requires significant upfront effort for log parsing and normalization. The Elastic Common Schema (ECS) is worth adopting early as it enables cross-source correlation. Zeek provides network visibility that endpoint agents cannot — combining both gives the most complete picture. Index lifecycle management is critical for controlling storage costs in production." },
    ],
  },
  {
    id: 4,
    category: "IR",
    title: "Ransomware Incident Response Playbook",
    description:
      "Developed a comprehensive IR playbook for ransomware scenarios covering identification, containment, eradication, recovery, and lessons learned. Includes decision trees, communication templates, and escalation matrices.",
    tags: ["Ransomware", "NIST", "Containment", "Recovery"],
    severity: "CRITICAL",
    status: "DOCUMENTED",
    highlights: [
      "NIST 800-61 aligned",
      "Decision tree workflows",
      "Stakeholder communication templates",
    ],
    mitre: ["T1486 – Data Encrypted for Impact", "T1490 – Inhibit System Recovery", "T1021 – Remote Services"],
    tools: [
      { name: "NIST 800-61", role: "Framework" },
      { name: "Draw.io", role: "Flowcharts" },
      { name: "Confluence", role: "Documentation" },
      { name: "Velociraptor", role: "Forensic Collection" },
    ],
    architecture: "Detection → Triage → Containment Decision Tree → Eradication → Recovery → Post-Incident Review",
    challenges: "Designing decision trees that account for varying ransomware strains, encryption states, and business impact levels.",
    outcome: "Playbook successfully tested in 3 tabletop exercises with an average containment decision time of under 15 minutes.",
    github: "https://github.com/YOUR-USERNAME/ransomware-ir-playbook",
    blogPost: "#",
    writeup: [
      { heading: "Executive Summary", content: "This project involved the development of a comprehensive Incident Response playbook specifically designed for ransomware scenarios. The playbook follows the NIST 800-61 framework and covers all phases from preparation through post-incident review, with detailed decision trees for containment strategies based on encryption state and business impact." },
      { heading: "Objective", content: "Create a structured, repeatable IR playbook that enables SOC analysts and incident responders to make rapid, informed decisions during ransomware incidents. The playbook should minimize decision paralysis, ensure evidence preservation, and provide clear escalation paths and communication templates." },
      { heading: "Framework Alignment", content: "The playbook is structured around NIST SP 800-61 Rev. 2 (Computer Security Incident Handling Guide) with five phases: Preparation, Detection & Analysis, Containment, Eradication & Recovery, and Post-Incident Activity. Each phase includes specific procedures, checklists, and decision criteria." },
      { heading: "Detection & Analysis Phase", content: "Initial indicators of ransomware activity were categorized into three tiers: Tier 1 (automated alerts) — AV/EDR detections, mass file rename operations, known ransomware signatures; Tier 2 (behavioral indicators) — unusual encryption API calls, shadow copy deletion attempts, suspicious scheduled tasks; Tier 3 (user reports) — ransom notes discovered, inability to open files, unusual system behavior. Each tier has defined severity ratings and response timeframes." },
      { heading: "Containment Decision Tree", content: "A key deliverable was the containment decision tree, which guides responders through questions: Is encryption actively ongoing? → If yes, immediate network isolation. What percentage of systems are affected? → Determines scope of containment (single host vs. subnet vs. enterprise). Are backups confirmed intact? → Influences recovery strategy. Is the ransomware variant known? → Determines if decryptors are available. Each path leads to a specific containment action with estimated timeframes." },
      { heading: "Communication Templates", content: "Pre-drafted communication templates were created for: Executive notification (within 1 hour of confirmed incident), Legal counsel notification, Insurance carrier notification (for cyber insurance policies), Employee communication (what to do / not do), Customer notification (if data exfiltration confirmed), and Law enforcement reporting (FBI IC3 / local field office)." },
      { heading: "Tabletop Exercise Results", content: "The playbook was validated through 3 tabletop exercises with varying scenarios: a WannaCry-style worm spreading laterally, a targeted Ryuk deployment after initial access via phishing, and a double-extortion scenario with data theft. Average containment decision time was under 15 minutes across all exercises. Participants reported the decision tree significantly reduced uncertainty." },
      { heading: "Lessons Learned", content: "Having pre-made communication templates saved significant time during exercises. The decision tree approach eliminates paralysis during high-stress incidents. Playbooks must be reviewed quarterly as ransomware tactics evolve rapidly. Including legal and insurance contacts in the playbook is critical — responders shouldn't have to search for this info during an incident." },
    ],
  },
  {
    id: 5,
    category: "IR",
    title: "Phishing Triage & Response Automation",
    description:
      "Built an automated phishing analysis pipeline using TheHive, Cortex, and MISP. Extracts IOCs from reported emails, enriches with threat intel, and auto-contains based on severity scoring.",
    tags: ["TheHive", "Cortex", "MISP", "Phishing"],
    severity: "HIGH",
    status: "DEPLOYED",
    highlights: [
      "Automated IOC extraction",
      "Threat intel enrichment",
      "Auto-containment actions",
    ],
    mitre: ["T1566 – Phishing", "T1566.001 – Spearphishing Attachment", "T1204 – User Execution"],
    tools: [
      { name: "TheHive", role: "Case Management" },
      { name: "Cortex", role: "Analysis Engine" },
      { name: "MISP", role: "Threat Intel Platform" },
      { name: "VirusTotal", role: "IOC Enrichment" },
    ],
    architecture: "Phishing Report → Email Parser → IOC Extraction → Cortex Analyzers → MISP Lookup → Severity Score → Auto-Contain / Escalate",
    challenges: "Reducing analyst fatigue by automating the repetitive triage of low-severity phishing reports while escalating real threats.",
    outcome: "Automated 78% of phishing triage, reducing analyst workload from 45 min to 5 min per report on average.",
    github: "https://github.com/YOUR-USERNAME/phishing-automation",
    blogPost: "#",
    writeup: [
      { heading: "Executive Summary", content: "This project built an automated phishing analysis and response pipeline using open-source tools — TheHive for case management, Cortex for automated analysis, and MISP for threat intelligence sharing. The system reduced average phishing triage time from 45 minutes to 5 minutes per report." },
      { heading: "Problem Statement", content: "SOC analysts spend a disproportionate amount of time triaging phishing reports, most of which turn out to be spam or low-risk marketing emails. This repetitive work leads to analyst fatigue and delays response to genuine threats. The goal was to automate the initial triage process while ensuring real threats are escalated quickly." },
      { heading: "Pipeline Architecture", content: "The automation pipeline works as follows: (1) User reports a phishing email via a report button or forwarding to a dedicated mailbox, (2) An email parser extracts headers, sender info, URLs, and file attachments, (3) IOCs (IPs, domains, hashes, URLs) are automatically extracted, (4) Cortex analyzers run enrichment — VirusTotal for file hashes and URLs, AbuseIPDB for sender IPs, URLhaus for malicious URL checks, MISP for known threat intel matches, (5) A severity score is calculated based on enrichment results, (6) Low-severity items are auto-closed with a notification to the reporter, (7) High-severity items create a TheHive case and alert the on-call analyst." },
      { heading: "Cortex Analyzers Configured", content: "12 Cortex analyzers were configured and tuned: VirusTotal (file hash + URL scanning), AbuseIPDB (IP reputation), URLhaus (malicious URL database), MISP Warninglist (known-bad indicators), PhishTank (phishing URL verification), Shodan (infrastructure reconnaissance), and custom analyzers for internal domain validation and VIP sender detection." },
      { heading: "Severity Scoring Logic", content: "A weighted scoring model was developed: VirusTotal detections (weight: 30%), MISP threat intel match (weight: 25%), sender reputation (weight: 15%), URL reputation (weight: 15%), attachment analysis (weight: 10%), header anomalies — SPF/DKIM/DMARC failures (weight: 5%). Scores above 70 are auto-escalated; scores below 30 are auto-closed; scores between 30-70 require analyst review." },
      { heading: "Results & Metrics", content: "After deployment: 78% of phishing reports were fully automated (auto-closed as benign), average triage time dropped from 45 minutes to 5 minutes, analyst workload reduced by approximately 15 hours per week, zero false negatives in the first 3 months (no real threats were auto-closed), and mean-time-to-contain for confirmed phishing dropped from 2 hours to 18 minutes." },
      { heading: "Lessons Learned", content: "Start with a conservative auto-close threshold and lower it gradually as confidence in the scoring model grows. VIP/executive sender detection is critical — attackers often impersonate leadership. Integration with the email gateway for auto-quarantine requires careful testing to avoid blocking legitimate emails. Regular MISP feed updates are essential for maintaining detection accuracy." },
    ],
  },
  {
    id: 6,
    category: "IR",
    title: "Business Email Compromise Playbook",
    description:
      "Created a BEC response playbook with procedures for detecting compromised accounts, analyzing email forwarding rules, tracing financial fraud attempts, and coordinating with legal and finance teams.",
    tags: ["BEC", "Email Security", "Forensics", "Fraud"],
    severity: "HIGH",
    status: "DOCUMENTED",
    highlights: [
      "Account compromise detection steps",
      "Financial fraud response coordination",
      "Evidence preservation procedures",
    ],
    mitre: ["T1534 – Internal Spearphishing", "T1114 – Email Collection", "T1078 – Valid Accounts"],
    tools: [
      { name: "Microsoft Defender", role: "Email Security" },
      { name: "Azure AD Logs", role: "Auth Analysis" },
      { name: "Chain of Custody Forms", role: "Evidence Handling" },
      { name: "KQL", role: "Log Queries" },
    ],
    architecture: "BEC Alert → Account Isolation → Mailbox Audit → Forwarding Rule Analysis → Financial Impact Assessment → Legal Coordination",
    challenges: "Coordinating across IT, legal, and finance teams under time pressure while maintaining forensic integrity of email evidence.",
    outcome: "Playbook adopted by the SOC team and used to successfully respond to 2 simulated BEC scenarios in tabletop exercises.",
    github: "https://github.com/YOUR-USERNAME/bec-playbook",
    blogPost: "#",
    writeup: [
      { heading: "Executive Summary", content: "This project developed a Business Email Compromise (BEC) incident response playbook covering the full lifecycle from detection to recovery. BEC attacks are one of the most financially damaging cyber threats, and this playbook provides structured procedures for detecting compromised accounts, analyzing email forwarding rules, tracing financial fraud attempts, and coordinating with legal and finance teams." },
      { heading: "Threat Landscape", content: "Business Email Compromise remains one of the top attack vectors by financial loss. Attackers compromise executive or finance team email accounts, then use the access to redirect wire transfers, steal sensitive data, or launch internal phishing campaigns. Unlike ransomware, BEC attacks are often stealthy and can go undetected for weeks." },
      { heading: "Detection Indicators", content: "The playbook defines detection indicators across three categories: Email-based indicators — new inbox rules forwarding to external addresses, suspicious sent items, login from unusual locations or devices; Behavioral indicators — unusual wire transfer requests, changes to vendor payment details, urgency language in financial requests; Technical indicators — Azure AD sign-in anomalies, impossible travel, OAuth app consent grants, legacy authentication usage." },
      { heading: "Response Procedures", content: "Upon confirmed BEC detection, the playbook outlines a phased response: Phase 1 (Immediate, 0-1 hour) — Disable compromised account, revoke all active sessions, reset password, disable all mail forwarding rules; Phase 2 (Investigation, 1-4 hours) — Audit mailbox access logs, review sent items for fraudulent emails, check Azure AD sign-in logs for attacker access timeline, identify all mailbox rules created during compromise; Phase 3 (Containment, 4-24 hours) — Notify recipients of any fraudulent emails, contact banks to freeze/reverse fraudulent transactions, preserve evidence for potential legal proceedings; Phase 4 (Recovery, 1-7 days) — Re-enable account with MFA enforced, monitor for re-compromise, conduct organization-wide password reset if warranted." },
      { heading: "Evidence Preservation", content: "A critical section covers digital forensics and evidence handling: Chain of custody forms for email exports, Azure AD log preservation procedures, eDiscovery hold placement on affected mailboxes, screenshot documentation requirements, and timeline reconstruction methods. All evidence must be preserved in case of legal action against the attacker or insurance claims." },
      { heading: "Financial Fraud Response", content: "A dedicated sub-playbook for financial fraud coordination includes: Immediate bank notification procedures and contact numbers, Wire transfer recall request templates, FBI IC3 complaint filing checklist, Cyber insurance claim initiation steps, and CFO/Finance team notification templates. Time is critical — wire transfers can often be recalled within 24-48 hours but become much harder after that." },
      { heading: "Tabletop Results", content: "The playbook was tested in 2 tabletop exercises: Scenario 1 simulated a CFO email compromise with a fraudulent $250K wire transfer request. The team identified the compromise and initiated bank recall within the 48-hour window. Scenario 2 simulated a vendor email compromise (VEC) where payment details were changed. The team detected the change through the new verification procedure added to the playbook." },
      { heading: "Lessons Learned", content: "Out-of-band verification for financial requests (phone call to a known number) is the single most effective BEC prevention control. Azure AD Conditional Access policies blocking legacy authentication eliminate a major attack vector. Regular review of mailbox forwarding rules should be part of routine security hygiene. Finance teams need specific BEC awareness training separate from general phishing training." },
    ],
  },
  {
    id: 7,
    category: "INTEL",
    title: "MISP Threat Intelligence Platform Deployment",
    description:
      "Deployed and configured MISP (Malware Information Sharing Platform) as a centralized threat intelligence hub. Integrated with multiple open-source feeds, created custom taxonomies, and built automated IOC distribution workflows to SIEM platforms.",
    tags: ["MISP", "Threat Intel", "IOC Management", "STIX/TAXII"],
    severity: "HIGH",
    status: "DEPLOYED",
    highlights: [
      "12+ threat intel feeds integrated",
      "Custom taxonomy & tagging system",
      "Automated IOC export to Splunk & Sentinel",
    ],
    mitre: ["T1588 – Obtain Capabilities", "T1587 – Develop Capabilities", "T1583 – Acquire Infrastructure"],
    tools: [
      { name: "MISP", role: "TI Platform" },
      { name: "STIX/TAXII", role: "Intel Standard" },
      { name: "Splunk", role: "SIEM Integration" },
      { name: "Python", role: "Automation Scripts" },
    ],
    architecture: "Open Source Feeds → MISP Server → Correlation Engine → STIX/TAXII Export → Splunk/Sentinel Lookups → Detection Rules",
    challenges: "Managing feed quality and deduplication across 12+ sources while maintaining low false positive rates in downstream SIEM detections.",
    outcome: "Established a centralized TI capability that reduced IOC ingestion-to-detection time from days to under 30 minutes across all SIEM platforms.",
    github: "https://github.com/YOUR-USERNAME/misp-deployment",
    blogPost: "#",
    writeup: [
      { heading: "Executive Summary", content: "This project involved the deployment and configuration of MISP (Malware Information Sharing Platform) as a centralized threat intelligence hub for the SOC. The platform aggregates IOCs from multiple open-source and commercial feeds, correlates and deduplicates indicators, and automatically distributes enriched intelligence to downstream SIEM platforms for real-time detection." },
      { heading: "Objective", content: "Build a threat intelligence platform that transforms raw threat data from multiple sources into actionable intelligence. The platform should automate IOC collection, enrichment, deduplication, and distribution to eliminate the manual process of copying indicators between tools and reduce the time from threat discovery to detection capability." },
      { heading: "Platform Configuration", content: "MISP was deployed on an Ubuntu 22.04 server with MySQL backend and Redis caching. The instance was configured with organizations, sharing groups, and role-based access controls. Custom taxonomies were created to tag indicators by threat type (ransomware, APT, commodity malware), confidence level (high, medium, low), and relevance to our environment." },
      { heading: "Feed Integration", content: "12 threat intelligence feeds were integrated: abuse.ch URLhaus (malicious URLs), abuse.ch MalwareBazaar (malware samples), abuse.ch ThreatFox (IOCs), AlienVault OTX (community threat intel), Botvrij (EU-focused threats), CIRCL OSINT Feed (Luxembourg CERT), Malware Traffic Analysis (PCAP-based IOCs), PhishTank (phishing URLs), EmergingThreats (Snort/Suricata rules), CyberCure (real-time threat feeds), DigitalSide Threat Intel (Italian CERT), and custom internal feeds from honeypot infrastructure." },
      { heading: "Correlation & Deduplication", content: "A major challenge was handling duplicate and overlapping indicators across feeds. MISP's correlation engine was configured with custom correlation rules to: merge duplicate IOCs from different sources while preserving provenance, create composite indicators linking related IPs/domains/hashes, score indicator confidence based on the number of independent sources reporting it, and automatically age out stale indicators after configurable time periods (30 days for IPs, 90 days for domains, 180 days for file hashes)." },
      { heading: "SIEM Integration", content: "Automated export workflows were built using PyMISP (Python library) to push indicators to: Splunk via lookup tables updated every 15 minutes, Microsoft Sentinel via the MISP2Sentinel connector and Threat Intelligence data connector, and Elastic SIEM via custom Logstash enrichment filters. Each integration included confidence-based filtering — only high and medium confidence indicators are pushed to production SIEM detection rules." },
      { heading: "Custom Automation", content: "Python scripts were developed for: Automated daily feed health checks (alerting if a feed stops updating), IOC enrichment pipeline that queries VirusTotal, Shodan, and WHOIS for context on new indicators, Weekly threat landscape reports generated from MISP event data and distributed to the SOC team, and a Slack bot that allows analysts to query MISP directly from the SOC channel." },
      { heading: "Results", content: "After deployment: IOC ingestion-to-detection time dropped from 2-3 days (manual process) to under 30 minutes (automated), the platform processes an average of 5,000 new indicators daily across all feeds, false positive rate from TI-based detections stayed below 3% due to confidence-based filtering, and SOC analysts saved approximately 10 hours per week previously spent on manual IOC management." },
      { heading: "Lessons Learned", content: "Feed quality varies enormously — some feeds generate mostly noise. Implementing a probationary period for new feeds (2 weeks of monitoring before enabling in production rules) is essential. Aging out indicators is critical; stale IOCs generate false positives and erode analyst trust. The STIX/TAXII standard enables interoperability but implementation differences between tools require custom mapping. Always maintain provenance — knowing where an indicator came from is as important as the indicator itself." },
    ],
  },
  {
    id: 8,
    category: "INTEL",
    title: "Dark Web Monitoring & Brand Intelligence",
    description:
      "Built a dark web monitoring capability to track threat actor activity, stolen credential dumps, and brand mentions across Tor hidden services, paste sites, and underground forums. Integrated findings into the SOC alerting workflow.",
    tags: ["Dark Web", "OSINT", "Credential Monitoring", "Brand Protection"],
    severity: "CRITICAL",
    status: "ACTIVE",
    highlights: [
      "Automated credential leak detection",
      "Tor hidden service monitoring",
      "Paste site scraping pipeline",
    ],
    mitre: ["T1589 – Gather Victim Identity Info", "T1078 – Valid Accounts", "T1552 – Unsecured Credentials"],
    tools: [
      { name: "Tor", role: "Dark Web Access" },
      { name: "Python", role: "Scraping & Automation" },
      { name: "TheHive", role: "Case Management" },
      { name: "Have I Been Pwned API", role: "Breach Detection" },
    ],
    architecture: "Tor/Paste Sites → Python Scrapers → Keyword Matching → Alert Engine → TheHive Cases → SOC Analyst Review",
    challenges: "Navigating the ethical and legal boundaries of dark web monitoring while building reliable data collection from inherently unstable hidden services.",
    outcome: "Identified 3 credential dumps containing organizational email addresses within 24 hours of exposure, enabling proactive password resets before exploitation.",
    github: "https://github.com/YOUR-USERNAME/darkweb-monitor",
    blogPost: "#",
    writeup: [
      { heading: "Executive Summary", content: "This project developed a dark web monitoring capability designed to detect early indicators of threats targeting the organization. The system monitors Tor hidden services, paste sites (Pastebin, GitHub Gists, etc.), and underground forums for stolen credentials, brand mentions, data leaks, and threat actor discussions relevant to the organization's attack surface." },
      { heading: "Objective", content: "Create an early warning system that detects when organizational credentials, sensitive data, or infrastructure details appear on the dark web or public paste sites. The goal is to enable proactive response (password resets, access revocation) before attackers can exploit leaked information." },
      { heading: "Legal & Ethical Framework", content: "Before building the capability, a legal and ethical framework was established: Monitoring is strictly passive (observation only, no interaction with threat actors), all activities comply with applicable computer fraud and abuse laws, data collection is limited to information directly relevant to organizational security, no purchasing of stolen data or services, all findings are documented with chain of custody for potential law enforcement referral, and legal counsel approved the monitoring scope and procedures." },
      { heading: "Monitoring Architecture", content: "The system consists of three collection tiers: Tier 1 (Paste Sites) — Automated scrapers monitor Pastebin, GitHub Gists, Ghostbin, and similar services for organizational email domains, IP ranges, and brand keywords. Tier 2 (Dark Web) — A Tor-connected scraper monitors known marketplace listing pages and forum indexes for mentions of the organization. Tier 3 (Breach Databases) — Integration with Have I Been Pwned API and DeHashed for automated checking of organizational email addresses against known breach datasets." },
      { heading: "Keyword & Pattern Matching", content: "A multi-layered detection system was configured: Exact match — organizational email domains (@company.com), IP ranges, internal hostnames; Fuzzy match — brand name variations, typosquatting patterns, executive names; Pattern match — regex for internal document naming conventions, project code names, and customer identifiers; Credential patterns — detection of email:password pairs matching organizational domains." },
      { heading: "Alert Workflow", content: "When a match is detected: the alert engine scores the finding based on confidence and severity, high-severity findings (credential dumps, active sale listings) create an automatic TheHive case and page the on-call analyst, medium-severity findings (brand mentions, general discussions) create a TheHive task for next-business-day review, and all findings are logged with timestamp, source URL (or .onion address), and a cached copy of the content." },
      { heading: "Key Findings", content: "Over the monitoring period, the system detected: 3 credential dumps on paste sites containing organizational email:password pairs (all from third-party breaches, not direct compromise), 2 instances of organizational documents appearing on file-sharing forums, 1 typosquatting domain registered that mimicked the organizational brand, and multiple mentions of the organization's technology stack in reconnaissance-focused forum threads." },
      { heading: "Response Actions Taken", content: "For each finding, specific response actions were executed: Credential dumps — affected users identified, forced password resets initiated, accounts monitored for suspicious login attempts for 30 days; Leaked documents — sensitivity assessment conducted, source of leak investigated, DLP rules updated; Typosquatting — domain reported to registrar for takedown, URL added to email gateway block list, phishing awareness alert sent to employees." },
      { heading: "Lessons Learned", content: "Dark web monitoring generates significant noise — the keyword matching system required extensive tuning to reduce false positives from common terms. Tor hidden services are inherently unreliable; scrapers must handle frequent downtime and address changes gracefully. The most actionable intelligence consistently came from paste sites, not dark web forums. Having pre-built response playbooks for each finding type (credentials, documents, brand abuse) dramatically reduced response time. Regular coordination with legal counsel is essential as the regulatory landscape for dark web monitoring continues to evolve." },
    ],
  },
  {
    id: 9,
    category: "INTEL",
    title: "Automated IOC Enrichment & Threat Scoring Pipeline",
    description:
      "Developed a Python-based IOC enrichment pipeline that automatically scores and contextualizes indicators of compromise using multiple threat intelligence APIs. Integrates with SOC ticketing systems for analyst-ready threat packages.",
    tags: ["Python", "API Integration", "IOC Enrichment", "Automation"],
    severity: "HIGH",
    status: "DEPLOYED",
    highlights: [
      "8 enrichment sources integrated",
      "Automated threat scoring algorithm",
      "One-click analyst threat packages",
    ],
    mitre: ["T1595 – Active Scanning", "T1590 – Gather Victim Network Info", "T1591 – Gather Victim Org Info"],
    tools: [
      { name: "Python", role: "Core Pipeline" },
      { name: "VirusTotal", role: "Multi-AV Scanning" },
      { name: "Shodan", role: "Infrastructure Intel" },
      { name: "AbuseIPDB", role: "IP Reputation" },
    ],
    architecture: "IOC Input → Validation & Dedup → Parallel API Queries → Scoring Engine → Report Generation → TheHive/Slack Output",
    challenges: "Managing API rate limits across 8 different services while maintaining fast enrichment times and handling inconsistent response formats.",
    outcome: "Reduced average IOC investigation time from 20 minutes to 2 minutes per indicator, with enrichment reports delivered automatically to analyst queues.",
    github: "https://github.com/YOUR-USERNAME/ioc-enrichment-pipeline",
    blogPost: "#",
    writeup: [
      { heading: "Executive Summary", content: "This project built a Python-based automated IOC enrichment pipeline that takes raw indicators of compromise (IPs, domains, file hashes, URLs) and produces analyst-ready threat packages by querying 8 different threat intelligence APIs in parallel. The system scores each indicator on a 0-100 threat scale and generates structured reports for SOC analysts." },
      { heading: "Problem Statement", content: "SOC analysts spend significant time manually investigating indicators — copying an IP address to VirusTotal, then to Shodan, then to AbuseIPDB, then to WHOIS, compiling the results, and making a determination. This process takes 15-20 minutes per indicator and is error-prone due to context-switching between tools. With hundreds of alerts daily, this manual approach doesn't scale." },
      { heading: "Pipeline Architecture", content: "The pipeline follows a five-stage process: Stage 1 (Input) — Accepts IOCs via CLI, API endpoint, TheHive webhook, or batch CSV upload. Validates format and deduplicates against recent lookups. Stage 2 (Classification) — Determines IOC type (IPv4, IPv6, domain, URL, MD5, SHA1, SHA256) and routes to appropriate enrichment sources. Stage 3 (Enrichment) — Queries all relevant APIs in parallel using Python asyncio for speed. Stage 4 (Scoring) — Weighted algorithm produces a 0-100 threat score. Stage 5 (Output) — Generates structured JSON report, human-readable summary, and pushes to TheHive/Slack." },
      { heading: "Enrichment Sources", content: "8 APIs were integrated: VirusTotal — multi-engine AV detection rates, community votes, behavioral analysis; AbuseIPDB — IP abuse reports, confidence score, usage type; Shodan — open ports, services, vulnerabilities, hosting provider; GreyNoise — internet scanner identification (is this IP scanning the whole internet?); URLhaus — malicious URL database with malware family tagging; AlienVault OTX — community pulse data, related indicators; WHOIS — domain registration details, registrar, creation date, privacy status; IPinfo — geolocation, ASN, company, VPN/proxy detection." },
      { heading: "Threat Scoring Algorithm", content: "A weighted scoring model combines results from all sources: VirusTotal detection ratio (weight: 25%) — percentage of AV engines flagging the indicator; AbuseIPDB confidence (weight: 20%) — community abuse reporting confidence; Known malicious database hits (weight: 20%) — matches in URLhaus, PhishTank, or MISP; Infrastructure suspicion (weight: 15%) — Shodan reveals suspicious services, GreyNoise identifies mass scanners; Domain age & registration (weight: 10%) — newly registered domains score higher; Geolocation risk (weight: 10%) — hosting in high-risk ASNs or countries associated with cybercrime. Scores 0-30 = Low risk, 31-60 = Medium risk, 61-80 = High risk, 81-100 = Critical." },
      { heading: "Rate Limit Management", content: "Managing API rate limits was a key technical challenge. Solutions implemented: Request caching with Redis (24-hour TTL) to avoid re-querying recently checked indicators, tiered API keys — free tier for low-priority batch lookups, paid tier for real-time alert enrichment, exponential backoff with jitter for rate-limited requests, and a priority queue that ensures real-time alert IOCs are enriched before batch submissions." },
      { heading: "Output Formats", content: "The pipeline generates three output formats: JSON — structured data for machine consumption and SIEM ingestion; Analyst Summary — a human-readable report with key findings, risk assessment, and recommended actions formatted for TheHive case notes; Slack Alert — a concise formatted message with threat score, top findings, and one-click links to full reports on each platform." },
      { heading: "Results", content: "After deployment: average IOC investigation time dropped from 20 minutes to 2 minutes per indicator (90% reduction), the pipeline processes approximately 500 IOCs daily with an average enrichment time of 8 seconds per indicator, cache hit rate of 35% reduces API costs and speeds up repeated lookups, and analyst satisfaction surveys showed 94% found the automated reports sufficient for initial triage decisions." },
      { heading: "Lessons Learned", content: "API response formats are inconsistent and change without notice — robust error handling and schema validation are essential. Caching is crucial both for performance and API cost management. Not all enrichment sources are equally valuable for all IOC types — domain enrichment benefits greatly from WHOIS data, while IP enrichment benefits more from Shodan and GreyNoise. The scoring algorithm required several iterations of tuning; initial weights produced too many medium-severity scores that didn't help analysts prioritize. Building the pipeline as a modular system made it easy to add new enrichment sources without disrupting existing functionality." },
    ],
  },
];

/* ═══════════════════════════════════════════════════════════════════
   ✏️  EDIT YOUR TABS HERE — Add new categories like "HUNTING"
   ═══════════════════════════════════════════════════════════════════ */
const navItems = ["DASHBOARD", "SIEM", "IR", "INTEL", "ABOUT"];


/* ═══════════════════════════════════════════════════════════════════
   🚫  CODE BELOW — You don't need to edit below this line
       (unless you want to change the look/feel)
   ═══════════════════════════════════════════════════════════════════ */

/* ───────────────────── Matrix Rain Background ───────────────────── */
function MatrixRain() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animationId;
    const chars = "01アイウエオカキクケコサシスセソ";
    let drops = [];

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const cols = Math.floor(canvas.width / 14);
      drops = Array(cols).fill(0).map(() => Math.random() * -100);
    }

    resize();
    window.addEventListener("resize", resize);

    function draw() {
      ctx.fillStyle = "rgba(10, 10, 15, 0.06)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "rgba(0, 255, 136, 0.12)";
      ctx.font = "14px monospace";

      drops.forEach((y, i) => {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * 14, y);
        if (y > canvas.height && Math.random() > 0.98) drops[i] = 0;
        drops[i] += 14;
      });
      animationId = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", zIndex: 0, pointerEvents: "none" }}
    />
  );
}

/* ───────────────────── Badges ───────────────────── */
function SeverityBadge({ severity }) {
  const colors = {
    CRITICAL: { bg: "rgba(255,0,60,0.15)", border: "#ff003c", text: "#ff003c" },
    HIGH: { bg: "rgba(255,150,0,0.15)", border: "#ff9600", text: "#ff9600" },
    MEDIUM: { bg: "rgba(0,200,255,0.15)", border: "#00c8ff", text: "#00c8ff" },
  };
  const c = colors[severity] || colors.MEDIUM;
  return (
    <span style={{ padding: "2px 10px", fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 700, letterSpacing: "1.5px", border: `1px solid ${c.border}`, background: c.bg, color: c.text, borderRadius: "2px" }}>
      {severity}
    </span>
  );
}

function StatusBadge({ status }) {
  const isActive = status === "DEPLOYED" || status === "ACTIVE";
  return (
    <span style={{ padding: "2px 10px", fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", fontWeight: 600, letterSpacing: "1.5px", border: `1px solid ${isActive ? "#00ff88" : "#6a6a8a"}`, background: isActive ? "rgba(0,255,136,0.1)" : "rgba(106,106,138,0.1)", color: isActive ? "#00ff88" : "#8a8aaa", borderRadius: "2px" }}>
      ● {status}
    </span>
  );
}

/* ───────────────────── Typing Effect ───────────────────── */
function TypingText({ text, speed = 20 }) {
  const [displayed, setDisplayed] = useState("");
  const indexRef = useRef(0);

  useEffect(() => {
    setDisplayed("");
    indexRef.current = 0;
    const interval = setInterval(() => {
      indexRef.current++;
      setDisplayed(text.slice(0, indexRef.current));
      if (indexRef.current >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return (
    <span>
      {displayed}
      <span style={{ animation: "blink 1s step-end infinite", color: "#00ff88" }}>▊</span>
    </span>
  );
}

/* ───────────────────── Project Detail Modal ───────────────────── */
function ProjectModal({ project, onClose }) {
  const [activeDetailTab, setActiveDetailTab] = useState("overview");

  useEffect(() => {
    const handleEsc = (e) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "auto";
    };
  }, [onClose]);

  const detailTabs = ["overview", "architecture", "mitre", "tools", "outcome", "writeup"];

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
        background: "rgba(5,8,15,0.85)", backdropFilter: "blur(12px)",
        zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center",
        padding: "20px", animation: "fadeIn 0.25s ease",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "rgba(12, 18, 30, 0.98)",
          border: "1px solid rgba(0,255,136,0.2)",
          borderRadius: "6px",
          width: "100%",
          maxWidth: "720px",
          maxHeight: "85vh",
          overflowY: "auto",
          animation: "slideUp 0.3s ease",
          position: "relative",
        }}
      >
        {/* Top glow */}
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "2px", background: "linear-gradient(90deg, transparent, #00ff88, transparent)" }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: "16px", right: "16px",
            background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)",
            color: "#6a7a8a", fontSize: "18px", width: "36px", height: "36px",
            borderRadius: "4px", cursor: "pointer", display: "flex",
            alignItems: "center", justifyContent: "center",
            transition: "all 0.2s ease", fontFamily: "monospace",
          }}
          onMouseEnter={(e) => { e.target.style.color = "#ff003c"; e.target.style.borderColor = "#ff003c"; }}
          onMouseLeave={(e) => { e.target.style.color = "#6a7a8a"; e.target.style.borderColor = "rgba(255,255,255,0.1)"; }}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ padding: "32px 32px 0" }}>
          <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap", alignItems: "center" }}>
            <SeverityBadge severity={project.severity} />
            <StatusBadge status={project.status} />
            <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: "#3a4558", letterSpacing: "2px", marginLeft: "auto" }}>
              PRJ-{String(project.id).padStart(3, "0")}
            </span>
          </div>

          <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "26px", fontWeight: 700, color: "#e0e8f0", margin: "0 0 8px", lineHeight: 1.2 }}>
            {project.title}
          </h2>

          <div style={{ display: "flex", gap: "6px", flexWrap: "wrap", marginBottom: "20px" }}>
            {project.tags.map((tag) => (
              <span key={tag} style={{ padding: "3px 10px", fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.8px", background: "rgba(0,200,255,0.06)", border: "1px solid rgba(0,200,255,0.15)", color: "#6ab0d4", borderRadius: "2px" }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Tab Navigation */}
        <div style={{ display: "flex", gap: "2px", padding: "0 32px", borderBottom: "1px solid rgba(0,255,136,0.08)", overflowX: "auto" }}>
          {detailTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveDetailTab(tab)}
              style={{
                padding: "10px 16px", fontSize: "10px",
                fontFamily: "'JetBrains Mono', monospace", letterSpacing: "1.5px",
                textTransform: "uppercase", cursor: "pointer",
                background: activeDetailTab === tab ? "rgba(0,255,136,0.08)" : "transparent",
                border: "none", borderBottom: activeDetailTab === tab ? "2px solid #00ff88" : "2px solid transparent",
                color: activeDetailTab === tab ? "#00ff88" : "#4a5568",
                transition: "all 0.2s ease",
              }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div style={{ padding: "24px 32px 32px" }}>
          {/* OVERVIEW TAB */}
          {activeDetailTab === "overview" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "14px", color: "#8a95a8", lineHeight: 1.8, margin: "0 0 20px" }}>
                {project.description}
              </p>

              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#3a4558", letterSpacing: "2px", marginBottom: "10px" }}>
                KEY HIGHLIGHTS
              </div>
              {project.highlights.map((h, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px", padding: "8px 12px", background: "rgba(0,255,136,0.03)", borderLeft: "2px solid #00ff8844", borderRadius: "0 4px 4px 0" }}>
                  <span style={{ color: "#00ff88", fontSize: "14px" }}>▸</span>
                  <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: "#a0aab8" }}>{h}</span>
                </div>
              ))}

              <div style={{ marginTop: "24px", padding: "16px", background: "rgba(0,255,136,0.03)", border: "1px solid rgba(0,255,136,0.08)", borderRadius: "4px" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#3a4558", letterSpacing: "2px", marginBottom: "8px" }}>
                  CHALLENGE
                </div>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: "#8a95a8", lineHeight: 1.7, margin: 0 }}>
                  {project.challenges}
                </p>
              </div>
            </div>
          )}

          {/* ARCHITECTURE TAB */}
          {activeDetailTab === "architecture" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#3a4558", letterSpacing: "2px", marginBottom: "16px" }}>
                DATA FLOW
              </div>
              <div style={{ background: "rgba(0,0,0,0.3)", border: "1px solid rgba(0,255,136,0.1)", borderRadius: "4px", padding: "24px", fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "#00ff88", lineHeight: 2.2, overflowX: "auto" }}>
                <TypingText text={project.architecture} speed={15} />
              </div>

              <div style={{ marginTop: "24px" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#3a4558", letterSpacing: "2px", marginBottom: "16px" }}>
                  PIPELINE STAGES
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", alignItems: "center" }}>
                  {project.architecture.split("→").map((step, i, arr) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                      <div style={{
                        padding: "10px 16px", background: "rgba(0,200,255,0.06)",
                        border: "1px solid rgba(0,200,255,0.15)", borderRadius: "4px",
                        fontFamily: "'JetBrains Mono', monospace", fontSize: "11px",
                        color: "#6ab0d4", whiteSpace: "nowrap",
                        animation: `fadeIn 0.3s ease ${i * 0.1}s both`,
                      }}>
                        {step.trim()}
                      </div>
                      {i < arr.length - 1 && (
                        <span style={{ color: "#00ff8866", fontSize: "16px", animation: `fadeIn 0.3s ease ${i * 0.1 + 0.05}s both` }}>→</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* MITRE TAB */}
          {activeDetailTab === "mitre" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#3a4558", letterSpacing: "2px", marginBottom: "16px" }}>
                MITRE ATT&CK MAPPING
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
                {project.mitre.map((technique, i) => {
                  const [id, name] = technique.split(" – ");
                  return (
                    <div
                      key={i}
                      style={{
                        display: "flex", alignItems: "center", gap: "16px",
                        padding: "14px 18px",
                        background: "rgba(255,0,60,0.03)",
                        border: "1px solid rgba(255,0,60,0.1)",
                        borderRadius: "4px",
                        animation: `fadeIn 0.3s ease ${i * 0.1}s both`,
                        cursor: "pointer",
                        transition: "all 0.2s ease",
                      }}
                      onClick={() => window.open(`https://attack.mitre.org/techniques/${id.replace(".", "/")}`, "_blank")}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,0,60,0.4)";
                        e.currentTarget.style.background = "rgba(255,0,60,0.06)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = "rgba(255,0,60,0.1)";
                        e.currentTarget.style.background = "rgba(255,0,60,0.03)";
                      }}
                    >
                      <span style={{
                        fontFamily: "'JetBrains Mono', monospace", fontSize: "12px",
                        fontWeight: 700, color: "#ff003c",
                        padding: "4px 10px", background: "rgba(255,0,60,0.1)",
                        borderRadius: "3px", whiteSpace: "nowrap",
                      }}>
                        {id}
                      </span>
                      <span style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13px", color: "#c0c8d8" }}>
                        {name}
                      </span>
                      <span style={{ marginLeft: "auto", fontSize: "11px", color: "#4a5568", fontFamily: "'JetBrains Mono', monospace" }}>
                        ↗ MITRE
                      </span>
                    </div>
                  );
                })}
              </div>
              <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#2d3748", marginTop: "16px", letterSpacing: "0.5px" }}>
                Click a technique to view on attack.mitre.org
              </p>
            </div>
          )}

          {/* TOOLS TAB */}
          {activeDetailTab === "tools" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#3a4558", letterSpacing: "2px", marginBottom: "16px" }}>
                TECHNOLOGY STACK
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "10px" }}>
                {project.tools.map((tool, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex", alignItems: "center", gap: "16px",
                      padding: "16px 18px",
                      background: "rgba(0,200,255,0.03)",
                      border: "1px solid rgba(0,200,255,0.08)",
                      borderRadius: "4px",
                      animation: `fadeIn 0.3s ease ${i * 0.08}s both`,
                      transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(0,200,255,0.3)"}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(0,200,255,0.08)"}
                  >
                    <div style={{
                      width: "40px", height: "40px", borderRadius: "8px",
                      background: "rgba(0,255,136,0.08)", border: "1px solid rgba(0,255,136,0.15)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "'JetBrains Mono', monospace", fontSize: "16px",
                      color: "#00ff88", fontWeight: 700, flexShrink: 0,
                    }}>
                      {tool.name.charAt(0)}
                    </div>
                    <div>
                      <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "14px", fontWeight: 600, color: "#e0e8f0" }}>
                        {tool.name}
                      </div>
                      <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#4a5568", letterSpacing: "1px", marginTop: "2px" }}>
                        {tool.role.toUpperCase()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* OUTCOME TAB */}
          {activeDetailTab === "outcome" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#3a4558", letterSpacing: "2px", marginBottom: "16px" }}>
                RESULTS & IMPACT
              </div>
              <div style={{
                padding: "24px", background: "rgba(0,255,136,0.03)",
                border: "1px solid rgba(0,255,136,0.12)", borderRadius: "4px",
                borderLeft: "3px solid #00ff88",
              }}>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "15px", color: "#c0d0e0", lineHeight: 1.8, margin: 0 }}>
                  {project.outcome}
                </p>
              </div>

              {/* Action links */}
              <div style={{ marginTop: "24px", display: "flex", gap: "12px", flexWrap: "wrap" }}>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "inline-flex", alignItems: "center", gap: "8px",
                    padding: "12px 24px", background: "rgba(0,255,136,0.08)",
                    border: "1px solid rgba(0,255,136,0.25)", borderRadius: "4px",
                    color: "#00ff88", textDecoration: "none",
                    fontFamily: "'JetBrains Mono', monospace", fontSize: "12px",
                    letterSpacing: "1px", transition: "all 0.2s ease",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,255,136,0.15)"; e.currentTarget.style.borderColor = "#00ff88"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,255,136,0.08)"; e.currentTarget.style.borderColor = "rgba(0,255,136,0.25)"; }}
                >
                  ⬡ VIEW ON GITHUB
                </a>
                {project.blogPost && project.blogPost !== "#" && (
                  <a
                    href={project.blogPost}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: "8px",
                      padding: "12px 24px", background: "rgba(0,200,255,0.05)",
                      border: "1px solid rgba(0,200,255,0.2)", borderRadius: "4px",
                      color: "#6ab0d4", textDecoration: "none",
                      fontFamily: "'JetBrains Mono', monospace", fontSize: "12px",
                      letterSpacing: "1px", transition: "all 0.2s ease",
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(0,200,255,0.1)"; e.currentTarget.style.borderColor = "#6ab0d4"; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(0,200,255,0.05)"; e.currentTarget.style.borderColor = "rgba(0,200,255,0.2)"; }}
                  >
                    ✎ READ WRITEUP
                  </a>
                )}
              </div>
            </div>
          )}

          {/* WRITEUP TAB */}
          {activeDetailTab === "writeup" && (
            <div style={{ animation: "fadeIn 0.3s ease" }}>
              {project.writeup && project.writeup.length > 0 ? (
                <>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#3a4558", letterSpacing: "2px", marginBottom: "16px" }}>
                    FULL WRITEUP — {project.title.toUpperCase()}
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                    {project.writeup.map((section, i) => (
                      <div
                        key={i}
                        style={{
                          animation: `fadeIn 0.3s ease ${i * 0.05}s both`,
                        }}
                      >
                        <div style={{
                          display: "flex", alignItems: "center", gap: "10px",
                          marginBottom: "8px",
                        }}>
                          <span style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: "10px", fontWeight: 700,
                            color: "#0a0e18",
                            background: "#00ff88",
                            padding: "2px 8px",
                            borderRadius: "2px",
                            letterSpacing: "0.5px",
                          }}>
                            {String(i + 1).padStart(2, "0")}
                          </span>
                          <h3 style={{
                            fontFamily: "'Space Grotesk', sans-serif",
                            fontSize: "15px", fontWeight: 700,
                            color: "#e0e8f0",
                            margin: 0,
                          }}>
                            {section.heading}
                          </h3>
                        </div>
                        <p style={{
                          fontFamily: "'IBM Plex Sans', sans-serif",
                          fontSize: "13px", color: "#8a95a8",
                          lineHeight: 1.8, margin: 0,
                          paddingLeft: "36px",
                          borderLeft: "1px solid rgba(0,255,136,0.1)",
                          marginLeft: "12px",
                        }}>
                          {section.content}
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Print / Share hint */}
                  <div style={{
                    marginTop: "28px", padding: "12px 16px",
                    background: "rgba(0,200,255,0.03)",
                    border: "1px solid rgba(0,200,255,0.08)",
                    borderRadius: "4px",
                    display: "flex", alignItems: "center", gap: "10px",
                  }}>
                    <span style={{ fontSize: "14px" }}>💡</span>
                    <span style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "10px", color: "#4a5568",
                      letterSpacing: "0.5px",
                    }}>
                      This writeup is part of the project documentation. View the full source and configs on GitHub.
                    </span>
                  </div>
                </>
              ) : (
                <div style={{
                  textAlign: "center", padding: "40px 20px",
                  color: "#3a4558",
                }}>
                  <div style={{ fontSize: "32px", marginBottom: "12px" }}>📝</div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px", letterSpacing: "1px",
                  }}>
                    WRITEUP COMING SOON
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────── Project Card ───────────────────── */
function ProjectCard({ project, index, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => onClick(project)}
      style={{
        background: hovered ? "rgba(15, 25, 40, 0.95)" : "rgba(12, 18, 30, 0.85)",
        border: hovered ? "1px solid rgba(0,255,136,0.4)" : "1px solid rgba(0,255,136,0.08)",
        borderRadius: "4px", padding: "28px",
        transition: "all 0.35s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
        cursor: "pointer", position: "relative", overflow: "hidden",
        animation: `fadeSlideIn 0.5s ease ${index * 0.08}s both`,
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 8px 40px rgba(0,255,136,0.08)" : "0 2px 10px rgba(0,0,0,0.3)",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "1px", background: hovered ? "linear-gradient(90deg, transparent, #00ff88, transparent)" : "transparent", transition: "all 0.35s ease" }} />

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "16px", flexWrap: "wrap", gap: "8px" }}>
        <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
          <SeverityBadge severity={project.severity} />
          <StatusBadge status={project.status} />
        </div>
        <span style={{ fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", color: "#4a5568", letterSpacing: "2px" }}>
          PRJ-{String(project.id).padStart(3, "0")}
        </span>
      </div>

      <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "20px", fontWeight: 700, color: "#e0e8f0", margin: "0 0 12px 0", letterSpacing: "-0.3px", lineHeight: 1.3 }}>
        {project.title}
      </h3>

      <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "13.5px", color: "#8a95a8", lineHeight: 1.7, margin: "0 0 18px 0" }}>
        {project.description}
      </p>

      <div style={{ marginBottom: "18px" }}>
        {project.highlights.map((h, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px", fontSize: "12px", fontFamily: "'JetBrains Mono', monospace", color: "#00ff88", opacity: 0.7 }}>
            <span style={{ color: "#00ff8855" }}>▸</span> {h}
          </div>
        ))}
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: "16px" }}>
        {project.tags.map((tag) => (
          <span key={tag} style={{ padding: "3px 10px", fontSize: "10px", fontFamily: "'JetBrains Mono', monospace", letterSpacing: "0.8px", background: "rgba(0,200,255,0.06)", border: "1px solid rgba(0,200,255,0.15)", color: "#6ab0d4", borderRadius: "2px" }}>
            {tag}
          </span>
        ))}
      </div>

      {/* Click hint */}
      <div style={{
        display: "flex", alignItems: "center", gap: "6px",
        fontFamily: "'JetBrains Mono', monospace", fontSize: "10px",
        letterSpacing: "1.5px",
        color: hovered ? "#00ff88" : "#2a3448",
        transition: "color 0.3s ease",
      }}>
        ▸ CLICK TO INVESTIGATE
      </div>
    </div>
  );
}

/* ───────────────────── Stats Bar ───────────────────── */
function StatsBar() {
  const stats = [
    { label: "DETECTION RULES", value: "35+", icon: "⚡" },
    { label: "IR PLAYBOOKS", value: "3", icon: "📋" },
    { label: "SIEM PLATFORMS", value: "3", icon: "🛡️" },
    { label: "INTEL FEEDS", value: "12+", icon: "🔍" },
    { label: "MITRE TECHNIQUES", value: "30+", icon: "🎯" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: "1px", background: "rgba(0,255,136,0.08)", borderRadius: "4px", overflow: "hidden", marginBottom: "48px" }}>
      {stats.map((s, i) => (
        <div key={i} style={{ background: "rgba(10,14,24,0.95)", padding: "24px 20px", textAlign: "center", animation: `fadeSlideIn 0.5s ease ${i * 0.1}s both` }}>
          <div style={{ fontSize: "22px", marginBottom: "8px" }}>{s.icon}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "26px", fontWeight: 700, color: "#00ff88", marginBottom: "4px" }}>{s.value}</div>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "9px", letterSpacing: "2px", color: "#4a5568" }}>{s.label}</div>
        </div>
      ))}
    </div>
  );
}

/* ───────────────────── About Section ───────────────────── */
function AboutSection() {
  const [showEmail, setShowEmail] = useState(false);

  const contactLinks = [
    { label: "LINKEDIN", url: MY_INFO.linkedin, icon: "in", action: "link" },
    { label: "GITHUB", url: MY_INFO.github, icon: "⬡", action: "link" },
    { label: "RESUME", url: MY_INFO.resume, icon: "📄", action: "link" },
    { label: "EMAIL", url: "#", icon: "✉", action: "email" },
  ];

  return (
    <div style={{ maxWidth: "680px", margin: "0 auto", animation: "fadeSlideIn 0.5s ease both" }}>
      <div style={{ background: "rgba(12, 18, 30, 0.85)", border: "1px solid rgba(0,255,136,0.08)", borderRadius: "4px", padding: "40px" }}>
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", border: "2px solid #00ff88", background: "rgba(0,255,136,0.08)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "32px", margin: "0 auto 24px" }}>
          🛡️
        </div>
        <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "28px", fontWeight: 700, color: "#e0e8f0", textAlign: "center", margin: "0 0 8px 0" }}>
          {MY_INFO.name}
        </h2>
        <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px", letterSpacing: "2px", color: "#00ff88", textAlign: "center", margin: "0 0 24px 0" }}>
          {MY_INFO.title}
        </p>
        <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "14px", color: "#8a95a8", lineHeight: 1.8, textAlign: "center", margin: "0 0 32px 0" }}>
          {MY_INFO.bio}
        </p>
        <div style={{ display: "flex", justifyContent: "center", gap: "12px", flexWrap: "wrap" }}>
          {contactLinks.map((item) => (
            <a
              key={item.label}
              href={item.action === "link" ? item.url : undefined}
              target={item.action === "link" ? "_blank" : undefined}
              rel={item.action === "link" ? "noopener noreferrer" : undefined}
              onClick={item.action === "email" ? (e) => { e.preventDefault(); setShowEmail(!showEmail); } : undefined}
              style={{
                padding: "10px 22px", fontSize: "11px",
                fontFamily: "'JetBrains Mono', monospace", letterSpacing: "1.5px",
                border: "1px solid rgba(0,255,136,0.25)", color: "#00ff88",
                textDecoration: "none", borderRadius: "2px",
                transition: "all 0.25s ease", background: "rgba(0,255,136,0.05)",
                display: "inline-flex", alignItems: "center", gap: "8px",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,255,136,0.15)";
                e.currentTarget.style.borderColor = "#00ff88";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 15px rgba(0,255,136,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,255,136,0.05)";
                e.currentTarget.style.borderColor = "rgba(0,255,136,0.25)";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <span style={{ fontSize: "13px" }}>{item.icon}</span>
              {item.label}
            </a>
          ))}
        </div>

        {/* Email display - shows when EMAIL button is clicked */}
        {showEmail && (
          <div style={{
            marginTop: "20px", padding: "14px 24px",
            background: "rgba(0,255,136,0.05)",
            border: "1px solid rgba(0,255,136,0.2)",
            borderRadius: "4px",
            textAlign: "center",
            animation: "fadeIn 0.3s ease",
          }}>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "2px", color: "#3a4558", marginBottom: "6px" }}>
              CONTACT EMAIL
            </div>
            <div style={{
              fontFamily: "'JetBrains Mono', monospace", fontSize: "16px",
              color: "#00ff88", letterSpacing: "1px",
            }}>
              {MY_INFO.email}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ───────────────────── Main App ───────────────────── */
export default function SOCPortfolio() {
  const [activeTab, setActiveTab] = useState("DASHBOARD");
  const [time, setTime] = useState(new Date());
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const filtered =
    activeTab === "DASHBOARD" ? projects
    : activeTab === "SIEM" ? projects.filter((p) => p.category === "SIEM")
    : activeTab === "IR" ? projects.filter((p) => p.category === "IR")
    : activeTab === "INTEL" ? projects.filter((p) => p.category === "INTEL")
    : [];

  return (
    <div style={{ minHeight: "100vh", background: "#0a0e18", color: "#c0c8d8", fontFamily: "'IBM Plex Sans', sans-serif", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700&family=Space+Grotesk:wght@400;600;700&family=IBM+Plex+Sans:wght@400;500;600&display=swap');

        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(16px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0e18; }
        ::-webkit-scrollbar-thumb { background: #1a2438; border-radius: 3px; }
        ::-webkit-scrollbar-thumb:hover { background: #00ff88; }
        * { box-sizing: border-box; }
      `}</style>

      <MatrixRain />

      {/* Scanline overlay */}
      <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "repeating-linear-gradient(0deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 3px)", pointerEvents: "none", zIndex: 1 }} />

      {/* Content */}
      <div style={{ position: "relative", zIndex: 2 }}>
        {/* Header / Nav */}
        <header style={{ borderBottom: "1px solid rgba(0,255,136,0.1)", background: "rgba(10,14,24,0.9)", backdropFilter: "blur(20px)", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: "60px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: "#00ff88", boxShadow: "0 0 12px #00ff88", animation: "blink 2s ease infinite" }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "14px", fontWeight: 700, color: "#e0e8f0", letterSpacing: "3px" }}>
                SOC<span style={{ color: "#00ff88" }}>_</span>OPS
              </span>
            </div>

            <nav style={{ display: "flex", gap: "4px" }}>
              {navItems.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  style={{
                    padding: "8px 16px", fontSize: "10px",
                    fontFamily: "'JetBrains Mono', monospace", letterSpacing: "2px",
                    background: activeTab === item ? "rgba(0,255,136,0.1)" : "transparent",
                    border: activeTab === item ? "1px solid rgba(0,255,136,0.3)" : "1px solid transparent",
                    color: activeTab === item ? "#00ff88" : "#4a5568",
                    borderRadius: "2px", cursor: "pointer", transition: "all 0.2s ease",
                  }}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#2d3748", letterSpacing: "1px" }}>
              {time.toLocaleTimeString("en-US", { hour12: false })} UTC
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "48px 24px 80px" }}>
          {activeTab !== "ABOUT" ? (
            <>
              <div style={{ marginBottom: "48px", animation: "fadeSlideIn 0.5s ease both" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "4px", color: "#00ff8866", marginBottom: "12px" }}>
                  ▸ SECURITY OPERATIONS CENTER
                </div>
                <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(32px, 5vw, 52px)", fontWeight: 700, color: "#e8f0f8", margin: "0 0 12px 0", lineHeight: 1.1, letterSpacing: "-1px" }}>
                  Detection & Response<br />
                  <span style={{ color: "#00ff88" }}>Project Portfolio</span>
                </h1>
                <p style={{ fontFamily: "'IBM Plex Sans', sans-serif", fontSize: "15px", color: "#5a6578", maxWidth: "520px", lineHeight: 1.7, margin: 0 }}>
                  Hands-on SOC projects demonstrating SIEM engineering,
                  detection rule development, and incident response capabilities.
                  <span style={{ color: "#00ff8866", fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}> Click any project to investigate.</span>
                </p>
              </div>

              <StatsBar />

              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "24px" }}>
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "3px", color: "#3a4558" }}>
                  {activeTab === "DASHBOARD" ? "ALL PROJECTS" : activeTab === "SIEM" ? "SIEM & DETECTION" : activeTab === "IR" ? "INCIDENT RESPONSE" : "THREAT INTELLIGENCE"}
                </span>
                <div style={{ flex: 1, height: "1px", background: "linear-gradient(90deg, rgba(0,255,136,0.15), transparent)" }} />
                <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#2d3748" }}>
                  {filtered.length} ENTRIES
                </span>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: "16px" }}>
                {filtered.map((project, i) => (
                  <ProjectCard key={project.id} project={project} index={i} onClick={setSelectedProject} />
                ))}
              </div>
            </>
          ) : (
            <AboutSection />
          )}
        </main>

        <footer style={{ borderTop: "1px solid rgba(0,255,136,0.06)", padding: "20px 24px", textAlign: "center" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", letterSpacing: "2px", color: "#1e2738" }}>
            BUILT WITH DEDICATION TO BLUE TEAM OPS • {new Date().getFullYear()}
          </span>
        </footer>
      </div>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
