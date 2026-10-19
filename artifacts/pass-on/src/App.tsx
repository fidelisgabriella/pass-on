import { type CSSProperties, type FormEvent, type ReactNode, createContext, useContext, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  CalendarDays,
  ArrowRight,
  Backpack,
  BadgeCheck,
  Check,
  ChevronRight,
  CircleHelp,
  Compass,
  Gift,
  Heart,
  Home,
  LogOut,
  MapPin,
  PackageOpen,
  Plus,
  Search,
  Shirt,
  SlidersHorizontal,
  Snowflake,
  Sparkles,
  Tag,
  UserRound,
  Watch,
  X,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import lostBackpackPhoto from '@assets/generated_images/pass-on-lost-backpack.jpg';
import lostHoodiePhoto from '@assets/generated_images/pass-on-lost-hoodie.jpg';
import lostPencilCasePhoto from '@assets/generated_images/pass-on-lost-pencil-case.jpg';
import lostBottlePhoto from '@assets/generated_images/pass-on-lost-bottle.jpg';
import lostHeadphonesPhoto from '@assets/generated_images/pass-on-lost-headphones.jpg';
import lostNotebookPhoto from '@assets/generated_images/pass-on-lost-notebook.jpg';
import { Link, Route, Router as WouterRouter, Switch, useLocation } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function PassOnMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" data-testid="brand-pass-on">
      <div className="relative grid size-9 place-items-center rounded-[13px] bg-primary shadow-[0_8px_18px_hsl(var(--primary)/.22)]">
        <span className="absolute left-[9px] top-[9px] size-[9px] rounded-full bg-primary-foreground" />
        <span className="absolute bottom-[9px] right-[9px] size-[9px] rounded-full bg-primary-foreground" />
        <span className="absolute left-[14px] top-[14px] h-[10px] w-[2px] rotate-45 rounded-full bg-primary-foreground" />
      </div>
      {!compact && <span className="text-[19px] font-black tracking-[-.065em] text-foreground">pass<span className="text-primary">on</span></span>}
    </div>
  );
}

function Login() {
  const [, setLocation] = useLocation();
  const [ra, setRa] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [recoverySent, setRecoverySent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRecoverySent(false);
    if (!ra.trim() || !password.trim()) {
      setError('Preencha seu RA e sua senha para continuar.');
      return;
    }
    setError('');
    setIsSubmitting(true);
    window.setTimeout(() => setLocation('/inicio'), 500);
  }

  return (
    <main className="app-noise app-grid min-h-[100dvh] bg-background" data-testid="page-login">
      <div className="mx-auto grid min-h-[100dvh] max-w-[1500px] lg:grid-cols-[.9fr_1.1fr]">
        <section className="relative hidden overflow-hidden bg-[#24153d] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-20">
          <div className="absolute -left-24 -top-28 size-[430px] rounded-full border border-[#d8b9ff]/15" />
          <div className="absolute -bottom-44 -right-24 size-[500px] rounded-full bg-[#6e43a8]/30 blur-3xl" />
          <div className="relative z-10"><PassOnMark /><span className="mt-14 inline-flex rounded-full border border-[#d8b9ff]/20 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.16em] text-[#e7d6ff]">comunidade entre alunos</span><h1 className="mt-7 max-w-[490px] text-[clamp(3.2rem,5vw,5.6rem)] font-black leading-[.91] tracking-[-.09em]">O que ainda serve<br /><span className="text-[#d8b9ff]">passa adiante.</span></h1><p className="mt-7 max-w-[390px] text-[15px] leading-7 text-[#dfd2ec]/75">O marketplace feito por quem vive os mesmos corredores. Compre, venda ou doe com quem você conhece.</p></div>
          <div className="relative z-10 rounded-3xl border border-white/10 bg-white/[.07] p-6"><div className="flex items-center gap-2 text-[#f9d66b]"><Sparkles className="size-4" /><span className="text-xs font-bold">feito para circular</span></div><p className="mt-3 text-sm leading-6 text-white/65">Uniformes, mochilas e achados da comunidade ganham uma nova história.</p></div>
        </section>
        <section className="flex min-h-[100dvh] flex-col justify-center px-5 py-8 sm:px-10 lg:px-24">
          <div className="mb-14 lg:hidden"><PassOnMark /></div>
          <div className="mx-auto w-full max-w-[410px]">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-primary">seu espaço de troca</p>
            <h1 className="mt-4 text-[42px] font-black leading-[.94] tracking-[-.08em] text-foreground sm:text-5xl">Entrar no<br /><span className="text-primary">Pass On.</span></h1>
            <p className="mt-5 text-sm leading-6 text-muted-foreground" data-testid="text-school-identity">Marketplace exclusivo para alunos da E. E. República do Suriname.</p>
            <form onSubmit={handleSubmit} className="mt-9 space-y-5" noValidate>
              <label className="block space-y-2"><span className="text-xs font-extrabold uppercase tracking-[.08em] text-secondary-foreground">RA</span><input id="ra" value={ra} onChange={(event) => { setRa(event.target.value); setError(''); }} placeholder="Digite seu registro acadêmico" autoComplete="username" className="focus-lilac h-14 w-full rounded-2xl border border-border bg-card px-4 text-sm outline-none transition-colors hover:border-primary/40 focus:border-primary" data-testid="input-ra" /></label>
              <label className="block space-y-2"><span className="text-xs font-extrabold uppercase tracking-[.08em] text-secondary-foreground">Senha</span><span className="relative block"><input id="password" value={password} onChange={(event) => { setPassword(event.target.value); setError(''); }} type={showPassword ? 'text' : 'password'} placeholder="Digite sua senha" autoComplete="current-password" className="focus-lilac h-14 w-full rounded-2xl border border-border bg-card px-4 pr-12 text-sm outline-none transition-colors hover:border-primary/40 focus:border-primary" data-testid="input-password" /><button type="button" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} onClick={() => setShowPassword((value) => !value)} className="focus-lilac absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-xl text-muted-foreground hover:bg-secondary hover:text-foreground" data-testid="button-toggle-password">{showPassword ? <X className="size-4" /> : <CircleHelp className="size-4" />}</button></span></label>
              {error && <div className="flex items-start gap-2 rounded-2xl border border-destructive/25 bg-destructive/10 px-4 py-3 text-xs leading-5 text-destructive" role="alert" data-testid="status-login-error"><CircleHelp className="mt-0.5 size-4 shrink-0" />{error}</div>}
              {recoverySent && <div className="flex items-start gap-2 rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-xs leading-5 text-primary" role="status" data-testid="status-login-recovery"><Check className="mt-0.5 size-4 shrink-0" />Este é um link demonstrativo. A equipe pode ajudar por aqui em breve.</div>}
              <button type="submit" disabled={isSubmitting} className="focus-lilac flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-black text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-[#38156b] disabled:opacity-60" data-testid="button-login">{isSubmitting ? 'Abrindo seu espaço...' : 'Entrar'}{!isSubmitting && <ArrowRight className="size-4" />}</button>
              <button type="button" onClick={() => { setRecoverySent(true); setError(''); }} className="focus-lilac mx-auto block rounded-lg px-2 py-1 text-xs font-bold text-muted-foreground hover:text-primary" data-testid="button-forgot-password">Esqueci minha senha</button>
            </form>
            <p className="mt-12 border-t border-border pt-5 text-[11px] leading-5 text-muted-foreground">Ambiente demonstrativo · seus dados não são enviados para nenhum serviço.</p>
          </div>
        </section>
      </div>
    </main>
  );
}

