package tree_sitter_nextbasic_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_nextbasic "github.com/moomerman/tree-sitter-nextbasic/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_nextbasic.Language())
	if language == nil {
		t.Errorf("Error loading Nextbasic grammar")
	}
}
