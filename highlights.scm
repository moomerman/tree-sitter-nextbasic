; Line numbers
(line_number) @number

; Keywords
(keyword) @keyword

; Control flow keywords specifically
((keyword) @keyword.control
 (#match? @keyword.control "^(IF|THEN|GO TO|GOTO|FOR|TO|NEXT|STOP)$"))

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

; Function calls with $ suffix
(function_call
  (identifier) @function
  "$" @punctuation.special)

; Parameter lists
(parameter_list (identifier) @parameter)

; Comments
(comment) @comment

; Punctuation
["(" ")" "," ":"] @punctuation.delimiter
