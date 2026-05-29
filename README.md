# Түркістан тұлғалары

Түркістан топырағында дүниеге келген тарихи тұлғаларға арналған сайт.
React + Vite, светлый минималистичный архивно-официальный стиль.

## Іске қосу

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production құрастыру → dist/
```

## Архитектура

```
public/figures/        — тұлғалардың суреттері
src/
  data/figures.js      — БАРЛЫҚ контент осында (деректер базасы)
  components/           — Header, Footer, FigureCard
  pages/                — Home (тізім), Figure (жеке бет)
  index.css             — түс палитрасы, типографика, ортақ стильдер
```

## Жаңа тұлға қосу

1. Суретті `public/figures/` қалтасына салыңыз.
2. `src/data/figures.js` ішіндегі `figures` массивіне жаңа нысан қосыңыз:

```js
{
  slug: 'аты-жөні',           // URL: /tulga/аты-жөні
  name: 'Аты-жөні',
  born: '1900',
  bornFull: '1900 жылы 1 қаңтар',
  role: 'Кәсібі / қызметі',
  birthplace: 'Туған жері',
  portrait: '/figures/файл.jpg',
  lead: 'Қысқа кіріспе сөйлем.',
  biography: ['1-абзац', '2-абзац'],
  timeline: [{ year: '1900', text: 'Оқиға' }],
  awards: ['Марапат'],
  gallery: [{ src: '/figures/архив.jpg', caption: 'Сипаттама' }],
}
```

Басты бет пен жеке бет автоматты түрде жаңарады.
```
