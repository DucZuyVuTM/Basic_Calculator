document.addEventListener('DOMContentLoaded', () => {
    console.log("Hello");

    // Lấy nút del-btn
    const delBtn = document.getElementById("del-btn");
    window.delBtn = delBtn;
    if (!delBtn) {
        console.error("Element with id 'del-btn' not found.");
        return;
    }

    // Hàm điều khiển hiển thị/ẩn del-btn
    function ctrlDelBtn(cmd) {
        console.log("ctrlDelBtn called with cmd:", cmd);
        if (cmd === "ADD") {
            delBtn.style.display = "inline";
        } else if (cmd === "REMOVE") {
            delBtn.style.display = "none";
        }
    }

    // Kiểm tra trạng thái ban đầu của result khi trang tải
    const result = document.getElementById("result");
    if (result) {
        console.log("Result element exists on page load:", result);
        ctrlDelBtn("ADD");
    } else {
        console.log("No result element on page load.");
        ctrlDelBtn("REMOVE");
    }

    // Thêm sự kiện click cho del-btn
    delBtn.addEventListener("click", () => {
        const resultElement = document.getElementById("result");
        if (resultElement) {
            resultElement.classList.add("result-disabled");
            ctrlDelBtn("REMOVE");
        }
    });

    // Chọn phần tử cần theo dõi (cụ thể hơn: main-container)
    const targetNode = document.getElementById("main-container");
    if (!targetNode) {
        console.error("Element with id 'main-container' not found.");
        return;
    }

    // Cấu hình MutationObserver: theo dõi thêm/xóa phần tử
    const config = { 
        childList: true,  // Theo dõi thay đổi trong danh sách con (thêm/xóa phần tử)
        subtree: true     // Theo dõi tất cả các phần tử con bên trong targetNode
    };

    // Callback được gọi mỗi khi có thay đổi
    const callback = (mutationsList, observer) => {
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Kiểm tra phần tử được thêm
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.id === "result") {
                        console.log('Result element added:', node);
                        ctrlDelBtn("ADD");
                    }
                });

                // Kiểm tra phần tử bị xóa
                mutation.removedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE && node.id === "result") {
                        console.log('Result element removed:', node);
                        ctrlDelBtn("REMOVE");
                    }
                });
            }
        }
    };

    // Tạo MutationObserver
    const observer = new MutationObserver(callback);

    // Bắt đầu quan sát
    observer.observe(targetNode, config);
});