/*!
 * CreateComponent.js v1.1.1 (https://computing.vn/react/createComponent.js)
 * Author: Lê Minh Hiếu (mrhieuit@gmail.com) - Computing Academy (https://computing.edu.vn)
 * Created: 2025-01-01
 * License: MIT (https://opensource.org/licenses/MIT)
 */
import fs from 'fs'; // Import module fs để làm việc với hệ thống file
import path from 'path'; // Import module path để làm việc với đường dẫn file và thư mục
import { fileURLToPath } from 'url'; // Import hàm fileURLToPath để chuyển đổi URL thành đường dẫn file
import process from 'process'; // Import module process để làm việc với các tham số dòng lệnh và các thông tin về tiến trình hiện tại

// Xác định đường dẫn hiện tại của file
const __filename = fileURLToPath(import.meta.url); // Lấy ra tên file này
const __dirname = path.dirname(__filename); // Lấy ra thư mục chứa file này

// Lấy các tham số từ dòng lệnh
const args = process.argv.slice(2);
const componentPath = args[0]; // Đường dẫn và tên component

// Hàm chuyển đổi tham số thành boolean
const toBoolean = (value) => value === 'true' || value === '1';

// Đặt giá trị mặc định cho các tham số tùy chọn nếu không được cung cấp
const createIndex = toBoolean(args[1]) || false; // Tùy chọn có tạo file index.js hay không
const createCss = toBoolean(args[2]) || false; // Tùy chọn có tạo file css hay không
const useScss = toBoolean(args[3]) || false; // Tùy chọn có tạo file scss hay không
const useFullClassName = toBoolean(args[4]) || false; // Tùy chọn có tạo tên class đầy đủ hay không

// Kiểm tra xem đã nhập tên component chưa
if (!componentPath) {
    // Thông báo lỗi nếu chưa nhập tên component
    console.error("❌ Vui lòng nhập tên component! Ví dụ: npm run create Base/Ui/MyComponent true true true true");
    process.exit(1);
}

// Tách đường dẫn và tên component
const pathParts = componentPath.split('/');
const componentName = pathParts.pop(); // Lấy tên component
const componentDir = path.join(__dirname, "src/components", ...pathParts, componentName); // Đường dẫn đầy đủ của component

// Hàm kiểm tra tên component hợp lệ
const isValidComponentName = (name) => /^[A-Z][A-Za-z0-9]*$/.test(name);
if (!isValidComponentName(componentName)) {
    // Thông báo lỗi nếu tên component không hợp lệ
    console.error("❌ Tên component không hợp lệ! Tên component chỉ được phép chứa những chữ cái và số. Ký tự bắt đầu cần là chữ cái viết hoa. Sau đó có thể kết hợp với những chữ cái và số khác.");
    process.exit(1);
}

// Kiểm tra xem component đã tồn tại chưa
if (fs.existsSync(componentDir)) {
    // Thông báo lỗi nếu component đã tồn tại
    console.error(`❌ Component có tên ${componentName} đã tồn tại tại đường dẫn ${componentDir}. Vui lòng sử dụng tên khác!`);
    process.exit(1);
}

// Xác định phần mở rộng của file style
const styleExtension = useScss ? 'scss' : 'css';

// Tạo tên class
const className = useFullClassName
    ? `${pathParts.join('-').toLowerCase()}-${componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()}`
    : componentName.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();

// Nội dung file JSX của component
const jsxContent = createCss ? `import './${componentName}.${styleExtension}';

const ${componentName} = () => {
  return <h2 className="${className}">Hello from ${componentName}!</h2>;
};

export default ${componentName};
` : `const ${componentName} = () => {
  return <h2>Hello from ${componentName}!</h2>;
};

export default ${componentName};
`;

// Nội dung file CSS/SCSS của component
const styleContent = `.${className} {
}`;

// Nội dung file index.js của component
const indexContent = `export { default } from './${componentName}';`;

try {
    // Tạo thư mục cho component nếu chưa tồn tại
    fs.mkdirSync(componentDir, { recursive: true });
    // Tạo file JSX cho component
    fs.writeFileSync(path.join(componentDir, `${componentName}.jsx`), jsxContent);
    // Tạo file CSS/SCSS cho component nếu tùy chọn createCss là true
    if (createCss) {
        fs.writeFileSync(path.join(componentDir, `${componentName}.${styleExtension}`), styleContent);
    }
    // Tạo file index.js cho component nếu tùy chọn createIndex là true
    if (createIndex) {
        fs.writeFileSync(path.join(componentDir, `index.js`), indexContent);
    }
    // Thông báo tạo component thành công
    console.log(`✅ Component ${componentName} đã được tạo tại ${componentDir}`);
} catch (error) {
    // Thông báo lỗi nếu có lỗi ngoại lệ xảy ra
    console.error(`❌ Đã xảy ra lỗi trong khi tạo component ${componentName}: ${error.message}`);
    process.exit(1);
}

//Cú pháp lênh: 
//npm run create MyButton: Tạo component MyButton với file MyButton.jsx. Đặt trong thư mục components/MyButton/
//npm run create Common/Ui/UiAlert1: Tạo component UiAlert1 với file UiAlert1.jsx. Đặt trong thư mục components/Common/Ui/UiAlert/
//npm run create Common/Ui/UiAlert2 true: Tạo component UiAlert2 với file UiAlert2.jsx và index.js. Đặt trong thư mục components/Common/Ui/UiAlert2/
//npm run create Common/Ui/UiAlert3 true true: Tạo component UiAlert3 với file UiAlert3.jsx, index.js, và UiAlert3.css. Đặt trong thư mục components/Common/Ui/UiAlert3/. Tên class của component sẽ là ui-alert3.
//npm run create Common/Ui/UiAlert4 true true true: Tạo component UiAlert4 với file UiAlert4.jsx, index.js, và UiAlert4.scss. Đặt trong thư mục components/Common/Ui/UiAlert4/. Tên class của component sẽ là ui-alert4.
//npm run create Common/Ui/UiAlert5 true true true true: Tạo component UiAlert5 với file UiAlert5.jsx, index.js, và UiAlert5.scss. Đặt trong thư mục components/Common/Ui/UiAlert5/. Tên class của component sẽ là components-common-ui-ui-alert5.