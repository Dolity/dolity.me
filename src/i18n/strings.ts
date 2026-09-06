/**
 * Every user-facing string on the site.
 *
 * Voice: first person singular — ผม / I. This is one person's site, so "เรา/we"
 * would be a company that does not exist.
 *
 * `th` is the source of truth: it is `as const`, so its keys define `UiKey`.
 * `en` is typed against those keys, which makes a missing or renamed English
 * string a build failure instead of a silent fallback to Thai.
 *
 * Keys under `cmd.*` are the machine's voice — shell commands rendered in mono.
 * They are identical in both locales on purpose: a command is not translated.
 */

const th = {
	'site.name': 'Dolity',
	'site.tagline': 'เว็บและเครื่องมือที่ผมสร้างเอง แล้วก็ใช้เองด้วย',

	// Navigation
	'nav.home': 'หน้าแรก',
	'nav.about': 'เกี่ยวกับผม',
	'nav.resume': 'เรซูเม่',
	'nav.products': 'ผลงาน',
	'nav.uses': 'ของที่ใช้',
	'nav.now': 'ตอนนี้',
	'nav.support': 'สนับสนุน',
	'nav.close': 'ปิด',
	'nav.langSwitch': 'English',
	'nav.langSwitchAria': 'อ่านหน้านี้เป็นภาษาอังกฤษ',
	'nav.skip': 'ข้ามไปที่เนื้อหา',

	// Theme
	'theme.toggle': 'สลับโหมดสีสว่าง/มืด',

	// Command palette
	'palette.open': 'ค้นหาและข้ามไปหน้าอื่น',
	'palette.title': 'ไปที่ไหนดี',
	'palette.placeholder': 'พิมพ์ชื่อหน้าหรือชื่อผลงาน…',
	'palette.pages': 'หน้าในเว็บ',
	'palette.products': 'ผลงาน',
	'palette.empty': 'ไม่เจออะไรเลย ลองพิมพ์สั้นลงดูไหม',
	'palette.hint': '↑↓ เลื่อน · Enter เปิด · Esc ปิด',

	// Consent
	'consent.text':
		'เว็บนี้ใช้คุกกี้เพื่อเก็บสถิติการเข้าชมแบบไม่ระบุตัวตน ไม่มีโฆษณา ไม่มีการขายข้อมูล',
	'consent.accept': 'ยอมรับ',
	'consent.reject': 'ไม่ยอมรับ',
	'consent.aria': 'ตัวเลือกความยินยอมเรื่องคุกกี้',

	// The machine's voice — not translated
	'cmd.whoami': 'whoami',
	'cmd.products': 'ls ./products',
	'cmd.about': 'cat about.md',
	'cmd.summary': 'head -3 resume.md',
	'cmd.experience': 'git log --author=dodo',
	'cmd.education': 'cat education.md',
	'cmd.certs': 'ls ./certificates',
	'cmd.stack': 'cat stack.json',
	'cmd.projects': 'ls ./projects',
	'cmd.uses': 'cat .config',
	'cmd.now': 'cat now.md',
	'cmd.support': 'cat support.md',
	'cmd.detail': 'cat README.md',
	'cmd.next': 'cd ..',
	'cmd.notFound': 'cat 404.md',

	// Home
	'home.lead':
		'ผมชื่อโดโด้ เป็น Software Engineer อยู่ขอนแก่น ทำระบบหลังบ้านเป็นหลัก แล้วก็ปั้นเว็บเล็ก ๆ ของตัวเองไว้ใช้จริงอีกหลายตัว — หน้านี้รวมเรซูเม่กับทุกอย่างที่ผมทำไว้ที่เดียว',
	'home.name': 'จักรกฤษณ์ ฝ่ายจำปา (โดโด้)',
	'home.role': 'Software Engineer · Woxa Group · ขอนแก่น',
	'home.pitch': 'ทำระบบหลังบ้านให้ไม่ล่ม และทำเว็บให้คนใช้แล้วไม่ต้องคิดเยอะ',
	'home.ctaResume': 'ดูเรซูเม่',
	'home.ctaProducts': 'ดูงานที่ทำ',
	'home.productsLead': 'ทุกตัวเปิดใช้จริงอยู่ กดเข้าไปลองได้เลย ไม่ต้องสมัครอะไร',

	// Shared "where to next" band
	'next.title': 'ไปต่อที่ไหนดี',

	// About
	'about.title': 'เกี่ยวกับผม',
	'about.lead':
		'โดโด้ — Software Engineer จากขอนแก่น เล่าว่า dolity.me คืออะไร และทำไมถึงยังทำมันอยู่',
	'about.p1':
		'ผมชื่อจักรกฤษณ์ ฝ่ายจำปา เรียกโดโด้ก็ได้ครับ จบวิทยาการคอมพิวเตอร์จาก ม.มหาสารคาม ปี 2567 แล้วก็ทำงานเป็น Software Engineer ที่ Woxa Group มาตั้งแต่เมษายนปีนั้นเลย',
	'about.p2':
		'งานประจำผมอยู่ฝั่งหลังบ้านเป็นหลัก — API, ระบบจ่ายเงิน, งานที่ต้องรันเบื้องหลัง, ของที่พังไม่ได้ พอกลับบ้านผมก็ยังชอบเขียนโค้ดอยู่ดี เลยกลายเป็นว่ามีโปรเจกต์ของตัวเองงอกมาเรื่อย ๆ',
	'about.p3':
		'dolity.me คือที่ที่ผมเอาของพวกนั้นมารวมไว้ ทุกตัวรันอยู่จริงบนโดเมนย่อยของเว็บนี้ ผมดูแลมันเองทั้งหมด ตั้งแต่โค้ดยันเซิร์ฟ',
	'about.p4':
		'ทำไมยังทำอยู่ทั้งที่มีค่าเซิร์ฟทุกเดือน? ตอบตรง ๆ คือมันสนุก ได้ลองของใหม่ ได้พังเอง ได้แก้เอง แล้วเวลามีคนทักมาบอกว่าเอาไปใช้แล้วสะดวกดี วันนั้นก็คุ้มแล้ว',

	// Resume
	'resume.title': 'เรซูเม่',
	'resume.lead':
		'ประสบการณ์ทำงาน การศึกษา เกียรติบัตร และผลงานของจักรกฤษณ์ ฝ่ายจำปา — Software Engineer สาย backend และ full-stack',
	'resume.name': 'จักรกฤษณ์ ฝ่ายจำปา',
	'resume.headline': 'Software Engineer · Backend & Full-Stack',
	'resume.location': 'ขอนแก่น, ประเทศไทย',
	'resume.summary':
		'ผมทำ backend เป็นหลัก — REST API, ระบบจ่ายเงินและ KYC, งาน real-time และงานเบื้องหลังที่ต้องรันตรงเวลา และดูแลมันตอนขึ้น production ด้วย ส่วนฝั่งหน้าบ้านผมทำ dashboard ภายในด้วย Vue และปั้นเว็บของตัวเองด้วย Astro กับ Next.js',
	'resume.summaryExtra':
		'นอกเวลางานผมเอาโปรเจกต์ตัวเองไป self-host บน VPS และเครื่องที่บ้าน เลยได้แตะตั้งแต่เขียนโค้ดจนถึง deploy จริง',
	'resume.print': 'พิมพ์ / บันทึกเป็น PDF',
	'resume.printAria': 'พิมพ์เรซูเม่หน้านี้ หรือบันทึกเป็นไฟล์ PDF',
	'resume.linkedinCta': 'LinkedIn',
	'resume.linkedinAria': 'LinkedIn ของจักรกฤษณ์ ฝ่ายจำปา (เปิดในแท็บใหม่)',
	'resume.githubCta': 'GitHub',
	'resume.githubAria': 'GitHub ของจักรกฤษณ์ ฝ่ายจำปา (เปิดในแท็บใหม่)',
	'resume.emailCta': 'อีเมล',
	'resume.emailAria': 'ส่งอีเมลหาจักรกฤษณ์ ฝ่ายจำปา',
	'resume.photoAlt': 'รูปโปรไฟล์ จักรกฤษณ์ ฝ่ายจำปา',
	'resume.experience': 'ประสบการณ์ทำงาน',
	'resume.education': 'การศึกษา',
	'resume.certifications': 'เกียรติบัตร',
	'resume.projects': 'ผลงาน',
	'resume.stack': 'เครื่องมือที่ใช้ได้',
	'resume.verifyCredential': 'ตรวจสอบกับผู้ออก',
	'resume.credentialId': 'รหัส',
	'resume.projectsLead': 'รายละเอียดเต็มของแต่ละตัวอยู่ในหน้าผลงาน',

	// Products
	'products.title': 'ผลงาน',
	'products.lead':
		'ผลงานทั้งหมดของ Dolity — Yorbo (ย่อลิงก์), Hanbo (หารบิล), Phiboon Tour และตัวเว็บนี้เอง พร้อมรายละเอียดว่าแต่ละตัวทำอะไรและใช้อะไรสร้าง',
	'products.heading': 'ของที่เปิดใช้จริงแล้ว',
	'products.sectionLead': 'เรียงตามตัวที่ผมลงแรงกับมันมากที่สุดตอนนี้',
	'products.highlights': 'ทำอะไรได้บ้าง',
	'products.tech': 'สร้างด้วย',
	'products.openSite': 'เปิดเว็บ',
	'products.detail': 'อ่านรายละเอียด',
	'products.back': 'กลับไปหน้าผลงาน',

	// Uses
	'uses.title': 'ของที่ใช้',
	'uses.lead': 'เครื่องมือ ภาษา และบริการที่ผมใช้ทำงานจริงทุกวัน',
	'uses.heading': 'โต๊ะทำงานของผม',
	'uses.sectionLead':
		'ไม่ใช่ลิสต์ของที่อยากได้ อันนี้คือของที่เปิดใช้อยู่จริง ๆ ตอนนี้ ถ้าเปลี่ยนเมื่อไหร่จะมาแก้',
	'uses.stackHeading': 'ภาษาและเฟรมเวิร์ก',

	// Now
	'now.title': 'ตอนนี้ทำอะไรอยู่',
	'now.lead': 'สรุปสั้น ๆ ว่าช่วงนี้ผมกำลังโฟกัสอะไรอยู่',
	'now.heading': 'ช่วงนี้',
	'now.updated': 'อัปเดตล่าสุด',
	'now.stale': 'หน้านี้ไม่ได้อัปเดตมาสักพักแล้ว',

	// Support
	'support.title': 'สนับสนุน',
	'support.lead': 'อยากช่วยค่าเซิร์ฟ อยากส่งกำลังใจ หรือแค่อยากทัก — ช่องทางอยู่หน้านี้',
	'support.sectionLead':
		'เว็บกับเซิร์ฟมีค่าใช้จ่ายอยู่บ้าง แต่ไม่ต้องรู้สึกว่าต้องจ่ายนะครับ ทักมาคุยเฉย ๆ ผมก็ดีใจแล้ว',
	'support.bmc.title': 'Buy Me a Coffee',
	'support.bmc.desc': 'จ่ายผ่านบัตรได้เลย กดแล้วจะพาไปหน้าชำระเงินของเขา (ออกจาก dolity.me)',
	'support.bmc.cta': 'ไปที่ Buy Me a Coffee',
	'support.bmc.imgAlt': 'QR code สำหรับสนับสนุน dolity ผ่าน Buy Me a Coffee',
	'support.bmc.scan': 'หรือสแกน QR นี้',
	'support.email.title': 'อีเมล',
	'support.email.desc': 'อยากขอฟีเจอร์ เจอบั๊ก หรืออยากชวนคุยงาน ส่งมาได้เลย ผมอ่านทุกฉบับ',
	'support.email.cta': 'เขียนอีเมล',
	'support.email.subject': 'ทักจาก dolity.me',

	// 404
	'notfound.title': 'ไม่เจอหน้านี้',
	'notfound.heading': 'ไม่เจอหน้านี้',
	'notfound.lead': 'หน้าที่คุณเปิดไม่มีอยู่ หรือย้ายไปแล้ว ลองเริ่มใหม่จากลิงก์ข้างล่างนี้',

	// Footer
	'footer.pages': 'หน้าในเว็บ',
	'footer.products': 'ผลงาน',
	'footer.elsewhere': 'ที่อื่น',
	'footer.builtWith': 'สร้างด้วย Astro · โฮสต์บน Cloudflare',
	'footer.external': 'เปิดในแท็บใหม่',
} as const;

