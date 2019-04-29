const { dql } = require('../src');

describe('[dql]', () => {
  let data = {};
  beforeEach(() => {
    data = {
      test: {
        test2: {
          test3: {
            test4: {
              test5: 10,
              box: [
                { name: { full: true }, age: 10 },
                { name: { full: false }, age: 2 }
              ]
            },
            age: 10
          }
        }
      },
      peoples: 2
    };
  });

  test('should return full object structure', () => {
    const value = dql(data)` 
      test { 
        test2 { 
          test3 { 
            test4 { 
               test5
            } 
          }
        }
      }`;

    expect(value).toEqual({ test: { test2: {test3: {test4: { test5: 10 }}}}});
  });

  test('should works in arrays', () => {
    const value = dql(data)` 
      test { 
        test2 { 
          test3 { 
            test4 { 
              box {
                name
              }
            } 
          }
        }
      }`;

    const dataExpected = {
      test: {
        test2: {
          test3: {
            test4: {
              box: [
                { name: { full: true } },
                { name: { full: false } }
              ]
            }
          }
        }
      }
    };

    expect(value).toEqual(dataExpected);
  });


  test('should return key if is not found', () => {
    const value = dql(data)` 
      test { 
        testdsjj
      }`;

    expect(value).toEqual({ test: {} });
  });

  test('should order by specific prop', () => {
    const value = dql(data)` 
      test { 
        test2 { 
          test3 { 
            test4 { 
               box(orderBy: age) {
                  name
               }
            } 
          }
        }
      }`;

    const dataOrdered = {
      test: {
        test2: {
          test3: {
            test4: {
              box: [
                { name: { full: false } },
                { name: { full: true } }
              ]
            }
          }
        }
      }
    };

    expect(value).toEqual(dataOrdered);
  });
});
