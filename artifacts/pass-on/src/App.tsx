import { type FormEvent, type ReactNode, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowRight,
  Backpack,
  BadgeCheck,
  Check,
  CircleHelp,
  Heart,
  Eye,
  EyeOff,
  Gift,
  House,
  Layers3,
  LogOut,
  Menu,
  PackageOpen,
  Pin,
  Plus,
  Shirt,
  Sparkles,
  Search,
  ShoppingBag,
  Tag,
  UserRound,
  X,
  WalletCards,
  Watch,
} from 'lucide-react';
import { Link, useLocation, Route, Router as WouterRouter, Switch } from 'wouter';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function PassOnMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2.5" data-testid="brand-pass-on">
      <div className="relative grid size-9 place-items-center rounded-[11px] bg-primary shadow-[0_0_28px_rgba(181,140,255,.22)]">
        <span className="absolute left-[9px] top-[9px] size-[9px] rounded-full bg-background" />
        <span className="absolute bottom-[9px] right-[9px] size-[9px] rounded-full bg-background" />
        <span className="absolute left-[14px] top-[14px] h-[10px] w-[2px] rotate-45 rounded-full bg-background" />
      </div>
      {!compact && (
        <span className="text-[17px] font-extrabold tracking-[-.04em] text-foreground">
          pass<span className="text-primary">on</span>
        </span>
      )}
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
    window.setTimeout(() => setLocation('/inicio'), 650);
  }

  return (
    <main className="app-noise min-h-[100dvh] overflow-hidden bg-background" data-testid="page-login">
      <div className="grid min-h-[100dvh] lg:grid-cols-[minmax(420px,1.06fr)_minmax(480px,.94fr)]">
        <section className="relative hidden overflow-hidden border-r border-white/[.07] bg-[#120c1f] lg:flex lg:flex-col lg:justify-between lg:p-12 xl:p-16">
          <div className="absolute -left-40 -top-48 size-[560px] rounded-full bg-primary/[.09] blur-3xl" />
          <div className="absolute -bottom-48 -right-32 size-[480px] rounded-full bg-accent/[.07] blur-3xl" />
          <div className="relative z-10 animate-rise">
            <PassOnMark />
            <span className="mt-12 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[.08] px-3 py-1.5 font-mono text-[10px] uppercase tracking-[.18em] text-primary">
              <span className="size-1.5 rounded-full bg-primary" />
              espaço do aluno INA
            </span>
            <h1 className="mt-7 max-w-[510px] text-[clamp(3rem,5vw,5.3rem)] font-extrabold leading-[.96] tracking-[-.07em] text-balance text-foreground">
              Seu próximo
              <br />
              <span className="text-primary">passo</span> começa aqui.
            </h1>
            <p className="mt-7 max-w-[395px] text-[15px] leading-7 text-muted-foreground">
              Um lugar para acompanhar suas aulas, suas conquistas e tudo que vem depois delas.
            </p>
          </div>

          <div className="relative z-10 mt-16 h-[290px] overflow-hidden rounded-3xl border border-white/[.08] bg-[#1a112c] p-7 animate-rise delay-2">
            <div className="absolute -right-14 -top-14 size-56 rounded-full border border-primary/20 animate-ring" />
            <div className="absolute -right-2 top-0 size-44 rounded-full border border-primary/10" />
            <div className="absolute bottom-[-90px] left-[-30px] size-48 rounded-full border border-accent/15" />
            <div className="relative flex h-full flex-col justify-between">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[.16em] text-primary/70">agora no seu espaço</p>
                  <p className="mt-3 max-w-[215px] text-[23px] font-bold leading-tight tracking-[-.05em]">Acompanhe o que importa.</p>
                </div>
                <Sparkles className="size-5 text-primary" strokeWidth={1.7} />
              </div>
              <div className="flex items-end gap-3">
                <div className="flex -space-x-2">
                  {['L', 'M', 'C'].map((letter, index) => (
                    <span key={letter} className={`grid size-8 place-items-center rounded-full border-2 border-[#1a112c] text-[10px] font-bold ${index === 1 ? 'bg-accent text-background' : 'bg-[#6547a6] text-foreground'}`}>
                      {letter}
                    </span>
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">+ sua turma, em um só lugar</span>
              </div>
            </div>
          </div>
          <p className="relative z-10 mt-8 font-mono text-[10px] uppercase tracking-[.16em] text-muted-foreground/60">INA · formação que move</p>
        </section>

        <section className="flex min-h-[100dvh] flex-col px-5 py-6 sm:px-10 sm:py-9 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between lg:justify-end">
            <div className="lg:hidden"><PassOnMark /></div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="hidden sm:inline">Ainda não conhece o INA?</span>
              <button type="button" className="focus-lilac rounded-md px-1 font-semibold text-primary transition-colors hover:text-accent" data-testid="button-discover-ina" onClick={() => setRecoverySent(true)}>
                Conheça o INA
              </button>
            </div>
          </div>

          <div className="mx-auto flex w-full max-w-[410px] flex-1 flex-col justify-center py-12">
            <div className="animate-rise">
              <p className="font-mono text-[10px] uppercase tracking-[.18em] text-primary">bem-vindo de volta</p>
              <h2 className="mt-4 text-[38px] font-extrabold leading-none tracking-[-.07em] text-foreground sm:text-[44px]">Entrar no Pass On</h2>
              <p className="mt-4 text-sm leading-6 text-muted-foreground">Use seus dados de aluno para acessar seu espaço.</p>
            </div>

            <form onSubmit={handleSubmit} className="mt-9 space-y-5 animate-rise delay-1" noValidate>
              <div className="space-y-2">
                <label htmlFor="ra" className="text-xs font-bold uppercase tracking-[.08em] text-secondary-foreground">RA</label>
                <input
                  id="ra"
                  value={ra}
                  onChange={(event) => { setRa(event.target.value); setError(''); }}
                  placeholder="Digite seu registro acadêmico"
                  autoComplete="username"
                  className="focus-lilac h-14 w-full rounded-2xl border border-border bg-card px-4 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all hover:border-primary/40 focus:border-primary focus:bg-secondary/40 focus:outline-none"
                  data-testid="input-ra"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="text-xs font-bold uppercase tracking-[.08em] text-secondary-foreground">Senha</label>
                <div className="relative">
                  <input
                    id="password"
                    value={password}
                    onChange={(event) => { setPassword(event.target.value); setError(''); }}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Digite sua senha"
                    autoComplete="current-password"
                    className="focus-lilac h-14 w-full rounded-2xl border border-border bg-card px-4 pr-12 text-sm text-foreground placeholder:text-muted-foreground/60 transition-all hover:border-primary/40 focus:border-primary focus:bg-secondary/40 focus:outline-none"
                    data-testid="input-password"
                  />
                  <button type="button" aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'} className="focus-lilac absolute right-3 top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-xl text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground" onClick={() => setShowPassword((value) => !value)} data-testid="button-toggle-password">
                    {showPassword ? <EyeOff className="size-[18px]" /> : <Eye className="size-[18px]" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-destructive/30 bg-destructive/[.08] px-4 py-3 text-xs leading-5 text-destructive animate-rise" role="alert" data-testid="status-login-error">
                  <CircleHelp className="mt-0.5 size-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              {recoverySent && (
                <div className="flex items-start gap-2.5 rounded-2xl border border-primary/25 bg-primary/[.08] px-4 py-3 text-xs leading-5 text-primary animate-rise" role="status" data-testid="status-login-recovery">
                  <Check className="mt-0.5 size-4 shrink-0" />
                  <span>Este é um link demonstrativo. Em breve, o suporte do INA poderá ajudar por aqui.</span>
                </div>
              )}

              <button type="submit" disabled={isSubmitting} className="focus-lilac group flex h-14 w-full items-center justify-center gap-3 rounded-2xl bg-primary text-sm font-extrabold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent hover:shadow-[0_12px_28px_rgba(181,140,255,.2)] active:translate-y-0 disabled:cursor-wait disabled:opacity-70" data-testid="button-login">
                {isSubmitting ? 'Abrindo seu espaço...' : 'Entrar'}
                {!isSubmitting && <ArrowRight className="size-[18px] transition-transform group-hover:translate-x-1" />}
                {isSubmitting && <span className="size-4 animate-spin rounded-full border-2 border-primary-foreground/30 border-t-primary-foreground" />}
              </button>
              <button type="button" className="focus-lilac mx-auto block rounded-md px-2 py-1 text-xs font-semibold text-muted-foreground transition-colors hover:text-primary" onClick={() => { setRecoverySent(true); setError(''); }} data-testid="button-forgot-password">
                Esqueci minha senha
              </button>
            </form>

            <div className="mt-12 flex items-center gap-3 border-t border-border/70 pt-5 text-[11px] leading-5 text-muted-foreground animate-rise delay-3">
              <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-secondary text-primary"><Pin className="size-3.5" /></span>
              <span>Ambiente demonstrativo · seus dados não são enviados para nenhum serviço.</span>
            </div>
          </div>
          <p className="text-center font-mono text-[10px] uppercase tracking-[.14em] text-muted-foreground/50 lg:text-left">© 2025 Pass On · INA</p>
        </section>
      </div>
    </main>
  );
}

type MarketplaceRoute = 'inicio' | 'vendas' | 'doacoes';
type Category = 'Todos' | 'Roupas' | 'Acessórios' | 'Mochilas' | 'Estojos';
type IconComponent = typeof Shirt;

const marketplaceNav: { path: string; key: MarketplaceRoute; label: string; icon: IconComponent }[] = [
  { path: '/inicio', key: 'inicio', label: 'Início', icon: House },
  { path: '/vendas', key: 'vendas', label: 'Vendas', icon: ShoppingBag },
  { path: '/doacoes', key: 'doacoes', label: 'Doações', icon: Gift },
];

const categories: { label: Category; icon: IconComponent }[] = [
  { label: 'Todos', icon: Layers3 },
  { label: 'Roupas', icon: Shirt },
  { label: 'Acessórios', icon: Watch },
  { label: 'Mochilas', icon: Backpack },
  { label: 'Estojos', icon: PackageOpen },
];

type Listing = {
  id: string;
  title: string;
  category: Exclude<Category, 'Todos'>;
  condition: string;
  seller: string;
  price: string;
  note: string;
  icon: IconComponent;
  color: string;
};

const saleListings: Listing[] = [
  { id: 'jaqueta-ina', title: 'Jaqueta oficial INA', category: 'Roupas', condition: 'Muito bom estado', seller: 'Bia R.', price: 'R$ 48', note: 'tam. M · retirada no campus', icon: Shirt, color: 'from-[#6d4ac1] to-[#2d1f55]' },
  { id: 'mochila-azul', title: 'Mochila azul-marinho', category: 'Mochilas', condition: 'Bom estado', seller: 'Lucas T.', price: 'R$ 35', note: '3 compartimentos', icon: Backpack, color: 'from-[#3d5a80] to-[#1b263b]' },
  { id: 'estojo-lilas', title: 'Estojo lilás estruturado', category: 'Estojos', condition: 'Como novo', seller: 'Nina S.', price: 'R$ 22', note: 'pouco uso · zíper em perfeito estado', icon: PackageOpen, color: 'from-[#9e78d4] to-[#513d74]' },
  { id: 'relogio-digital', title: 'Relógio digital preto', category: 'Acessórios', condition: 'Bom estado', seller: 'Caio M.', price: 'R$ 18', note: 'pulseira ajustável', icon: Watch, color: 'from-[#574f72] to-[#242039]' },
];

const donationListings: Listing[] = [
  { id: 'camiseta-branca', title: 'Camiseta branca de uniforme', category: 'Roupas', condition: 'Bom estado', seller: 'Joana P.', price: 'gratuito', note: 'tam. P · lavada e pronta para uso', icon: Shirt, color: 'from-[#c8b7e8] to-[#5f4b83]' },
  { id: 'mochila-verde', title: 'Mochila verde compacta', category: 'Mochilas', condition: 'Marcas de uso', seller: 'Rafa L.', price: 'gratuito', note: 'ideal para materiais leves', icon: Backpack, color: 'from-[#65737e] to-[#29323a]' },
  { id: 'kit-canetas', title: 'Kit de canetas e estojo', category: 'Estojos', condition: 'Bom estado', seller: 'Duda F.', price: 'gratuito', note: '12 canetas · retirada no campus', icon: PackageOpen, color: 'from-[#d09b75] to-[#65483d]' },
];

function MarketplaceShell({ children }: { children: ReactNode }) {
  const [location, setLocation] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const activeKey: MarketplaceRoute = location === '/vendas' ? 'vendas' : location === '/doacoes' ? 'doacoes' : 'inicio';

  function signOut() {
    setLocation('/');
  }

  return (
    <main className="app-noise min-h-[100dvh] bg-background" data-testid="page-marketplace">
      <div className="flex min-h-[100dvh]">
        <aside className="hidden w-[252px] shrink-0 flex-col border-r border-border/70 bg-sidebar px-5 py-7 md:flex" data-testid="sidebar-navigation">
          <Link href="/inicio" className="focus-lilac w-fit" data-testid="link-brand-home"><PassOnMark /></Link>
          <div className="mt-14 px-3">
            <p className="font-mono text-[10px] uppercase tracking-[.18em] text-muted-foreground/60">comunidade INA</p>
            <nav className="mt-4 space-y-1" aria-label="Navegação principal">
              {marketplaceNav.map(({ path, key, label, icon: Icon }) => (
                <Link
                  key={key}
                  href={path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`focus-lilac group flex w-full items-center gap-3 rounded-xl px-3 py-3 text-[13px] font-semibold transition-all ${activeKey === key ? 'bg-primary text-primary-foreground shadow-[0_8px_20px_rgba(181,140,255,.14)]' : 'text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
                  data-testid={`link-nav-${key}`}
                  aria-current={activeKey === key ? 'page' : undefined}
                >
                  <Icon className="size-[17px]" strokeWidth={activeKey === key ? 2.2 : 1.8} />
                  {label}
                  {key === 'inicio' && <span className={`ml-auto size-1.5 rounded-full ${activeKey === key ? 'bg-primary-foreground' : 'bg-primary/60'}`} />}
                </Link>
              ))}
            </nav>
          </div>
          <div className="mt-auto">
            <div className="mb-5 rounded-2xl border border-primary/15 bg-primary/[.06] p-4">
              <div className="flex items-center gap-2 text-primary"><Sparkles className="size-4" /><span className="text-xs font-bold">Feito entre alunos</span></div>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">Um espaço para fazer circular o que ainda pode ser útil.</p>
            </div>
            <div className="flex items-center justify-between border-t border-border/70 pt-5">
              <div className="flex items-center gap-2.5">
                <span className="grid size-8 place-items-center rounded-full bg-accent text-xs font-extrabold text-background" data-testid="avatar-student">MC</span>
                <div><p className="text-xs font-bold text-foreground" data-testid="text-student-name">Marina Costa</p><p className="font-mono text-[9px] text-muted-foreground">RA 2025.0148</p></div>
              </div>
              <button type="button" aria-label="Sair" className="focus-lilac rounded-lg p-2 text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive" onClick={signOut} data-testid="button-logout">
                <LogOut className="size-4" />
              </button>
            </div>
          </div>
        </aside>

        <section className="min-w-0 flex-1">
          <header className="relative flex h-[76px] items-center justify-between border-b border-border/70 px-5 sm:px-8 lg:px-12">
            <div className="flex items-center gap-3 md:hidden">
              <button type="button" aria-label="Abrir menu" className="focus-lilac grid size-9 place-items-center rounded-xl bg-secondary text-foreground" onClick={() => setMobileMenuOpen((open) => !open)} data-testid="button-open-menu">
                {mobileMenuOpen ? <X className="size-[18px]" /> : <Menu className="size-[18px]" />}
              </button>
              <Link href="/inicio" className="focus-lilac" data-testid="link-mobile-brand"><PassOnMark compact /></Link>
            </div>
            <div className="relative hidden w-[260px] sm:block">
              <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/60" />
              <span className="block rounded-xl border border-border/70 bg-card py-2.5 pl-9 pr-3 text-xs text-muted-foreground/60" data-testid="text-search-placeholder">Buscar no Pass On</span>
            </div>
            <div className="relative flex items-center gap-3">
              <span className="hidden text-right sm:block"><span className="block text-xs font-bold text-foreground">Olá, Marina</span><span className="block font-mono text-[9px] uppercase tracking-wider text-muted-foreground">comunidade INA</span></span>
              <button type="button" aria-label="Abrir perfil" className="focus-lilac grid size-9 place-items-center rounded-full bg-accent text-xs font-extrabold text-background transition-transform hover:scale-105" onClick={() => setProfileOpen((open) => !open)} data-testid="button-profile">MC</button>
              {profileOpen && (
                <div className="absolute right-0 top-12 z-20 w-48 rounded-2xl border border-border bg-card p-2 shadow-2xl animate-rise" data-testid="menu-profile">
                  <div className="px-3 py-2"><p className="text-xs font-bold text-foreground">Marina Costa</p><p className="mt-1 text-[10px] text-muted-foreground">Aluno INA · RA 2025.0148</p></div>
                  <button type="button" onClick={signOut} className="focus-lilac flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-xs font-bold text-muted-foreground transition-colors hover:bg-secondary hover:text-destructive" data-testid="button-profile-logout"><LogOut className="size-3.5" /> Sair</button>
                </div>
              )}
            </div>
          </header>

          {mobileMenuOpen && (
            <div className="border-b border-border/70 bg-sidebar px-5 py-4 md:hidden animate-rise" data-testid="mobile-navigation">
              <nav className="grid grid-cols-3 gap-2" aria-label="Navegação mobile">
                {marketplaceNav.map(({ path, key, label, icon: Icon }) => (
                  <Link key={key} href={path} onClick={() => setMobileMenuOpen(false)} className={`focus-lilac flex items-center justify-center gap-2 rounded-xl px-2 py-3 text-center text-xs font-bold ${activeKey === key ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground'}`} data-testid={`link-mobile-nav-${key}`} aria-current={activeKey === key ? 'page' : undefined}>
                    <Icon className="size-4" /> {label}
                  </Link>
                ))}
              </nav>
              <button type="button" onClick={signOut} className="focus-lilac mt-3 flex w-full items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold text-destructive" data-testid="button-mobile-logout"><LogOut className="size-4" /> Sair</button>
            </div>
          )}

          <div className="mx-auto max-w-[1180px] px-5 pb-12 pt-9 sm:px-8 sm:pt-12 lg:px-12">{children}</div>
        </section>
      </div>
    </main>
  );
}

function HomeRoute() {
  return <MarketplaceShell><HomeContent /></MarketplaceShell>;
}

function SalesRoute() {
  return <MarketplaceShell><ListingsPage type="sales" /></MarketplaceShell>;
}

function DonationsRoute() {
  return <MarketplaceShell><ListingsPage type="donations" /></MarketplaceShell>;
}

function HomeContent() {
  const [publishIntent, setPublishIntent] = useState<'venda' | 'doacao' | null>(null);
  return (
    <div>
      <section className="relative overflow-hidden rounded-[2rem] border border-border/80 bg-card px-6 py-8 sm:px-9 sm:py-10 lg:px-12 lg:py-12 animate-rise" data-testid="section-marketplace-hero">
        <div className="absolute -right-28 -top-36 size-[390px] rounded-full border border-primary/20 animate-ring" />
        <div className="absolute -bottom-48 right-28 size-[330px] rounded-full border border-accent/10" />
        <div className="relative max-w-2xl">
          <div className="flex items-center gap-2 text-primary"><span className="size-1.5 rounded-full bg-primary" /><p className="font-mono text-[10px] uppercase tracking-[.18em]">mercado INA · só entre alunos</p></div>
          <h1 className="mt-5 text-[clamp(2.6rem,6vw,5.6rem)] font-extrabold leading-[.91] tracking-[-.085em] text-foreground">O que circula<br /><span className="text-primary">fica.</span></h1>
          <p className="mt-6 max-w-[480px] text-sm leading-7 text-muted-foreground sm:text-[15px]">Encontre roupas e produtos escolares que fazem sentido para a sua rotina — vendidos ou doados por quem vive o INA com você.</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/vendas" className="focus-lilac group inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-extrabold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-accent" data-testid="link-hero-vendas">Explorar vendas <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></Link>
            <Link href="/doacoes" className="focus-lilac inline-flex items-center gap-2 rounded-xl border border-border bg-secondary/50 px-4 py-3 text-xs font-extrabold text-foreground transition-colors hover:border-primary/40 hover:bg-secondary" data-testid="link-hero-doacoes">Ver doações</Link>
          </div>
        </div>
        <div className="relative mt-9 grid max-w-[500px] grid-cols-2 gap-3 sm:absolute sm:bottom-10 sm:right-10 sm:mt-0 sm:w-[330px]">
          <div className="rounded-2xl border border-white/10 bg-[#211637] p-4 animate-float"><ShoppingBag className="size-5 text-primary" /><p className="mt-8 text-2xl font-extrabold tracking-[-.06em] text-foreground" data-testid="stat-sale-items">12</p><p className="mt-1 text-[10px] uppercase tracking-[.12em] text-muted-foreground">à venda hoje</p></div>
          <div className="mt-7 rounded-2xl border border-white/10 bg-[#1c1830] p-4 animate-float delay-2"><Gift className="size-5 text-accent" /><p className="mt-8 text-2xl font-extrabold tracking-[-.06em] text-foreground" data-testid="stat-donation-items">8</p><p className="mt-1 text-[10px] uppercase tracking-[.12em] text-muted-foreground">para doar</p></div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-2" data-testid="section-marketplace-areas">
        <div className="group relative overflow-hidden rounded-3xl bg-primary p-6 text-primary-foreground sm:p-8 animate-rise delay-1">
          <div className="absolute -right-10 -top-14 size-44 rounded-full border border-primary-foreground/20 transition-transform duration-500 group-hover:scale-110" />
          <ShoppingBag className="relative size-6" />
          <p className="relative mt-8 font-mono text-[10px] uppercase tracking-[.16em] text-primary-foreground/65">para encontrar</p>
          <h2 className="relative mt-2 text-3xl font-extrabold tracking-[-.07em]">Vendas</h2>
          <p className="relative mt-2 max-w-sm text-sm leading-6 text-primary-foreground/75">Produtos em bom estado, com preço combinado direto entre alunos.</p>
          <Link href="/vendas" className="focus-lilac relative mt-7 inline-flex items-center gap-2 rounded-xl bg-primary-foreground/15 px-3.5 py-2.5 text-xs font-extrabold text-primary-foreground transition-colors hover:bg-primary-foreground/25" data-testid="link-area-vendas">Ver anúncios <ArrowRight className="size-3.5" /></Link>
        </div>
        <div className="group relative overflow-hidden rounded-3xl border border-border/80 bg-card p-6 sm:p-8 animate-rise delay-2">
          <div className="absolute -right-10 -top-14 size-44 rounded-full border border-accent/20 transition-transform duration-500 group-hover:scale-110" />
          <Gift className="relative size-6 text-accent" />
          <p className="relative mt-8 font-mono text-[10px] uppercase tracking-[.16em] text-accent">para passar adiante</p>
          <h2 className="relative mt-2 text-3xl font-extrabold tracking-[-.07em] text-foreground">Doações</h2>
          <p className="relative mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Itens gratuitos que podem começar uma nova história com outra pessoa.</p>
          <Link href="/doacoes" className="focus-lilac relative mt-7 inline-flex items-center gap-2 rounded-xl bg-secondary px-3.5 py-2.5 text-xs font-extrabold text-foreground transition-colors hover:bg-accent hover:text-background" data-testid="link-area-doacoes">Ver doações <ArrowRight className="size-3.5" /></Link>
        </div>
      </section>

      <section className="mt-10" data-testid="section-categories">
        <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="font-mono text-[10px] uppercase tracking-[.16em] text-primary">navegue por categoria</p><h2 className="mt-2 text-2xl font-extrabold tracking-[-.06em] text-foreground">Encontre do seu jeito</h2></div><span className="text-xs text-muted-foreground">4 categorias para começar</span></div>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {categories.slice(1).map(({ label, icon: Icon }, index) => (
            <Link key={label} href={index % 2 === 0 ? '/vendas' : '/doacoes'} className="focus-lilac group rounded-2xl border border-border/80 bg-card p-4 transition-all hover:-translate-y-1 hover:border-primary/50 hover:bg-secondary" data-testid={`link-category-${label.toLowerCase()}`}>
              <span className="grid size-10 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="size-[18px]" /></span>
              <p className="mt-5 text-sm font-extrabold text-foreground">{label}</p><p className="mt-1 text-[10px] text-muted-foreground">{index % 2 === 0 ? 'ver vendas' : 'ver doações'}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-10 flex flex-col justify-between gap-6 rounded-3xl border border-dashed border-primary/30 bg-primary/[.045] p-6 sm:flex-row sm:items-center sm:p-7" data-testid="section-publish">
        <div className="max-w-lg"><div className="flex items-center gap-2 text-primary"><Plus className="size-4" /><p className="font-mono text-[10px] uppercase tracking-[.15em]">quer contribuir?</p></div><h2 className="mt-2 text-2xl font-extrabold tracking-[-.06em] text-foreground">Faça um item circular.</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">A publicação de anúncios será adicionada em breve. Por enquanto, explore a comunidade.</p></div>
        <div className="flex shrink-0 flex-wrap gap-2">
          <button type="button" onClick={() => setPublishIntent('venda')} className="focus-lilac inline-flex items-center gap-2 rounded-xl bg-primary px-3.5 py-3 text-xs font-extrabold text-primary-foreground transition-all hover:bg-accent" data-testid="button-sell-product"><Tag className="size-4" /> Vender produto</button>
          <button type="button" onClick={() => setPublishIntent('doacao')} className="focus-lilac inline-flex items-center gap-2 rounded-xl border border-border bg-card px-3.5 py-3 text-xs font-extrabold text-foreground transition-colors hover:border-accent/50 hover:text-accent" data-testid="button-donate-product"><Gift className="size-4" /> Doar produto</button>
        </div>
      </section>
      {publishIntent && <div className="mt-3 flex items-start gap-3 rounded-2xl border border-primary/25 bg-primary/[.08] px-4 py-3 text-xs leading-5 text-primary animate-rise" role="status" aria-live="polite" data-testid="status-publish-coming-soon"><BadgeCheck className="mt-0.5 size-4 shrink-0" /><span>{publishIntent === 'venda' ? 'Vender produto' : 'Doar produto'} ficará disponível em breve. Este espaço demonstrativo ainda não publica anúncios.</span><button type="button" aria-label="Fechar aviso" onClick={() => setPublishIntent(null)} className="focus-lilac ml-auto rounded-md p-1 hover:bg-primary/10" data-testid="button-dismiss-publish-status"><X className="size-3.5" /></button></div>}
    </div>
  );
}

function CategoryFilters({ selected, onSelect }: { selected: Category; onSelect: (category: Category) => void }) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filtrar por categoria" data-testid="category-filters">
      {categories.map(({ label, icon: Icon }) => (
        <button key={label} type="button" role="tab" aria-selected={selected === label} onClick={() => onSelect(label)} className={`focus-lilac inline-flex shrink-0 items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold transition-all ${selected === label ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card text-muted-foreground hover:border-primary/40 hover:text-foreground'}`} data-testid={`button-filter-${label.toLowerCase()}`}>
          <Icon className="size-3.5" /> {label}
        </button>
      ))}
    </div>
  );
}

function ListingCard({ item, type }: { item: Listing; type: 'sales' | 'donations' }) {
  const Icon = item.icon;
  return (
    <article className="group overflow-hidden rounded-3xl border border-border/80 bg-card transition-all duration-300 hover:-translate-y-1 hover:border-primary/45 hover:shadow-[0_18px_40px_rgba(20,10,45,.28)]" data-testid={`card-listing-${item.id}`}>
      <div className={`relative flex h-[150px] items-end overflow-hidden bg-gradient-to-br ${item.color} p-5`}>
        <div className="absolute -right-8 -top-10 size-36 rounded-full border border-white/20 transition-transform duration-500 group-hover:scale-125" />
        <div className="absolute right-5 top-5 grid size-11 place-items-center rounded-2xl border border-white/15 bg-black/15 text-white/90 backdrop-blur-sm"><Icon className="size-5" /></div>
        <span className="relative rounded-full border border-white/20 bg-black/20 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[.12em] text-white/80" data-testid={`text-listing-category-${item.id}`}>{item.category}</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3"><h3 className="text-[15px] font-extrabold leading-tight tracking-[-.035em] text-foreground" data-testid={`text-listing-title-${item.id}`}>{item.title}</h3><button type="button" aria-label={`Favoritar ${item.title}`} className="focus-lilac shrink-0 rounded-lg p-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-accent" data-testid={`button-favorite-${item.id}`}><Heart className="size-4" /></button></div>
        <div className="mt-3 flex items-center gap-2 text-[11px] text-muted-foreground"><span className="grid size-5 place-items-center rounded-full bg-secondary text-[8px] font-extrabold text-primary">{item.seller.split(' ').map((part) => part[0]).join('')}</span><span data-testid={`text-listing-seller-${item.id}`}>{item.seller}</span><span className="text-border">·</span><span data-testid={`text-listing-condition-${item.id}`}>{item.condition}</span></div>
        <p className="mt-3 text-[11px] leading-5 text-muted-foreground" data-testid={`text-listing-note-${item.id}`}>{item.note}</p>
        <div className="mt-5 flex items-end justify-between gap-3 border-t border-border/70 pt-4"><div><p className="font-mono text-[9px] uppercase tracking-[.12em] text-muted-foreground">{type === 'sales' ? 'valor combinado' : 'disponibilidade'}</p><p className={`mt-1 text-lg font-extrabold tracking-[-.05em] ${type === 'donations' ? 'text-accent' : 'text-foreground'}`} data-testid={`text-listing-price-${item.id}`}>{item.price}</p></div><span className="inline-flex items-center gap-1 rounded-lg bg-secondary px-2 py-1.5 text-[10px] font-bold text-muted-foreground"><BadgeCheck className="size-3 text-primary" /> INA</span></div>
      </div>
    </article>
  );
}

function ListingsPage({ type }: { type: 'sales' | 'donations' }) {
  const [selected, setSelected] = useState<Category>('Todos');
  const isSales = type === 'sales';
  const items = (isSales ? saleListings : donationListings).filter((item) => selected === 'Todos' || item.category === selected);
  return (
    <div className="animate-rise" data-testid={`page-${type}`}>
      <section className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div><p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.18em] text-primary"><span className={`size-1.5 rounded-full ${isSales ? 'bg-primary' : 'bg-accent'}`} /> espaço do aluno INA</p><h1 className="mt-4 text-[clamp(2.6rem,6vw,4.6rem)] font-extrabold leading-[.9] tracking-[-.085em] text-foreground">{isSales ? 'Vendas' : 'Doações'}<span className="text-primary">.</span></h1><p className="mt-4 max-w-[510px] text-sm leading-6 text-muted-foreground">{isSales ? 'Itens de outros alunos, com preço claro e retirada combinada no campus.' : 'Coisas que ainda podem ser úteis para alguém da comunidade, sem custo.'}</p></div>
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card px-4 py-3"><span className="grid size-8 place-items-center rounded-xl bg-secondary text-primary"><UserRound className="size-4" /></span><div><p className="text-[10px] uppercase tracking-[.12em] text-muted-foreground">ambiente</p><p className="text-xs font-extrabold text-foreground">somente INA</p></div></div>
      </section>
      <section className="mt-9 rounded-2xl border border-border/70 bg-secondary/35 p-3 sm:p-4" data-testid="section-listing-filters"><div className="mb-3 flex items-center justify-between px-1"><p className="text-xs font-bold text-foreground">Explore por categoria</p><span className="font-mono text-[10px] text-muted-foreground">{items.length} {items.length === 1 ? 'item' : 'itens'}</span></div><CategoryFilters selected={selected} onSelect={setSelected} /></section>
      {items.length > 0 ? <section className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3" data-testid={`grid-listings-${type}`}>{items.map((item) => <ListingCard key={item.id} item={item} type={type} />)}</section> : <EmptyListings type={type} category={selected} />}
      <section className="mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl border border-dashed border-primary/30 bg-primary/[.045] p-6 sm:flex-row sm:items-center" data-testid={`section-${type}-coming-soon`}><div><p className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[.15em] text-primary"><Sparkles className="size-3.5" /> em breve</p><p className="mt-2 text-sm font-bold text-foreground">A publicação de anúncios está sendo preparada.</p><p className="mt-1 text-xs leading-5 text-muted-foreground">Enquanto isso, combine tudo com respeito e segurança dentro da comunidade.</p></div><span className="inline-flex items-center gap-2 rounded-xl bg-secondary px-3 py-2.5 text-xs font-bold text-muted-foreground"><WalletCards className="size-4" /> sem checkout</span></section>
    </div>
  );
}

function EmptyListings({ type, category }: { type: 'sales' | 'donations'; category: Category }) {
  return (
    <div className="flex min-h-[310px] items-center justify-center rounded-3xl border border-dashed border-border bg-card/40 px-6 text-center animate-rise" data-testid={`empty-listings-${type}`}>
      <div><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><PackageOpen className="size-6" /></span><h2 className="mt-5 text-xl font-extrabold tracking-[-.05em] text-foreground">Nada em {category.toLowerCase()} por aqui.</h2><p className="mt-2 max-w-xs text-sm leading-6 text-muted-foreground">Quando alguém publicar um item, ele aparece nesta lista.</p></div>
    </div>
  );
}

function Router() {
  const [location] = useLocation();
  return (
    <ErrorBoundary resetKey={location}>
      <Switch>
        <Route path="/" component={Login} />
        <Route path="/inicio" component={HomeRoute} />
        <Route path="/vendas" component={SalesRoute} />
        <Route path="/doacoes" component={DonationsRoute} />
        <Route component={NotFound} />
      </Switch>
    </ErrorBoundary>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;