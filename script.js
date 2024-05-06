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

// Lấy tất cả các phần tử ".course-section"
const courseSections = document.querySelectorAll('.course-section');
let count = 1;
courseSections.forEach((section, index) => {
    const zIndex = count; // Đặt z-index ngược với vị trí của phần tử
    
    // Thiết lập z-index cho phần tử ".course-section"
    section.style.zIndex = zIndex;
    
    // Lấy tiêu đề h2 trong mỗi phần tử ".course-section"
    const h2 = section.querySelector('h2');
    if (h2) {
        h2.style.zIndex = zIndex; // Đặt z-index cho tiêu đề h2
    }
    
    // Lấy đoạn văn bản p trong mỗi phần tử ".course-section"
    const p = section.querySelector('p');
    if (p) {
        p.style.zIndex = zIndex; // Đặt z-index cho đoạn văn bản p
    }
    
    // Gán sự kiện hover cho mỗi phần tử ".course-section"
    section.addEventListener('mouseenter', () => {
        // Thiết lập z-index cao nhất cho phần tử đang hover
        section.style.zIndex = courseSections.length + 1;
        
        // Phóng to hộp khi hover
        section.style.transform = 'scale(1.05)';
    });
    
    section.addEventListener('mouseleave', () => {
        // Thiết lập lại z-index và kích thước khi rời chuột ra khỏi phần tử
        section.style.zIndex = zIndex;
        section.style.transform = 'scale(1)';
    });
    count++;
});



typeWriter();