type Category = 'Roupas' | 'Roupas de frio' | 'Mochilas e estojos' | 'Acessórios';
type ListingMode = 'sale' | 'donation';
type Listing = { id: string; title: string; category: Category; condition: string; seller: string; price?: string; mode: ListingMode; note: string; icon: LucideIcon; art: string; artLight: string };

const categories: { label: Category; icon: LucideIcon; copy: string }[] = [
  { label: 'Roupas', icon: Shirt, copy: 'uniformes e peças' },
  { label: 'Roupas de frio', icon: Snowflake, copy: 'para os dias gelados' },
  { label: 'Mochilas e estojos', icon: Backpack, copy: 'prontos para a aula' },
  { label: 'Acessórios', icon: Watch, copy: 'pequenos achados' },
];

const listings: Listing[] = [
  { id: 'jaqueta-jeans', title: 'Jaqueta jeans oversized', category: 'Roupas de frio', condition: 'Muito bom estado', seller: 'Bia R.', price: 'R$ 48', mode: 'sale', note: 'tam. M · retirada combinada', icon: Shirt, art: '#6c4ba7', artLight: '#d9c4ef' },
  { id: 'mochila-coral', title: 'Mochila coral', category: 'Mochilas e estojos', condition: 'Bom estado', seller: 'Lucas T.', price: 'R$ 35', mode: 'sale', note: '3 compartimentos', icon: Backpack, art: '#d26f63', artLight: '#f5c4a9' },
  { id: 'sueter-lilas', title: 'Suéter lilás confortável', category: 'Roupas de frio', condition: 'Como novo', seller: 'Nina S.', price: 'R$ 32', mode: 'sale', note: 'tam. P · sem marcas', icon: Shirt, art: '#8a6db9', artLight: '#ddd0f2' },
  { id: 'relogio-digital', title: 'Relógio digital preto', category: 'Acessórios', condition: 'Bom estado', seller: 'Caio M.', price: 'R$ 18', mode: 'sale', note: 'pulseira ajustável', icon: Watch, art: '#33455e', artLight: '#b7c9dc' },
  { id: 'camiseta-uniforme', title: 'Camiseta branca de uniforme', category: 'Roupas', condition: 'Bom estado', seller: 'Joana P.', mode: 'donation', note: 'tam. P · lavada e pronta', icon: Shirt, art: '#b195ca', artLight: '#eadcf1' },
  { id: 'estojo-xadrez', title: 'Estojo xadrez', category: 'Mochilas e estojos', condition: 'Bom estado', seller: 'Duda F.', mode: 'donation', note: 'zíper funcionando', icon: PackageOpen, art: '#e0a05d', artLight: '#f8dfae' },
  { id: 'calca-esportiva', title: 'Calça esportiva preta', category: 'Roupas', condition: 'Bom estado', seller: 'Rafa L.', price: 'R$ 25', mode: 'sale', note: 'tam. G · confortável', icon: Shirt, art: '#4d536f', artLight: '#c9cadf' },
  { id: 'presilhas-coloridas', title: 'Kit de presilhas', category: 'Acessórios', condition: 'Como novo', seller: 'Maya C.', mode: 'donation', note: '6 unidades · sem uso', icon: Watch, art: '#cd708b', artLight: '#f3c1c9' },
];

type LostFoundStatus = 'Perdido' | 'Encontrado' | 'Devolvido';
type LostFoundCategory = 'Mochilas' | 'Roupas' | 'Estojos' | 'Acessórios' | 'Garrafas' | 'Materiais escolares' | 'Outros';
type LostFoundItem = {
  id: string;
  name: string;
  description: string;
  location: string;
  date: string;
  status: LostFoundStatus;
  category: LostFoundCategory;
  photo: string;
};

const lostFoundCategories: LostFoundCategory[] = [
  'Mochilas',
  'Roupas',
  'Estojos',
  'Acessórios',
  'Garrafas',
  'Materiais escolares',
  'Outros',
];

