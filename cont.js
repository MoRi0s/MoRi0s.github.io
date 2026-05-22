const form = document.getElementById("contact-form");
const button = document.querySelector(".send-button");

// 最初は押せない
button.disabled = true;

// CAPTCHA成功時
function enableSubmit() {

  button.disabled = false;
  button.textContent = "SEND MESSAGE";

}

form.addEventListener("submit", async (e) => {

  e.preventDefault();

  button.disabled = true;
  button.textContent = "SENDING...";

  const data = new FormData(form);

  try {

    const response = await fetch(form.action, {
      method: "POST",
      body: data,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {

      button.textContent = "SUCCESS";

      setTimeout(() => {
        window.location.href = "/thanks.html";
      }, 800);

    } else {

      button.disabled = false;
      button.textContent = "SEND MESSAGE";

      alert("送信失敗");

    }

  } catch(err) {

    console.error(err);

    button.disabled = false;
    button.textContent = "SEND MESSAGE";

    alert("通信エラー");

  }

});