# КЭИ Токен - Образовательная криптовалюта

КЭИ токен — это криптовалюта образовательной экосистемы Колледжа экономики и информатики имени А. Н. Афанасьева Ульяновского государственного технического университета.

## 🚀 Быстрый старт

### Предварительные требования

Перед запуском проекта убедитесь, что у вас установлены:

#### 1. Node.js (обязательно)
- **Минимальная версия**: 18.x или выше
- **Рекомендуемая версия**: 20.x или выше

**Как установить:**
- **macOS**: Скачайте с [nodejs.org](https://nodejs.org/) или используйте Homebrew: `brew install node`
- **Windows**: Скачайте установщик с [nodejs.org](https://nodejs.org/)
- **Linux**: `sudo apt install nodejs npm` (Ubuntu/Debian) или `sudo dnf install nodejs npm` (Fedora)

**Проверка установки:**
```bash
node --version
npm --version
```

#### 2. Git (обязательно)
- **macOS**: `brew install git` или скачайте с [git-scm.com](https://git-scm.com/)
- **Windows**: Скачайте с [git-scm.com](https://git-scm.com/)
- **Linux**: `sudo apt install git` (Ubuntu/Debian)

**Проверка установки:**
```bash
git --version
```

#### 3. Bun (опционально, но рекомендуется)
Альтернативный пакетный менеджер для более быстрой установки зависимостей:

**Установка:**
```bash
curl -fsSL https://bun.sh/install | bash
```

**Проверка установки:**
```bash
bun --version
```

### Установка и запуск проекта

#### Шаг 1: Клонирование репозитория
```bash
git clone <URL_ВАШЕГО_РЕПОЗИТОРИЯ>
cd keitoken
```

#### Шаг 2: Установка зависимостей

**Вариант 1: Используя npm (стандартный)**
```bash
npm install
```

**Вариант 2: Используя Bun (быстрее)**
```bash
bun install
```

#### Шаг 3: Запуск проекта в режиме разработки

**Вариант 1: Используя npm**
```bash
npm run dev
```

**Вариант 2: Используя Bun**
```bash
bun dev
```

После запуска проект будет доступен по адресу: `http://localhost:5173`

### Другие команды

```bash
# Сборка для продакшена
npm run build

# Предварительный просмотр собранного проекта
npm run preview

# Проверка кода линтером
npm run lint
```

## 🛠 Технологический стек

- **Frontend**: React 18 + TypeScript
- **Стилизация**: Tailwind CSS + shadcn/ui
- **Сборщик**: Vite
- **Роутинг**: React Router DOM
- **UI компоненты**: Radix UI
- **Иконки**: Lucide React

## 📁 Структура проекта

```
keitoken/
├── src/
│   ├── components/     # React компоненты
│   ├── pages/         # Страницы приложения
│   ├── lib/           # Утилиты и конфигурации
│   └── ...
├── public/            # Статические файлы
├── package.json       # Зависимости проекта
├── vite.config.ts     # Конфигурация Vite
└── tailwind.config.ts # Конфигурация Tailwind
```

## 🔧 Конфигурация

### Переменные окружения
Создайте файл `.env.local` в корне проекта:

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Supabase
Проект использует Supabase для базы данных. Убедитесь, что у вас настроен Supabase проект и указаны правильные переменные окружения.

## 🐛 Решение проблем

### Ошибка "command not found: node"
- Убедитесь, что Node.js установлен корректно
- Перезапустите терминал после установки

### Ошибка "EACCES: permission denied"
- На macOS/Linux: `sudo npm install`
- Или настройте npm для работы без sudo: `npm config set prefix ~/.npm-global`

### Ошибка "Port 5173 is already in use"
- Измените порт в `vite.config.ts` или остановите процесс, использующий порт 5173

### Медленная установка зависимостей
- Используйте Bun: `bun install`
- Или настройте npm registry: `npm config set registry https://registry.npmjs.org/`

## 📞 Поддержка

Если у вас возникли проблемы с установкой или запуском проекта, создайте issue в репозитории или обратитесь к команде разработки.

## 📄 Лицензия

Этот проект является частью образовательной экосистемы КЭИ. 