


/**
 * ===========================================
 * SITE SEARCH FUNCTIONALITY
 * ===========================================
 * Handles live search functionality for the website
 * Searches through site content and displays results
 */

(function(){
	// Get search input and results panel elements
	const input = document.getElementById('site-search-input');
	const panel = document.getElementById('site-search-results');
	if(!input || !panel) return;

	// Search configuration variables
	let pages = [];
	let indexBuilt = false;
	const MAX_PAGES_TO_INDEX = 500; // guard for very large sites
	const MAX_CONTENT_CHARS = 150000; // limit per page fetch

	/**
	 * ===========================================
	 * UTILITY FUNCTIONS
	 * ===========================================
	 */

	// Convert HTML content to searchable text
	function htmlToText(html){
		const doc = new DOMParser().parseFromString(html, 'text/html');
		const title = (doc.querySelector('title')?.textContent || '').trim();
		const text = (doc.body?.innerText || '').replace(/\s+/g,' ').trim();
		return { title, text };
	}

	/**
	 * ===========================================
	 * INDEX BUILDING FUNCTION
	 * ===========================================
	 */
	
	// Build search index from site pages
	async function buildIndex(){
		if(indexBuilt) return;
		let list = [];
		try {
			const res = await fetch('search-index.json', { cache: 'no-store' });
			list = await res.json();
		} catch(e) {
			console.warn('search-index.json missing or invalid. Using fallback to index only current page.');
			list = [{ path: location.pathname.replace(/^\/+/, '') || 'index.html' }];
		}

		list = Array.isArray(list) ? list.slice(0, MAX_PAGES_TO_INDEX) : [];

		const tasks = list.map(async (entry) => {
			const path = entry.path;
			try {
				const res = await fetch(path, { cache: 'no-store' });
				if(!res.ok) throw new Error('HTTP '+res.status);
				let html = await res.text();
				if(html.length > MAX_CONTENT_CHARS) html = html.slice(0, MAX_CONTENT_CHARS);
				const { title, text } = htmlToText(html);
				return { path, title: entry.title || title || path, content: text.toLowerCase() };
			} catch(err) {
				return { path, title: entry.title || path, content: '' };
			}
		});

		pages = (await Promise.all(tasks)).filter(Boolean);
		indexBuilt = true;
	}

	function render(results){
		if(!results.length){ panel.innerHTML=''; panel.hidden = true; return; }
		panel.innerHTML = results.map(r => {
			const snippet = r.snippet ? r.snippet.replace(/</g,'&lt;').replace(/>/g,'&gt;') : '';
			return `<div class="item" data-path="${r.path}"><div class="title">${r.title}</div><div class="snippet">${snippet}</div></div>`;
		}).join('');
		panel.hidden = false;
	}

	function makeSnippet(content, q){
		const i = content.indexOf(q);
		if(i < 0) return '';
		const start = Math.max(0, i - 60);
		const end = Math.min(content.length, i + q.length + 60);
		return (content.slice(start, end)).replaceAll(q, `\u2068${q}\u2069`)
			.replace(/\u2068/g, '<b>').replace(/\u2069/g, '</b>');
	}

	async function onInput(){
		const q = (input.value || '').trim().toLowerCase();
		if(!q){ render([]); return; }
		await buildIndex();
		const results = [];
		for(const p of pages){
			if(p.title.toLowerCase().includes(q) || p.content.includes(q)){
				results.push({ path: p.path, title: p.title, snippet: makeSnippet(p.content, q) });
				if(results.length >= 20) break; // cap results
			}
		}
		render(results);
	}

	input.addEventListener('input', onInput);
	panel.addEventListener('click', (e)=>{
		const item = e.target.closest('.item');
		if(!item) return;
		location.href = item.dataset.path;
	});

	// Hide results when clicking outside
	document.addEventListener('click', (e)=>{
		if(!e.target.closest('#site-search')){ panel.hidden = true; }
	});
})();