module.exports = grammar({
  name: "nextbasic",

  extras: ($) => [/[ \t]/], // Only spaces and tabs, not newlines

  rules: {
    program: ($) => repeat(choice($.line, /\n/)),

    line: ($) => seq($.line_number, optional($.statement_list), /\n/),

    line_number: ($) => /\d+/,

    statement_list: ($) => sep1($.statement, ":"),

    statement: ($) =>
      choice(
        $.assignment,
        $.if_statement,
        $.goto_statement,
        $.keyword_statement,
        $.comment,
      ),

    // Specific statement types
    assignment: ($) => seq($.identifier, "=", $.expression),

    if_statement: ($) => seq("IF", $.condition, "THEN", $.statement),

    goto_statement: ($) => seq(choice("GO TO", "GOTO"), $.expression),

    keyword_statement: ($) => seq($.keyword, optional($.argument_list)),

    keyword: ($) =>
      token(
        choice(
          "LOAD",
          "SPRITE",
          "BANK",
          "CLEAR",
          "BORDER",
          "PAPER",
          "INK",
          "CLS",
          "PRINT",
          "RUN",
          "LIST",
          "SAVE",
          "MERGE",
        ),
      ),

    condition: ($) =>
      prec.left(
        choice(
          // Simple condition
          seq(
            $.expression,
            choice(">", "<", "=", ">=", "<=", "<>"),
            $.expression,
          ),
          // Compound condition with explicit logical operators
          seq($.condition, $.logical_operator, $.condition),
        ),
      ),

    logical_operator: ($) => choice("AND", "OR"),

    argument_list: ($) => sep1($.expression, ","),

    expression: ($) =>
      choice(
        $.number,
        $.string,
        $.identifier,
        $.function_call,
        $.binary_expression,
        seq("(", $.expression, ")"),
      ),

    binary_expression: ($) =>
      prec.left(1, seq($.expression, choice("+", "-", "*", "/"), $.expression)),

    function_call: ($) => seq($.identifier, "$"),
    number: ($) => /\d+(\.\d+)?/,
    string: ($) => /"[^"]*"/,
    identifier: ($) => /[a-zA-Z][a-zA-Z0-9]*/,

    comment: ($) => seq(choice(";", "REM"), /.*/),
  },
})

function sep1(rule, separator) {
  return seq(rule, repeat(seq(separator, rule)))
}
