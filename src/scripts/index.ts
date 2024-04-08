import "../styles/styles.scss";

import "../styles/components/headerAndFooter.scss";
import "../styles/components/hero.scss";
import "../styles/components/about.scss";
import "../styles/components/tasksAndProject.scss";
import "../styles/components/feedback.scss";

const form = document.getElementById("feedback") as HTMLFormElement | null;
const TOKEN = import.meta.env.VITE_PUBLIC_TOKEN;
const CHAT_ID = import.meta.env.VITE_PUBLIC_CHAT_ID;
const URI_API = `https://api.telegram.org/bot${TOKEN}/sendMessage`;

form?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const messageTg: Record<string, string> = {};

  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
    const [key, value] = pair;
    if (typeof value === "string") {
      messageTg[key] = value;
    }
  }
  if (!messageTg) {
    return;
  }

  const sendMessage = await fetch(`${URI_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      parse_mode: "html",
      text: messageTg,
    }),
  });
  if (!sendMessage.ok) {
    return console.log("error");
  }
});
