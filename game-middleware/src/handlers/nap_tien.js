/**
 * Handler xử lý nhận dữ liệu từ app Android
 * Cấu trúc JSON nhận được: { "package": "...", "content": "..." }
 */
module.exports = (req, res) => {
    // 1. Lấy dữ liệu từ body của request
    const { package, content } = req.body;

    // 2. Ghi log ra Terminal để debug
    console.log("--- NHẬN DỮ LIỆU TỪ APP ANDROID ---");
    console.log("App gửi tới:", package);
    console.log("Nội dung tin nhắn:", content);
    console.log("Thời gian:", new Date().toLocaleString());
    console.log("------------------------------------");

    // 3. Phản hồi lại cho App Android (để app hiện log thành công)
    res.status(200).json({
        success: true,
        message: "Server đã nhận được dữ liệu"
    });
};