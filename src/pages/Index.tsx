import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const HERO_IMG =
  'https://cdn.poehali.dev/projects/18457ce4-e852-4f5b-a062-6751e611250a/files/c94a9495-8f12-4ac2-844e-e08c1f30b2be.jpg';

const NAV = [
  { id: 'home', label: 'Главная' },
  { id: 'catalog', label: 'Каталог' },
  { id: 'delivery', label: 'Доставка' },
  { id: 'about', label: 'О компании' },
  { id: 'contacts', label: 'Контакты' },
];

const CATEGORIES = [
  'Все',
  'Кабель',
  'Фасад',
  'Облицовка',
  'Утеплитель',
  'Подсистема',
  'Электрика и лотки',
  'Светильники',
  'Керамогранит',
  'Лифты',
  'Кодовые замки',
  'Радиаторы',
  'Корзины для кондиционеров',
];
const PROPERTIES = ['Морозостойкий', 'Влагостойкий', 'Огнеупорный', 'Сертифицирован'];

const BASE = 'https://cdn.poehali.dev/projects/18457ce4-e852-4f5b-a062-6751e611250a/files/';
const CAT_IMAGES: Record<string, string> = {
  'Кабель': BASE + 'e4125c44-695d-4f74-b871-9e77a24fa526.jpg',
  'Фасад': BASE + '20e3c65d-98b2-4aa0-9b9c-5bad2dbacedb.jpg',
  'Облицовка': BASE + '421a61bd-8359-45c9-b5f7-7bac3d166bcc.jpg',
  'Утеплитель': BASE + '3a998ffa-5270-4520-b831-7d3bffbe3015.jpg',
  'Подсистема': BASE + '5d8622b1-82dd-4bc8-ac1d-7d347a65b686.jpg',
  'Электрика и лотки': BASE + 'dd7dc330-a0f7-4070-9784-79d38de00bd5.jpg',
  'Светильники': BASE + 'e3963edb-4a76-4d48-a955-fb2cd510c7ab.jpg',
  'Керамогранит': BASE + '4e9782b3-086a-490b-af8b-e58f2aed7dcf.jpg',
  'Лифты': BASE + 'c802ff0f-01de-4b74-89a9-dfdde6220cd6.jpg',
  'Кодовые замки': BASE + '00ddee7e-3697-4428-ac56-1753deba2e60.jpg',
  'Радиаторы': BASE + 'f11bfacc-b33d-4a24-9b26-8dc510e6f22e.jpg',

};

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  unit: string;
  props: string[];
  icon: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: 'Кабель ВВГнг-LS 3x2.5', category: 'Кабель', price: 95, unit: 'м', props: ['Огнеупорный', 'Сертифицирован'], icon: 'Cable' },
  { id: 2, name: 'Кабель силовой АВВГ 4x16', category: 'Кабель', price: 320, unit: 'м', props: ['Сертифицирован'], icon: 'Cable' },
  { id: 3, name: 'Фасадная панель HPL', category: 'Фасад', price: 2400, unit: 'м²', props: ['Влагостойкий', 'Морозостойкий', 'Сертифицирован'], icon: 'LayoutPanelTop' },
  { id: 4, name: 'Фасадная кассета алюм.', category: 'Фасад', price: 1850, unit: 'м²', props: ['Морозостойкий', 'Огнеупорный'], icon: 'LayoutPanelTop' },
  { id: 5, name: 'Облицовочный кирпич М-150', category: 'Облицовка', price: 28, unit: 'шт', props: ['Морозостойкий', 'Влагостойкий'], icon: 'Grid3x3' },
  { id: 6, name: 'Клинкерная плитка', category: 'Облицовка', price: 1290, unit: 'м²', props: ['Морозостойкий', 'Влагостойкий', 'Сертифицирован'], icon: 'Grid3x3' },
  { id: 7, name: 'Минеральная вата 100мм', category: 'Утеплитель', price: 1350, unit: 'упаковка', props: ['Огнеупорный', 'Влагостойкий'], icon: 'Layers' },
  { id: 8, name: 'Пеноплэкс 50мм', category: 'Утеплитель', price: 1680, unit: 'упаковка', props: ['Влагостойкий', 'Морозостойкий'], icon: 'Layers' },
  { id: 9, name: 'Подсистема фасадная оцинк.', category: 'Подсистема', price: 540, unit: 'компл/м²', props: ['Сертифицирован', 'Морозостойкий'], icon: 'Frame' },
  { id: 10, name: 'Кронштейн фасадный нерж.', category: 'Подсистема', price: 180, unit: 'шт', props: ['Сертифицирован', 'Огнеупорный'], icon: 'Frame' },
  { id: 11, name: 'Лоток кабельный 100x50', category: 'Электрика и лотки', price: 430, unit: 'м', props: ['Огнеупорный', 'Сертифицирован'], icon: 'Zap' },
  { id: 12, name: 'Автомат C16 1P', category: 'Электрика и лотки', price: 290, unit: 'шт', props: ['Сертифицирован'], icon: 'Zap' },
  { id: 13, name: 'Светильник LED 36W IP65', category: 'Светильники', price: 1450, unit: 'шт', props: ['Влагостойкий', 'Сертифицирован'], icon: 'Lightbulb' },
  { id: 14, name: 'Прожектор LED 100W', category: 'Светильники', price: 2890, unit: 'шт', props: ['Влагостойкий', 'Морозостойкий'], icon: 'Lightbulb' },
  { id: 15, name: 'Керамогранит 600x600 матовый', category: 'Керамогранит', price: 890, unit: 'м²', props: ['Морозостойкий', 'Влагостойкий', 'Сертифицирован'], icon: 'Square' },
  { id: 16, name: 'Керамогранит 1200x600 полир.', category: 'Керамогранит', price: 1650, unit: 'м²', props: ['Влагостойкий', 'Сертифицирован'], icon: 'Square' },
  { id: 17, name: 'Лифт пассажирский 1000 кг', category: 'Лифты', price: 1250000, unit: 'шт', props: ['Сертифицирован'], icon: 'ArrowUpDown' },
  { id: 18, name: 'Лифт грузовой 2000 кг', category: 'Лифты', price: 1850000, unit: 'шт', props: ['Сертифицирован', 'Огнеупорный'], icon: 'ArrowUpDown' },
  { id: 19, name: 'Кодовый замок электронный', category: 'Кодовые замки', price: 8900, unit: 'шт', props: ['Влагостойкий', 'Сертифицирован'], icon: 'KeyRound' },
  { id: 20, name: 'Замок врезной с кодом', category: 'Кодовые замки', price: 5400, unit: 'шт', props: ['Сертифицирован'], icon: 'KeyRound' },
  { id: 21, name: 'Радиатор биметалл 500/80', category: 'Радиаторы', price: 720, unit: 'секция', props: ['Морозостойкий', 'Сертифицирован'], icon: 'Thermometer' },
  { id: 22, name: 'Радиатор алюминиевый 350', category: 'Радиаторы', price: 580, unit: 'секция', props: ['Сертифицирован'], icon: 'Thermometer' },
  { id: 23, name: 'Корзина для кондиционера', category: 'Корзины для кондиционеров', price: 2100, unit: 'шт', props: ['Морозостойкий', 'Влагостойкий', 'Сертифицирован'], icon: 'Wind' },
  { id: 24, name: 'Корзина усиленная окраш.', category: 'Корзины для кондиционеров', price: 2950, unit: 'шт', props: ['Морозостойкий', 'Огнеупорный'], icon: 'Wind' },
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [category, setCategory] = useState('Все');
  const [priceMax, setPriceMax] = useState(80000);
  const [selectedProps, setSelectedProps] = useState<string[]>([]);

  const toggleProp = (p: string) =>
    setSelectedProps((prev) => (prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]));

  const filtered = useMemo(
    () =>
      PRODUCTS.filter((p) => {
        const byCat = category === 'Все' || p.category === category;
        const byPrice = p.price <= priceMax;
        const byProps = selectedProps.every((sp) => p.props.includes(sp));
        return byCat && byPrice && byProps;
      }),
    [category, priceMax, selectedProps]
  );

  const scrollTo = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      {/* HEADER */}
      <header className="fixed top-0 z-50 w-full border-b border-border bg-background/85 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <button onClick={() => scrollTo('home')} className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center bg-primary text-primary-foreground">
              <Icon name="Hammer" size={20} />
            </div>
            <span className="font-display text-xl font-bold tracking-wider">УНИСТРОЙ МАРКЕТ</span>
          </button>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV.map((n) => (
              <button
                key={n.id}
                onClick={() => scrollTo(n.id)}
                className={`px-4 py-2 font-display text-sm uppercase tracking-wide transition-colors ${
                  activeSection === n.id ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                {n.label}
              </button>
            ))}
          </nav>
          <a href="tel:+79655936359" className="hidden sm:flex">
            <Button className="font-display uppercase tracking-wide">
              <Icon name="Phone" size={16} className="mr-2" />
              +7 965 593-63-59
            </Button>
          </a>
        </div>
      </header>

      {/* HERO */}
      <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/80 to-background/30" />
          <div className="absolute inset-0 grid-texture opacity-30" />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl animate-fade-in">
            <div className="mb-6 inline-flex items-center gap-2 border border-primary/40 bg-primary/10 px-4 py-1.5">
              <span className="h-2 w-2 animate-pulse bg-primary" />
              <span className="font-display text-xs uppercase tracking-[0.2em] text-primary">Поставки по всей России</span>
            </div>
            <h1 className="font-display text-5xl font-bold uppercase leading-[0.95] tracking-tight md:text-7xl">
              Строительные <br />
              материалы <span className="text-gradient-orange">оптом</span> <br />
              и в розницу
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Кабель, фасадные системы, утеплитель, электрика, светильники, керамогранит, лифты и инженерное оборудование. Прямые поставки с заводов и доставка точно в срок.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button size="lg" onClick={() => scrollTo('catalog')} className="font-display text-base uppercase tracking-wide">
                Перейти в каталог
                <Icon name="ArrowRight" size={18} className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" onClick={() => scrollTo('delivery')} className="font-display text-base uppercase tracking-wide">
                Условия доставки
              </Button>
            </div>
            <div className="mt-14 grid max-w-lg grid-cols-3 gap-6">
              {[
                { v: '12 лет', l: 'на рынке' },
                { v: '5 000+', l: 'позиций' },
                { v: '24/7', l: 'отгрузка' },
              ].map((s) => (
                <div key={s.l} className="border-l-2 border-primary pl-4">
                  <div className="font-display text-3xl font-bold">{s.v}</div>
                  <div className="text-sm uppercase tracking-wide text-muted-foreground">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CATALOG */}
      <section id="catalog" className="border-t border-border py-24">
        <div className="container">
          <SectionTitle num="01" title="Каталог" subtitle="Подберите материалы с помощью фильтров" />
          <div className="mt-12 grid gap-8 lg:grid-cols-[280px_1fr]">
            {/* FILTERS */}
            <aside className="h-fit space-y-8 border border-border bg-card p-6 lg:sticky lg:top-24">
              <div>
                <h3 className="mb-4 font-display text-sm uppercase tracking-widest text-primary">Категория</h3>
                <div className="space-y-1">
                  {CATEGORIES.map((c) => (
                    <button
                      key={c}
                      onClick={() => setCategory(c)}
                      className={`block w-full text-left px-3 py-2 text-sm transition-colors ${
                        category === c ? 'bg-primary text-primary-foreground' : 'hover:bg-secondary'
                      }`}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-display text-sm uppercase tracking-widest text-primary">Цена до</h3>
                <Slider value={[priceMax]} onValueChange={(v) => setPriceMax(v[0])} max={80000} step={500} className="my-4" />
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span>0 ₽</span>
                  <span className="font-display text-foreground">{priceMax.toLocaleString('ru-RU')} ₽</span>
                </div>
              </div>

              <div>
                <h3 className="mb-4 font-display text-sm uppercase tracking-widest text-primary">Характеристики</h3>
                <div className="space-y-3">
                  {PROPERTIES.map((p) => (
                    <label key={p} className="flex cursor-pointer items-center gap-3 text-sm">
                      <Checkbox checked={selectedProps.includes(p)} onCheckedChange={() => toggleProp(p)} />
                      {p}
                    </label>
                  ))}
                </div>
              </div>

              <Button
                variant="outline"
                className="w-full font-display uppercase tracking-wide"
                onClick={() => {
                  setCategory('Все');
                  setPriceMax(80000);
                  setSelectedProps([]);
                }}
              >
                <Icon name="RotateCcw" size={16} className="mr-2" />
                Сбросить
              </Button>
            </aside>

            {/* PRODUCTS */}
            <div>
              <div className="mb-6 flex items-center justify-between border-b border-border pb-4">
                <span className="text-sm text-muted-foreground">
                  Найдено: <span className="font-display text-foreground">{filtered.length}</span>
                </span>
                <span className="font-display text-sm uppercase tracking-wide text-muted-foreground">{category}</span>
              </div>
              {filtered.length === 0 ? (
                <div className="flex flex-col items-center justify-center border border-dashed border-border py-24 text-muted-foreground">
                  <Icon name="SearchX" size={40} />
                  <p className="mt-4 font-display uppercase tracking-wide">Ничего не найдено</p>
                </div>
              ) : (
                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((p) => (
                    <div key={p.id} className="hover-lift group flex flex-col border border-border bg-card animate-scale-in">
                      <div className="relative h-44 overflow-hidden border-b border-border bg-secondary/40">
                        {CAT_IMAGES[p.category] ? (
                          <img
                            src={CAT_IMAGES[p.category]}
                            alt={p.category}
                            className="h-full w-full object-cover opacity-70 transition-all duration-500 group-hover:opacity-90 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center">
                            <Icon name={p.icon} size={48} className="text-muted-foreground" />
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent" />
                        <span className="absolute left-0 top-0 bg-primary px-2 py-1 font-display text-[10px] uppercase tracking-wider text-primary-foreground">
                          {p.category}
                        </span>
                      </div>
                      <div className="flex flex-1 flex-col p-5">
                        <h4 className="font-display text-lg font-semibold leading-tight">{p.name}</h4>
                        <div className="mt-3 flex flex-wrap gap-1.5">
                          {p.props.map((pr) => (
                            <span key={pr} className="border border-border px-2 py-0.5 text-[11px] text-muted-foreground">
                              {pr}
                            </span>
                          ))}
                        </div>
                        <div className="mt-auto pt-5">
                          <Button variant="secondary" className="w-full hover:bg-primary hover:text-primary-foreground font-display uppercase tracking-wide text-sm">
                            <Icon name="Phone" size={16} className="mr-2" />
                            Узнать цену
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="border-t border-border bg-card/40 py-24">
        <div className="container">
          <SectionTitle num="02" title="Доставка" subtitle="Привезём на объект быстро и аккуратно" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: 'Truck', t: 'Своя логистика', d: 'Парк манипуляторов и фур. Разгрузка на объекте включена в стоимость.' },
              { icon: 'Clock', t: 'Точно в срок', d: 'Доставка день в день по городу и в течение 1–3 дней по регионам.' },
              { icon: 'MapPin', t: 'Вся Россия', d: 'Отгрузка ж/д и автотранспортом в любой регион страны.' },
            ].map((c) => (
              <div key={c.t} className="border border-border bg-background p-8 hover-lift">
                <div className="flex h-12 w-12 items-center justify-center bg-primary/10 text-primary">
                  <Icon name={c.icon} size={24} />
                </div>
                <h4 className="mt-5 font-display text-xl uppercase tracking-wide">{c.t}</h4>
                <p className="mt-3 text-muted-foreground">{c.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-border py-24">
        <div className="container grid gap-12 lg:grid-cols-2 lg:items-center">
          <div>
            <SectionTitle num="03" title="О компании" subtitle="" />
            <p className="mt-6 text-lg text-muted-foreground">
              «Унистрой Маркет» — поставщик строительных материалов с 2013 года. Мы работаем напрямую с заводами-производителями, что гарантирует честную цену и стабильное качество.
            </p>
            <p className="mt-4 text-muted-foreground">
              Собственные склады, лаборатория контроля качества и команда инженеров помогут подобрать материалы под любой проект — от частного дома до промышленного объекта.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-6">
              {[
                { icon: 'ShieldCheck', t: 'Гарантия качества' },
                { icon: 'Receipt', t: 'Работаем с НДС' },
                { icon: 'Warehouse', t: 'Свои склады' },
                { icon: 'Headset', t: 'Поддержка 24/7' },
              ].map((f) => (
                <div key={f.t} className="flex items-center gap-3">
                  <Icon name={f.icon} size={22} className="text-primary" />
                  <span className="font-display uppercase tracking-wide text-sm">{f.t}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { v: '12', l: 'лет опыта' },
              { v: '8 000', l: 'клиентов' },
              { v: '40', l: 'регионов' },
              { v: '99%', l: 'в срок' },
            ].map((s) => (
              <div key={s.l} className="flex flex-col justify-center border border-border bg-card p-8">
                <div className="font-display text-4xl font-bold text-primary">{s.v}</div>
                <div className="mt-2 uppercase tracking-wide text-muted-foreground text-sm">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="border-t border-border bg-card/40 py-24">
        <div className="container">
          <SectionTitle num="04" title="Контакты" subtitle="Свяжитесь с нами любым удобным способом" />
          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              { icon: 'Phone', t: 'Телефон', v: '+7 965 593-63-59', s: 'Османова Гульнур' },
              { icon: 'Mail', t: 'Почта', v: 'gz.osmanova@unistroyrf.ru', s: 'Ответим в течение часа' },
              { icon: 'MapPin', t: 'Адрес', v: 'г. Москва, Промзона 4', s: 'Пн–Сб 8:00–20:00' },
            ].map((c) => (
              <div key={c.t} className="border border-border bg-background p-8 hover-lift">
                <Icon name={c.icon} size={26} className="text-primary" />
                <h4 className="mt-5 font-display text-sm uppercase tracking-widest text-muted-foreground">{c.t}</h4>
                <p className="mt-1 font-display text-xl">{c.v}</p>
                <p className="mt-1 text-sm text-muted-foreground">{c.s}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 flex flex-col items-center justify-between gap-8 border border-primary/40 bg-primary/5 p-10 md:flex-row">
            <div className="flex items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center bg-primary text-primary-foreground">
                <Icon name="UserRound" size={32} />
              </div>
              <div>
                <p className="text-sm uppercase tracking-widest text-muted-foreground font-display">Ваш специалист</p>
                <h3 className="font-display text-2xl font-bold">Османова Гульнур</h3>
                <p className="mt-1 text-muted-foreground">Подберёт материалы под ваш проект и рассчитает стоимость</p>
              </div>
            </div>
            <a href="tel:+79655936359">
              <Button size="lg" className="font-display text-base uppercase tracking-wide whitespace-nowrap">
                <Icon name="Phone" size={18} className="mr-2" />
                +7 965 593-63-59
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-border py-10">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center bg-primary text-primary-foreground">
              <Icon name="Hammer" size={16} />
            </div>
            <span className="font-display text-lg tracking-wider">УНИСТРОЙ МАРКЕТ</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Унистрой Маркет. Строительные материалы оптом и в розницу.</p>
        </div>
      </footer>
    </div>
  );
};

const SectionTitle = ({ num, title, subtitle }: { num: string; title: string; subtitle: string }) => (
  <div>
    <div className="flex items-center gap-4">
      <span className="font-display text-sm text-primary tracking-widest">{num}</span>
      <span className="h-px w-12 bg-primary" />
      <h2 className="font-display text-4xl font-bold uppercase tracking-tight md:text-5xl">{title}</h2>
    </div>
    {subtitle && <p className="mt-3 text-muted-foreground">{subtitle}</p>}
  </div>
);

export default Index;