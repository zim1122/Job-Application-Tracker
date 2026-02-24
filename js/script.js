// Initial Jobs Data
let jobs = [
    { id: 1, company: "Mobile First Corp", pos: "React Native Developer", loc: "Remote", type: "Full-time", sal: "$130,000 - $175,000", desc: "Build cross-platform mobile applications using React Native. Work on products used by millions of users worldwide.", status: "all" },
    { id: 2, company: "WebFlow Agency", pos: "Web Designer & Developer", loc: "Los Angeles, CA", type: "Part-time", sal: "$80,000 - $120,000", desc: "Create stunning web experiences for high-profile clients. Must have portfolio and experience with modern web design trends.", status: "all" },
    { id: 3, company: "DataViz Solutions", pos: "Data Visualization Specialist", loc: "Boston, MA", type: "Full-time", sal: "$110,000 - $150,000", desc: "Transform complex data into compelling visualizations. Required skills: D3.js, React, and strong statistical thinking.", status: "all" },
    { id: 4, company: "CloudFirst Inc", pos: "Back-end Developer", loc: "Seattle, WA", type: "Full-time", sal: "$140,000 - $190,000", desc: "Design and maintain scalable backend systems using Python and AWS. Work with modern DevOps practices and cloud infrastructure.", status: "all" },
    { id: 5, company: "Innovation Labs", pos: "UI/UX Engineer", loc: "Austin, TX", type: "Full-time", sal: "$115,000 - $155,000", desc: "Create beautiful and functional user interfaces for our suite of products. Strong design skills and frontend expertise required.", status: "all" },
    { id: 6, company: "MegaCorp Solutions", pos: "JavaScript Developer", loc: "New York, NY", type: "Full-time", sal: "$120,000 - $170,000", desc: "Build enterprise applications with JavaScript and modern frameworks. We offer competitive compensation and professional development.", status: "all" },
    { id: 7, company: "StartupXYZ", pos: "Full Stack Engineer", loc: "Remote", type: "Full-time", sal: "$150,000 - $195,000", desc: "Join our fast-growing startup and work on our core platform. Experience with Node.js and React required. Great benefits included.", status: "all" },
    { id: 8, company: "TechCorp Industries", pos: "Senior Frontend Developer", loc: "San Francisco, CA", type: "Full-time", sal: "$160,000 - $210,000", desc: "We are looking for an experienced Frontend Developer to build scalable web applications using React and TypeScript.", status: "all" }
];

let activeTab = 'all';

// Render function
function renderUI() {
    const container = document.getElementById('jobs-container');
    const emptyState = document.getElementById('empty-state');
    const filtered = activeTab === 'all' ? jobs : jobs.filter(j => j.status === activeTab);

    // Update Counts
    document.getElementById('total-count').innerText = jobs.length;
    document.getElementById('interview-count').innerText = jobs.filter(j => j.status === 'interview').length;
    document.getElementById('rejected-count').innerText = jobs.filter(j => j.status === 'rejected').length;
    document.getElementById('section-count').innerText = filtered.length;

    if (filtered.length === 0) {
        container.innerHTML = "";
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
    } else {
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');
        
        container.innerHTML = filtered.map(job => `
            <div class="job-card">
                <div onclick="removeJob(${job.id})" class="delete-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18m-2 0v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6m3 0V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
                </div>
                <h3 class="text-xl font-bold text-[#1e293b]">${job.company}</h3>
                <p class="text-slate-400 font-medium mb-4">${job.pos}</p>
                <div class="flex gap-4 text-slate-400 text-sm mb-1">
                    <span>${job.loc}</span> • <span>${job.type}</span> • <span>${job.sal}</span>
                </div>
                <div class="badge-status uppercase">
                    ${job.status === 'all' ? 'NOT APPLIED' : job.status}
                </div>
                <p class="text-slate-600 text-[15px] mb-6 leading-relaxed">${job.desc}</p>
                <div class="flex gap-4">
                    <button onclick="updateStatus(${job.id}, 'interview')" class="btn-custom btn-iv ${job.status === 'interview' ? 'active' : ''}">Interview</button>
                    <button onclick="updateStatus(${job.id}, 'rejected')" class="btn-custom btn-rj ${job.status === 'rejected' ? 'active' : ''}">Rejected</button>
                </div>
            </div>
        `).join('');
    }
}

// Function to handle status toggle
function updateStatus(id, newStatus) {
    const index = jobs.findIndex(j => j.id === id);
    if (index !== -1) {
        jobs[index].status = (jobs[index].status === newStatus) ? 'all' : newStatus;
        renderUI();
    }
}

// Function to delete a job
function removeJob(id) {
    jobs = jobs.filter(j => j.id !== id);
    renderUI();
}

// Function to handle tab changes
function changeTab(tab, el) {
    activeTab = tab;
    // Highlight active tab
    document.querySelectorAll('.custom-tab').forEach(btn => btn.classList.remove('active'));
    el.classList.add('active');
    renderUI();
}

// Initial render
renderUI();