const en: Record<keyof typeof th, string> = {
	'site.name': 'Dolity',
	'site.tagline': 'Web things I build, and then actually use.',

	'nav.home': 'Home',
	'nav.about': 'About',
	'nav.resume': 'Resume',
	'nav.products': 'Work',
	'nav.uses': 'Uses',
	'nav.now': 'Now',
	'nav.support': 'Support',
	'nav.close': 'Close',
	'nav.langSwitch': 'ไทย',
	'nav.langSwitchAria': 'Read this page in Thai',
	'nav.skip': 'Skip to content',

	'theme.toggle': 'Switch between light and dark',

	'palette.open': 'Search and jump to a page',
	'palette.title': 'Go to',
	'palette.placeholder': 'Type a page or project name…',
	'palette.pages': 'Pages',
	'palette.products': 'Work',
	'palette.empty': 'Nothing matched. Try a shorter word.',
	'palette.hint': '↑↓ move · Enter open · Esc close',

	'consent.text':
		'This site uses cookies for anonymous visit statistics. No ads, no data selling.',
	'consent.accept': 'Accept',
	'consent.reject': 'Decline',
	'consent.aria': 'Cookie consent choices',

	'cmd.whoami': 'whoami',
	'cmd.products': 'ls ./products',
	'cmd.about': 'cat about.md',
	'cmd.summary': 'head -3 resume.md',
	'cmd.experience': 'git log --author=dodo',
	'cmd.education': 'cat education.md',
	'cmd.certs': 'ls ./certificates',
	'cmd.stack': 'cat stack.json',
	'cmd.projects': 'ls ./projects',
	'cmd.uses': 'cat .config',
	'cmd.now': 'cat now.md',
	'cmd.support': 'cat support.md',
	'cmd.detail': 'cat README.md',
	'cmd.next': 'cd ..',
	'cmd.notFound': 'cat 404.md',

	'home.lead':
		"I'm Dodo, a software engineer in Khon Kaen. I work on backends by day and build small web tools the rest of the time. This site is my resume plus everything I've made, in one place.",
	'home.name': 'Jakkrit Faijampa (Dodo)',
	'home.role': 'Software Engineer · Woxa Group · Khon Kaen',
	'home.pitch': 'I build backends that stay up, and interfaces that need no explaining.',
	'home.ctaResume': 'Read the resume',
	'home.ctaProducts': 'See the work',
	'home.productsLead': 'All of these are live right now. Click in and try them — no sign-up.',

	'next.title': 'Where to next',

	'about.title': 'About',
	'about.lead':
		'Dodo — a software engineer in Khon Kaen — on what dolity.me is and why it keeps going.',
	'about.p1':
		"I'm Jakkrit Faijampa; Dodo is easier. I finished a computer science degree at Mahasarakham University in 2024 and started as a software engineer at Woxa Group that April.",
	'about.p2':
		"My day job is mostly backend — APIs, payment flows, background jobs, the parts that are not allowed to fall over. I still want to write code when I get home, so side projects keep appearing.",
	'about.p3':
		'dolity.me is where I keep them. Each one runs for real on a subdomain of this site, and I look after all of it myself — code, servers, the lot.',
	'about.p4':
		"Why keep paying for servers to run them? Because it's fun. I get to try things, break them, and fix them. And when someone tells me they actually used one, that pays for the month.",

	'resume.title': 'Resume',
	'resume.lead':
		'Experience, education, certifications, and projects for Jakkrit Faijampa — a backend-leaning full-stack software engineer.',
	'resume.name': 'Jakkrit Faijampa',
	'resume.headline': 'Software Engineer · Backend & Full-Stack',
	'resume.location': 'Khon Kaen, Thailand',
	'resume.summary':
		'I work on backends: REST APIs, payment and KYC integrations, real-time features, and scheduled jobs that have to run on time — and I look after them in production. On the front end I build internal dashboards in Vue and my own sites in Astro and Next.js.',
	'resume.summaryExtra':
		'Outside work I self-host my own projects on a VPS and a machine at home, so I own everything from the first commit to the deploy.',
	'resume.print': 'Print / save as PDF',
	'resume.printAria': 'Print this resume or save it as a PDF',
	'resume.linkedinCta': 'LinkedIn',
	'resume.linkedinAria': "Jakkrit Faijampa's LinkedIn profile (opens in a new tab)",
	'resume.githubCta': 'GitHub',
	'resume.githubAria': "Jakkrit Faijampa's GitHub profile (opens in a new tab)",
	'resume.emailCta': 'Email',
	'resume.emailAria': 'Email Jakkrit Faijampa',
	'resume.photoAlt': 'Profile photo of Jakkrit Faijampa',
	'resume.experience': 'Experience',
	'resume.education': 'Education',
	'resume.certifications': 'Certifications',
	'resume.projects': 'Projects',
	'resume.stack': 'What I work with',
	'resume.verifyCredential': 'Verify with issuer',
	'resume.credentialId': 'ID',
	'resume.projectsLead': 'The full write-up for each one lives on the work page.',

	'products.title': 'Work',
	'products.lead':
		'Everything Dolity runs — Yorbo (short links), Hanbo (bill splitting), Phiboon Tour, and this site — with what each one does and what it is built from.',
	'products.heading': 'Live and in use',
	'products.sectionLead': 'Ordered by how much of my attention each one has right now.',
	'products.highlights': 'What it does',
	'products.tech': 'Built with',
	'products.openSite': 'Open site',
	'products.detail': 'Read more',
	'products.back': 'Back to work',

	'uses.title': 'Uses',
	'uses.lead': 'The tools, languages, and services I actually work in every day.',
	'uses.heading': 'My desk',
	'uses.sectionLead':
		"Not a wishlist. This is what is open on my machine right now, and I'll edit it when that changes.",
	'uses.stackHeading': 'Languages and frameworks',

	'now.title': 'What I am doing now',
	'now.lead': 'A short note on what I am focused on at the moment.',
	'now.heading': 'Right now',
	'now.updated': 'Last updated',
	'now.stale': 'This page has not been updated in a while.',

	'support.title': 'Support',
	'support.lead':
		'Help with the server bill, send a bit of encouragement, or just say hi — it all starts here.',
	'support.sectionLead':
		"The domains and servers do cost something, but please don't feel you have to chip in. A message on its own makes my day.",
	'support.bmc.title': 'Buy Me a Coffee',
	'support.bmc.desc': "Pay by card. The button takes you to their checkout, away from dolity.me.",
	'support.bmc.cta': 'Open Buy Me a Coffee',
	'support.bmc.imgAlt': 'QR code to support dolity through Buy Me a Coffee',
	'support.bmc.scan': 'Or scan this',
	'support.email.title': 'Email',
	'support.email.desc':
		'Feature requests, bugs you hit, or work you want to talk about — send it over. I read all of it.',
	'support.email.cta': 'Write an email',
	'support.email.subject': 'Hello from dolity.me',

	'notfound.title': 'Page not found',
	'notfound.heading': 'Page not found',
	'notfound.lead': 'The page you opened does not exist, or it moved. Pick up again from one of these.',

	'footer.pages': 'Pages',
	'footer.products': 'Work',
	'footer.elsewhere': 'Elsewhere',
	'footer.builtWith': 'Built with Astro · hosted on Cloudflare',
	'footer.external': 'opens in a new tab',
};

export const ui = { th, en };

export type LocaleCode = keyof typeof ui;

export type UiKey = keyof typeof th;

export function t(locale: string, key: UiKey): string {
	const l: LocaleCode = locale === 'en' ? 'en' : 'th';
	return ui[l][key] ?? key;
}
