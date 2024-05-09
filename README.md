1. Installera react testing library I ert projekt.

[checkout] https://github.com/actions/checkout

[github-docs] https://docs.github.com/en/actions/using-workflows/workflow-syntax-for-github-actions

deploy.yml

```yml
name: Deploy to EC2

on:
  push:
    branches:
      - main

jobs:
  deployment:
    name: Deploy
    runs-on: ubuntu-latest

    steps:
      - name: Check out Repo
        uses: actions/checkout@v4

      - name: Copy files to EC2
        uses: appleboy/scp-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USER }}
          key: ${{ secrets.SSH_KEY }}
          port: 22
          source: '.'
          target: '/home/ubuntu/docker-test2'

      - name: Run Docker on EC2
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USER }}
          key: ${{ secrets.SSH_KEY }}
          port: 22
          script: |
            cd /home/ubuntu/docker-test2
            sudo docker-compose down
            sudo docker-compose up --build -d
```

Använd manual setup: https://nextjs.org/docs/pages/building-your-application/testing/jestLinks to an external site.

[PEM-INSTANC-SECRETS] https://github.com/fallowshades/chas_banksajt-cicd/settings/secrets/actions

2. Lägg in valfria unit-tests på några komponenter

package.json

```json
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint",
    "test": "jest --watch",
    "test:ci": "jest --ci"
  },
```

frontend/src/app/page.test.tsx

jsx need some conversion and "use client" need a fake DOM

```sh
npm install --save-dev jest@^29.7.0
npm install --save-dev jest-environment-jsdom@^29.7.0
npm install --save-dev @babel/core@^7.24.5
npm install --save-dev @babel/preset-env@^7.24.5
npm install --save-dev @babel/preset-react@^7.24.1
npm install --save-dev @testing-library/jest-dom@^6.4.5
npm install --save-dev @testing-library/react@^15.0.7

```

```babelrc
{
  "presets": ["@babel/preset-react"]
}
```

babel.config.js

```js
module.exports = {
  presets: [
    '@babel/preset-env', // Enables ES6+ features
    '@babel/preset-react', // Enables React specific features
  ],
}
```

jest.config.js

```js
module.exports = {
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },

  testEnvironment: 'jsdom',
}
```

page.jsx

```js
'use client'
import React from 'react'
...
```

```jsx
import { render, screen } from '@testing-library/react'
import Page from './page'

it('App Router: Works with Server Components', () => {
  render(<Page />)

  screen.debug()

  expect(screen.getByRole('heading')).toHaveTextContent('hopp')
})
```

3. Skapa ett github actions script som genomför tester och deployar koden på aws.

Se föregående veckas föreläsningar för exempel på script.
