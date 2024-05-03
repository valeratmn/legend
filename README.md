# Инструкция по разворачиванию приложения

Для успешного разворачивания и запуска приложения выполните следующие шаги:

## 1. Запуск базы данных

Перейдите в директорию `database`, где находится файл `docker-compose.yml`, и выполните следующую команду для запуска контейнера с базой данных:

```bash
docker-compose up -d
```

Эта команда запустит контейнер в фоновом режиме. Убедитесь, что в логах появилось сообщение `mysqld: ready for connections`, что означает, что база данных готова к подключениям.

## 2. Запуск сервера

После того как база данных будет готова, перейдите в директорию `server` и выполните следующую команду для запуска сервера:

```bash
npm run start
```

Эта команда запустит серверное приложение, которое начнет обрабатывать запросы к вашему API.

## 3. Запуск клиентского приложения

После запуска сервера перейдите в директорию `client` и выполните следующую команду для запуска клиентского приложения:

```bash
npm run dev
```

Эта команда запустит клиентское приложение в режиме разработки. После запуска вы сможете обращаться к приложению через браузер.

## Общие сведения

- Убедитесь, что все зависимости установлены в каждом из проектов (database, server, client) с помощью команды `npm install` перед запуском соответствующих компонентов.
- Проверьте, что порты, необходимые для работы приложений, не заняты другими процессами.
- В случае возникновения ошибок смотрите логи каждого из компонентов для диагностики проблем.

Следуя этим инструкциям, вы сможете успешно развернуть и запустить ваше приложение.