// 자주 바뀌는 글자는 전부 여기에 모아둡니다. (v3 어드민이 이 값들을 대신하게 됩니다)
window.CONTENT = {
  orgName: "ㅇㅇㅇ", // ← 실제 기관명으로 바꾸세요
  title: "2027 ㅇㅇㅇ 글로벌 파트너십 사업 공모",
  period: "2026년 8월 1일 ~ 9월 30일",
  intro:
    "세계 각국의 어려운 이웃을 위한 비영리 사업을 선발하는 공모로, 1년 사업(단년도)과 3년 사업(다년도) 투트랙으로 선발합니다.",
  contactEmail: "contact@example.org", // ← 문의 메일로 바꾸세요
};

// {{key}} 로 표시된 자리에 위 값을 채워 넣습니다.
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-content]").forEach((el) => {
    el.textContent = window.CONTENT[el.dataset.content] ?? el.textContent;
  });
  document.title = document.title.replace("{{title}}", window.CONTENT.title);
});
