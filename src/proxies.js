describe("Proxy", () => {

  if (typeof Proxy != "function") {
    console.warn("Proxy is not supported");
    return;
  }

  describe("get()", () => {

    it("is a trap for getting a property value", () => {
      let target = {
        first_name: "Foo"
      };
      let handler = {
        get: (target, property, receiver) => {
          return property in target ? target[property] : "unknown";
        }
      };

      let proxy = new Proxy(target, handler);
      expect(proxy.first_name).toEqual("Foo");
      expect(proxy.last_name).toEqual("unknown");
    });

  });

  describe("set()", () => {

    it("is a trap for setting a property value", () => {
      let target = {
        age: 20
      };
      let handler = {
        set: (target, property, value, receiver) => {
          if (property == "age" && value < 0)
            target["age"] = 0;
          else
            target[property] = value;
          return true;
        }
      };

      let proxy = new Proxy(target, handler);
      proxy.age = 30
      expect(proxy.age).toEqual(30);
      proxy.age = -30;
      expect(proxy.age).toEqual(0);
    });

  });

  describe("has()", () => {

    it("is a trap for the in operator", () => {
      let target = {
        first_name: "Foo",
        say_hi: () => "hello!"
      };
      let handler = {
        has: (target, property) => {
          return typeof target[property] != "function";
        }
      };

      let proxy = new Proxy(target, handler);
      expect("first_name" in proxy).toEqual(true);
      expect("say_hi" in proxy).toEqual(false);
    });

  });

  describe("enumerate()", () => {

    it("is a trap for for...in statements", () => {
      let target = {
        first_name: "Foo",
        last_name: "Bar",
        say_hi: () => "hello!"
      };
      let handler = {
        enumerate(target) {
          let props = [];
          for(let prop in target) {
            if (typeof target[prop] != "function") props.push(target[prop]);
          }
          return props[Symbol.iterator]();
        }
      };

      let proxy = new Proxy(target, handler);
      let props = [];
      for(let prop in proxy) {
        props.push(prop);
      }
      expect(props).toEqual(["Foo", "Bar"]);
    });

  });

  // @TODO: More examples

});
