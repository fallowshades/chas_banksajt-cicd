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

3. Skapa ett github actions script som genomför tester och deployar koden på aws.

Se föregående veckas föreläsningar för exempel på script.
