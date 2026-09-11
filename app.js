// 내비 스크롤 효과
const nav = document.querySelector(".nav");
const onScroll = () => nav.classList.toggle("scrolled", scrollY > 24);
addEventListener("scroll", onScroll, { passive: true });
onScroll();

// 스크롤 등장 애니메이션
const io = new IntersectionObserver(
  (entries) => entries.forEach((e) => e.isIntersecting && (e.target.classList.add("in"), io.unobserve(e.target))),
  { threshold: 0.15 }
);
document.querySelectorAll(".fade-up").forEach((el) => io.observe(el));

// 제목 타이핑 — 글자마다 span 으로 감싸고 순번(--i)을 매긴다. 간격은 CSS 에서 50ms
document.querySelectorAll(".typing").forEach((el) => {
  let i = 0;
  const wrap = (node) => {
    if (node.nodeType === 3) {
      const frag = document.createDocumentFragment();
      for (const c of node.textContent) {
        const s = document.createElement("span");
        s.className = "ch";
        s.style.setProperty("--i", i++);
        s.textContent = c;
        frag.appendChild(s);
      }
      node.replaceWith(frag);
    } else [...node.childNodes].forEach(wrap);
  };
  wrap(el);
});

// 지원서 제출 (apply.html 에서만 동작)
const form = document.querySelector("#apply-form");
if (form) {
  const err = form.querySelector(".error");
  const budget = form.querySelector('[name="budget"]');
  const budgetHint = form.querySelector("#budget-hint");
  budget.addEventListener("input", () => {
    const n = Number(budget.value);
    budgetHint.textContent = n > 0 ? `${n.toLocaleString("ko-KR")}원` : "";
  });

  form.addEventListener("submit", async (ev) => {
    ev.preventDefault();
    err.textContent = "";
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.textContent = "제출 중…";

    const data = Object.fromEntries(new FormData(form));
    data.budget = Number(data.budget);

    try {
      if (window.SUPABASE_URL.includes("YOUR-PROJECT")) throw new Error("config.js 에 Supabase 연결 정보가 아직 없습니다.");
      const client = supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);
      const { error } = await client.from("applications").insert(data);
      if (error) throw error;
      sessionStorage.setItem("applied", JSON.stringify({ name: data.name, org_name: data.org_name, track: data.track }));
      location.href = "done.html";
    } catch (e) {
      err.textContent = "제출에 실패했습니다. 잠시 후 다시 시도해주세요. (" + e.message + ")";
      btn.disabled = false;
      btn.textContent = "지원서 제출하기";
    }
  });
}

// 완료 화면 요약 (done.html 에서만 동작)
const summary = document.querySelector("#summary");
if (summary) {
  try {
    const a = JSON.parse(sessionStorage.getItem("applied"));
    if (a) {
      summary.querySelector("[data-name]").textContent = a.name;
      summary.querySelector("[data-org]").textContent = a.org_name;
      summary.querySelector("[data-track]").textContent = a.track + " 사업";
    } else summary.hidden = true;
  } catch { summary.hidden = true; }
}
