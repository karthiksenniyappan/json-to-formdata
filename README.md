# JsonToFormData
Convert JavaScript objects (including nested objects, arrays, and files) to `FormData`.

### :rocket: Features

:white_check_mark: Supports nested objects and arrays

:white_check_mark: Handles File uploads

:white_check_mark: Ignores null and undefined values

:white_check_mark: Compatible with JavaScript (ES6+)

	
### :package: Installation

Install via npm:

```shell
npm i json-to-formdata-converter
```

### :wrench: Usage

#### Basic Example
```javascript
import JsonToFormData from "json-to-formdata";

const obj = {
  name: "John Doe",
  age: 30,
  file: new File(["content"], "test.txt", { type: "text/plain" }),
};

const formData = JsonToFormData(obj);

console.log(formData.get("name")); // "John Doe"
console.log(formData.get("age")); // "30"
console.log(formData.get("file")); // File object

```

#### Handling Nested Objects & Arrays
```javascript
const obj = {
  user: {
    id: "123",
    name: "Alice",
  },
  answers: [
    { id: "a1", text: "A framework", is_right_ans: true },
    { id: "a2", text: "A library", is_right_ans: false },
  ],
};

const formData = JsonToFormData(obj);

console.log(formData.get("user[id]")); // "123"
console.log(formData.get("user[name]")); // "Alice"
console.log(formData.get("answers[0][id]")); // "a1"
console.log(formData.get("answers[0][text]")); // "A framework"

```

