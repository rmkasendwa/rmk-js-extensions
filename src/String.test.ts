import './String';

describe('toCamelCase', () => {
  it('should convert space-separated string to camel case', () => {
    const input = 'hello world';
    const expectedOutput = 'helloWorld';
    const actualOutput = input.toCamelCase();

    expect(actualOutput).toBe(expectedOutput);
  });

  it('should convert multi-word string with special characters to camel case', () => {
    const input = 'Hello_World 123_test';
    const expectedOutput = 'helloWorld123Test';
    const actualOutput = input.toCamelCase();

    expect(actualOutput).toBe(expectedOutput);
  });

  it('should return an empty string for an empty input', () => {
    const input = '';
    const expectedOutput = '';
    const actualOutput = input.toCamelCase();

    expect(actualOutput).toBe(expectedOutput);
  });

  it('should detect sub strings that are already camel case', () => {
    const input = 'Assignment teamMember';
    const expectedOutput = 'assignmentTeamMember';
    const actualOutput = input.toCamelCase();

    expect(actualOutput).toBe(expectedOutput);
  });
});
