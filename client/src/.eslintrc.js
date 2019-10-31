module.exports = {
  extends: [
    // add more generic rulesets here, such as:
    // 'eslint:recommended',
    "plugin:vue/recommended"
  ],
  rules: {
    // override/add rules settings here, such as:
    // 'vue/no-unused-vars': 'error'
    "vue/no-unused-components": 1,
    "no-undef": 1,
    "no-console": 1,
    "vue/v-on-style": 1,
    "vue/no-use-v-if-with-v-for": 1
  }
};
