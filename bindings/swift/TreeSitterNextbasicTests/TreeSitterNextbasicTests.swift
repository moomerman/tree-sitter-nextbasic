import XCTest
import SwiftTreeSitter
import TreeSitterNextbasic

final class TreeSitterNextbasicTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_nextbasic())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading NextBASIC grammar")
    }
}
