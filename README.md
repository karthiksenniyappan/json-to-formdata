# JsonToFormData
Convert JavaScript objects (including nested objects, arrays, and files) to `FormData`.

### :rocket: Features

:white_check_mark: Supports nested objects and arrays

:white_check_mark: Handles File uploads

:white_check_mark: Ignores null and undefined values

:white_check_mark: Compatible with JavaScript (ES6+)

:white_check_mark: Works in both Node.js and browser environments

	
### :package: Installation

Install via npm:

```shell
npm i json-to-formdata-converter
```

### :wrench: Usage

#### Basic Example

Import the module:

```javascript
// Using CommonJS
const JsonToFormData = require('json-to-formdata-converter');

// Using ES Modules
import JsonToFormData from 'json-to-formdata-converter';
```
Convert an object to FormData:

```javascript
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

#### React Native Support
If you're using React Native, pass true as the second argument to handle file URIs:

```javascript
const obj = {
  name: "John Doe",
  profilePicture: { uri: "file://path/to/image.jpg" },
};

const formData = JsonToFormData(obj, true);

console.log(formData.get("profilePicture")); // File object
```

### :page_facing_up: API

`JsonToFormData(obj, isReactNative = false)`

- `obj`: The JavaScript object to convert to FormData.

- `isReactNative`: (Optional) Set to true if you're using React Native and need to handle file URIs.

Returns: A `FormData` instance.

### :bulb: Notes
- File Handling: The library automatically detects `File` and `Blob` objects and includes them in the `FormData`.

- Ignored Values: `null` and `undefined` values are ignored and not added to the `FormData`.

- Nested Objects: Nested objects and arrays are flattened into `FormData`-compatible keys (e.g., `user[id]`, `answers[0][text]`).

### :bug: Troubleshooting
#### TypeScript Errors
If you're using TypeScript and encounter the error:
```text
This module is declared with 'export =', and can only be used with a default import when using the 'esModuleInterop' flag.
```
1. Enable `esModuleInterop` in your `tsconfig.json`:
   ```json
    {
      "compilerOptions": {
        "esModuleInterop": true
      }
    }
   ```
2. Alternatively, use a namespace import:
   ```typescript
   import * as JsonToFormData from 'json-to-formdata-converter';
   ```

### :heart: Contributing
Contributions are welcome! Please open an issue or submit a pull request on [GitHub](https://github.com/karthiksenniyappan/json-to-formdata).

### :scroll: License
This project is licensed under the MIT License. See the [LICENSE](https://github.com/karthiksenniyappan/json-to-formdata/blob/main/LICENSE) file for details.