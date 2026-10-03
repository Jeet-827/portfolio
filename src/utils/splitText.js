/**
 * SplitText utility — splits text into characters and words
 * wrapped in individual spans with inline-block for GSAP transforms.
 *
 * @param {HTMLElement} element - The element whose text to split
 * @returns {{ chars: HTMLElement[], words: HTMLElement[] }}
 */
export function splitTextIntoChars(element) {
  if (!element) return { chars: [], words: [] };

  const originalText = element.dataset.originalText || element.textContent || '';
  element.dataset.originalText = originalText;
  element.innerHTML = '';

  const chars = [];
  const words = [];
  const textWords = originalText.trim().split(/\s+/);

  textWords.forEach((word, wi) => {
    const wordSpan = document.createElement('span');
    wordSpan.className = 'split-word';
    wordSpan.style.display = 'inline-flex';
    wordSpan.style.whiteSpace = 'nowrap';

    for (const char of word) {
      const charSpan = document.createElement('span');
      charSpan.className = 'split-char';
      charSpan.textContent = char;
      charSpan.style.display = 'inline-block';
      charSpan.style.willChange = 'transform, opacity';
      wordSpan.appendChild(charSpan);
      chars.push(charSpan);
    }

    words.push(wordSpan);
    element.appendChild(wordSpan);

    // Add space between words
    if (wi < textWords.length - 1) {
      const spaceSpan = document.createElement('span');
      spaceSpan.className = 'split-space';
      spaceSpan.style.display = 'inline-block';
      spaceSpan.style.width = '0.35em';
      spaceSpan.innerHTML = '&nbsp;';
      element.appendChild(spaceSpan);
    }
  });

  return { chars, words };
}

/**
 * Revert split text back to original.
 * @param {HTMLElement} element
 */
export function revertSplitText(element) {
  if (element && element.dataset.originalText) {
    element.textContent = element.dataset.originalText;
  }
}
