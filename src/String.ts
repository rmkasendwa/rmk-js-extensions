/**
 * Extends the functionality of the built-in String object by adding custom methods.
 */
declare global {
  interface String {
    /**
     * Converts string to title case.
     * @param isUnderscoreSeparated Specifies whether the string is underscore-separated (optional).
     * @returns The string converted to title case.
     * @example
     * 'hello world'.toTitleCase(); // Output: 'Hello World'
     * 'hello_world'.toTitleCase(true); // Output: 'Hello World'
     */
    toTitleCase: (isUnderscoreSeparated?: boolean) => string;

    /**
     * Checks if the string is in title case.
     * @returns True if the string is in title case, false otherwise.
     * @example
     * 'Hello World'.isTitleCase(); // Output: true
     * 'hello World'.isTitleCase(); // Output: false
     */
    isTitleCase: () => boolean;

    /**
     * Checks if the string is in uppercase.
     * @returns True if the string is in uppercase, false otherwise.
     * @example
     * 'HELLO WORLD'.isUpperCase(); // Output: true
     * 'Hello World'.isUpperCase(); // Output: false
     */
    isUpperCase: () => boolean;

    /**
     * Checks if the string is in lowercase.
     * @returns True if the string is in lowercase, false otherwise.
     * @example
     * 'hello world'.isLowerCase(); // Output: true
     * 'Hello World'.isLowerCase(); // Output: false
     */
    isLowerCase: () => boolean;

    /**
     * Checks if the string contains a specified substring.
     * @param string The substring to search for.
     * @returns True if the string contains the specified substring, false otherwise.
     * @example
     * 'hello world'.contains('world'); // Output: true
     * 'hello world'.contains('universe'); // Output: false
     */
    contains: (string: string) => boolean;

    /**
     * Splits the string into chunks based on the provided configuration.
     * @param config The configuration object for chunking.
     * @param indexChunkLength The length of the index chunk (optional).
     * @returns The chunked string or an array of chunks.
     * @example
     * 'hello world'.chunk(3); // Output: ['hel', 'lo ', 'wor', 'ld']
     * 'hello world'.chunk({ numberOfChunks: 3 }); // Output: ['hel', 'lo ', 'world']
     */
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

    /**
     * Reverses the characters in the string.
     * @returns The reversed string.
     * @example
     * 'hello world'.reverse(); // Output: 'dlrow olleh'
     */
    reverse: () => string;

    /**
     * Converts string to Sentence case.
     * @returns The string converted to Sentence case.
     * @example
     * 'hello world.'.toSentenceCase(); // Output: 'Hello world.'
     */
    toSentenceCase: () => string;

    /**
     * Converts string to kebab-case.
     * @returns The string converted to kebab-case.
     * @example
     * 'hello world'.toKebabCase(); // Output: 'hello-world'
     */
    toKebabCase: () => string;

    /**
     * Converts string to snake_case.
     * @returns The string converted to snake_case.
     * @example
     * 'hello world'.toSnakeCase(); // Output: 'hello_world'
     */
    toSnakeCase: () => string;

    /**
     * Converts string to PascalCase.
     * @returns The string converted to PascalCase.
     * @example
     * 'hello world'.toPascalCase(); // Output: 'HelloWorld'
     */
    toPascalCase: () => string;

    /**
     * Converts string to camelCase.
     * @returns The string converted to camelCase.
     * @example
     * 'hello world'.toCamelCase(); // Output: 'helloWorld'
     */
    toCamelCase: () => string;

    /**
     * Replaces characters in the string within a specified range.
     * @param startIndex The start index of the range to replace (default is 0).
     * @param replacement The replacement string or length.
     * @param endIndex The end index of the range to replace (default is 0).
     * @returns The string with replaced characters.
     * @example
     * 'hello world'.replaceAt(6, 'Earth'); // Output: 'hello Earth'
     */
    replaceAt: (
      startIndex?: number,
      replacement?: string | number,
      endIndex?: number
    ) => string;

    /**
     * Inserts a string at a specified index in the original string.
     * @param index The index at which to insert the string (default is 0).
     * @param insertion The string to insert.
     * @returns The modified string with the insertion.
     * @example
     * 'hello'.insertAt(2, 'world'); // Output: 'heworldllo'
     */
    insertAt: (index?: number, insertion?: string) => string;

    /**
     * Trims the leading whitespace from each line in the string.
     * @returns The string with leading whitespace removed from each line.
     * @example
     * '   hello\n   world\n'.trimIndent(); // Output: 'hello\nworld\n'
     */
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

String.prototype.toPascalCase = function () {
  const inputString = String(this)
    .replace(/[^\w\-_\s]/g, '')
    .replace(/[\-_]+/g, ' ');

  // Check if string is already camel case or pascal case
  if (!inputString.match(/\s+/g)) {
    // Check if string is already pascal case
    if (inputString.charAt(0).match(/^[A-Z]/g)) {
      return inputString;
    }

    // Check if string is already camel case
    if (inputString.charAt(0).match(/^[a-z]/g)) {
      return inputString.charAt(0).toUpperCase() + inputString.slice(1);
    }
  }

  return inputString
    .trim()
    .split(/\s+/g)
    .map((string) => {
      if (string.match(/^[A-Z]+$/g)) {
        return string;
      }
      return string.charAt(0).toUpperCase() + string.slice(1);
    })
    .join('');
};

String.prototype.toCamelCase = function () {
  const inputString = String(this)
    .replace(/[^\w\-_\s]/g, '')
    .replace(/[\-_]+/g, ' ');

  // Check if string is already camel case or pascal case
  if (!inputString.match(/\s+/g)) {
    // Check if string is already camel case
    if (inputString.charAt(0).match(/^[a-z]/g)) {
      return inputString;
    }

    // Check if string is already pascal case
    if (
      !inputString.match(/^[A-Z]+$/g) &&
      inputString.charAt(0).match(/^[A-Z]/g)
    ) {
      return inputString.replace(/^[A-Z]+/g, (match) => match.toLowerCase());
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
  return pascalCaseString.replace(/^[A-Z]+/g, (match) => match.toLowerCase());
};

String.prototype.toSentenceCase = function () {
  return String(this)
    .split(/\.\s*/g)
    .map((string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    })
    .join('. ')
    .replace(/\s\./g, '.');
};

String.prototype.toKebabCase = function () {
  return String(this)
    .replace(/[^\w\-_\s]/g, '')
    .replace(/[\-_]+/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2') // add space between camelCase/PascalCase text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-');
};

String.prototype.toSnakeCase = function () {
  return this.toKebabCase().replace(/-/g, '_');
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
  const lines = this.split('\n');

  //#region Remove empty lines from start and end
  while (lines.length > 0 && lines[0].trim().length === 0) {
    lines.shift();
  }
  while (lines.length > 0 && lines[lines.length - 1].trim().length === 0) {
    lines.pop();
  }
  //#endregion

  const minIndent = Math.min(
    ...lines
      .map((line) => {
        if (line.trim().length > 0) {
          return line.match(/^(\s*)/)?.[0].length || 0;
        }
        return 0;
      })
      .filter((indent) => indent > 0)
  );
  return lines
    .map((line) => {
      if (line.trim().length > 0) {
        return line.replace(new RegExp(`^\\s{${minIndent}}`), '');
      }
      return line.trim();
    })
    .join('\n');
};
