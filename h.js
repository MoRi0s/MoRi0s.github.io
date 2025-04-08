// メニューを開閉する処理
document.addEventListener("DOMContentLoaded", function () {
    const hamburger = document.getElementById("hamburger-menu");
    const overlay = document.getElementById("overlay-menu");

    // ハンバーガークリックでメニュー表示
    hamburger.addEventListener("click", () => {
        overlay.classList.add("active");
    });

    // メニューの外側クリックで非表示に
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
            overlay.classList.remove("active");
        }
    });
});
