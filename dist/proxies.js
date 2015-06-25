// @TODO Mention in the article

"use strict";

describe("Proxy", function () {

  if (typeof Proxy != "function") {
    console.warn("Proxy is not supported");
    return;
  }

  describe("get()", function () {

    it("is a trap for getting a property value", function () {
      var target = {
        first_name: "Foo"
      };
      var handler = {
        get: function get(target, property, receiver) {
          return property in target ? target[property] : "unknown";
        }
      };

      var proxy = new Proxy(target, handler);
      expect(proxy.first_name).toEqual("Foo");
      expect(proxy.last_name).toEqual("unknown");
    });
  });

  describe("set()", function () {

    it("is a trap for setting a property value", function () {
      var target = {
        age: 20
      };
      var handler = {
        set: function set(target, property, value, receiver) {
          if (property == "age" && value < 0) target["age"] = 0;else target[property] = value;
          return true;
        }
      };

      var proxy = new Proxy(target, handler);
      proxy.age = 30;
      expect(proxy.age).toEqual(30);
      proxy.age = -30;
      expect(proxy.age).toEqual(0);
    });
  });

  describe("has()", function () {

    it("is a trap for the in operator", function () {
      var target = {
        first_name: "Foo",
        say_hi: function say_hi() {
          return "hello!";
        }
      };
      var handler = {
        has: function has(target, property) {
          return typeof target[property] != "function";
        }
      };

      var proxy = new Proxy(target, handler);
      expect("first_name" in proxy).toEqual(true);
      expect("say_hi" in proxy).toEqual(false);
    });
  });

  describe("enumerate()", function () {

    it("is a trap for for...in statements", function () {
      var target = {
        first_name: "Foo",
        last_name: "Bar",
        say_hi: function say_hi() {
          return "hello!";
        }
      };
      var handler = {
        enumerate: function enumerate(target) {
          var props = [];
          for (var prop in target) {
            if (typeof target[prop] != "function") props.push(target[prop]);
          }
          return props[Symbol.iterator]();
        }
      };

      var proxy = new Proxy(target, handler);
      var props = [];
      for (var prop in proxy) {
        props.push(prop);
      }
      expect(props).toEqual(["Foo", "Bar"]);
    });
  });

  // @TODO: More examples
});