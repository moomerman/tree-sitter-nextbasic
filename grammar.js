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
        $.for_statement,
        $.proc_definition,
        $.proc_call,
        $.keyword_statement,
        $.comment,
      ),

    // Specific statement types
    assignment: ($) => seq($.identifier, "=", $.expression),

    if_statement: ($) => seq("IF", $.condition, "THEN", $.statement),

    goto_statement: ($) => seq(choice("GO TO", "GOTO"), $.expression),

    for_statement: ($) =>
      seq(
        "FOR",
        $.assignment,
        "TO",
        $.expression,
        optional(seq("STEP", $.expression)),
      ),

    proc_definition: ($) =>
      seq(
        "DEFPROC",
        $.identifier,
        optional(seq("(", optional($.parameter_list), ")")),
      ),

    proc_call: ($) =>
      seq(
        "PROC",
        $.identifier,
        optional(seq("(", optional($.argument_list), ")")),
      ),

    parameter_list: ($) => sep1($.identifier, ","),

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
          "BEEP",
          "STOP",
          "NEXT",
          "ENDPROC",
        ),
      ),

    condition: ($) =>
      seq(
        $.expression,
        choice(">", "<", "=", ">=", "<=", "<>"),
        $.expression,
        optional(seq($.logical_operator, $.condition)),
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

    function_call: ($) =>
      seq(
        $.identifier,
        "$",
        optional(seq("(", optional($.argument_list), ")")),
      ),
    number: ($) => /-?\d+(\.\d+)?/,
    string: ($) => /"[^"]*"/,
    identifier: ($) => /[a-zA-Z][a-zA-Z0-9]*/,

    comment: ($) => seq(choice(";", "REM"), /.*/),
  },
})

function sep1(rule, separator) {
  return seq(rule, repeat(seq(separator, rule)))
}
