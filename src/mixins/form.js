import validators from "./validators";

export { validators };

const isFunction = function(obj) {
  return !!(obj && obj.constructor && obj.call && obj.apply);
};

export default {
  data() {
    return {
      fields: {
        // example: {
        //   value: "",
        //   rules: [
        //     "require",
        //     "hash",
        //     validators.between(1, 3)
        //   ],
        //   error: false
        // }
      },
      error: false
    };
  },
  created() {
    // this.$emit("onInit", this.fields);
    Object.keys(this.fields).forEach(name => {
      this.$watch(
        () => this.fields[name].value,
        (newValue, oldValue) => {
          this.$emit("onChange", {
            name,
            newValue,
            oldValue,
            fields: this.fields
          });
        },
        { deep: true }
      );
    });
  },
  methods: {
    validate() {
      this.error = false;
      for (let field in this.fields) {
        this.fields[field].error = false;
        for (let rule of this.fields[field].rules) {
          if (
            (isFunction(rule) && !rule(this.fields[field].value)) ||
            (validators[rule] && !validators[rule](this.fields[field].value))
          ) {
            this.fields[field].error = true;
            this.error = true;
            break;
          }
        }
      }
      return !this.error;
    },
    submit() {
      this.validate();
      this.$emit("onSubmit", { error: this.error, fields: this.fields });
    }
  }
};
