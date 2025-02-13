const JsonToFormData = require('./index');


describe("JsonToFormData", () => {
    test("should convert a simple object to FormData", () => {
        const obj = { name: "John", age: 30 };
        const formData = JsonToFormData(obj);

        expect(formData.get("name")).toBe("John");
        expect(formData.get("age")).toBe("30");
    });

    test("should handle nested objects", () => {
        const obj = { user: { id: "123", name: "Alice" } };
        const formData = JsonToFormData(obj);

        expect(formData.get("user[id]")).toBe("123");
        expect(formData.get("user[name]")).toBe("Alice");
    });

    test("should handle arrays of objects", () => {
        const obj = {
            answers: [
                { id: "a1", text: "A framework", is_right_ans: true },
                { id: "a2", text: "A library", is_right_ans: false },
            ],
        };
        const formData = JsonToFormData(obj);

        expect(formData.get("answers[0][id]")).toBe("a1");
        expect(formData.get("answers[0][text]")).toBe("A framework");
        expect(formData.get("answers[0][is_right_ans]")).toBe("true");

        expect(formData.get("answers[1][id]")).toBe("a2");
        expect(formData.get("answers[1][text]")).toBe("A library");
        expect(formData.get("answers[1][is_right_ans]")).toBe("false");
    });

    test("should ignore null and undefined values", () => {
        const obj = { name: "John", age: null, city: undefined };
        const formData = JsonToFormData(obj);

        expect(formData.get("name")).toBe("John");
        expect(formData.get("age")).toBe(null);
        expect(formData.get("city")).toBe(null);
    });

    test("should handle files", () => {
        globalThis.File =
            globalThis.File ||
            class FakeFile extends Blob {
                constructor(chunks, name, options) {
                    super(chunks, options);
                    this.name = name;
                    this.lastModified = options?.lastModified || Date.now();
                }
            };
        const file = new (globalThis.File || class FakeFile extends Blob {
            constructor(chunks, name, options) {
                super(chunks, options);
                this.name = name;
            }
        })(
            ["content"],
            "test.txt",
            { type: "text/plain" }
        );
        const obj = { document: file };
        const formData = JsonToFormData(obj);
        expect(formData.get("document")).toBe(file);
    });
});
