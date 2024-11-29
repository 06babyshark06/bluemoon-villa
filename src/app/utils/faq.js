export const faq = [
  {
    id: 1,
    header: "Tài khoản, bảo mật",
    questions: [
      {
        id: 2,
        question: "Cách để tạo tài khoản cho một thành viên mới?",
        answer: `Đầu tiên vào Tạo tài khoản mới -> Nhập email và mật khẩu -> Bấn tiếp tục.
Hãy nhớ đăng nhập vào tài khoản mới và nhập thông tin cá nhân cần thiết.
`,
      },
      {
        id: 3,
        question: "Cách thay đổi thông tin cá nhân cho tài khoản?",
        answer: `Ấn vào khung thông tin ở cột trái trên cùng -> Nhập các thông tin theo yêu cầu -> Lưu
Nếu bạn muốn đổi mật khẩu:
Ấn vào nút đổi mật khẩu -> nhập mật khẩu cũ và mật khẩu mới -> Xác nhận
`,
      },
      {
        id: 4,
        question: "Các thông tin trên trình duyệt có được bảo mật không?",
        answer:
          "Các mật khẩu của bạn đã được qua giai đoạn kiểm duyệt, mã hóa, giảm nguy cơ bị hack. Đồng thời, tài khoản trình duyệt chỉ có thể được lập thêm bằng cách sử dụng tài khoản quản lý khác đăng ký hoặc nhờ nhà phát triển cấp tài khoản, giảm nguy cơ thành viên ngoài lề tự động đăng ký tài khoản và truy cập thông tin.",
      },
      {
        id: 5,
        question: "Tôi bị quên mật khẩu, tôi phải làm gì?",
        answer:
          "Các mật khẩu của bạn đã được qua giai đoạn kiểm duyệt, mã hóa, giảm nguy cơ bị hack. Đồng thời, tài khoản trình duyệt chỉ có thể được lập thêm bằng cách sử dụng tài khoản quản lý khác đăng ký hoặc nhờ nhà phát triển cấp tài khoản, giảm nguy cơ thành viên ngoài lề tự động đăng ký tài khoản và truy cập thông tin.",
      },
    ],
  },
  {
    id: 6,
    header: "Giao dịch, khoản thu",
    questions: [
      {
        id: 7,
        question: "Cách để thêm một khoản thu mới?",
        answer: `Vào Khoản thu -> Thêm mới:
Từ đây bạn có thể chọn 4 loại khoản thu: Tiền điện, tiền nước, tiền từ thiện, tiền wifi. Lưu ý: Tiền điện và tiền nước bạn cần nhập thêm lượng tiêu thụ (kWh, m3).
Chọn loại khoản thu hợp lý và nhập các thông tin cần thiết -> Xác nhận.
`,
      },
      {
        id: 8,
        question:
          "Các tạo khoản thu hàng tháng cần áp dụng cho toàn bộ các hộ gia đình?",
        answer: `Vào Khoản thu -> Thêm khoản thu hàng tháng
Từ đây bạn có thể tích mở các loại khoản thu: Phí dịch vụ, phí quản lý, phí xe máy, phí ô tô
Với mỗi loại bạn cần nhập số tiền thu trên một đơn vị, với:
Phí dịch vụ, phí quản lý cần nhập số tiền thu trên 1 m2 diện tích căn hộ
Phí xe máy, phí ô tô cần nhập số tiền trên 1 xe.
Và ấn xác nhận. Hệ thống xe liệt kê toàn bộ khoản thu của toàn bộ hộ gia đình trên giao diện của bạn
`,
      },
      {
        id: 9,
        question:
          "Khi một khoản thu đã được thanh toán, tôi xác nhận như thế nào?",
        answer: `Bạn có thể dùng thanh tìm kiếm theo tên của khoản thu đó.
Khi tìm thấy khoản thu cần xác nhận, bấn Xác nhận thanh toán -> nhập lại số tiền thu từ khoản thu đó -> Xác nhận. 
Khoan thu được xác nhập thanh toán sẽ được liệt kê ở khu Thanh toán và đồng thời cho vào Thông kê
`,
      },
      {
        id: 10,
        question: "Thông kê hàng tháng có thể xuất ra thành dạng nào?",
        answer:
          "Vào phiên bản hiện tại, bạn có thể thông kê biểu đồ ra dạng ảnh (png), dạng csv, dạng svg. Bạn có thể download các dạng đó của biểu đồ bằng các ấn nút 3 gạch ngang trên góc phải trên của biểu đồ trong khu Thông kê.",
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
        answer: `Vào danh sách hộ gia đình -> bấm Thêm hộ -> nhập các thông tin cần thiết -> Xác nhận
Hộ vừa được thêm sẽ lập tức hiện lên ở đầu trang các hộ gia đình. 
Thông tin của chủ hộ cũng sẽ ngay lập tức được thêm vào Danh sánh thành viên.
`,
      },
      {
        id: 13,
        question:
          "Tôi nên xử lý thông tin hộ gia đình vừa chuyển đi như thế nào?",
        answer:
          "Bạn có thể vào thanh tìm kiếm theo số nhà -> tìm được số nhà vừa chuyển thì bấn vào Chỉnh sửa ở bên phải -> Bấn Xác nhận chuyển đi.",
      },
      {
        id: 14,
        question:
          "Tại sao tôi không thể xác nhận chuyển đi/xóa chủ hộ trong thành viên?",
        answer: `Chủ hộ gắn liền với các thông tin liên quan đến hộ gia đình, trong đó có các khoản thu. Trước khi chủ hộ có thể xác nhận chuyển đi/xóa, các khoản thu còn tồn tại của hộ gia đình đó cần được xác nhận thanh toán.
Và sau khi xác nhận toàn bộ khoản thu đã thanh toán, bạn cần vào Danh sánh hộ gia đình -> tìm hộ có tên chủ hộ cần xác nhận chuyển đi/xóa, và xác nhận chuyển đi/xóa hộ gia đình đó. Sau đấy, thông tin chủ hộ sẽ được thay đổi. 
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
          "Nếu các câu hỏi trên không giải quyết được vấn đề của bạn, bạn vui lòng liên hệ trực tiếp với bộ phận hỗ trợ của chúng tôi. Bạn có thể xem thông tin liên hệ ở phần Liên Hệ trên góc trên trình duyệt.",
      },
    ],
  },
];
