// ハンバーガーメニューのクリックイベント
document.getElementById("hamburger-menu").addEventListener("click", function() {
    document.getElementById("overlay-menu").style.display = "flex"; // メニューを表示
});

// オーバーレイメニューを閉じるためのクリックイベント
document.getElementById("overlay-menu").addEventListener("click", function(event) {
    if (event.target === this) {
        document.getElementById("overlay-menu").style.display = "none"; // メニューを非表示
    }
});
