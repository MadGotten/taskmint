# Taskmint
Taskmint is an easy-to-use task management tool designed to help you stay organized and get things done. Create boards to organize your tasks, then add details like due dates, descriptions, and status updates. Taskmint keeps everything in one place so you can focus on what matters most.

## Setup

Clone the project

```bash
git clone https://github.com/MadGotten/taskmint
```

Go to the project directory and copy .env

```bash
cd my-project

cp .env.example .env
```

Install dependencies

```bash
composer install

npm install
```

Prepare project

```bash
php artisan key:generate

php artisan migrate
```

Start the server

```bash
php artisan serve

npm run dev
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
