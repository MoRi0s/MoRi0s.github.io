// ハンバーガーメニューをトグルする関数
document.getElementById('hamburger-menu').addEventListener('click', function() {
    const navMenu = document.getElementById('nav-menu');
    const hamburger = document.getElementById('hamburger-menu');
    
    // メニューの表示/非表示を切り替え
    navMenu.classList.toggle('active');
    
    // ハンバーガーの状態（閉じる/開く）をトグル
    hamburger.classList.toggle('open');
});
