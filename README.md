# Number Classification API

A REST API that provides mathematical properties and fun facts about numbers.

## Project Structure

```
number-classifier-api/
├── src/
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── numberUtils.ts
│   ├── services/
│   │   └── numbersApi.ts
│   ├── controllers/
│   │   └── numberController.ts
│   ├── routes/
│   │   └── index.ts
│   ├── app.ts
│   └── server.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Features

- Number classification (prime, perfect)
- Armstrong number detection
- Digit sum calculation
- Fun facts about numbers
- CORS enabled
- Input validation
- Error handling

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/number-classifier-api.git
cd number-classifier-api
```

2. Install dependencies:
```bash
npm install
```

3. Build the project:
```bash
npm run build
```

4. Start the server:
```bash
npm start
```

For development:
```bash
npm run dev
```

## API Documentation

### Classify Number

Get mathematical properties and fun facts about a number.

**Endpoint:** `GET /api/classify-number`

**Parameters:**
- `number` (required) - The number to classify

**Success Response (200 OK):**
```json
{
    "number": 371,
    "is_prime": false,
    "is_perfect": false,
    "properties": ["armstrong", "odd"],
    "digit_sum": 11,
    "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

**Error Response (400 Bad Request):**
```json
{
    "number": "invalid_input",
    "error": true
}
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT
