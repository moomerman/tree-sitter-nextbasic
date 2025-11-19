module.exports = grammar({
  name: "nextbasic",

  rules: {
    program: ($) => repeat($.line),

    line: ($) =>
      seq(
        /\d+/, // line number
        /.*/, // everything else on the line
        /\n/, // newline
      ),
  },
})
