const vocabularyList = ["Python", "Scratch", "Photoshop"];
let currentIndex = 0;
let showCursor = true; // Biến trạng thái để kiểm soát việc hiển thị dấu "_"

function typeWriter() {
    const typingElement = document.getElementById("typing-text");
    const currentWord = vocabularyList[currentIndex];
    let wordIndex = 0;
    const typingInterval = setInterval(() => {
        
        if (showCursor) {
            typingElement.textContent += currentWord[wordIndex];
            typingElement.textContent += "_"; // Thêm dấu "_" sau từ được viết
            showCursor = false; // Đặt biến trạng thái để hiển thị dấu "_" thành false
        } else {
            typingElement.textContent = typingElement.textContent.slice(0, -1); // Xóa dấu "_" đi
            typingElement.textContent += currentWord[wordIndex];
            showCursor = true; // Đặt biến trạng thái để hiển thị dấu "_" thành true
        }
        wordIndex++;
        if (wordIndex === currentWord.length) {
            clearInterval(typingInterval); // Dừng việc gõ chữ khi đạt tới cuối từ
            setTimeout(() => {
                eraseWord();
            }, 2000); // Đợi 1 giây trước khi xóa từ
        }
    }, 200); // Tốc độ gõ chữ là 100ms
    

    function eraseWord() {
        const erasingInterval = setInterval(() => {
            if (showCursor) {
                typingElement.textContent = typingElement.textContent.slice(0, -1) + "_"; // Thêm dấu "_" sau từ được viết
                showCursor = false; // Đặt biến trạng thái để hiển thị dấu "_" thành false
            } else {
                typingElement.textContent = typingElement.textContent.slice(0, -1); // Xóa dấu "_" đi
                showCursor = true; // Đặt biến trạng thái để hiển thị dấu "_" thành true
            }
            if (typingElement.textContent === "_") {
                clearInterval(erasingInterval); // Dừng việc xóa khi từ đã bị xóa sạch
                currentIndex = (currentIndex + 1) % vocabularyList.length; // Chuyển sang từ tiếp theo
                setTimeout(() => {
                    typeWriter(); // Gọi lại hàm typeWriter để viết từ tiếp theo
                }, 0); // Đợi 0.5 giây trước khi viết từ mới
            }
        }, 100); // Tốc độ xóa chữ là 500ms
    }
}
document.addEventListener("DOMContentLoaded", function() {
    var promoteSection = document.querySelector(".promote-section");
    var square = document.querySelector(".square");
    var circle = document.querySelector(".circle");

    var sectionRect = promoteSection.getBoundingClientRect();

    window.addEventListener("scroll", function() {
        var squareRect = square.getBoundingClientRect();
        var circleRect = circle.getBoundingClientRect();

        // Kiểm tra xem phần tử vuông đi ra khỏi phạm vi promote section hay không
        if (squareRect.right < sectionRect.left || squareRect.left > sectionRect.right || squareRect.bottom < sectionRect.top || squareRect.top > sectionRect.bottom) {
            square.style.visibility = "hidden";
        } else {
            square.style.visibility = "visible";
        }

        // Kiểm tra xem phần tử tròn đi ra khỏi phạm vi promote section hay không
        if (circleRect.right < sectionRect.left || circleRect.left > sectionRect.right || circleRect.bottom < sectionRect.top || circleRect.top > sectionRect.bottom) {
            circle.style.visibility = "hidden";
        } else {
            circle.style.visibility = "visible";
        }
    });
});


typeWriter();
