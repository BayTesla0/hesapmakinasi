document.addEventListener("DOMContentLoaded", function() {
    let anaEkran = document.getElementById("ana-ekran");
    let islem1 = document.getElementById("islem1");
    let islem2 = document.getElementById("islem2");
    let islem3 = document.getElementById("islem3");
    let sonIslemler = [islem1, islem2, islem3];

    let butonlar = document.querySelectorAll(".buton-kutucugu button");
    let islemGecmisi = [];
    let ekranDegeri = "";

    let temaDegistir = document.getElementById("temaDegistir");
    let gecmisTusu = document.getElementById("gecmisTusu");
    let sonIslemlerDiv = document.getElementById("sonIslemler");

    temaDegistir.addEventListener("change", function() {
        document.body.classList.toggle("lacivert-tema");
        document.body.classList.toggle("krem-tema");
    });

    gecmisTusu.addEventListener("click", function() {
        sonIslemlerDiv.style.display = sonIslemlerDiv.style.display === "none" ? "block" : "none";
    });

    butonlar.forEach(buton => {
        buton.addEventListener("click", function() {
            if (this.classList.contains("sayi") || this.classList.contains("nokta")) {
                if (anaEkran.textContent === "0" && !this.classList.contains("nokta")) {
                    anaEkran.textContent = this.textContent;
                } else {
                    anaEkran.textContent += this.textContent;
                }
            } else if (this.classList.contains("islem")) {
                // Önceki karakterin bir işlem olmadığından emin olun
                if (!/[\+\-\*\/%]$/.test(anaEkran.textContent.trim())) {
                    anaEkran.textContent += ` ${this.textContent} `;
                }
            } else if (this.classList.contains("temizle")) {
                anaEkran.textContent = "0";
            } else if (this.classList.contains("esittir")) {
                try {
                    let sonuc = eval(anaEkran.textContent);
                    islemGecmisi.push(anaEkran.textContent + " = " + sonuc);
                    if (islemGecmisi.length > 3) {
                        islemGecmisi.shift();
                    }
                    for (let i = 0; i < sonIslemler.length; i++) {
                        sonIslemler[i].textContent = islemGecmisi[i] || "";
                    }
                    anaEkran.textContent = sonuc;
                } catch (e) {
                    anaEkran.textContent = "Hata";
                }
            } else if (this.classList.contains("negate")) {
                // Negate işlevi
                let ekranIcerik = anaEkran.textContent;
                if (ekranIcerik !== "0" && !ekranIcerik.includes(" ")) {
                    anaEkran.textContent = parseFloat(ekranIcerik) * -1;
                }
            }
            
        });
    });
});
