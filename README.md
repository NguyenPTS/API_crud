## **1. `useQuery` là gì?**

`useQuery` là một hook của thư viện **TanStack Query (trước đây là React Query)**, giúp bạn **fetch, cache, đồng bộ hóa và cập nhật dữ liệu từ API** một cách dễ dàng và tối ưu trong React.
## **2. Chức năng chính của `useQuery`**

1. Tự động lấy dữ liệu:
useQuery giúp bạn tự động lấy dữ liệu từ API hoặc nguồn dữ liệu mà bạn chỉ định, đồng thời lưu trữ kết quả vào trạng thái quản lý bên trong React Query.

Thay vì tự mình gọi API trong useEffect, bạn có thể sử dụng useQuery để thực hiện việc đó, giúp mã của bạn ngắn gọn và dễ đọc hơn.

2. Cập nhật trạng thái khi có thay đổi:
React Query tự động cập nhật và lưu trữ dữ liệu trong bộ nhớ cache khi có thay đổi (ví dụ: dữ liệu mới từ server), giảm tải cho server khi thực hiện lại các yêu cầu giống nhau.

Nó cũng giúp giảm bớt việc làm mới dữ liệu khi trang web được làm mới hoặc khi người dùng quay lại sau một thời gian.

3. Quản lý trạng thái tải và lỗi:
useQuery cung cấp các trạng thái như isLoading, error, data để giúp bạn dễ dàng kiểm soát trạng thái của truy vấn.

Ví dụ: bạn có thể hiển thị "Đang tải..." khi isLoading là true, hoặc hiển thị thông báo lỗi nếu có lỗi trong khi lấy dữ liệu.

4. Cải thiện hiệu suất với bộ nhớ cache:
React Query sử dụng bộ nhớ cache để lưu trữ dữ liệu truy vấn. Điều này giúp giảm thời gian tải khi dữ liệu đã được truy vấn trước đó và tránh gọi lại API không cần thiết.

Dữ liệu trong bộ nhớ cache có thể được tái sử dụng nếu không có thay đổi hoặc nếu dữ liệu còn "tươi" (stale).

5. Tái truy vấn (refetch) dữ liệu:
Bạn có thể cấu hình refetchOnWindowFocus hoặc sử dụng refetch() để tự động hoặc thủ công làm mới dữ liệu khi người dùng quay lại ứng dụng hoặc khi có sự thay đổi.

Điều này rất hữu ích khi dữ liệu trên server có thể thay đổi và bạn cần luôn giữ cho UI được đồng bộ với dữ liệu mới nhất.

6. Xử lý lỗi và tự động retry:
React Query cho phép bạn dễ dàng cấu hình việc tự động thử lại các yêu cầu khi gặp lỗi, giúp bạn giảm thiểu các vấn đề mạng tạm thời.

Bạn có thể cấu hình số lần retry, thời gian chờ giữa các lần thử lại, v.v.

7. Tích hợp với các hàm mutation:
Mặc dù useQuery chủ yếu dùng để lấy dữ liệu, React Query cũng cung cấp các hooks khác như useMutation để giúp bạn thêm, sửa, hoặc xóa dữ liệu (giống như thực hiện các tác vụ POST, PUT, DELETE).

useMutation dễ dàng tích hợp với useQuery để làm mới dữ liệu sau khi thực hiện các thao tác thay đổi dữ liệu.

8. Quản lý pagination và infinite scroll:
React Query cung cấp hỗ trợ cho phân trang và cuộn vô hạn (infinite scroll), giúp bạn dễ dàng tích hợp các tính năng này mà không phải lo lắng quá nhiều về việc quản lý trạng thái pagination hoặc fetching thêm dữ liệu.
- ## **3. Có cách nào tốt hơn `useQuery` không?**

🔹 **Nếu dự án nhỏ:** Dùng `useEffect + useState` để fetch API đơn giản.

🔹 **Nếu dự án lớn:** Dùng `useQuery` hoặc `SWR` để caching và tối ưu API calls.

🔹 **Nếu cần quản lý toàn bộ state:** Dùng Redux Toolkit với `createAsyncThunk`.

✅ **Kết luận:** `useQuery` là cách tốt nhất để quản lý dữ liệu từ API nếu bạn không muốn viết quá nhiều logic phức tạp. 🚀
