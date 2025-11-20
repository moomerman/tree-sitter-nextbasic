; Line numbers
(line_number) @number

; Keywords
(keyword) @keyword

; Control flow keywords specifically
((keyword) @keyword.control
 (#match? @keyword.control "^(FOR|TO|NEXT|STOP)$"))

; IF/THEN statements
(if_statement
  "IF" @keyword.control
  "THEN" @keyword.control)

; GOTO statements
(goto_statement
  ["GO TO" "GOTO"] @keyword.control)

; Procedure keywords
((keyword) @keyword.function
 (#match? @keyword.function "^(DEFPROC|ENDPROC)$"))

; Procedure definitions
(proc_definition
  "DEFPROC" @keyword.function
  (identifier) @function.definition)

; Procedure calls
(proc_call
  "PROC" @keyword.function
  (identifier) @function.call)

; FOR loop structure
(for_statement
  "FOR" @keyword.control
  "TO" @keyword.control
  "STEP" @keyword.control)

; Logical operators
(logical_operator) @keyword.operator

; Comparison operators
(condition [">" "<" "=" ">=" "<=" "<>"] @operator)

; Binary expression operators
(binary_expression ["+" "-" "*" "/"] @operator)

; Assignment operators
(assignment "=" @operator)

; Numbers and strings
(number) @number
(string) @string

; Variables and identifiers
(identifier) @variable

; Function calls with $ suffix (built-in functions like INKEY$)
(function_call
  (identifier) @function.builtin
  "$" @punctuation.special)

; Parameter lists
(parameter_list (identifier) @parameter)

; Comments
(comment) @comment

; Punctuation
["(" ")" "," ":"] @punctuation.delimiter
