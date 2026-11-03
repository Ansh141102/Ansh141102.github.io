/* Ansh Srivastava portfolio assistant.
   Fully client-side. Reads everything from window.PORTFOLIO (defined in main.js),
   so content only needs to be edited in one place. */
(function () {
  'use strict';

  /* ── Helpers ──────────────────────────────────────────────── */
  const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const rx = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pick = arr => arr[Math.floor(Math.random() * arr.length)];
  const plain = html => html.replace(/<[^>]+>/g, '');

  /* Minimal, safe markdown: **bold**, _italic_, [links](url), "• " lists, ``` code ``` */
  function md(src) {
    const blocks = [];
    let s = String(src).replace(/```\n?([\s\S]*?)\n?```/g, (_, c) => { blocks.push(c); return '\u0000' + (blocks.length - 1) + '\u0000'; });
    s = esc(s)
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/(^|[\s(])_([^_\n]+)_(?=[\s).,!?:]|$)/g, '$1<em>$2</em>')
      .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, u) => {
        const external = /^https?:/.test(u);
        if (!external && !/^(mailto:|tel:)/.test(u) && /^[a-z]+:/i.test(u)) return t; /* drop unsafe schemes */
        return `<a href="${u}"${external ? ' target="_blank" rel="noopener"' : ''}>${t}</a>`;
      });
    let out = '', inList = false;
    s.split('\n').forEach(line => {
      const li = line.match(/^\s*•\s+(.*)$/);
      if (li) { if (!inList) { out += '<ul>'; inList = true; } out += `<li>${li[1]}</li>`; }
      else { if (inList) { out += '</ul>'; inList = false; } out += line + '<br>'; }
    });
    if (inList) out += '</ul>';
    out = out.replace(/(<br>){3,}/g, '<br><br>').replace(/<br>(<\/?ul>)/g, '$1').replace(/(<\/ul>)<br>/g, '$1').replace(/(<br>)+$/, '');
    return out.replace(/\u0000(\d+)\u0000/g, (_, i) => `<pre>${esc(blocks[i])}</pre>`);
  }

  /* ── Conversation memory ─────────────────────────────────── */
  class Context {
    constructor() { this.lastTopic = null; this.lastProject = null; this.count = 0; this.userName = null; }
  }

  /* ── NLP utilities ───────────────────────────────────────── */
  const tokenize = t => t.toLowerCase().replace(/[^\w\s]/g, ' ').split(/\s+/).filter(Boolean);
  const stem = w => w.replace(/ies$/, 'y').replace(/(ing|ment|ness|es|s)$/, '');
  function similarity(a, b) {
    const sa = new Set(tokenize(a).map(stem)), sb = new Set(tokenize(b).map(stem));
    if (!sa.size || !sb.size) return 0;
    let n = 0; sa.forEach(t => { if (sb.has(t)) n++; });
    return n / (sa.size + sb.size - n);
  }

  /* Only treat a capitalised word as a name, and never common words like "looking" or "interested". */
  const NOT_NAMES = new Set(['looking', 'interested', 'curious', 'here', 'just', 'a', 'an', 'the', 'hiring', 'recruiting', 'also', 'not', 'sure', 'wondering', 'trying', 'new', 'from', 'with', 'student', 'recruiter', 'developer', 'engineer', 'manager', 'fine', 'good', 'great', 'ok', 'okay']);
  function extractName(text) {
    const m = text.match(/\b(?:[Mm]y name is|I'?m|I am|[Cc]all me|[Tt]his is)\s+([A-Z][a-z]{1,20})(?:\s+([A-Z][a-z]{1,20}))?/);
    if (!m || NOT_NAMES.has(m[1].toLowerCase())) return null;
    return m[2] && !NOT_NAMES.has(m[2].toLowerCase()) ? `${m[1]} ${m[2]}` : m[1];
  }
  function sentiment(text) {
    const pos = (text.match(/\b(great|awesome|cool|nice|good|love|amazing|excellent|impressive|fantastic|wow|brilliant|clean|beautiful)\b/gi) || []).length;
    const neg = (text.match(/\b(bad|terrible|awful|poor|hate|boring|worse|ugly|horrible|slow|broken)\b/gi) || []).length;
    return pos > neg ? 'positive' : neg > pos ? 'negative' : 'neutral';
  }

  /* ── Project matching (whole-word patterns only) ─────────── */
  const PROJECT_KEYS = {
    'stock-predictor': /\b(stocks?|nse|bse|yfinance|vader|trading|share price|stock market|forecast(?:ing|s)?|sentiment)\b/i,
    'heart-failure': /\b(heart|cardiac|clinical|svm|patients?|medical|health ?care)\b/i,
    'telecom-churn': /\b(churn|telecom|telco|smote|retention|subscribers?)\b/i,
    'hr-automation': /\b(gmail|cold[- ]?emails?|oauth|outreach|recruiters?|hr|email automation)\b/i,
    'ev-analysis': /\b(evs?|electric vehicles?|washington|bev|phev)\b/i
  };
  function findProjects(text, projects) {
    const hits = projects.filter(p => PROJECT_KEYS[p.id] && PROJECT_KEYS[p.id].test(text));
    if (hits.length) return hits;
    let best = null, score = 0;
    projects.forEach(p => {
      const s = Math.max(similarity(text, p.name), similarity(text, p.kicker));
      if (s > score && s > 0.25) { best = p; score = s; }
    });
    return best ? [best] : [];
  }

  function projectLinks(p, short) {
    return [p.demo && `[${short ? 'Demo' : 'Live demo'}](${p.demo})`, `[${short ? 'Code' : 'GitHub'}](${p.github})`].filter(Boolean).join(' · ');
  }
  function projectCard(p) {
    return `**${p.name}**\n${p.desc}\n\n• ${p.metrics.map(([v, k]) => `${v} ${k}`).join(', ')}\n• ${p.tags.join(', ')}\n\n${projectLinks(p)}`;
  }
  function projectDetail(p) {
    const body = p.detail
      .replace(/<h4>/g, '\n**').replace(/<\/h4>/g, '**\n')
      .replace(/<pre>/g, '\n```\n').replace(/<\/pre>/g, '\n```\n')
      .replace(/<li>/g, '• ').replace(/<\/li>/g, '\n');
    return plain(body).replace(/&amp;/g, '&').trim();
  }

  /* ── Skill lookup: "does he know Docker?" ────────────────── */
  function skillIndex(skills) {
    const idx = [];
    skills.forEach(([group, items]) => items.forEach(item => {
      const base = item.replace(/\(.*?\)/g, ' ');
      const inner = (item.match(/\((.*?)\)/) || [, ''])[1];
      const aliases = new Set([item.toLowerCase().replace(/\s*\(.*?\)/g, '').trim()]);
      base.split(/\s*(?:,|&|\/| and )\s*/i).concat(inner.split(/\s*,\s*/)).forEach(a => {
        a = a.trim().toLowerCase();
        if (a.length >= 2) aliases.add(a);
      });
      idx.push({ group, item, aliases: [...aliases] });
    }));
    return idx;
  }
  function matchSkills(text, skills) {
    const lower = text.toLowerCase();
    return skillIndex(skills).filter(s => s.aliases.some(a => new RegExp('(^|[^a-z0-9+#])' + rx(a) + '($|[^a-z0-9+#])').test(lower)));
  }

  /* ── Knowledge base (built from window.PORTFOLIO) ────────── */
  function kb() {
    const P = window.PORTFOLIO;
    return {
      profile: P.profile, projects: P.projects, skills: P.skills, certs: P.certs,
      experience: P.experience, education: P.education,
      byId: id => P.projects.find(p => p.id === id),
      about: 'Ansh is a Machine Learning Engineer and Data Analyst who likes turning exploratory work into software people can use. His work ranges from sonar classifiers for naval applications to stock forecasting with ensemble models and sentiment analysis. He cares about real-world constraints: caching to stay inside API rate limits, resampling imbalanced classes with SMOTE, and serving models through FastAPI, Flask and Streamlit.',
      focus: 'End-to-end ML pipelines, big data and ETL, BI dashboards, API automation',
      facts: [
        'Ansh analyzed over 130,000 EV registrations in a single project.',
        'His stock predictor covers 5,000+ Indian companies on NSE and BSE.',
        'He cut false positives by 77% in a sonar classification system for naval use.',
        'His heart failure predictor reached 90.76% accuracy with an SVM.',
        'The stock predictor uses different cache lifetimes for different data types to stay within free API limits.',
        'He holds the AWS Certified Cloud Practitioner certification.'
      ]
    };
  }

  /* ── Intent classification ───────────────────────────────── */
  function classify(text, ctx, K) {
    const t = text.trim();
    const words = tokenize(t).length;
    const projects = findProjects(t, K.projects);

    if (/^(hi|hello|hey|hola|namaste|yo|sup|good\s*(morning|afternoon|evening)|howdy)\b[\s!?.]*$/i.test(t)) return ['greeting'];
    if (/^(bye|goodbye|see you|later|thanks?|thank you|cheers|cya|take care)\b[\s!?.]*$/i.test(t)) return ['farewell'];
    if (/\b(who are you|what are you|what can you do|introduce yourself|your name)\b/i.test(t)) return ['meta'];
    if (extractName(t)) return ['name_intro'];
    if (/\b(portfolio|website|site|page|design)\b/i.test(t) && sentiment(t) !== 'neutral') return ['opinion'];
    if (/\b(resume|cv)\b/i.test(t)) return ['resume'];
    if (/\b(available|hire|hiring|open to|opportunit\w*|notice period|part[- ]time|full[- ]time|(looking|searching) for (an? )?[\w\s-]{0,30}(engineer|scientist|analyst|developer|candidate|job|work|role|talent|hire))\b/i.test(t)) return ['availability'];
    if (/\b(contact|phone|call|reach|linkedin|get in touch|connect|e-?mail (address|id|him|ansh)|(his|your) e-?mail|send (an? )?e-?mail|how (can|do) i (email|message))\b/i.test(t)) return ['contact'];
    if (/\b(compar\w*|differen\w*|versus|vs\.?)\b/i.test(t)) return ['compare', projects];
    if (/\b(fun fact|trivia|interesting|surprise me|random fact)\b/i.test(t)) return ['fun_fact'];
    if (/\b(how many|number of|total|by the numbers|stats)\b/i.test(t)) return ['quantitative'];
    if (/\b(demos?|live|deployed|hosted|try (it|them)|visit|links?)\b/i.test(t) && !projects.length) return ['demos'];

    const followUp = ctx.lastTopic && (/\b(tell me more|more (info|details|about)|elaborate|go on|continue|expand|details?)\b/i.test(t) || (words <= 4 && /\b(it|that|this|more)\b/i.test(t)));
    const deep = /\b(how (did|does|do)|explain|architecture|pipeline|approach|workflow|in detail|deep dive|under the hood)\b/i.test(t);
    if (deep && (projects.length || ctx.lastProject)) return ['deep_dive', projects];
    if (followUp) return ['follow_up'];

    if (/\b(certif\w*|credentials?|courses?|badges?|diploma)\b/i.test(t)) return ['certifications'];
    if (/\b(education|college|degree|b\.?tech|abes|university|aktu|studied|study|academic)\b/i.test(t)) return ['education'];

    const skillHits = matchSkills(t, K.skills);
    const askingSkill = /\b(know|knows|use|uses|used|using|familiar|proficient|worked with|work with|experience with|comfortable|skilled|can he|does he|has he)\b/i.test(t);
    if (skillHits.length && (askingSkill || !projects.length)) return ['skill_lookup', skillHits];

    if (projects.length === 1) return ['project_specific', projects];
    if (projects.length > 1) return ['compare', projects];
    if (/\b(demos?|live)\b/i.test(t)) return ['demos'];
    if (/\b(projects?|built|apps?|applications?|portfolio|showcase)\b/i.test(t)) return ['projects'];
    if (/\b(experience|intern|internship|job|jobs|career|employ\w*|work history|alliance|sonar|spn|underwater|roles?)\b/i.test(t)) return ['experience'];
    if (/\b(skills?|tech stack|stack|technolog\w*|tools?|languages?|frameworks?|librar\w*|machine learning|deep learning|ml)\b/i.test(t)) return ['skills'];
    if (/\b(github|message)\b/i.test(t)) return ['contact'];
    if (/\b(about|who is|summary|overview|intro|background)\b/i.test(t)) return ['about'];
    if (/\b(where|location|city|country|based|remote|relocat\w*)\b/i.test(t)) return ['location'];
    if (/\b(help|what can|capabilities|options|menu|commands?)\b/i.test(t)) return ['help'];
    return ['unknown', projects];
  }

  /* ── Response generation ─────────────────────────────────── */
  function respond(text, ctx) {
    const K = kb();
    const [intent, payload] = classify(text, ctx, K);
    let reply = '', follow = '', topic = ctx.lastTopic;
    const pr = K.profile;

    switch (intent) {
      case 'greeting':
        reply = (ctx.userName ? pick([`Hello ${ctx.userName}, good to see you again.`, `Hi ${ctx.userName}. What would you like to know about Ansh?`])
          : pick(["Hi, I'm Ansh's portfolio assistant.", "Hello, welcome to Ansh's portfolio."])) +
          '\n\nI can help with:\n• **Projects** and live demos\n• **Experience** and **skills**\n• **Education** and **credentials**\n• **Contact** details and his **resume**\n\nAsk in your own words.';
        topic = null; break;

      case 'meta':
        reply = "I'm the assistant for Ansh's portfolio. I run entirely in your browser, with no server and no data leaving the page.\n\nI can answer questions about his **projects**, **experience**, **skills**, **education**, **credentials** and **contact** details, and I remember the thread of our conversation so follow-ups work.";
        break;

      case 'name_intro': {
        const name = extractName(text);
        ctx.userName = name;
        reply = `Nice to meet you, **${name}**. What would you like to know about Ansh's work?`;
        break;
      }

      case 'farewell':
        reply = ctx.userName ? pick([`Thanks for visiting, ${ctx.userName}.`, `Goodbye, ${ctx.userName}. Come back anytime.`]) : pick(['Thanks for visiting. Come back anytime.', 'Goodbye, and thanks for stopping by.']);
        if (ctx.count > 3) reply += `\n\nIf you'd like to work with Ansh, [send him an email](mailto:${pr.email}).`;
        break;

      case 'opinion': {
        const s = sentiment(text);
        reply = s === 'positive' ? 'Thank you, Ansh will be glad to hear it. Is there anything you would like to explore?'
          : s === 'negative' ? `Thanks for the honest feedback. If you have specific suggestions, please [email Ansh](mailto:${pr.email}).\n\nMeanwhile, can I help you with his **projects** or **skills**?`
          : 'Thanks for visiting. Would you like to hear about his **projects**, **skills** or **experience**?';
        break;
      }

      case 'compare': {
        const list = payload || [];
        if (list.length >= 2) {
          reply = list.map(p => `**${p.name}**\n• Area: ${p.kicker}\n• Metrics: ${p.metrics.map(([v, k]) => `${v} ${k}`).join(', ')}\n• Tech: ${p.tags.join(', ')}`).join('\n\n');
          follow = '\n\nWant a deep dive into either one?';
        } else {
          reply = 'I can compare any two projects. Try:\n• "Compare the stock predictor and the heart failure project"\n• "Heart failure vs churn"';
        }
        topic = 'projects'; break;
      }

      case 'deep_dive': {
        const p = (payload && payload[0]) || K.byId(ctx.lastProject);
        if (p) {
          ctx.lastProject = p.id;
          reply = `**${p.name}: deep dive**\n\n${projectDetail(p)}`;
          follow = `\n\n${projectLinks(p)}`;
        } else {
          reply = 'Which project should I explain?\n' + K.projects.map(p => `• **${p.name}**`).join('\n');
        }
        topic = 'projects'; break;
      }

      case 'follow_up': {
        const p = K.byId(ctx.lastProject);
        if (ctx.lastTopic === 'projects' && p) {
          reply = `More on **${p.name}**:\n\n${projectDetail(p)}\n\n${projectLinks(p)}`;
        } else if (ctx.lastTopic === 'experience') {
          reply = K.experience.map(e => `**${e.title}**, ${e.org} _(${e.period})_\n` + e.points.map(h => `• ${plain(h)}`).join('\n')).join('\n\n');
        } else if (ctx.lastTopic === 'skills') {
          reply = '**Full skill breakdown**\n\n' + K.skills.map(([h, items]) => `**${h}**\n${items.join(', ')}`).join('\n\n');
        } else {
          reply = 'What would you like to know more about? I can cover **projects**, **skills**, **experience**, **education** or **contact** details.';
        }
        break;
      }

      case 'quantitative':
        reply = `**Ansh by the numbers**\n\n• ${K.projects.length} featured projects\n• ${K.certs.length} certifications and programs\n• ${K.skills.length} skill areas\n• ${K.experience.length} professional roles\n• 5,000+ Indian stocks covered\n• 130,000+ records analyzed (EV project)\n• 90.76% peak model accuracy\n• 77% fewer false positives (sonar classifier)`;
        topic = null; break;

      case 'demos': {
        const live = K.projects.filter(p => p.demo);
        reply = '**Live applications**\n\n' + live.map(p => `• **${p.name}**\n  ${projectLinks(p)}`).join('\n') +
          '\n\n_The stock predictor works best during Indian market hours (Mon to Fri, 9:15 AM to 3:30 PM IST). Free hosting can take a few seconds to wake up._';
        topic = 'projects'; break;
      }

      case 'project_specific': {
        const p = payload[0];
        ctx.lastProject = p.id;
        reply = projectCard(p);
        follow = '\n\nWant a **deep dive** into how it works, or another project?';
        topic = 'projects'; break;
      }

      case 'projects':
        reply = '**Featured projects**\n\n' + K.projects.map(p => `• **${p.name}**: ${projectLinks(p, true)}`).join('\n') +
          '\n\nAsk about any of them, or say "compare" to see two side by side.';
        topic = 'projects'; break;

      case 'experience':
        reply = '**Experience**\n\n' + K.experience.map(e => `**${e.title}**\n${e.org} · _${e.period}_\n${e.summary}`).join('\n\n');
        follow = '\n\nAsk for **more details** on either role.';
        topic = 'experience'; break;

      case 'skills':
        reply = '**Technical skills**\n\n' + K.skills.map(([h, items]) => `**${h}**\n${items.join(', ')}`).join('\n\n');
        follow = '\n\nAsk about any specific technology, for example "Does he know Docker?"';
        topic = 'skills'; break;

      case 'skill_lookup': {
        const hits = payload.slice(0, 3);
        reply = hits.map(h => `Yes, **${h.item}** is part of Ansh's **${h.group}** toolkit.`).join('\n');
        const used = K.projects.filter(p => {
          const hay = (p.tags.join(' ') + ' ' + p.desc).toLowerCase();
          return hits.some(h => h.aliases.some(a => new RegExp('(^|[^a-z0-9])' + rx(a) + '($|[^a-z0-9])').test(hay)));
        }).slice(0, 4);
        if (used.length) reply += '\n\nHe has used it in:\n' + used.map(p => `• **${p.name}**`).join('\n');
        topic = 'skills'; break;
      }

      case 'education': {
        const e = K.education;
        reply = `**Education**\n\n**${e.degree}**\n${e.college}\n${e.period}\n\n**Focus:** ${K.focus}`;
        follow = '\n\nWant to see his **certifications** too?';
        topic = 'education'; break;
      }

      case 'certifications':
        reply = '**Certifications and programs**\n\n' + K.certs.map(([n, i]) => `• **${n}**, ${i}`).join('\n');
        topic = 'certifications'; break;

      case 'contact':
        reply = `**Get in touch with Ansh**\n\n• Email: [${pr.email}](mailto:${pr.email})\n• Phone: [${pr.phone}](tel:${pr.phone.replace(/[^+\d]/g, '')})\n• LinkedIn: [ansh-srivastava141102](${pr.linkedin})\n• GitHub: [Ansh141102](${pr.github})\n\nHe's open to Machine Learning Engineer, Data Scientist and Data Analyst roles.`;
        topic = 'contact'; break;

      case 'resume':
        reply = `Here is Ansh's resume: **[Download the PDF](${pr.resume})**\n\nIt covers his experience, skills, projects and education.`;
        topic = 'resume'; break;

      case 'about':
        reply = `**About Ansh Srivastava**\n\n${K.about}\n\nBased in ${pr.location}. Open to full-time roles.`;
        follow = '\n\nWould you like to explore his **projects**, **experience** or **skills**?';
        topic = 'about'; break;

      case 'location':
        reply = `Ansh is based in ${pr.location}. To discuss a role, whether remote or on-site, [email him](mailto:${pr.email}).`;
        topic = 'location'; break;

      case 'fun_fact':
        reply = `**Did you know?** ${pick(K.facts)}`;
        follow = '\n\nAsk for another, or pick a topic to explore.';
        topic = 'fun_fact'; break;

      case 'availability':
        reply = `**Ansh is open to opportunities.**\n\n• Machine Learning Engineer roles\n• Data Scientist positions\n• Data Analyst roles\n• Freelance ML and data projects\n\nReach him at [${pr.email}](mailto:${pr.email}) or on [LinkedIn](${pr.linkedin}).`;
        topic = 'availability'; break;

      case 'help':
        reply = '**What I can help with**\n\n• "Tell me about the stock predictor"\n• "Compare the heart failure and churn projects"\n• "Show live demos"\n• "Does he know Docker?"\n• "What is his experience?"\n• "Education" or "Certifications"\n• "Resume" or "Contact"\n• "Fun fact"\n\nFollow-up questions work too.';
        topic = null; break;

      default: {
        const guess = payload && payload[0];
        if (guess) {
          ctx.lastProject = guess.id;
          reply = `This might be what you're after:\n\n${projectCard(guess)}`;
          follow = '\n\nIf not, type **help** to see what I can answer.';
          topic = 'projects';
        } else {
          reply = pick([
            "I'm not sure I understood that. Try asking about Ansh's **projects**, **skills**, **experience**, **education** or **contact** details.",
            'I can only speak to Ansh\'s portfolio. Ask about his **work**, **tech stack**, **credentials**, or how to **reach him**.',
            'I didn\'t catch that. Type **help** for examples of what I can answer.'
          ]);
        }
      }
    }
    ctx.lastTopic = topic || ctx.lastTopic;
    return md(reply + follow);
  }

  /* ── UI ──────────────────────────────────────────────────── */
  function init() {
    const widget = document.getElementById('chatbotWidget');
    if (!widget) return;
    const launcher = document.getElementById('chatbotLauncher');
    const box = document.getElementById('chatbotBox');
    const closeBtn = document.getElementById('chatCloseBtn');
    const list = document.getElementById('chatMessages');
    const form = document.getElementById('chatForm');
    const input = document.getElementById('chatInput');
    const chips = document.getElementById('chatChips');
    const ctx = new Context();
    let greeted = false;

    function addMsg(html, who) {
      const d = document.createElement('div');
      d.className = 'msg ' + who;
      d.innerHTML = html;
      list.appendChild(d);
      /* long replies start at their first line instead of jumping to the end */
      list.scrollTop = d.offsetHeight > list.clientHeight * 0.7 ? d.offsetTop - 8 : list.scrollHeight;
      return d;
    }
    function showTyping() {
      const t = document.createElement('div');
      t.className = 'msg bot typing';
      t.setAttribute('aria-label', 'Assistant is typing');
      t.innerHTML = '<span class="typing-dots"><span></span><span></span><span></span></span>';
      list.appendChild(t);
      list.scrollTop = list.scrollHeight;
      return t;
    }

    function toggle(open) {
      box.hidden = !open;
      launcher.setAttribute('aria-expanded', String(open));
      launcher.setAttribute('aria-label', open ? 'Close AI assistant' : 'Open AI assistant');
      if (open) {
        if (!greeted) {
          greeted = true;
          const h = new Date().getHours();
          const g = h < 12 ? 'Good morning' : h < 17 ? 'Good afternoon' : 'Good evening';
          addMsg(md(`${g}. I'm Ansh's assistant.\n\nI can answer questions about his **projects**, **skills**, **experience** and **contact** details.\n\nAsk anything, or tap a suggestion below.`), 'bot');
        }
        input.focus();
      } else {
        launcher.focus();
      }
    }

    function send(text) {
      text = text.trim();
      if (!text) return;
      addMsg(esc(text), 'user');
      ctx.count++;
      const typing = showTyping();
      const delay = 350 + Math.min(text.length * 8, 700) + Math.random() * 250;
      setTimeout(() => {
        typing.remove();
        addMsg(respond(text, ctx), 'bot');
      }, delay);
    }

    [
      ['Projects', 'Tell me about your projects'],
      ['Live demos', 'Show live demos'],
      ['Skills', 'What are your skills?'],
      ['Experience', 'Tell me about your experience'],
      ['Resume', 'Resume'],
      ['Contact', 'How can I contact Ansh?'],
      ['Fun fact', 'Tell me a fun fact'],
      ['Help', 'What can you help with?']
    ].forEach(([label, q]) => {
      const b = document.createElement('button');
      b.type = 'button'; b.textContent = label;
      b.addEventListener('click', () => send(q));
      chips.appendChild(b);
    });

    launcher.addEventListener('click', () => toggle(box.hidden));
    closeBtn.addEventListener('click', () => toggle(false));
    form.addEventListener('submit', e => { e.preventDefault(); send(input.value); input.value = ''; });
    addEventListener('keydown', e => {
      if (e.key === 'Escape' && !box.hidden && document.getElementById('projectModal').hidden) toggle(false);
    });
    window.openPortfolioChat = q => { if (box.hidden) toggle(true); if (q) send(q); };
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
