declare global {
  interface String {
    toTitleCase: (isUnderscoreSeparated?: boolean) => string;
    isTitleCase: () => boolean;
    isUpperCase: () => boolean;
    isLowerCase: () => boolean;
    contains: (string: string) => boolean;
    chunk: (
      config:
        | number
        | {
            indexChunkLength?: number;
            numberOfChunks?: number;
            chunkLength?: number;
            rawOutput?: boolean;
          },
      indexChunkLength?: number
    ) => string | string[] | number | number[];
    reverse: () => string;
    toSentenceCase: () => string;
    toKebabCase: () => string;
    toPascalCase: () => string;
    toCamelCase: () => string;
    replaceAt: (
      startIndex?: number,
      replacement?: string,
      endIndex?: number
    ) => string;
    insertAt: (index?: number, insertion?: string) => string;
    trimIndent: () => string;
  }
}

export {};

String.prototype.toTitleCase = function (isUnderscoreSeparated) {
  this.toLowerCase();
  let words;
  if (isUnderscoreSeparated) {
    words = this.split('_');
  } else {
    words = this.split(/\s/g);
  }
  words.forEach((word, index) => {
    !(isUnderscoreSeparated || word.toUpperCase() !== word) ||
      (words[index] = word.replace(/\w\S*/g, function (txt) {
        return txt.charAt(0).toUpperCase() + txt.substring(1).toLowerCase();
      }));
  });
  return words.join(' ');
};

String.prototype.isTitleCase = function () {
  return this.split(' ').every((string) => {
    return (
      string.isUpperCase() ||
      (string.charAt(0).isUpperCase() && string.slice(1).isLowerCase())
    );
  });
};

String.prototype.isUpperCase = function () {
  return String(this) === this.toUpperCase();
};

String.prototype.isLowerCase = function () {
  return String(this) === this.toLowerCase();
};

String.prototype.contains = function (string) {
  return this.indexOf(string) !== -1;
};

String.prototype.chunk = function (config, indexChunkLength) {
  config || (config = {});
  if (
    !indexChunkLength &&
    typeof config === 'object' &&
    config.indexChunkLength
  ) {
    indexChunkLength = config.indexChunkLength;
  }
  const string = String(this);
  let numberOfChunks =
    typeof config === 'number' ? config : config.numberOfChunks;
  let chunkDigest = string;
  let chunkedOutput: Array<any> = [];
  if (numberOfChunks) {
    if (indexChunkLength) {
      chunkedOutput.push(indexChunkLength);
      chunkDigest = this.substring(indexChunkLength, this.length);
      numberOfChunks--;
    }
    const chunkDigestLength = chunkDigest.length;
    const chunkLength = Math.floor(chunkDigest.length / numberOfChunks);
    for (let i = 1; i <= numberOfChunks; i++) {
      chunkedOutput.push(chunkLength);
      if (i === numberOfChunks) {
        chunkedOutput[i - 1] += chunkDigestLength % numberOfChunks;
      }
    }
    chunkedOutput = chunkedOutput.map((currentChunckLength, index) => {
      return string.substring(
        index > 0
          ? chunkedOutput.slice(0, index).reduce((a: number, b: number) => {
              return a + b;
            }, 0)
          : 0,
        currentChunckLength
      );
    });
  } else if (typeof config === 'object' && config.chunkLength) {
    do {
      chunkedOutput.push(chunkDigest.substring(0, config.chunkLength));
      chunkDigest = chunkDigest.substring(config.chunkLength);
    } while (chunkDigest.length > 0);
  }
  if (typeof config === 'object' && config.rawOutput) return chunkedOutput;
  return chunkedOutput.join(' ');
};

String.prototype.reverse = function () {
  return this.split('').reverse().join('');
};

/**
 * Converts string to PascalCase
 */
String.prototype.toPascalCase = function () {
  const inputString = String(this)
    .replace(/[^\w\-_\s]/g, '')
    .replace(/[\-_]+/g, ' ');

  // Check if string is already pascal case
  if (!inputString.match(/\s+/g) && inputString.match(/^[A-Z]/g)) {
    return inputString;
  }

  return inputString
    .trim()
    .split(/\s+/g)
    .map((string) => {
      if (string.match(/^[A-Z]+$/g)) {
        return string;
      }
      return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
    })
    .join('');
};

/**
 * Converts string to camelCase.
 */
String.prototype.toCamelCase = function () {
  const inputString = String(this)
    .replace(/[^\w\-_\s]/g, '')
    .replace(/[\-_]+/g, ' ');

  // Check if string is already camel case
  if (!inputString.match(/\s+/g)) {
    if (inputString.match(/^[a-z]/g)) {
      return inputString;
    }
    return inputString.toLowerCase();
  }

  const pascalCaseString = inputString
    .split(/\s+/g)
    .map((string, index) => {
      if (string.match(/^[A-Z]+$/g) && index === 0) {
        return string.toLowerCase();
      }
      return string;
    })
    .join(' ')
    .toPascalCase();
  return pascalCaseString.charAt(0).toLowerCase() + pascalCaseString.slice(1);
};

/**
 * Converts string to Sentence case.
 */
String.prototype.toSentenceCase = function () {
  return String(this)
    .split(/\.\s*/g)
    .map((string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    })
    .join('. ')
    .replace(/\s\./g, '.');
};

/**
 * Converts string to kebab-case.
 */
String.prototype.toKebabCase = function () {
  return String(this)
    .replace(/[^\w\-_\s]/g, '')
    .replace(/[\-_]+/g, ' ')
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
};

String.prototype.replaceAt = function (
  startIndex = 0,
  replacement = '',
  endIndex = 0
) {
  const replacementString = typeof replacement === 'string' ? replacement : '';
  const replacementLength =
    typeof replacement === 'number' ? replacement : replacement.length;
  return (
    this.substring(0, startIndex) +
    replacementString +
    this.substring(endIndex || startIndex + replacementLength)
  );
};

String.prototype.insertAt = function (index = 0, insertion = '') {
  return this.substring(0, index) + insertion + this.substring(index);
};

String.prototype.trimIndent = function () {
  return this.trim()
    .split('\n')
    .map((string) => string.trimStart())
    .join('\n');
};