const lostFoundItems: LostFoundItem[] = [
  { id: 'found-backpack', name: 'Mochila azul-marinho', description: 'Mochila com chaveiro roxo no zíper.', location: 'Biblioteca, perto das mesas do fundo', date: '19 out. 2026', status: 'Encontrado', category: 'Mochilas', photo: lostBackpackPhoto },
  { id: 'lost-hoodie', name: 'Moletom cinza escuro', description: 'Moletom tamanho M, sem estampa.', location: 'Arquibancada da quadra', date: '18 out. 2026', status: 'Perdido', category: 'Roupas', photo: lostHoodiePhoto },
  { id: 'found-pencil-case', name: 'Estojo roxo com lápis', description: 'Estojo de tecido com lápis de cor dentro.', location: 'Sala 12, última carteira', date: '18 out. 2026', status: 'Encontrado', category: 'Estojos', photo: lostPencilCasePhoto },
  { id: 'lost-bottle', name: 'Garrafa lilás reutilizável', description: 'Garrafa com tampa rosqueável e adesivo de estrela.', location: 'Pátio coberto', date: '17 out. 2026', status: 'Perdido', category: 'Garrafas', photo: lostBottlePhoto },
  { id: 'returned-headphones', name: 'Fone de ouvido preto', description: 'Fone sem fio guardado no estojo preto.', location: 'Laboratório de informática', date: '16 out. 2026', status: 'Devolvido', category: 'Acessórios', photo: lostHeadphonesPhoto },
  { id: 'lost-notebook', name: 'Caderno e régua', description: 'Caderno espiral com capa azul e régua transparente.', location: 'Corredor do bloco B', date: '15 out. 2026', status: 'Perdido', category: 'Materiais escolares', photo: lostNotebookPhoto },
];

type MarketplaceContextValue = { favorites: string[]; toggleFavorite: (id: string) => void };
const MarketplaceContext = createContext<MarketplaceContextValue | null>(null);

function useMarketplace() {
  const context = useContext(MarketplaceContext);
  if (!context) throw new Error('Marketplace context is missing');
  return context;
}

function MarketplaceProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>([]);
  function toggleFavorite(id: string) {
    setFavorites((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }
  return <MarketplaceContext.Provider value={{ favorites, toggleFavorite }}>{children}</MarketplaceContext.Provider>;
}

const navItems: { href: string; label: string; icon: LucideIcon }[] = [
  { href: '/inicio', label: 'Início', icon: Home },
  { href: '/explorar', label: 'Explorar', icon: Compass },
  { href: '/achados-e-perdidos', label: 'Achados', icon: Search },
  { href: '/publicar', label: 'Publicar', icon: Plus },
  { href: '/favoritos', label: 'Favoritos', icon: Heart },
  { href: '/perfil', label: 'Perfil', icon: UserRound },
];

function MarketplaceShell({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const active = location.startsWith('/inicio') ? '/inicio' : location.startsWith('/vendas') || location.startsWith('/doacoes') || location.startsWith('/explorar') ? '/explorar' : location.startsWith('/achados-e-perdidos') ? '/achados-e-perdidos' : location.startsWith('/publicar') ? '/publicar' : location.startsWith('/favoritos') ? '/favoritos' : '/perfil';
  function signOut() { setLocation('/'); }
  return (
    <main className="app-noise min-h-[100dvh] bg-background" data-testid="page-marketplace">
      <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md">
        <div className="mx-auto flex h-[76px] max-w-[1200px] items-center justify-between gap-4 px-5 sm:px-8 lg:px-10">
          <Link href="/inicio" className="focus-lilac" data-testid="link-brand-home"><PassOnMark /></Link>
          <div className="hidden items-center gap-6 sm:flex"><p className="text-sm font-bold text-foreground" data-testid="text-header-welcome">Olá, Marina</p><span className="h-5 w-px bg-border" /><button type="button" onClick={() => setProfileOpen((value) => !value)} aria-label="Abrir perfil" className="focus-lilac grid size-10 place-items-center rounded-full bg-accent text-xs font-black text-accent-foreground transition-transform hover:scale-105" data-testid="button-profile">MC</button></div>
          <div className="relative sm:hidden"><button type="button" onClick={() => setProfileOpen((value) => !value)} aria-label="Abrir perfil" className="focus-lilac grid size-9 place-items-center rounded-full bg-accent text-[11px] font-black text-accent-foreground" data-testid="button-profile-mobile">MC</button></div>
          {profileOpen && <div className="absolute right-5 top-[68px] z-40 w-56 rounded-2xl border border-border bg-card p-2 shadow-[0_18px_50px_hsl(var(--foreground)/.14)] sm:right-8" data-testid="menu-profile"><div className="px-3 py-3"><p className="text-sm font-black text-foreground">Marina Costa</p><p className="mt-1 text-[11px] text-muted-foreground">Aluna · RA 2025.0148</p></div><button type="button" onClick={signOut} className="focus-lilac flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-extrabold text-muted-foreground hover:bg-secondary hover:text-destructive" data-testid="button-profile-logout"><LogOut className="size-4" /> Sair</button></div>}
        </div>
      </header>
      <div className="mx-auto max-w-[1200px] px-5 pb-32 pt-7 sm:px-8 sm:pt-10 lg:px-10">{children}</div>
      <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-border/90 bg-card/95 px-3 pb-[max(10px,env(safe-area-inset-bottom))] pt-2 shadow-[0_-10px_35px_hsl(var(--foreground)/.08)] backdrop-blur-xl" aria-label="Navegação principal" data-testid="bottom-navigation">
        <div className="mx-auto flex max-w-[720px] items-end justify-between gap-1">
          {navItems.map(({ href, label, icon: Icon }) => {
            const isActive = active === href;
            const isPublish = href === '/publicar';
            return <Link key={href} href={href} className={`focus-lilac group flex min-w-0 flex-1 flex-col items-center gap-1 rounded-2xl px-1 py-1.5 text-[10px] font-extrabold transition-all ${isPublish ? '-mt-5' : ''} ${isActive && !isPublish ? 'text-primary' : 'text-muted-foreground hover:text-foreground'}`} data-testid={`link-bottom-${label.toLowerCase()}`} aria-current={isActive ? 'page' : undefined}><span className={`grid size-9 place-items-center rounded-2xl transition-all ${isPublish ? 'size-12 bg-primary text-primary-foreground shadow-[0_8px_20px_hsl(var(--primary)/.3)] group-hover:-translate-y-1' : isActive ? 'bg-primary/10' : 'group-hover:bg-secondary'}`}><Icon className={isPublish ? 'size-5' : 'size-[18px]'} strokeWidth={isActive || isPublish ? 2.5 : 1.9} /></span><span>{label}</span></Link>;
          })}
        </div>
      </nav>
    </main>
  );
}

function ProductArt({ item }: { item: Listing }) {
  const Icon = item.icon;
  return <div className="product-art relative flex h-[168px] items-center justify-center overflow-hidden" style={{ background: item.art, '--art-light': item.artLight } as CSSProperties} data-testid={`visual-product-${item.id}`}><div className="absolute -right-12 -top-12 size-44 rounded-full border border-white/25" /><div className="absolute -bottom-14 -left-8 size-36 rounded-full border border-white/20" /><div className="relative grid size-24 place-items-center rounded-[30px] border border-white/30 bg-white/15 text-white shadow-[0_12px_28px_rgba(20,10,35,.18)] backdrop-blur-sm transition-transform duration-500 group-hover:rotate-3 group-hover:scale-105"><Icon className="size-11" strokeWidth={1.5} /></div><span className="absolute bottom-3 left-3 rounded-full bg-black/15 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[.1em] text-white/90">{item.category}</span></div>;
}

function ListingCard({ item }: { item: Listing }) {
  const { favorites, toggleFavorite } = useMarketplace();
  const favorite = favorites.includes(item.id);
  return <article className="group overflow-hidden rounded-[24px] border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_16px_38px_hsl(var(--foreground)/.1)]" data-testid={`card-listing-${item.id}`}><ProductArt item={item} /><div className="p-4 sm:p-5"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><h3 className="truncate text-[15px] font-black tracking-[-.035em] text-foreground" data-testid={`text-listing-title-${item.id}`}>{item.title}</h3><p className="mt-1 text-[11px] text-muted-foreground" data-testid={`text-listing-condition-${item.id}`}>{item.condition}</p></div><button type="button" aria-label={favorite ? `Remover ${item.title} dos favoritos` : `Favoritar ${item.title}`} aria-pressed={favorite} onClick={() => toggleFavorite(item.id)} className={`focus-lilac grid size-9 shrink-0 place-items-center rounded-xl transition-all ${favorite ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground hover:bg-primary/10 hover:text-primary'}`} data-testid={`button-favorite-${item.id}`}><Heart className="size-[17px]" fill={favorite ? 'currentColor' : 'none'} /></button></div><div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground"><span className="grid size-6 place-items-center rounded-full bg-secondary text-[9px] font-black text-primary">{item.seller.split(' ').map((part) => part[0]).join('')}</span><span data-testid={`text-listing-seller-${item.id}`}>{item.seller}</span><span className="text-border">·</span><span>{item.note}</span></div><div className="mt-4 flex items-end justify-between border-t border-border/70 pt-4"><div><p className="text-[10px] font-bold uppercase tracking-[.1em] text-muted-foreground">{item.mode === 'sale' ? 'preço' : 'disponível'}</p><p className={`mt-0.5 text-lg font-black tracking-[-.05em] ${item.mode === 'donation' ? 'text-primary' : 'text-foreground'}`} data-testid={`text-listing-price-${item.id}`}>{item.mode === 'sale' ? item.price : 'Doação'}</p></div><span className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2 py-1.5 text-[10px] font-extrabold text-muted-foreground"><BadgeCheck className="size-3 text-primary" /> aluno</span></div></div></article>;
}

function SearchField({ value, onChange, onSubmit, className = '' }: { value: string; onChange: (value: string) => void; onSubmit?: () => void; className?: string }) {
  return <form className={`relative ${className}`} onSubmit={(event) => { event.preventDefault(); onSubmit?.(); }}><Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" /><input value={value} onChange={(event) => onChange(event.target.value)} placeholder="Buscar roupas, mochilas, acessórios..." className="focus-lilac h-14 w-full rounded-2xl border border-border bg-card pl-11 pr-4 text-sm font-semibold text-foreground outline-none transition-all placeholder:text-muted-foreground/75 hover:border-primary/40 focus:border-primary focus:shadow-[0_0_0_4px_hsl(var(--primary)/.1)]" data-testid="input-search-listings" /></form>;
}

function HomeRoute() { return <MarketplaceShell><HomeContent /></MarketplaceShell>; }
function SalesRoute() { return <MarketplaceShell><ListingsPage mode="sale" /></MarketplaceShell>; }
function DonationsRoute() { return <MarketplaceShell><ListingsPage mode="donation" /></MarketplaceShell>; }

function HomeContent() {
  const [search, setSearch] = useState('');
  const [searchSubmitted, setSearchSubmitted] = useState(false);
  const recent = useMemo(() => listings.filter((item) => `${item.title} ${item.category} ${item.condition}`.toLowerCase().includes(search.toLowerCase().trim())), [search]);
  return <div data-testid="page-home">
    <section className="relative overflow-hidden rounded-[30px] bg-[#2b1948] px-6 py-7 text-white sm:px-10 sm:py-10 lg:px-14 lg:py-12" data-testid="section-home-hero">
      <div className="absolute -right-24 -top-24 size-[360px] rounded-full border border-[#d7b8fa]/20" /><div className="absolute -bottom-32 right-32 size-64 rounded-full bg-[#7250a0]/35 blur-3xl" />
      <div className="relative max-w-[680px]"><p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-[#d8b9ff]" data-testid="text-welcome-message"><span className="size-1.5 rounded-full bg-[#d8b9ff]" />Bem-vinda de volta, Marina</p><h1 className="mt-5 max-w-[620px] text-[clamp(2.6rem,6vw,5.5rem)] font-black leading-[.9] tracking-[-.09em]">Tem coisa boa<br /><span className="text-[#d8b9ff]">circulando.</span></h1><p className="mt-6 max-w-[470px] text-sm leading-6 text-white/70">Ache seu próximo achado ou passe adiante o que já não combina com você.</p><div className="mt-8 flex flex-wrap gap-3"><Link href="/vendas" className="focus-lilac inline-flex items-center gap-2 rounded-xl bg-[#cdb4ff] px-5 py-3.5 text-sm font-black text-[#211536] transition-transform hover:-translate-y-0.5" data-testid="link-cta-comprar">Comprar <ArrowRight className="size-4" /></Link><Link href="/doacoes" className="focus-lilac inline-flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3.5 text-sm font-black text-white transition-colors hover:bg-white/20" data-testid="link-cta-doar">Doar <Gift className="size-4" /></Link></div></div>
      <div className="relative mt-9 grid max-w-[390px] grid-cols-2 gap-3 sm:absolute sm:bottom-10 sm:right-10 sm:mt-0 sm:w-[320px]"><div className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm"><ShoppingBagIcon /><p className="mt-8 text-2xl font-black">12</p><p className="mt-1 text-[10px] uppercase tracking-[.1em] text-white/55">à venda hoje</p></div><div className="mt-6 rounded-2xl border border-white/10 bg-[#cdb4ff]/90 p-4 text-[#211536]"><Gift className="size-5" /><p className="mt-8 text-2xl font-black">8</p><p className="mt-1 text-[10px] uppercase tracking-[.1em] opacity-65">doações abertas</p></div></div>
    </section>
    <section className="mt-8" data-testid="section-home-search"><div className="mb-3 flex items-center justify-between gap-3"><h2 className="text-lg font-black tracking-[-.04em] text-foreground">O que você procura?</h2><span className="hidden text-xs font-bold text-muted-foreground sm:block">feito por alunos</span></div><SearchField value={search} onChange={(value) => { setSearch(value); setSearchSubmitted(false); }} onSubmit={() => setSearchSubmitted(true)} /><div className="mt-3 flex items-center justify-between"><p className="text-xs text-muted-foreground">{search ? `${recent.length} ${recent.length === 1 ? 'resultado encontrado' : 'resultados encontrados'}` : 'Busque por nome, categoria ou estado.'}</p>{searchSubmitted && search && <span className="text-xs font-bold text-primary" data-testid="status-search-feedback">Busca atualizada</span>}</div></section>
    <section className="mt-10" data-testid="section-categories"><div className="flex items-end justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-[.15em] text-primary">encontre por tipo</p><h2 className="mt-1.5 text-2xl font-black tracking-[-.06em] text-foreground">Categorias</h2></div><Link href="/explorar" className="focus-lilac text-xs font-extrabold text-primary hover:text-[#38156b]" data-testid="link-see-all-categories">Ver tudo <ChevronRight className="inline size-3.5" /></Link></div><div className="mt-5 grid grid-cols-2 gap-3 lg:grid-cols-4">{categories.map(({ label, icon: Icon, copy }) => <Link key={label} href={`/explorar?categoria=${encodeURIComponent(label)}`} className="focus-lilac group rounded-2xl border border-border bg-card p-4 transition-all hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_10px_25px_hsl(var(--foreground)/.08)]" data-testid={`link-category-${label.toLowerCase().replaceAll(' ', '-')}`}><span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="size-[18px]" /></span><p className="mt-4 text-sm font-black leading-tight text-foreground">{label}</p><p className="mt-1 text-[10px] text-muted-foreground">{copy}</p></Link>)}</div></section>
    <section className="mt-11" data-testid="section-recent-items"><div className="flex items-end justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-[.15em] text-primary">acabou de aparecer</p><h2 className="mt-1.5 text-2xl font-black tracking-[-.06em] text-foreground">Itens recentes</h2></div><Link href="/explorar" className="focus-lilac inline-flex items-center gap-1 text-xs font-extrabold text-primary" data-testid="link-see-all-recent">Explorar <ArrowRight className="size-3.5" /></Link></div>{recent.length > 0 ? <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{recent.slice(0, 4).map((item) => <ListingCard key={item.id} item={item} />)}</div> : <EmptyState query={search} />}</section>
    <section className="mt-11 flex flex-col justify-between gap-5 rounded-3xl border border-dashed border-primary/35 bg-primary/[.045] p-6 sm:flex-row sm:items-center sm:p-7" data-testid="section-home-publish"><div><div className="flex items-center gap-2 text-primary"><Plus className="size-4" /><p className="font-mono text-[10px] uppercase tracking-[.15em]">tem algo parado?</p></div><h2 className="mt-2 text-xl font-black tracking-[-.05em] text-foreground">Faça circular também.</h2><p className="mt-1.5 text-sm text-muted-foreground">Publicar fica disponível em breve.</p></div><Link href="/publicar" className="focus-lilac inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-black text-primary-foreground hover:bg-[#38156b]" data-testid="link-home-publish">Publicar um item <ArrowRight className="size-4" /></Link></section>
  </div>;
}

function ShoppingBagIcon() { return <Backpack className="size-5" />; }

function CategoryFilter({ selected, onSelect }: { selected?: Category; onSelect: (category?: Category) => void }) {
  return <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filtrar por categoria" data-testid="category-filters"><button type="button" role="tab" aria-selected={!selected} onClick={() => onSelect(undefined)} className={`focus-lilac shrink-0 rounded-xl border px-3.5 py-2.5 text-xs font-black transition-colors ${!selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:border-primary/40'}`} data-testid="button-filter-todos">Todos</button>{categories.map(({ label, icon: Icon }) => <button key={label} type="button" role="tab" aria-selected={selected === label} onClick={() => onSelect(label)} className={`focus-lilac inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-black transition-colors ${selected === label ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:border-primary/40'}`} data-testid={`button-filter-${label.toLowerCase().replaceAll(' ', '-')}`}><Icon className="size-3.5" />{label}</button>)}</div>;
}

function ListingsPage({ mode }: { mode: ListingMode }) {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Category>();
  const items = useMemo(() => listings.filter((item) => item.mode === mode && (!selected || item.category === selected) && `${item.title} ${item.category} ${item.condition}`.toLowerCase().includes(search.toLowerCase().trim())), [mode, search, selected]);
  const isSale = mode === 'sale';
  return <div className="animate-rise" data-testid={`page-${mode === 'sale' ? 'sales' : 'donations'}`}><section className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end"><div><p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.16em] text-primary"><span className="size-1.5 rounded-full bg-primary" /> espaço do aluno</p><h1 className="mt-4 text-[clamp(2.8rem,6vw,5rem)] font-black leading-[.9] tracking-[-.09em] text-foreground">{isSale ? 'Vendas' : 'Doações'}<span className="text-primary">.</span></h1><p className="mt-4 max-w-[500px] text-sm leading-6 text-muted-foreground">{isSale ? 'Itens em bom estado, com preço claro e retirada combinada entre alunos.' : 'Itens gratuitos que podem ganhar uma nova rotina com alguém da comunidade.'}</p></div><div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3"><span className="grid size-8 place-items-center rounded-xl bg-secondary text-primary"><UserRound className="size-4" /></span><div><p className="text-[10px] uppercase tracking-[.1em] text-muted-foreground">ambiente</p><p className="text-xs font-black text-foreground">somente alunos</p></div></div></section><section className="mt-9 rounded-2xl border border-border/70 bg-secondary/40 p-3 sm:p-4" data-testid="section-listing-filters"><div className="mb-3 flex items-center justify-between gap-3 px-1"><p className="text-xs font-black text-foreground">Explore por categoria</p><span className="font-mono text-[10px] text-muted-foreground">{items.length} itens</span></div><SearchField value={search} onChange={setSearch} className="mb-3" /><CategoryFilter selected={selected} onSelect={setSelected} /></section>{items.length > 0 ? <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-testid={`grid-listings-${mode}`}>{items.map((item) => <ListingCard key={item.id} item={item} />)}</div> : <EmptyState query={search} category={selected} />}</div>;
}

function EmptyState({ query, category }: { query?: string; category?: Category }) {
  return <div className="mt-6 flex min-h-[280px] items-center justify-center rounded-3xl border border-dashed border-border bg-card px-6 text-center" data-testid="empty-listings"><div><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><PackageOpen className="size-6" /></span><h2 className="mt-4 text-xl font-black tracking-[-.05em] text-foreground">{query ? 'Nada encontrado por aqui.' : `Nada em ${category ?? 'esta categoria'} ainda.`}</h2><p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">{query ? 'Tente outra palavra ou explore todas as categorias.' : 'Quando alguém publicar um item, ele aparece nesta lista.'}</p></div></div>;
}

function LostFoundRoute() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState<'Todas' | LostFoundCategory>('Todas');
  const [status, setStatus] = useState<'Todos' | LostFoundStatus>('Todos');
  const filteredItems = useMemo(() => lostFoundItems.filter((item) => {
    const matchesName = item.name.toLocaleLowerCase('pt-BR').includes(search.trim().toLocaleLowerCase('pt-BR'));
    const matchesCategory = category === 'Todas' || item.category === category;
    const matchesStatus = status === 'Todos' || item.status === status;
    return matchesName && matchesCategory && matchesStatus;
  }), [search, category, status]);
  const statusStyles: Record<LostFoundStatus, string> = {
    Perdido: 'border-rose-400/25 bg-rose-400/10 text-rose-300',
    Encontrado: 'border-primary/25 bg-primary/10 text-primary',
    Devolvido: 'border-emerald-400/25 bg-emerald-400/10 text-emerald-300',
  };

  return (
    <MarketplaceShell>
    <div className="animate-rise" data-testid="page-achados-e-perdidos">
      <section className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[.17em] text-primary">objetos da comunidade escolar</p>
          <h1 className="mt-3 text-[clamp(2.5rem,6vw,4.8rem)] font-black leading-[.92] tracking-[-.085em] text-foreground" data-testid="heading-achados-e-perdidos">Achados e Perdidos<span className="text-primary">.</span></h1>
          <p className="mt-4 max-w-[540px] text-sm leading-6 text-muted-foreground">Um feed só para acompanhar objetos perdidos, encontrados ou já devolvidos na escola.</p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-primary/20 bg-primary/[.08] px-3.5 py-2 text-xs font-extrabold text-primary"><PackageOpen className="size-4" /> {filteredItems.length} {filteredItems.length === 1 ? 'publicação' : 'publicações'}</span>
      </section>

      <section className="mt-8 rounded-3xl border border-border bg-card p-4 sm:p-5" data-testid="section-achados-filters">
        <label className="relative block">
          <Search className="pointer-events-none absolute left-4 top-1/2 size-[18px] -translate-y-1/2 text-muted-foreground" />
          <input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Buscar objeto pelo nome..." aria-label="Buscar objeto pelo nome" className="focus-lilac h-12 w-full rounded-2xl border border-border bg-background pl-11 pr-4 text-sm font-semibold text-foreground outline-none transition-colors placeholder:text-muted-foreground/70 hover:border-primary/40 focus:border-primary" data-testid="input-lost-found-search" />
        </label>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[.12em] text-muted-foreground">Categoria</span>
            <select value={category} onChange={(event) => setCategory(event.target.value as 'Todas' | LostFoundCategory)} className="focus-lilac h-11 w-full rounded-xl border border-border bg-background px-3 text-xs font-bold text-foreground outline-none hover:border-primary/40 focus:border-primary" data-testid="select-lost-found-category">
              <option value="Todas">Todas as categorias</option>
              {lostFoundCategories.map((itemCategory) => <option key={itemCategory} value={itemCategory}>{itemCategory}</option>)}
            </select>
          </label>
          <label className="block">
            <span className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[.12em] text-muted-foreground">Status</span>
            <select value={status} onChange={(event) => setStatus(event.target.value as 'Todos' | LostFoundStatus)} className="focus-lilac h-11 w-full rounded-xl border border-border bg-background px-3 text-xs font-bold text-foreground outline-none hover:border-primary/40 focus:border-primary" data-testid="select-lost-found-status">
              <option value="Todos">Todos os status</option>
              <option value="Perdido">Perdido</option>
              <option value="Encontrado">Encontrado</option>
              <option value="Devolvido">Devolvido</option>
            </select>
          </label>
        </div>
        <p className="mt-3 text-xs text-muted-foreground" aria-live="polite" data-testid="text-lost-found-results">{filteredItems.length} {filteredItems.length === 1 ? 'objeto encontrado' : 'objetos encontrados'} · todos os tipos em um só feed</p>
      </section>

      {filteredItems.length > 0 ? (
        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" aria-label="Feed de achados e perdidos" data-testid="grid-lost-found-items">
          {filteredItems.map((item) => (
            <article key={item.id} className="overflow-hidden rounded-3xl border border-border bg-card shadow-[0_12px_32px_hsl(var(--background)/.35)] transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_18px_42px_hsl(var(--primary)/.1)]" data-testid={`card-lost-found-${item.id}`}>
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <img src={item.photo} alt={item.name} className="size-full object-cover transition-transform duration-500 hover:scale-[1.035]" loading="lazy" data-testid={`image-lost-found-${item.id}`} />
                <span className="absolute left-3 top-3 rounded-full border border-white/20 bg-black/65 px-3 py-1.5 text-[10px] font-extrabold text-white backdrop-blur-sm" data-testid={`category-lost-found-${item.id}`}>{item.category}</span>
                <span className={`absolute right-3 top-3 rounded-full border px-3 py-1.5 text-[10px] font-extrabold backdrop-blur-sm ${statusStyles[item.status]}`} data-testid={`status-lost-found-${item.id}`}>{item.status}</span>
              </div>
              <div className="p-4 sm:p-5">
                <h2 className="text-base font-black tracking-[-.04em] text-foreground" data-testid={`name-lost-found-${item.id}`}>{item.name}</h2>
                <p className="mt-1.5 min-h-10 text-xs leading-5 text-muted-foreground" data-testid={`description-lost-found-${item.id}`}>{item.description}</p>
                <div className="mt-4 space-y-2 border-t border-border/80 pt-4 text-[11px] text-muted-foreground">
                  <p className="flex items-start gap-2" data-testid={`location-lost-found-${item.id}`}><MapPin className="mt-0.5 size-3.5 shrink-0 text-primary" /><span>{item.location}</span></p>
                  <p className="flex items-center gap-2" data-testid={`date-lost-found-${item.id}`}><CalendarDays className="size-3.5 shrink-0 text-primary" /><span>{item.date}</span></p>
                </div>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <div className="mt-5 flex min-h-[260px] items-center justify-center rounded-3xl border border-dashed border-border bg-card px-6 text-center" data-testid="empty-lost-found">
          <div><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><Search className="size-6" /></span><h2 className="mt-4 text-xl font-black text-foreground">Nenhum objeto encontrado.</h2><p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Tente outro nome ou ajuste os filtros para ver mais publicações.</p></div>
        </div>
      )}
    </div>
    </MarketplaceShell>
  );
}

function ExploreRoute() {
  const [location, setLocation] = useLocation();
  const urlCategory = new URLSearchParams(location.split('?')[1] ?? '').get('categoria') as Category | null;
  const urlQuery = new URLSearchParams(location.split('?')[1] ?? '').get('q') ?? '';
  const [search, setSearch] = useState(urlQuery);
  const [selected, setSelected] = useState<Category | undefined>(urlCategory ?? undefined);
  const filtered = useMemo(() => listings.filter((item) => (!selected || item.category === selected) && `${item.title} ${item.category} ${item.condition}`.toLowerCase().includes(search.toLowerCase().trim())), [search, selected]);
  function selectCategory(category?: Category) { setSelected(category); setLocation(category ? `/explorar?categoria=${encodeURIComponent(category)}` : '/explorar'); }
  return <MarketplaceShell><div className="animate-rise" data-testid="page-explorar"><div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end"><div><p className="font-mono text-[10px] uppercase tracking-[.16em] text-primary">descubra algo novo</p><h1 className="mt-3 text-[clamp(2.8rem,6vw,5rem)] font-black leading-[.9] tracking-[-.09em] text-foreground">Explorar<span className="text-primary">.</span></h1><p className="mt-4 max-w-[500px] text-sm leading-6 text-muted-foreground">Tudo que a comunidade está fazendo circular, em um só lugar.</p></div><span className="inline-flex items-center gap-2 self-start rounded-full bg-secondary px-3 py-2 text-xs font-black text-secondary-foreground sm:self-auto"><SlidersHorizontal className="size-3.5 text-primary" /> {filtered.length} itens</span></div><div className="mt-8 max-w-[650px]"><SearchField value={search} onChange={setSearch} /></div><section className="mt-8 rounded-2xl border border-border/70 bg-secondary/40 p-3 sm:p-4" data-testid="section-explore-categories"><p className="mb-3 px-1 text-xs font-black text-foreground">Categorias</p><CategoryFilter selected={selected} onSelect={selectCategory} /></section>{filtered.length > 0 ? <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4" data-testid="grid-explore-listings">{filtered.map((item) => <ListingCard key={item.id} item={item} />)}</div> : <EmptyState query={search} category={selected} />}</div></MarketplaceShell>;
}

function PublishRoute() {
  const [notice, setNotice] = useState(false);
  return <MarketplaceShell><div className="mx-auto max-w-[780px] animate-rise" data-testid="page-publicar"><div className="rounded-[30px] bg-[#2b1948] p-7 text-white sm:p-12"><span className="grid size-14 place-items-center rounded-2xl bg-[#cdb4ff] text-[#211536]"><Plus className="size-7" /></span><p className="mt-10 font-mono text-[10px] uppercase tracking-[.16em] text-[#d8b9ff]">seu próximo passo</p><h1 className="mt-3 text-[clamp(2.8rem,7vw,5.8rem)] font-black leading-[.88] tracking-[-.09em]">Publicar<br /><span className="text-[#d8b9ff]">em breve.</span></h1><p className="mt-6 max-w-[470px] text-sm leading-6 text-white/70">Estamos preparando uma forma simples de colocar roupas e materiais nas mãos de quem precisa.</p><button type="button" onClick={() => setNotice(true)} className="focus-lilac mt-8 inline-flex items-center gap-2 rounded-xl bg-[#cdb4ff] px-4 py-3 text-xs font-black text-[#211536] hover:bg-[#e6d6ff]" data-testid="button-publish-notify">Quero publicar quando liberar <ArrowRight className="size-4" /></button></div>{notice && <div className="mt-4 flex items-center gap-3 rounded-2xl border border-primary/25 bg-primary/10 px-4 py-3 text-xs font-bold text-primary" role="status" data-testid="status-publish-notice"><Check className="size-4 shrink-0" />Aviso demonstrativo registrado. A publicação ainda não está disponível.<button type="button" onClick={() => setNotice(false)} className="focus-lilac ml-auto rounded-lg p-1 hover:bg-primary/10" aria-label="Fechar aviso" data-testid="button-dismiss-publish-notice"><X className="size-4" /></button></div>}<div className="mt-6 grid gap-4 sm:grid-cols-2"><div className="rounded-3xl border border-border bg-card p-5"><Tag className="size-5 text-primary" /><h2 className="mt-7 text-lg font-black text-foreground">Vender</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Defina um valor e combine a retirada com outro aluno.</p></div><div className="rounded-3xl border border-border bg-card p-5"><Gift className="size-5 text-primary" /><h2 className="mt-7 text-lg font-black text-foreground">Doar</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">Passe adiante algo que ainda pode ser muito útil.</p></div></div></div></MarketplaceShell>;
}

function FavoritesRoute() {
  const { favorites } = useMarketplace();
  const items = listings.filter((item) => favorites.includes(item.id));
  return <MarketplaceShell><div className="animate-rise" data-testid="page-favoritos"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-primary">guardados para depois</p><h1 className="mt-3 text-[clamp(2.8rem,6vw,5rem)] font-black leading-[.9] tracking-[-.09em] text-foreground">Favoritos<span className="text-primary">.</span></h1><p className="mt-4 text-sm leading-6 text-muted-foreground">Seus itens marcados ficam aqui.</p>{items.length > 0 ? <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">{items.map((item) => <ListingCard key={item.id} item={item} />)}</div> : <div className="mt-8 rounded-3xl border border-dashed border-border bg-card p-10 text-center" data-testid="empty-favorites"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><Heart className="size-6" /></span><h2 className="mt-5 text-xl font-black tracking-[-.04em] text-foreground">Ainda não há favoritos.</h2><p className="mx-auto mt-2 max-w-xs text-sm leading-6 text-muted-foreground">Toque no coração de um item para guardar aquilo que você quer lembrar.</p><Link href="/explorar" className="focus-lilac mt-6 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-black text-primary-foreground" data-testid="link-favorites-explore">Explorar itens <ArrowRight className="size-4" /></Link></div>}</div></MarketplaceShell>;
}

function ProfileRoute() {
  const [, setLocation] = useLocation();
  return <MarketplaceShell><div className="mx-auto max-w-[720px] animate-rise" data-testid="page-perfil"><p className="font-mono text-[10px] uppercase tracking-[.16em] text-primary">seu espaço</p><h1 className="mt-3 text-[clamp(2.8rem,6vw,5rem)] font-black leading-[.9] tracking-[-.09em] text-foreground">Perfil<span className="text-primary">.</span></h1><section className="mt-8 rounded-3xl border border-border bg-card p-6 sm:p-8" data-testid="section-profile-card"><div className="flex items-center gap-4"><span className="grid size-16 place-items-center rounded-2xl bg-accent text-lg font-black text-accent-foreground" data-testid="avatar-profile">MC</span><div><h2 className="text-xl font-black text-foreground" data-testid="text-profile-name">Marina Costa</h2><p className="mt-1 text-sm text-muted-foreground">Aluna · RA 2025.0148</p></div></div><div className="mt-8 grid grid-cols-2 gap-3"><div className="rounded-2xl bg-secondary p-4"><p className="font-mono text-2xl font-black text-primary">{useMarketplace().favorites.length}</p><p className="mt-1 text-xs font-bold text-muted-foreground">favoritos</p></div><div className="rounded-2xl bg-secondary p-4"><p className="font-mono text-2xl font-black text-primary">2025</p><p className="mt-1 text-xs font-bold text-muted-foreground">aluna desde</p></div></div><button type="button" onClick={() => setLocation('/')} className="focus-lilac mt-8 inline-flex items-center gap-2 rounded-xl border border-destructive/20 px-4 py-3 text-xs font-black text-destructive hover:bg-destructive/10" data-testid="button-logout-profile"><LogOut className="size-4" /> Sair da conta</button></section><p className="mt-6 text-xs leading-5 text-muted-foreground">Pass On é um espaço demonstrativo de troca entre alunos da E. E. República do Suriname.</p></div></MarketplaceShell>;
}

function Router() {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}><Switch><Route path="/" component={Login} /><Route path="/inicio" component={HomeRoute} /><Route path="/vendas" component={SalesRoute} /><Route path="/doacoes" component={DonationsRoute} /><Route path="/explorar" component={ExploreRoute} /><Route path="/achados-e-perdidos" component={LostFoundRoute} /><Route path="/publicar" component={PublishRoute} /><Route path="/favoritos" component={FavoritesRoute} /><Route path="/perfil" component={ProfileRoute} /><Route component={NotFound} /></Switch></ErrorBoundary>;
}

function App() {
  return <QueryClientProvider client={queryClient}><TooltipProvider><WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}><MarketplaceProvider><Router /></MarketplaceProvider></WouterRouter><Toaster /></TooltipProvider></QueryClientProvider>;
}

export default App;