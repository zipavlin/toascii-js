/**
 * // MODIFICATION
 * https://github.com/galerija/toascii-js
 *
 * This is a modification of fold-to-ascii.js (https://github.com/mplatt/fold-to-ascii-js).
 * Original (fold-to-ascii) functions were combined into a new string method.
 * Beside that characters database was limited to lowercase characters only 
 * and lower/uppercase transformation is used instead.
 * All credit goes to the original author.
 *
 * // USAGE
 * Use as any other method: string.toAscii();
 * 
 * // ORIGINAL LICENSE AND INFO
 * fold-to-ascii.js
 * https://github.com/mplatt/fold-to-ascii-js
 * 
 * This is a JavaScript port of the Apache Lucene ASCII Folding Filter.
 * 
 * The Apache Lucene ASCII Folding Filter is licensed to the Apache Software
 * Foundation (ASF) under one or more contributor license agreements. See the
 * NOTICE file distributed with this work for additional information regarding
 * copyright ownership. The ASF licenses this file to You under the Apache
 * License, Version 2.0 (the "License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 * 
 * This port uses an example from the Mozilla Developer Network published prior
 * to August 20, 2010
 * 
 * fixedCharCodeAt is licencesed under the MIT License (MIT)
 * 
 * Copyright (c) 2013 Mozilla Developer Network and individual contributors
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

Object.defineProperty(String.prototype, 'toAscii', {
    enumerable: false,
    writable: true,
    value: function() {
		// DEFAULT CHARACTER REPLACEMENT
		var defaultString = "_";
		var replaceUnmapped = true;
		
		if (this === null) {return "";}
		
		var outStr = "";

		for (var i = 0; i < this.length; i++) {

			var letter = this.charAt(i);
			var upper = false;
			if (letter === letter.toUpperCase() && letter !== letter.toLowerCase()) upper = true;

			i = i || 0;
			var code = this.toLowerCase().charCodeAt(i);
			var hi, low;
			
			if (0xD800 <= code && code <= 0xDBFF) {
				hi = code;
				low = this.toLowerCase().charCodeAt(i + 1);
				if (isNaN(low)) {
					throw 'High surrogate not followed by low surrogate in fixedCharCodeAt()';
				}
				return ((hi - 0xD800) * 0x400) + (low - 0xDC00) + 0x10000;
			}
			if (0xDC00 <= code && code <= 0xDFFF) {
				/*
				 * Low surrogate: We return false to allow loops to skip this
				 * iteration since should have already handled high surrogate above
				 * in the previous iteration
				 */
				return false;
			}
			var charCode = code;

			if (charCode) {
				if (charCode < 128) {
					// character is latin -> keep it
					outStr += upper ? String.fromCharCode(charCode).toUpperCase() : String.fromCharCode(charCode);
				} else {
					var replacement;
					// change character
					switch (charCode) {
						case 0xE0: // à	[LATIN SMALL LETTER A WITH GRAVE]
						case 0xE1: // á	[LATIN SMALL LETTER A WITH ACUTE]
						case 0xE2: // â	[LATIN SMALL LETTER A WITH CIRCUMFLEX]
						case 0xE3: // ã	[LATIN SMALL LETTER A WITH TILDE]
						case 0xE4: // ä	[LATIN SMALL LETTER A WITH DIAERESIS]
						case 0xE5: // å	[LATIN SMALL LETTER A WITH RING ABOVE]
						case 0x101: // ā	[LATIN SMALL LETTER A WITH MACRON]
						case 0x103: // ă	[LATIN SMALL LETTER A WITH BREVE]
						case 0x105: // ą	[LATIN SMALL LETTER A WITH OGONEK]
						case 0x1CE: // ǎ	[LATIN SMALL LETTER A WITH CARON]
						case 0x1DF: // ǟ	[LATIN SMALL LETTER A WITH DIAERESIS AND MACRON]
						case 0x1E1: // ǡ	[LATIN SMALL LETTER A WITH DOT ABOVE AND MACRON]
						case 0x1FB: // ǻ	[LATIN SMALL LETTER A WITH RING ABOVE AND ACUTE]
						case 0x201: // ȁ	[LATIN SMALL LETTER A WITH DOUBLE GRAVE]
						case 0x203: // ȃ	[LATIN SMALL LETTER A WITH INVERTED BREVE]
						case 0x227: // ȧ	[LATIN SMALL LETTER A WITH DOT ABOVE]
						case 0x250: // ɐ	[LATIN SMALL LETTER TURNED A]
						case 0x259: // ə	[LATIN SMALL LETTER SCHWA]
						case 0x25A: // ɚ	[LATIN SMALL LETTER SCHWA WITH HOOK]
						case 0x1D8F: // ᶏ	[LATIN SMALL LETTER A WITH RETROFLEX HOOK]
						case 0x1D95: // ᶕ	[LATIN SMALL LETTER SCHWA WITH RETROFLEX HOOK]
						case 0x1E01: // ạ	[LATIN SMALL LETTER A WITH RING BELOW]
						case 0x1E9A: // ả	[LATIN SMALL LETTER A WITH RIGHT HALF RING]
						case 0x1EA1: // ạ	[LATIN SMALL LETTER A WITH DOT BELOW]
						case 0x1EA3: // ả	[LATIN SMALL LETTER A WITH HOOK ABOVE]
						case 0x1EA5: // ấ	[LATIN SMALL LETTER A WITH CIRCUMFLEX AND ACUTE]
						case 0x1EA7: // ầ	[LATIN SMALL LETTER A WITH CIRCUMFLEX AND GRAVE]
						case 0x1EA9: // ẩ	[LATIN SMALL LETTER A WITH CIRCUMFLEX AND HOOK ABOVE]
						case 0x1EAB: // ẫ	[LATIN SMALL LETTER A WITH CIRCUMFLEX AND TILDE]
						case 0x1EAD: // ậ	[LATIN SMALL LETTER A WITH CIRCUMFLEX AND DOT BELOW]
						case 0x1EAF: // ắ	[LATIN SMALL LETTER A WITH BREVE AND ACUTE]
						case 0x1EB1: // ằ	[LATIN SMALL LETTER A WITH BREVE AND GRAVE]
						case 0x1EB3: // ẳ	[LATIN SMALL LETTER A WITH BREVE AND HOOK ABOVE]
						case 0x1EB5: // ẵ	[LATIN SMALL LETTER A WITH BREVE AND TILDE]
						case 0x1EB7: // ặ	[LATIN SMALL LETTER A WITH BREVE AND DOT BELOW]
						case 0x2090: // ₐ	[LATIN SUBSCRIPT SMALL LETTER A]
						case 0x2094: // ₔ	[LATIN SUBSCRIPT SMALL LETTER SCHWA]
						case 0x24D0: // ⓐ	[CIRCLED LATIN SMALL LETTER A]
						case 0x2C65: // ⱥ	[LATIN SMALL LETTER A WITH STROKE]
						case 0x2C6F: // Ɐ	[LATIN CAPITAL LETTER TURNED A]
						case 0xFF41: // ａ	[FULLWIDTH LATIN SMALL LETTER A]
							replacement = "a";
							break;
						case 0x180: // ƀ	[LATIN SMALL LETTER B WITH STROKE]
						case 0x183: // ƃ	[LATIN SMALL LETTER B WITH TOPBAR]
						case 0x253: // ɓ	[LATIN SMALL LETTER B WITH HOOK]
						case 0x1D6C: // ᵬ	[LATIN SMALL LETTER B WITH MIDDLE TILDE]
						case 0x1D80: // ᶀ	[LATIN SMALL LETTER B WITH PALATAL HOOK]
						case 0x1E03: // ḃ	[LATIN SMALL LETTER B WITH DOT ABOVE]
						case 0x1E05: // ḅ	[LATIN SMALL LETTER B WITH DOT BELOW]
						case 0x1E07: // ḇ	[LATIN SMALL LETTER B WITH LINE BELOW]
						case 0x24D1: // ⓑ	[CIRCLED LATIN SMALL LETTER B]
						case 0xFF42: // ｂ	[FULLWIDTH LATIN SMALL LETTER B]
							replacement = "b";
							break;
						case 0xE7: // ç	[LATIN SMALL LETTER C WITH CEDILLA]
						case 0x107: // ć	[LATIN SMALL LETTER C WITH ACUTE]
						case 0x109: // ĉ	[LATIN SMALL LETTER C WITH CIRCUMFLEX]
						case 0x10B: // ċ	[LATIN SMALL LETTER C WITH DOT ABOVE]
						case 0x10D: // č	[LATIN SMALL LETTER C WITH CARON]
						case 0x188: // ƈ	[LATIN SMALL LETTER C WITH HOOK]
						case 0x23C: // ȼ	[LATIN SMALL LETTER C WITH STROKE]
						case 0x255: // ɕ	[LATIN SMALL LETTER C WITH CURL]
						case 0x1E09: // ḉ	[LATIN SMALL LETTER C WITH CEDILLA AND ACUTE]
						case 0x2184: // ↄ	[LATIN SMALL LETTER REVERSED C]
						case 0x24D2: // ⓒ	[CIRCLED LATIN SMALL LETTER C]
						case 0xA73E: // Ꜿ	[LATIN CAPITAL LETTER REVERSED C WITH DOT]
						case 0xA73F: // ꜿ	[LATIN SMALL LETTER REVERSED C WITH DOT]
						case 0xFF43: // ｃ	[FULLWIDTH LATIN SMALL LETTER C]
							replacement = "c";
							break;
						case 0xF0: // ð	[LATIN SMALL LETTER ETH]
						case 0x10F: // ď	[LATIN SMALL LETTER D WITH CARON]
						case 0x111: // đ	[LATIN SMALL LETTER D WITH STROKE]
						case 0x18C: // ƌ	[LATIN SMALL LETTER D WITH TOPBAR]
						case 0x221: // ȡ	[LATIN SMALL LETTER D WITH CURL]
						case 0x256: // ɖ	[LATIN SMALL LETTER D WITH TAIL]
						case 0x257: // ɗ	[LATIN SMALL LETTER D WITH HOOK]
						case 0x1D6D: // ᵭ	[LATIN SMALL LETTER D WITH MIDDLE TILDE]
						case 0x1D81: // ᶁ	[LATIN SMALL LETTER D WITH PALATAL HOOK]
						case 0x1D91: // ᶑ	[LATIN SMALL LETTER D WITH HOOK AND TAIL]
						case 0x1E0B: // ḋ	[LATIN SMALL LETTER D WITH DOT ABOVE]
						case 0x1E0D: // ḍ	[LATIN SMALL LETTER D WITH DOT BELOW]
						case 0x1E0F: // ḏ	[LATIN SMALL LETTER D WITH LINE BELOW]
						case 0x1E11: // ḑ	[LATIN SMALL LETTER D WITH CEDILLA]
						case 0x1E13: // ḓ	[LATIN SMALL LETTER D WITH CIRCUMFLEX BELOW]
						case 0x24D3: // ⓓ	[CIRCLED LATIN SMALL LETTER D]
						case 0xA77A: // ꝺ	[LATIN SMALL LETTER INSULAR D]
						case 0xFF44: // ｄ	[FULLWIDTH LATIN SMALL LETTER D]
							replacement = "d";
							break;
						case 0x1C6: // ǆ	[LATIN SMALL LETTER DZ WITH CARON]
						case 0x1F3: // ǳ	[LATIN SMALL LETTER DZ]
						case 0x2A3: // ʣ	[LATIN SMALL LETTER DZ DIGRAPH]
						case 0x2A5: // ʥ	[LATIN SMALL LETTER DZ DIGRAPH WITH CURL]
							replacement = "dz";
							break;
						case 0xE8: // è	[LATIN SMALL LETTER E WITH GRAVE]
						case 0xE9: // é	[LATIN SMALL LETTER E WITH ACUTE]
						case 0xEA: // ê	[LATIN SMALL LETTER E WITH CIRCUMFLEX]
						case 0xEB: // ë	[LATIN SMALL LETTER E WITH DIAERESIS]
						case 0x113: // ē	[LATIN SMALL LETTER E WITH MACRON]
						case 0x115: // ĕ	[LATIN SMALL LETTER E WITH BREVE]
						case 0x117: // ė	[LATIN SMALL LETTER E WITH DOT ABOVE]
						case 0x119: // ę	[LATIN SMALL LETTER E WITH OGONEK]
						case 0x11B: // ě	[LATIN SMALL LETTER E WITH CARON]
						case 0x1DD: // ǝ	[LATIN SMALL LETTER TURNED E]
						case 0x205: // ȅ	[LATIN SMALL LETTER E WITH DOUBLE GRAVE]
						case 0x207: // ȇ	[LATIN SMALL LETTER E WITH INVERTED BREVE]
						case 0x229: // ȩ	[LATIN SMALL LETTER E WITH CEDILLA]
						case 0x247: // ɇ	[LATIN SMALL LETTER E WITH STROKE]
						case 0x258: // ɘ	[LATIN SMALL LETTER REVERSED E]
						case 0x25B: // ɛ	[LATIN SMALL LETTER OPEN E]
						case 0x25C: // ɜ	[LATIN SMALL LETTER REVERSED OPEN E]
						case 0x25D: // ɝ	[LATIN SMALL LETTER REVERSED OPEN E WITH HOOK]
						case 0x25E: // ɞ	[LATIN SMALL LETTER CLOSED REVERSED OPEN E]
						case 0x29A: // ʚ	[LATIN SMALL LETTER CLOSED OPEN E]
						case 0x1D08: // ᴈ	[LATIN SMALL LETTER TURNED OPEN E]
						case 0x1D92: // ᶒ	[LATIN SMALL LETTER E WITH RETROFLEX HOOK]
						case 0x1D93: // ᶓ	[LATIN SMALL LETTER OPEN E WITH RETROFLEX HOOK]
						case 0x1D94: // ᶔ	[LATIN SMALL LETTER REVERSED OPEN E WITH RETROFLEX HOOK]
						case 0x1E15: // ḕ	[LATIN SMALL LETTER E WITH MACRON AND GRAVE]
						case 0x1E17: // ḗ	[LATIN SMALL LETTER E WITH MACRON AND ACUTE]
						case 0x1E19: // ḙ	[LATIN SMALL LETTER E WITH CIRCUMFLEX BELOW]
						case 0x1E1B: // ḛ	[LATIN SMALL LETTER E WITH TILDE BELOW]
						case 0x1E1D: // ḝ	[LATIN SMALL LETTER E WITH CEDILLA AND BREVE]
						case 0x1EB9: // ẹ	[LATIN SMALL LETTER E WITH DOT BELOW]
						case 0x1EBB: // ẻ	[LATIN SMALL LETTER E WITH HOOK ABOVE]
						case 0x1EBD: // ẽ	[LATIN SMALL LETTER E WITH TILDE]
						case 0x1EBF: // ế	[LATIN SMALL LETTER E WITH CIRCUMFLEX AND ACUTE]
						case 0x1EC1: // ề	[LATIN SMALL LETTER E WITH CIRCUMFLEX AND GRAVE]
						case 0x1EC3: // ể	[LATIN SMALL LETTER E WITH CIRCUMFLEX AND HOOK ABOVE]
						case 0x1EC5: // ễ	[LATIN SMALL LETTER E WITH CIRCUMFLEX AND TILDE]
						case 0x1EC7: // ệ	[LATIN SMALL LETTER E WITH CIRCUMFLEX AND DOT BELOW]
						case 0x2091: // ₑ	[LATIN SUBSCRIPT SMALL LETTER E]
						case 0x24D4: // ⓔ	[CIRCLED LATIN SMALL LETTER E]
						case 0x2C78: // ⱸ	[LATIN SMALL LETTER E WITH NOTCH]
						case 0xFF45: // ｅ	[FULLWIDTH LATIN SMALL LETTER E]
							replacement = "e";
							break;
						case 0x192: // ƒ	[LATIN SMALL LETTER F WITH HOOK]
						case 0x1D6E: // ᵮ	[LATIN SMALL LETTER F WITH MIDDLE TILDE]
						case 0x1D82: // ᶂ	[LATIN SMALL LETTER F WITH PALATAL HOOK]
						case 0x1E1F: // ḟ	[LATIN SMALL LETTER F WITH DOT ABOVE]
						case 0x1E9B: // ẛ	[LATIN SMALL LETTER LONG S WITH DOT ABOVE]
						case 0x24D5: // ⓕ	[CIRCLED LATIN SMALL LETTER F]
						case 0xA77C: // ꝼ	[LATIN SMALL LETTER INSULAR F]
						case 0xFF46: // ｆ	[FULLWIDTH LATIN SMALL LETTER F]
							replacement = "f";
							break;
						case 0x11D: // ĝ	[LATIN SMALL LETTER G WITH CIRCUMFLEX]
						case 0x11F: // ğ	[LATIN SMALL LETTER G WITH BREVE]
						case 0x121: // ġ	[LATIN SMALL LETTER G WITH DOT ABOVE]
						case 0x123: // ģ	[LATIN SMALL LETTER G WITH CEDILLA]
						case 0x1F5: // ǵ	[LATIN SMALL LETTER G WITH ACUTE]
						case 0x260: // ɠ	[LATIN SMALL LETTER G WITH HOOK]
						case 0x261: // ɡ	[LATIN SMALL LETTER SCRIPT G]
						case 0x1D77: // ᵷ	[LATIN SMALL LETTER TURNED G]
						case 0x1D79: // ᵹ	[LATIN SMALL LETTER INSULAR G]
						case 0x1D83: // ᶃ	[LATIN SMALL LETTER G WITH PALATAL HOOK]
						case 0x1E21: // ḡ	[LATIN SMALL LETTER G WITH MACRON]
						case 0x24D6: // ⓖ	[CIRCLED LATIN SMALL LETTER G]
						case 0xA77F: // ꝿ	[LATIN SMALL LETTER TURNED INSULAR G]
						case 0xFF47: // ｇ	[FULLWIDTH LATIN SMALL LETTER G]
							replacement = "g";
							break;
						case 0x125: // ĥ	[LATIN SMALL LETTER H WITH CIRCUMFLEX]
						case 0x127: // ħ	[LATIN SMALL LETTER H WITH STROKE]
						case 0x21F: // ȟ	[LATIN SMALL LETTER H WITH CARON]
						case 0x265: // ɥ	[LATIN SMALL LETTER TURNED H]
						case 0x266: // ɦ	[LATIN SMALL LETTER H WITH HOOK]
						case 0x2AE: // ʮ	[LATIN SMALL LETTER TURNED H WITH FISHHOOK]
						case 0x2AF: // ʯ	[LATIN SMALL LETTER TURNED H WITH FISHHOOK AND TAIL]
						case 0x1E23: // ḣ	[LATIN SMALL LETTER H WITH DOT ABOVE]
						case 0x1E25: // ḥ	[LATIN SMALL LETTER H WITH DOT BELOW]
						case 0x1E27: // ḧ	[LATIN SMALL LETTER H WITH DIAERESIS]
						case 0x1E29: // ḩ	[LATIN SMALL LETTER H WITH CEDILLA]
						case 0x1E2B: // ḫ	[LATIN SMALL LETTER H WITH BREVE BELOW]
						case 0x1E96: // ẖ	[LATIN SMALL LETTER H WITH LINE BELOW]
						case 0x24D7: // ⓗ	[CIRCLED LATIN SMALL LETTER H]
						case 0x2C68: // ⱨ	[LATIN SMALL LETTER H WITH DESCENDER]
						case 0x2C76: // ⱶ	[LATIN SMALL LETTER HALF H]
						case 0xFF48: // ｈ	[FULLWIDTH LATIN SMALL LETTER H]
							replacement = "h";
							break;
						case 0xEC: // ì	[LATIN SMALL LETTER I WITH GRAVE]
						case 0xED: // í	[LATIN SMALL LETTER I WITH ACUTE]
						case 0xEE: // î	[LATIN SMALL LETTER I WITH CIRCUMFLEX]
						case 0xEF: // ï	[LATIN SMALL LETTER I WITH DIAERESIS]
						case 0x129: // ĩ	[LATIN SMALL LETTER I WITH TILDE]
						case 0x12B: // ī	[LATIN SMALL LETTER I WITH MACRON]
						case 0x12D: // ĭ	[LATIN SMALL LETTER I WITH BREVE]
						case 0x12F: // į	[LATIN SMALL LETTER I WITH OGONEK]
						case 0x131: // ı	[LATIN SMALL LETTER DOTLESS I]
						case 0x1D0: // ǐ	[LATIN SMALL LETTER I WITH CARON]
						case 0x209: // ȉ	[LATIN SMALL LETTER I WITH DOUBLE GRAVE]
						case 0x20B: // ȋ	[LATIN SMALL LETTER I WITH INVERTED BREVE]
						case 0x268: // ɨ	[LATIN SMALL LETTER I WITH STROKE]
						case 0x1D09: // ᴉ	[LATIN SMALL LETTER TURNED I]
						case 0x1D62: // ᵢ	[LATIN SUBSCRIPT SMALL LETTER I]
						case 0x1D7C: // ᵼ	[LATIN SMALL LETTER IOTA WITH STROKE]
						case 0x1D96: // ᶖ	[LATIN SMALL LETTER I WITH RETROFLEX HOOK]
						case 0x1E2D: // ḭ	[LATIN SMALL LETTER I WITH TILDE BELOW]
						case 0x1E2F: // ḯ	[LATIN SMALL LETTER I WITH DIAERESIS AND ACUTE]
						case 0x1EC9: // ỉ	[LATIN SMALL LETTER I WITH HOOK ABOVE]
						case 0x1ECB: // ị	[LATIN SMALL LETTER I WITH DOT BELOW]
						case 0x2071: // ⁱ	[SUPERSCRIPT LATIN SMALL LETTER I]
						case 0x24D8: // ⓘ	[CIRCLED LATIN SMALL LETTER I]
						case 0xFF49: // ｉ	[FULLWIDTH LATIN SMALL LETTER I]
							replacement = "i";
							break;
						case 0x135: // ĵ	[LATIN SMALL LETTER J WITH CIRCUMFLEX]
						case 0x1F0: // ǰ	[LATIN SMALL LETTER J WITH CARON]
						case 0x237: // ȷ	[LATIN SMALL LETTER DOTLESS J]
						case 0x249: // ɉ	[LATIN SMALL LETTER J WITH STROKE]
						case 0x25F: // ɟ	[LATIN SMALL LETTER DOTLESS J WITH STROKE]
						case 0x284: // ʄ	[LATIN SMALL LETTER DOTLESS J WITH STROKE AND HOOK]
						case 0x29D: // ʝ	[LATIN SMALL LETTER J WITH CROSSED-TAIL]
						case 0x24D9: // ⓙ	[CIRCLED LATIN SMALL LETTER J]
						case 0x2C7C: // ⱼ	[LATIN SUBSCRIPT SMALL LETTER J]
						case 0xFF4A: // ｊ	[FULLWIDTH LATIN SMALL LETTER J]
							replacement = "j";
							break;
						case 0x137: // ķ	[LATIN SMALL LETTER K WITH CEDILLA]
						case 0x199: // ƙ	[LATIN SMALL LETTER K WITH HOOK]
						case 0x1E9: // ǩ	[LATIN SMALL LETTER K WITH CARON]
						case 0x29E: // ʞ	[LATIN SMALL LETTER TURNED K]
						case 0x1D84: // ᶄ	[LATIN SMALL LETTER K WITH PALATAL HOOK]
						case 0x1E31: // ḱ	[LATIN SMALL LETTER K WITH ACUTE]
						case 0x1E33: // ḳ	[LATIN SMALL LETTER K WITH DOT BELOW]
						case 0x1E35: // ḵ	[LATIN SMALL LETTER K WITH LINE BELOW]
						case 0x24DA: // ⓚ	[CIRCLED LATIN SMALL LETTER K]
						case 0x2C6A: // ⱪ	[LATIN SMALL LETTER K WITH DESCENDER]
						case 0xA741: // ꝁ	[LATIN SMALL LETTER K WITH STROKE]
						case 0xA743: // ꝃ	[LATIN SMALL LETTER K WITH DIAGONAL STROKE]
						case 0xA745: // ꝅ	[LATIN SMALL LETTER K WITH STROKE AND DIAGONAL STROKE]
						case 0xFF4B: // ｋ	[FULLWIDTH LATIN SMALL LETTER K]
							replacement = "k";
							break;
						case 0x13A: // ĺ	[LATIN SMALL LETTER L WITH ACUTE]
						case 0x13C: // ļ	[LATIN SMALL LETTER L WITH CEDILLA]
						case 0x13E: // ľ	[LATIN SMALL LETTER L WITH CARON]
						case 0x140: // ŀ	[LATIN SMALL LETTER L WITH MIDDLE DOT]
						case 0x142: // ł	[LATIN SMALL LETTER L WITH STROKE]
						case 0x19A: // ƚ	[LATIN SMALL LETTER L WITH BAR]
						case 0x234: // ȴ	[LATIN SMALL LETTER L WITH CURL]
						case 0x26B: // ɫ	[LATIN SMALL LETTER L WITH MIDDLE TILDE]
						case 0x26C: // ɬ	[LATIN SMALL LETTER L WITH BELT]
						case 0x26D: // ɭ	[LATIN SMALL LETTER L WITH RETROFLEX HOOK]
						case 0x1D85: // ᶅ	[LATIN SMALL LETTER L WITH PALATAL HOOK]
						case 0x1E37: // ḷ	[LATIN SMALL LETTER L WITH DOT BELOW]
						case 0x1E39: // ḹ	[LATIN SMALL LETTER L WITH DOT BELOW AND MACRON]
						case 0x1E3B: // ḻ	[LATIN SMALL LETTER L WITH LINE BELOW]
						case 0x1E3D: // ḽ	[LATIN SMALL LETTER L WITH CIRCUMFLEX BELOW]
						case 0x24DB: // ⓛ	[CIRCLED LATIN SMALL LETTER L]
						case 0x2C61: // ⱡ	[LATIN SMALL LETTER L WITH DOUBLE BAR]
						case 0xA747: // ꝇ	[LATIN SMALL LETTER BROKEN L]
						case 0xA749: // ꝉ	[LATIN SMALL LETTER L WITH HIGH STROKE]
						case 0xA781: // ꞁ	[LATIN SMALL LETTER TURNED L]
						case 0xFF4C: // ｌ	[FULLWIDTH LATIN SMALL LETTER L]
							replacement = "l";
							break;
						case 0x26F: // ɯ	[LATIN SMALL LETTER TURNED M]
						case 0x270: // ɰ	[LATIN SMALL LETTER TURNED M WITH LONG LEG]
						case 0x271: // ɱ	[LATIN SMALL LETTER M WITH HOOK]
						case 0x1D6F: // ᵯ	[LATIN SMALL LETTER M WITH MIDDLE TILDE]
						case 0x1D86: // ᶆ	[LATIN SMALL LETTER M WITH PALATAL HOOK]
						case 0x1E3F: // ḿ	[LATIN SMALL LETTER M WITH ACUTE]
						case 0x1E41: // ṁ	[LATIN SMALL LETTER M WITH DOT ABOVE]
						case 0x1E43: // ṃ	[LATIN SMALL LETTER M WITH DOT BELOW]
						case 0x24DC: // ⓜ	[CIRCLED LATIN SMALL LETTER M]
						case 0xFF4D: // ｍ	[FULLWIDTH LATIN SMALL LETTER M]
							replacement = "m";
							break;
						case 0xF1: // ñ	[LATIN SMALL LETTER N WITH TILDE]
						case 0x144: // ń	[LATIN SMALL LETTER N WITH ACUTE]
						case 0x146: // ņ	[LATIN SMALL LETTER N WITH CEDILLA]
						case 0x148: // ň	[LATIN SMALL LETTER N WITH CARON]
						case 0x149: // ŉ	[LATIN SMALL LETTER N PRECEDED BY APOSTROPHE]
						case 0x14B: // ŋ	http;//en.wikipedia.org/wiki/Eng_(letter)	[LATIN SMALL LETTER ENG]
						case 0x19E: // ƞ	[LATIN SMALL LETTER N WITH LONG RIGHT LEG]
						case 0x1F9: // ǹ	[LATIN SMALL LETTER N WITH GRAVE]
						case 0x235: // ȵ	[LATIN SMALL LETTER N WITH CURL]
						case 0x272: // ɲ	[LATIN SMALL LETTER N WITH LEFT HOOK]
						case 0x273: // ɳ	[LATIN SMALL LETTER N WITH RETROFLEX HOOK]
						case 0x1D70: // ᵰ	[LATIN SMALL LETTER N WITH MIDDLE TILDE]
						case 0x1D87: // ᶇ	[LATIN SMALL LETTER N WITH PALATAL HOOK]
						case 0x1E45: // ṅ	[LATIN SMALL LETTER N WITH DOT ABOVE]
						case 0x1E47: // ṇ	[LATIN SMALL LETTER N WITH DOT BELOW]
						case 0x1E49: // ṉ	[LATIN SMALL LETTER N WITH LINE BELOW]
						case 0x1E4B: // ṋ	[LATIN SMALL LETTER N WITH CIRCUMFLEX BELOW]
						case 0x207F: // ⁿ	[SUPERSCRIPT LATIN SMALL LETTER N]
						case 0x24DD: // ⓝ	[CIRCLED LATIN SMALL LETTER N]
						case 0xFF4E: // ｎ	[FULLWIDTH LATIN SMALL LETTER N]
							replacement = "n";
							break;
						case 0xF2: // ò	[LATIN SMALL LETTER O WITH GRAVE]
						case 0xF3: // ó	[LATIN SMALL LETTER O WITH ACUTE]
						case 0xF4: // ô	[LATIN SMALL LETTER O WITH CIRCUMFLEX]
						case 0xF5: // õ	[LATIN SMALL LETTER O WITH TILDE]
						case 0xF6: // ö	[LATIN SMALL LETTER O WITH DIAERESIS]
						case 0xF8: // ø	[LATIN SMALL LETTER O WITH STROKE]
						case 0x14D: // ō	[LATIN SMALL LETTER O WITH MACRON]
						case 0x14F: // ŏ	[LATIN SMALL LETTER O WITH BREVE]
						case 0x151: // ő	[LATIN SMALL LETTER O WITH DOUBLE ACUTE]
						case 0x1A1: // ơ	[LATIN SMALL LETTER O WITH HORN]
						case 0x1D2: // ǒ	[LATIN SMALL LETTER O WITH CARON]
						case 0x1EB: // ǫ	[LATIN SMALL LETTER O WITH OGONEK]
						case 0x1ED: // ǭ	[LATIN SMALL LETTER O WITH OGONEK AND MACRON]
						case 0x1FF: // ǿ	[LATIN SMALL LETTER O WITH STROKE AND ACUTE]
						case 0x20D: // ȍ	[LATIN SMALL LETTER O WITH DOUBLE GRAVE]
						case 0x20F: // ȏ	[LATIN SMALL LETTER O WITH INVERTED BREVE]
						case 0x22B: // ȫ	[LATIN SMALL LETTER O WITH DIAERESIS AND MACRON]
						case 0x22D: // ȭ	[LATIN SMALL LETTER O WITH TILDE AND MACRON]
						case 0x22F: // ȯ	[LATIN SMALL LETTER O WITH DOT ABOVE]
						case 0x231: // ȱ	[LATIN SMALL LETTER O WITH DOT ABOVE AND MACRON]
						case 0x254: // ɔ	[LATIN SMALL LETTER OPEN O]
						case 0x275: // ɵ	[LATIN SMALL LETTER BARRED O]
						case 0x1D16: // ᴖ	[LATIN SMALL LETTER TOP HALF O]
						case 0x1D17: // ᴗ	[LATIN SMALL LETTER BOTTOM HALF O]
						case 0x1D97: // ᶗ	[LATIN SMALL LETTER OPEN O WITH RETROFLEX HOOK]
						case 0x1E4D: // ṍ	[LATIN SMALL LETTER O WITH TILDE AND ACUTE]
						case 0x1E4F: // ṏ	[LATIN SMALL LETTER O WITH TILDE AND DIAERESIS]
						case 0x1E51: // ṑ	[LATIN SMALL LETTER O WITH MACRON AND GRAVE]
						case 0x1E53: // ṓ	[LATIN SMALL LETTER O WITH MACRON AND ACUTE]
						case 0x1ECD: // ọ	[LATIN SMALL LETTER O WITH DOT BELOW]
						case 0x1ECF: // ỏ	[LATIN SMALL LETTER O WITH HOOK ABOVE]
						case 0x1ED1: // ố	[LATIN SMALL LETTER O WITH CIRCUMFLEX AND ACUTE]
						case 0x1ED3: // ồ	[LATIN SMALL LETTER O WITH CIRCUMFLEX AND GRAVE]
						case 0x1ED5: // ổ	[LATIN SMALL LETTER O WITH CIRCUMFLEX AND HOOK ABOVE]
						case 0x1ED7: // ỗ	[LATIN SMALL LETTER O WITH CIRCUMFLEX AND TILDE]
						case 0x1ED9: // ộ	[LATIN SMALL LETTER O WITH CIRCUMFLEX AND DOT BELOW]
						case 0x1EDB: // ớ	[LATIN SMALL LETTER O WITH HORN AND ACUTE]
						case 0x1EDD: // ờ	[LATIN SMALL LETTER O WITH HORN AND GRAVE]
						case 0x1EDF: // ở	[LATIN SMALL LETTER O WITH HORN AND HOOK ABOVE]
						case 0x1EE1: // ỡ	[LATIN SMALL LETTER O WITH HORN AND TILDE]
						case 0x1EE3: // ợ	[LATIN SMALL LETTER O WITH HORN AND DOT BELOW]
						case 0x2092: // ₒ	[LATIN SUBSCRIPT SMALL LETTER O]
						case 0x24DE: // ⓞ	[CIRCLED LATIN SMALL LETTER O]
						case 0x2C7A: // ⱺ	[LATIN SMALL LETTER O WITH LOW RING INSIDE]
						case 0xA74B: // ꝋ	[LATIN SMALL LETTER O WITH LONG STROKE OVERLAY]
						case 0xA74D: // ꝍ	[LATIN SMALL LETTER O WITH LOOP]
						case 0xFF4F: // ｏ	[FULLWIDTH LATIN SMALL LETTER O]
							replacement = "o";
							break;
						case 0x1A5: // ƥ	[LATIN SMALL LETTER P WITH HOOK]
						case 0x1D71: // ᵱ	[LATIN SMALL LETTER P WITH MIDDLE TILDE]
						case 0x1D7D: // ᵽ	[LATIN SMALL LETTER P WITH STROKE]
						case 0x1D88: // ᶈ	[LATIN SMALL LETTER P WITH PALATAL HOOK]
						case 0x1E55: // ṕ	[LATIN SMALL LETTER P WITH ACUTE]
						case 0x1E57: // ṗ	[LATIN SMALL LETTER P WITH DOT ABOVE]
						case 0x24DF: // ⓟ	[CIRCLED LATIN SMALL LETTER P]
						case 0xA751: // ꝑ	[LATIN SMALL LETTER P WITH STROKE THROUGH DESCENDER]
						case 0xA753: // ꝓ	[LATIN SMALL LETTER P WITH FLOURISH]
						case 0xA755: // ꝕ	[LATIN SMALL LETTER P WITH SQUIRREL TAIL]
						case 0xA7FC: // ꟼ	[LATIN EPIGRAPHIC LETTER REVERSED P]
						case 0xFF50: // ｐ	[FULLWIDTH LATIN SMALL LETTER P]
							replacement = "p";
							break;
						case 0x155: // ŕ	[LATIN SMALL LETTER R WITH ACUTE]
						case 0x157: // ŗ	[LATIN SMALL LETTER R WITH CEDILLA]
						case 0x159: // ř	[LATIN SMALL LETTER R WITH CARON]
						case 0x211: // ȑ	[LATIN SMALL LETTER R WITH DOUBLE GRAVE]
						case 0x213: // ȓ	[LATIN SMALL LETTER R WITH INVERTED BREVE]
						case 0x24D: // ɍ	[LATIN SMALL LETTER R WITH STROKE]
						case 0x27C: // ɼ	[LATIN SMALL LETTER R WITH LONG LEG]
						case 0x27D: // ɽ	[LATIN SMALL LETTER R WITH TAIL]
						case 0x27E: // ɾ	[LATIN SMALL LETTER R WITH FISHHOOK]
						case 0x27F: // ɿ	[LATIN SMALL LETTER REVERSED R WITH FISHHOOK]
						case 0x1D63: // ᵣ	[LATIN SUBSCRIPT SMALL LETTER R]
						case 0x1D72: // ᵲ	[LATIN SMALL LETTER R WITH MIDDLE TILDE]
						case 0x1D73: // ᵳ	[LATIN SMALL LETTER R WITH FISHHOOK AND MIDDLE TILDE]
						case 0x1D89: // ᶉ	[LATIN SMALL LETTER R WITH PALATAL HOOK]
						case 0x1E59: // ṙ	[LATIN SMALL LETTER R WITH DOT ABOVE]
						case 0x1E5B: // ṛ	[LATIN SMALL LETTER R WITH DOT BELOW]
						case 0x1E5D: // ṝ	[LATIN SMALL LETTER R WITH DOT BELOW AND MACRON]
						case 0x1E5F: // ṟ	[LATIN SMALL LETTER R WITH LINE BELOW]
						case 0x24E1: // ⓡ	[CIRCLED LATIN SMALL LETTER R]
						case 0xA75B: // ꝛ	[LATIN SMALL LETTER R ROTUNDA]
						case 0xA783: // ꞃ	[LATIN SMALL LETTER INSULAR R]
						case 0xFF52: // ｒ	[FULLWIDTH LATIN SMALL LETTER R]
							replacement = "r";
							break;
						case 0x15B: // ś	[LATIN SMALL LETTER S WITH ACUTE]
						case 0x15D: // ŝ	[LATIN SMALL LETTER S WITH CIRCUMFLEX]
						case 0x15F: // ş	[LATIN SMALL LETTER S WITH CEDILLA]
						case 0x161: // š	[LATIN SMALL LETTER S WITH CARON]
						case 0x17F: // ſ	http;//en.wikipedia.org/wiki/Long_S	[LATIN SMALL LETTER LONG S]
						case 0x219: // ș	[LATIN SMALL LETTER S WITH COMMA BELOW]
						case 0x23F: // ȿ	[LATIN SMALL LETTER S WITH SWASH TAIL]
						case 0x282: // ʂ	[LATIN SMALL LETTER S WITH HOOK]
						case 0x1D74: // ᵴ	[LATIN SMALL LETTER S WITH MIDDLE TILDE]
						case 0x1D8A: // ᶊ	[LATIN SMALL LETTER S WITH PALATAL HOOK]
						case 0x1E61: // ṡ	[LATIN SMALL LETTER S WITH DOT ABOVE]
						case 0x1E63: // ṣ	[LATIN SMALL LETTER S WITH DOT BELOW]
						case 0x1E65: // ṥ	[LATIN SMALL LETTER S WITH ACUTE AND DOT ABOVE]
						case 0x1E67: // ṧ	[LATIN SMALL LETTER S WITH CARON AND DOT ABOVE]
						case 0x1E69: // ṩ	[LATIN SMALL LETTER S WITH DOT BELOW AND DOT ABOVE]
						case 0x1E9C: // ẜ	[LATIN SMALL LETTER LONG S WITH DIAGONAL STROKE]
						case 0x1E9D: // ẝ	[LATIN SMALL LETTER LONG S WITH HIGH STROKE]
						case 0x24E2: // ⓢ	[CIRCLED LATIN SMALL LETTER S]
						case 0xA784: // Ꞅ	[LATIN CAPITAL LETTER INSULAR S]
						case 0xFF53: // ｓ	[FULLWIDTH LATIN SMALL LETTER S]
							replacement = "s";
							break;
						case 0x163: // ţ	[LATIN SMALL LETTER T WITH CEDILLA]
						case 0x165: // ť	[LATIN SMALL LETTER T WITH CARON]
						case 0x167: // ŧ	[LATIN SMALL LETTER T WITH STROKE]
						case 0x1AB: // ƫ	[LATIN SMALL LETTER T WITH PALATAL HOOK]
						case 0x1AD: // ƭ	[LATIN SMALL LETTER T WITH HOOK]
						case 0x21B: // ț	[LATIN SMALL LETTER T WITH COMMA BELOW]
						case 0x236: // ȶ	[LATIN SMALL LETTER T WITH CURL]
						case 0x287: // ʇ	[LATIN SMALL LETTER TURNED T]
						case 0x288: // ʈ	[LATIN SMALL LETTER T WITH RETROFLEX HOOK]
						case 0x1D75: // ᵵ	[LATIN SMALL LETTER T WITH MIDDLE TILDE]
						case 0x1E6B: // ṫ	[LATIN SMALL LETTER T WITH DOT ABOVE]
						case 0x1E6D: // ṭ	[LATIN SMALL LETTER T WITH DOT BELOW]
						case 0x1E6F: // ṯ	[LATIN SMALL LETTER T WITH LINE BELOW]
						case 0x1E71: // ṱ	[LATIN SMALL LETTER T WITH CIRCUMFLEX BELOW]
						case 0x1E97: // ẗ	[LATIN SMALL LETTER T WITH DIAERESIS]
						case 0x24E3: // ⓣ	[CIRCLED LATIN SMALL LETTER T]
						case 0x2C66: // ⱦ	[LATIN SMALL LETTER T WITH DIAGONAL STROKE]
						case 0xFF54: // ｔ	[FULLWIDTH LATIN SMALL LETTER T]
							replacement = "t";
							break;
						case 0xF9: // ù	[LATIN SMALL LETTER U WITH GRAVE]
						case 0xFA: // ú	[LATIN SMALL LETTER U WITH ACUTE]
						case 0xFB: // û	[LATIN SMALL LETTER U WITH CIRCUMFLEX]
						case 0xFC: // ü	[LATIN SMALL LETTER U WITH DIAERESIS]
						case 0x169: // ũ	[LATIN SMALL LETTER U WITH TILDE]
						case 0x16B: // ū	[LATIN SMALL LETTER U WITH MACRON]
						case 0x16D: // ŭ	[LATIN SMALL LETTER U WITH BREVE]
						case 0x16F: // ů	[LATIN SMALL LETTER U WITH RING ABOVE]
						case 0x171: // ű	[LATIN SMALL LETTER U WITH DOUBLE ACUTE]
						case 0x173: // ų	[LATIN SMALL LETTER U WITH OGONEK]
						case 0x1B0: // ư	[LATIN SMALL LETTER U WITH HORN]
						case 0x1D4: // ǔ	[LATIN SMALL LETTER U WITH CARON]
						case 0x1D6: // ǖ	[LATIN SMALL LETTER U WITH DIAERESIS AND MACRON]
						case 0x1D8: // ǘ	[LATIN SMALL LETTER U WITH DIAERESIS AND ACUTE]
						case 0x1DA: // ǚ	[LATIN SMALL LETTER U WITH DIAERESIS AND CARON]
						case 0x1DC: // ǜ	[LATIN SMALL LETTER U WITH DIAERESIS AND GRAVE]
						case 0x215: // ȕ	[LATIN SMALL LETTER U WITH DOUBLE GRAVE]
						case 0x217: // ȗ	[LATIN SMALL LETTER U WITH INVERTED BREVE]
						case 0x289: // ʉ	[LATIN SMALL LETTER U BAR]
						case 0x1D64: // ᵤ	[LATIN SUBSCRIPT SMALL LETTER U]
						case 0x1D99: // ᶙ	[LATIN SMALL LETTER U WITH RETROFLEX HOOK]
						case 0x1E73: // ṳ	[LATIN SMALL LETTER U WITH DIAERESIS BELOW]
						case 0x1E75: // ṵ	[LATIN SMALL LETTER U WITH TILDE BELOW]
						case 0x1E77: // ṷ	[LATIN SMALL LETTER U WITH CIRCUMFLEX BELOW]
						case 0x1E79: // ṹ	[LATIN SMALL LETTER U WITH TILDE AND ACUTE]
						case 0x1E7B: // ṻ	[LATIN SMALL LETTER U WITH MACRON AND DIAERESIS]
						case 0x1EE5: // ụ	[LATIN SMALL LETTER U WITH DOT BELOW]
						case 0x1EE7: // ủ	[LATIN SMALL LETTER U WITH HOOK ABOVE]
						case 0x1EE9: // ứ	[LATIN SMALL LETTER U WITH HORN AND ACUTE]
						case 0x1EEB: // ừ	[LATIN SMALL LETTER U WITH HORN AND GRAVE]
						case 0x1EED: // ử	[LATIN SMALL LETTER U WITH HORN AND HOOK ABOVE]
						case 0x1EEF: // ữ	[LATIN SMALL LETTER U WITH HORN AND TILDE]
						case 0x1EF1: // ự	[LATIN SMALL LETTER U WITH HORN AND DOT BELOW]
						case 0x24E4: // ⓤ	[CIRCLED LATIN SMALL LETTER U]
						case 0xFF55: // ｕ	[FULLWIDTH LATIN SMALL LETTER U]
							replacement = "u";
							break;
						case 0x28B: // ʋ	[LATIN SMALL LETTER V WITH HOOK]
						case 0x28C: // ʌ	[LATIN SMALL LETTER TURNED V]
						case 0x1D65: // ᵥ	[LATIN SUBSCRIPT SMALL LETTER V]
						case 0x1D8C: // ᶌ	[LATIN SMALL LETTER V WITH PALATAL HOOK]
						case 0x1E7D: // ṽ	[LATIN SMALL LETTER V WITH TILDE]
						case 0x1E7F: // ṿ	[LATIN SMALL LETTER V WITH DOT BELOW]
						case 0x24E5: // ⓥ	[CIRCLED LATIN SMALL LETTER V]
						case 0x2C71: // ⱱ	[LATIN SMALL LETTER V WITH RIGHT HOOK]
						case 0x2C74: // ⱴ	[LATIN SMALL LETTER V WITH CURL]
						case 0xA75F: // ꝟ	[LATIN SMALL LETTER V WITH DIAGONAL STROKE]
						case 0xFF56: // ｖ	[FULLWIDTH LATIN SMALL LETTER V]
							replacement = "v";
							break;
						case 0x175: // ŵ	[LATIN SMALL LETTER W WITH CIRCUMFLEX]
						case 0x1BF: // ƿ	http;//en.wikipedia.org/wiki/Wynn	[LATIN LETTER WYNN]
						case 0x28D: // ʍ	[LATIN SMALL LETTER TURNED W]
						case 0x1E81: // ẁ	[LATIN SMALL LETTER W WITH GRAVE]
						case 0x1E83: // ẃ	[LATIN SMALL LETTER W WITH ACUTE]
						case 0x1E85: // ẅ	[LATIN SMALL LETTER W WITH DIAERESIS]
						case 0x1E87: // ẇ	[LATIN SMALL LETTER W WITH DOT ABOVE]
						case 0x1E89: // ẉ	[LATIN SMALL LETTER W WITH DOT BELOW]
						case 0x1E98: // ẘ	[LATIN SMALL LETTER W WITH RING ABOVE]
						case 0x24E6: // ⓦ	[CIRCLED LATIN SMALL LETTER W]
						case 0x2C73: // ⱳ	[LATIN SMALL LETTER W WITH HOOK]
						case 0xFF57: // ｗ	[FULLWIDTH LATIN SMALL LETTER W]
							replacement = "w";
							break;
						case 0x1D8D: // ᶍ	[LATIN SMALL LETTER X WITH PALATAL HOOK]
						case 0x1E8B: // ẋ	[LATIN SMALL LETTER X WITH DOT ABOVE]
						case 0x1E8D: // ẍ	[LATIN SMALL LETTER X WITH DIAERESIS]
						case 0x2093: // ₓ	[LATIN SUBSCRIPT SMALL LETTER X]
						case 0x24E7: // ⓧ	[CIRCLED LATIN SMALL LETTER X]
						case 0xFF58: // ｘ	[FULLWIDTH LATIN SMALL LETTER X]
							replacement = "x";
							break;
						case 0xFD: // ý	[LATIN SMALL LETTER Y WITH ACUTE]
						case 0xFF: // ÿ	[LATIN SMALL LETTER Y WITH DIAERESIS]
						case 0x177: // ŷ	[LATIN SMALL LETTER Y WITH CIRCUMFLEX]
						case 0x1B4: // ƴ	[LATIN SMALL LETTER Y WITH HOOK]
						case 0x233: // ȳ	[LATIN SMALL LETTER Y WITH MACRON]
						case 0x24F: // ɏ	[LATIN SMALL LETTER Y WITH STROKE]
						case 0x28E: // ʎ	[LATIN SMALL LETTER TURNED Y]
						case 0x1E8F: // ẏ	[LATIN SMALL LETTER Y WITH DOT ABOVE]
						case 0x1E99: // ẙ	[LATIN SMALL LETTER Y WITH RING ABOVE]
						case 0x1EF3: // ỳ	[LATIN SMALL LETTER Y WITH GRAVE]
						case 0x1EF5: // ỵ	[LATIN SMALL LETTER Y WITH DOT BELOW]
						case 0x1EF7: // ỷ	[LATIN SMALL LETTER Y WITH HOOK ABOVE]
						case 0x1EF9: // ỹ	[LATIN SMALL LETTER Y WITH TILDE]
						case 0x1EFF: // ỿ	[LATIN SMALL LETTER Y WITH LOOP]
						case 0x24E8: // ⓨ	[CIRCLED LATIN SMALL LETTER Y]
						case 0xFF59: // ｙ	[FULLWIDTH LATIN SMALL LETTER Y]
							replacement = "y";
							break;
						case 0x17A: // ź	[LATIN SMALL LETTER Z WITH ACUTE]
						case 0x17C: // ż	[LATIN SMALL LETTER Z WITH DOT ABOVE]
						case 0x17E: // ž	[LATIN SMALL LETTER Z WITH CARON]
						case 0x1B6: // ƶ	[LATIN SMALL LETTER Z WITH STROKE]
						case 0x21D: // ȝ	http;//en.wikipedia.org/wiki/Yogh	[LATIN SMALL LETTER YOGH]
						case 0x225: // ȥ	[LATIN SMALL LETTER Z WITH HOOK]
						case 0x240: // ɀ	[LATIN SMALL LETTER Z WITH SWASH TAIL]
						case 0x290: // ʐ	[LATIN SMALL LETTER Z WITH RETROFLEX HOOK]
						case 0x291: // ʑ	[LATIN SMALL LETTER Z WITH CURL]
						case 0x1D76: // ᵶ	[LATIN SMALL LETTER Z WITH MIDDLE TILDE]
						case 0x1D8E: // ᶎ	[LATIN SMALL LETTER Z WITH PALATAL HOOK]
						case 0x1E91: // ẑ	[LATIN SMALL LETTER Z WITH CIRCUMFLEX]
						case 0x1E93: // ẓ	[LATIN SMALL LETTER Z WITH DOT BELOW]
						case 0x1E95: // ẕ	[LATIN SMALL LETTER Z WITH LINE BELOW]
						case 0x24E9: // ⓩ	[CIRCLED LATIN SMALL LETTER Z]
						case 0x2C6C: // ⱬ	[LATIN SMALL LETTER Z WITH DESCENDER]
						case 0xA763: // ꝣ	[LATIN SMALL LETTER VISIGOTHIC Z]
						case 0xFF5A: // ｚ	[FULLWIDTH LATIN SMALL LETTER Z]
							replacement = "z";
							break;
						default:
							replacement = (replaceUnmapped ? defaultString : String.fromCharCode(charCode));
							break;
					}
					// add it to string
					outStr += upper ? replacement.toUpperCase() : replacement;
				}
			}
		}
		return outStr;
	}
});