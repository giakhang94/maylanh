Link demo dự án:  https://maylanh.onrender.com
link login vào admin dashboard: https://maylanh.onrender.com/login
tài khoản demo:
email: ngk.khang94@gmail.com
password: 123456abc

Web đặt hẹn sửa máy lạnh sử dụng NodeJS, Express, Mongodb, ReactJS/Typescript và các package liên quan
các package liên quan: tailwindcss, react-router-dom, context API, jwt, bcrypt, mongooose, cors, dotenv...
Chức năng chính
1. Admin
- Admin đăng nhập, thêm/xóa/sửa user (nhân viên), thêm xóa sửa sản phẩm dịch vụ
- phân quyền Chỉ admin mới được xóa và sửa dịch vụ, nhân viên không được phép
- Ở dashboard của admin, có thể xem số đơn order mới chưa được xem. Các orders hiển thị ở dạng grid system,
  mỗi order là 1 card gồm tên dịch vụ, tên khách hàng, số điện thoại liên hệ, địa chỉ và ghi chú thêm nếu có
  Các order có thể được đánh dấu đã xem, đã hủy, đã hoàn tất
2. Client
- Khách hàng có thể xem danh sách các dịch vụ hiện có và tiến hành đặt hàng
- khi đặt hàng có thể tùy chọn tạo tài khoản hoặc không tạo
  + nếu tạo tài khoản: Sẽ yêu cầu nhập thêm mật khẩu, tài khoản mới sẽ dựa trên số điện thoại đặt hẹn và mật khẩu
  + Sau khi tạo tài khoản khách hàng có thể đăng nhập để huy đơn, cũng như xem lại lịch sử đặt hẹn của họ
- Nếu không tạo tài khoản, thì không thể hủy đơn.
- Nếu đã có tài khoản mà chưa đăng nhập thì dựa vào số điện thoại đặt hẹn.
  + nếu sdt đặt hẹn là 1 tài khoản đã tạo thì sẽ ghi vào lịch sử đặt hẹn của tài khoản đó
