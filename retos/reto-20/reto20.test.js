const howManyReindeers = require('./index.js')

test('Test #1 - Retorna un Array', () => {
  expect(
    Array.isArray(
      howManyReindeers([
        { type: 'Nuclear', weightCapacity: 50 },
        { type: 'Electric', weightCapacity: 10 },
        { type: 'Gasoline', weightCapacity: 5 },
        { type: 'Diesel', weightCapacity: 1 }
      ], [
        { country: 'Spain', weight: 30 },
        { country: 'France', weight: 17 },
        { country: 'Italy', weight: 50 }
      ])
    )
  ).toStrictEqual(true)
})

test("Test #2", () => {
  expect(
    howManyReindeers([
      { type: 'Nuclear', weightCapacity: 50 },
      { type: 'Electric', weightCapacity: 10 },
      { type: 'Gasoline', weightCapacity: 5 },
      { type: 'Diesel', weightCapacity: 1 }
    ], [
      { country: 'Spain', weight: 30 },
      { country: 'France', weight: 17 },
      { country: 'Italy', weight: 50 }
    ])
  ).toStrictEqual([
    {
      "country": "Spain",
      "reindeers": [
        {
          "type": "Electric",
          "num": 1
        },
        {
          "type": "Gasoline",
          "num": 3
        },
        {
          "type": "Diesel",
          "num": 5
        }
      ]
    },
    {
      "country": "France",
      "reindeers": [
        {
          "type": "Electric",
          "num": 1
        },
        {
          "type": "Gasoline",
          "num": 1
        },
        {
          "type": "Diesel",
          "num": 2
        }
      ]
    },
    {
      "country": "Italy",
      "reindeers": [
        {
          "type": "Electric",
          "num": 3
        },
        {
          "type": "Gasoline",
          "num": 3
        },
        {
          "type": "Diesel",
          "num": 5
        }
      ]
    }
  ])
})

test("Test #3", () => {
  expect(
    howManyReindeers(
      [
        { type: 'Electric', weightCapacity: 10 },
        { type: 'Gasoline', weightCapacity: 5 },
        { type: 'Diesel', weightCapacity: 1 }
      ],
      [{ country: 'Spain', weight: 37 }]
    )
  ).toStrictEqual([
    {
      "country": "Spain",
      "reindeers": [
        {
          "type": "Electric",
          "num": 2
        },
        {
          "type": "Gasoline",
          "num": 2
        },
        {
          "type": "Diesel",
          "num": 7
        }
      ]
    }
  ])
})

test("Test #4", () => {
  expect(
    howManyReindeers(
      [
        { type: 'Nuclear', weightCapacity: 50 },
        { type: 'Electric', weightCapacity: 10 },
        { type: 'Gasoline', weightCapacity: 5 },
        { type: 'Diesel', weightCapacity: 1 }
      ],
      [
        { country: 'Spain', weight: 30 },
        { country: 'Germany', weight: 7 },
        { country: 'France', weight: 17 },
        { country: 'Italy', weight: 50 }
      ])
  ).toStrictEqual([
    {
      "country": "Spain",
      "reindeers": [
        {
          "type": "Electric",
          "num": 1
        },
        {
          "type": "Gasoline",
          "num": 3
        },
        {
          "type": "Diesel",
          "num": 5
        }
      ]
    },
    {
      "country": "Germany",
      "reindeers": [
        {
          "type": "Gasoline",
          "num": 1
        },
        {
          "type": "Diesel",
          "num": 2
        }
      ]
    },
    {
      "country": "France",
      "reindeers": [
        {
          "type": "Electric",
          "num": 1
        },
        {
          "type": "Gasoline",
          "num": 1
        },
        {
          "type": "Diesel",
          "num": 2
        }
      ]
    },
    {
      "country": "Italy",
      "reindeers": [
        {
          "type": "Electric",
          "num": 3
        },
        {
          "type": "Gasoline",
          "num": 3
        },
        {
          "type": "Diesel",
          "num": 5
        }
      ]
    }
  ])
})

test("Test #5", () => {
  expect(
    howManyReindeers(
      [
        { type: 'Diesel', weightCapacity: 1 },
        { type: 'Gasoline', weightCapacity: 5 }
      ],
      [
        { country: 'Spain', weight: 30 },
        { country: 'Germany', weight: 7 }
      ])
  ).toStrictEqual([
    {
      "country": "Spain",
      "reindeers": [
        {
          "type": "Gasoline",
          "num": 5
        },
        {
          "type": "Diesel",
          "num": 5
        }
      ]
    },
    {
      "country": "Germany",
      "reindeers": [
        {
          "type": "Gasoline",
          "num": 1
        },
        {
          "type": "Diesel",
          "num": 2
        }
      ]
    }
  ])
})

test("Custom Test", () => {
  expect(
    howManyReindeers(
      [
        { type: 'Diesel', weightCapacity: 1 },
        { type: 'Gasoline', weightCapacity: 8 }
      ],
      [
        { country: 'Colombia', weight: 50 },
        { country: 'España', weight: 20 }
      ])
  ).toStrictEqual([
    {
      country: 'Colombia',
      reindeers: [
        { type: 'Gasoline', num: 5 },
        { type: 'Diesel', num: 10 }
      ]
    },
    {
      country: 'España',
      reindeers: [
        { type: 'Gasoline', num: 2 },
        { type: 'Diesel', num: 4 }
      ]
    }
  ])
})