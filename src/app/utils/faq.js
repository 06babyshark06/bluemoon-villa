/*
Special charater:
\u25CF: Lagre Bullet
\u2192: Right arrow
\u2013: Longer "-"
\t: Tab space
*/
export const faq = [
  {
    id: 1,
    header: "Tài khoản, bảo mật",
    questions: [
      {
        id: 2,
        question: "Cách để tạo tài khoản cho một thành viên mới?",
        answer: `\u25CF\t Đầu tiên vào Tạo tài khoản mới \u2192 Nhập email và mật khẩu \u2192 Bấn tiếp tục.
\u25CF\t Hãy nhớ đăng nhập vào tài khoản mới và nhập thông tin cá nhân cần thiết.
`,
      },
      {
        id: 3,
        question: "Cách thay đổi thông tin cá nhân cho tài khoản?",
        answer: `\u25CF\t Ấn vào khung thông tin ở cột trái trên cùng \u2192 Nhập các thông tin theo yêu cầu \u2192 Lưu.
Nếu bạn muốn đổi mật khẩu:
\u25CF\t Ấn vào nút đổi mật khẩu \u2192 nhập mật khẩu cũ và mật khẩu mới \u2192 Xác nhận
`,
      },
      {
        id: 4,
        question: "Các thông tin trên trình duyệt có được bảo mật không?",
        answer:
        `\u25CF\t Các mật khẩu của bạn đã được qua giai đoạn kiểm duyệt, mã hóa, giảm nguy cơ bị hack. 
\u25CF\t Đồng thời, tài khoản trình duyệt chỉ có thể được lập thêm bằng cách sử dụng tài khoản quản lý khác đăng ký hoặc nhờ nhà phát triển cấp tài khoản, giảm nguy cơ thành viên ngoài lề tự động đăng ký tài khoản và truy cập thông tin.
`,
      },
      {
        id: 5,
        question: "Tôi bị quên mật khẩu, tôi phải làm gì?",
        answer:
`\u25CF\t Nếu tài khoản của bạn được thêm bởi công ty, hãy liên hệ với chủ quản lý để được tạo mới tài khoản khác.
\u25CF\t Nếu tài khoản bị mất là tài khoản của chủ quản lý, bạn cần liên hệ với đường dây hỗ trợ của chúng tôi để xác nhận tài khoản và được cấp mật khẩu mới, hoặc cấp một tài khoản hoàn toàn mới nếu bạn không nhớ thông tin tên tài khoản.
`,      },
    ],
  },
  {
    id: 6,
    header: "Giao dịch, khoản thu",
    questions: [
      {
        id: 7,
        question: "Cách để thêm một khoản thu mới?",
        answer: `\u25CF\t Vào Khoản thu \u2192 Thêm mới:
\u25CF\t Từ đây bạn có thể chọn 4 loại khoản thu: 
\t\u2013\t Tiền điện 
\t\u2013\t Tiền nước
\t\u2013\t Tiền từ thiện
\t\u2013\t Tiền wifi 
Lưu ý: Tiền điện và tiền nước bạn cần nhập thêm lượng tiêu thụ (kWh, m3).
\u25CF\t Chọn loại khoản thu hợp lý và nhập các thông tin cần thiết \u2192 Xác nhận.
`,
      },
      {
        id: 8,
        question:
          "Các tạo khoản thu hàng tháng cần áp dụng cho toàn bộ các hộ gia đình?",
        answer: `\u25CF\t Vào Khoản thu \u2192 Thêm khoản thu hàng tháng
\u25CF\t Từ đây bạn có thể tích mở các loại khoản thu: Phí dịch vụ, phí quản lý, phí xe máy, phí ô tô
\u25CF\t Với mỗi loại bạn cần nhập số tiền thu trên một đơn vị, với:
\t\u2013\t Phí dịch vụ, phí quản lý cần nhập số tiền thu trên 1 m2 diện tích căn hộ
\t\u2013\t Phí xe máy, phí ô tô cần nhập số tiền trên 1 xe.
\u25CF\t Và ấn xác nhận. Hệ thống xe liệt kê toàn bộ khoản thu của toàn bộ hộ gia đình trên giao diện của bạn
`,
      },
      {
        id: 9,
        question:
          "Khi một khoản thu đã được thanh toán, tôi xác nhận như thế nào?",
        answer: `\u25CF\t Bạn có thể dùng thanh tìm kiếm theo tên của khoản thu đó.
\u25CF\t Khi tìm thấy khoản thu cần xác nhận, bấn Xác nhận thanh toán \u2192 nhập lại số tiền thu từ khoản thu đó \u2192 Xác nhận. 
\u25CF\t Khoan thu được xác nhập thanh toán sẽ được liệt kê ở khu Thanh toán và đồng thời cho vào Thông kê
`,
      },
      {
        id: 10,
        question: "Thông kê hàng tháng có thể xuất ra thành dạng nào?",
        answer:
          `\u25CF\t Bạn có thể in thông kê biểu đồ ra dạng ảnh (png), dạng csv, dạng svg. 
\u25CF\t Bạn có thể download các dạng đó của biểu đồ bằng các ấn nút 3 gạch ngang trên góc phải trên của biểu đồ trong khu Thông kê.
\u25CF\t Hoặc bạn có thể bấm nút Báo cáo chi tiết để tài về bản excel các dữ liệu được thông kê trên biểu đồ
          `,
      },
    ],
  },
  {
    id: 11,
    header: "Hộ gia đình, thành viên",
    questions: [
      {
        id: 12,
        question: "Thêm thông tin một hộ gia đình mới chuyển đến như thế nào?",
        answer: `\u25CF\t Vào danh sách hộ gia đình \u2192 bấm Thêm hộ \u2192 nhập các thông tin cần thiết \u2192 Xác nhận
\u25CF\t Hộ vừa được thêm sẽ lập tức hiện lên ở đầu trang các hộ gia đình. 
\u25CF\t Thông tin của chủ hộ cũng sẽ ngay lập tức được thêm vào Danh sánh thành viên.
`,
      },
      {
        id: 13,
        question:
          "Tôi nên xử lý thông tin hộ gia đình vừa chuyển đi như thế nào?",
        answer:
          "\u25CF\t Bạn có thể vào thanh tìm kiếm theo số nhà \u2192 tìm được số nhà vừa chuyển thì bấn vào Chỉnh sửa ở bên phải \u2192 bấn Xác nhận chuyển đi.",
      },
      {
        id: 14,
        question:
          "Tại sao tôi không thể xác nhận chuyển đi/xóa chủ hộ trong thành viên?",
        answer: `\u25CF\t Chủ hộ gắn liền với các thông tin liên quan đến hộ gia đình, trong đó có các khoản thu. Trước khi chủ hộ có thể xác nhận chuyển đi/xóa, các khoản thu còn tồn tại của hộ gia đình đó cần được xác nhận thanh toán.
\u25CF\t Và sau khi xác nhận toàn bộ khoản thu đã thanh toán, bạn cần vào Danh sánh hộ gia đình \u2192 tìm hộ có tên chủ hộ cần xác nhận chuyển đi/xóa, và xác nhận chuyển đi/xóa hộ gia đình đó. 
Sau đấy, thông tin chủ hộ sẽ được thay đổi. 
`,
      },
    ],
  },
  {
    id: 15,
    header: "Hỗ trợ thêm",
    questions: [
      {
        id: 16,
        question: "Làm thế nào khi gặp vấn đề nằm ngoài các câu hỏi trên?",
        answer:
          "\u25CF\t Nếu các câu hỏi trên không giải quyết được vấn đề của bạn, bạn vui lòng liên hệ trực tiếp với bộ phận hỗ trợ của chúng tôi. Bạn có thể xem thông tin liên hệ ở phần Liên Hệ trên góc trên trình duyệt.",
      },
    ],
  },
];