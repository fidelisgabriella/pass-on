import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { Link, useLocation } from 'wouter';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ArrowLeft, ArrowRight, BadgeCheck, Check, ChevronRight, Clock3, Gift, ImagePlus, LogOut, PackageCheck, ShieldCheck, Upload, UserRound } from 'lucide-react';
import {
  getGetDonationQueryKey,
  getGetStudentProfileQueryKey,
  getListDonationInterestsQueryKey,
  getListDonationsQueryKey,
  getListMyDonationsQueryKey,
  getListPendingDonationsQueryKey,
  useApproveDonation,
  useClaimModeratorAccess,
  useCreateDonation,
  useExpressDonationInterest,
  useGetDonation,
  useGetStudentProfile,
  useListDonationInterests,
  useListDonations,
  useListMyDonations,
  useListPendingDonations,
  useRequestUploadUrl,
  useSaveStudentProfile,
  useUpdateDonationStatus,
} from '@workspace/api-client-react';
import type { Donation, DonationCategory, DonationStatus } from '@workspace/api-client-react';
import { useAuth } from '@workspace/replit-auth-web';
import { useToast } from '@/hooks/use-toast';

const categories: DonationCategory[] = ['Roupas', 'Roupas de frio', 'Mochilas e estojos', 'Acessórios'];
const statusLabel: Record<DonationStatus, string> = {
  pending: 'Aguardando aprovação',
  available: 'Disponível',
  reserved: 'Reservado',
  delivered: 'Entregue',
};

function imageUrl(path: string) {
  return path.startsWith('/objects/') ? `/api/storage${path}` : path;
}

function FlowShell({ children, title = 'Pass On' }: { children: ReactNode; title?: string }) {
  const { logout } = useAuth();
  return <main className="app-noise min-h-[100dvh] bg-background pb-28" data-testid="donation-flow-shell">
    <header className="sticky top-0 z-30 border-b border-border/80 bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex h-[72px] max-w-[1200px] items-center justify-between px-5 sm:px-8">
        <Link href="/inicio" className="focus-lilac flex items-center gap-3 font-black tracking-[-.06em] text-foreground" data-testid="link-flow-brand">
          <span className="grid size-9 place-items-center rounded-[13px] bg-primary text-primary-foreground"><Gift className="size-[18px]" /></span>
          <span className="text-lg">pass<span className="text-primary">on</span></span>
        </Link>
        <p className="hidden text-xs font-bold text-muted-foreground sm:block">{title}</p>
        <button type="button" onClick={() => logout()} className="focus-lilac inline-flex items-center gap-2 rounded-xl px-3 py-2 text-xs font-extrabold text-muted-foreground hover:bg-secondary hover:text-foreground" data-testid="button-flow-logout"><LogOut className="size-4" /><span className="hidden sm:inline">Sair</span></button>
      </div>
    </header>
    <div className="mx-auto max-w-[1100px] px-5 py-7 sm:px-8 sm:py-10">{children}</div>
    <nav className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 px-2 pb-[max(8px,env(safe-area-inset-bottom))] pt-2 backdrop-blur-xl" aria-label="Navegação principal" data-testid="donation-navigation">
      <div className="mx-auto flex max-w-[760px] items-center justify-around gap-1">
        {[['/inicio', 'Início'], ['/vendas', 'Vendas'], ['/doacoes', 'Doações'], ['/minhas-doacoes', 'Minhas doações'], ['/perfil', 'Perfil']].map(([href, label]) =>
          <Link key={href} href={href} className="focus-lilac rounded-xl px-2 py-2 text-center text-[10px] font-extrabold text-muted-foreground hover:bg-secondary hover:text-primary sm:px-4 sm:text-xs" data-testid={`link-flow-${label.toLowerCase().replaceAll(' ', '-')}`}>{label}</Link>)}
      </div>
    </nav>
  </main>;
}

function Heading({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return <div className="mb-7">
    <p className="font-mono text-[10px] uppercase tracking-[.16em] text-primary">{eyebrow}</p>
    <h1 className="mt-2 text-[clamp(2rem,6vw,3.6rem)] font-black leading-[.96] tracking-[-.08em] text-foreground">{title}<span className="text-primary">.</span></h1>
    <p className="mt-3 max-w-[620px] text-sm leading-6 text-muted-foreground">{description}</p>
  </div>;
}

function StatePill({ status }: { status: DonationStatus }) {
  const Icon = status === 'available' ? BadgeCheck : status === 'delivered' ? PackageCheck : Clock3;
  return <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/[.08] px-3 py-1.5 text-[11px] font-extrabold text-primary" data-testid={`status-donation-${status}`}><Icon className="size-3.5" />{statusLabel[status]}</span>;
}

function DonationCard({ donation }: { donation: Donation }) {
  return <article className="group overflow-hidden rounded-3xl border border-border bg-card transition-all hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_16px_38px_hsl(var(--foreground)/.1)]" data-testid={`card-donation-${donation.id}`}>
    <Link href={`/doacao/${donation.id}`} className="focus-lilac block" data-testid={`link-donation-${donation.id}`}>
      <div className="relative flex h-[220px] items-center justify-center overflow-hidden bg-[#17131f] p-3">
        <img src={imageUrl(donation.imagePath)} alt={donation.title} className="size-full object-contain transition-transform duration-500 group-hover:scale-[1.03]" loading="lazy" data-testid={`image-donation-${donation.id}`} />
        <span className="absolute bottom-3 left-3 rounded-full border border-white/15 bg-black/70 px-2.5 py-1 font-mono text-[9px] uppercase tracking-[.1em] text-white">{donation.category}</span>
      </div>
    </Link>
    <div className="p-4 sm:p-5">
      <p className="text-[10px] font-bold uppercase tracking-[.12em] text-primary">doação · gratuita</p>
      <h2 className="mt-2 line-clamp-2 min-h-10 text-base font-black leading-5 tracking-[-.04em] text-foreground"><Link href={`/doacao/${donation.id}`} className="focus-lilac rounded-sm hover:text-primary">{donation.title}</Link></h2>
      <div className="mt-3 flex flex-wrap gap-2 text-[11px] text-muted-foreground"><span>{donation.size || 'Tamanho: Não informado'}</span><span>·</span><span>{donation.condition || 'Condição: Não informado'}</span></div>
      <div className="mt-4 flex items-center justify-between border-t border-border/70 pt-4"><StatePill status={donation.status} /><span className="text-[11px] text-muted-foreground">{donation.interestCount} interessados</span></div>
    </div>
  </article>;
}

function QueryMessage({ loading, error, empty, onRetry }: { loading: boolean; error?: boolean; empty?: boolean; onRetry?: () => void }) {
  if (loading) return <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="loading-donations">{[1, 2, 3].map((n) => <div key={n} className="animate-pulse overflow-hidden rounded-3xl border border-border bg-card"><div className="h-[220px] bg-secondary" /><div className="space-y-3 p-5"><div className="h-3 w-1/3 rounded bg-secondary" /><div className="h-5 w-3/4 rounded bg-secondary" /><div className="h-3 w-1/2 rounded bg-secondary" /></div></div>)}</div>;
  if (error) return <div className="rounded-3xl border border-destructive/20 bg-card p-8 text-center" role="alert" data-testid="error-donations"><h2 className="text-lg font-black">Não foi possível carregar as doações.</h2><p className="mt-2 text-sm text-muted-foreground">Tente novamente em instantes.</p><button onClick={onRetry} className="mt-4 rounded-xl bg-primary px-4 py-2.5 text-xs font-black text-primary-foreground" data-testid="button-retry-donations">Tentar novamente</button></div>;
  if (empty) return <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-12 text-center" data-testid="empty-donations"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><Gift className="size-6" /></span><h2 className="mt-4 text-xl font-black">Por enquanto, sem doações disponíveis.</h2><p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-muted-foreground">Quando alguém da escola passar um item adiante, ele aparece aqui.</p></div>;
  return null;
}

export function DonationsRoute() {
  const { data, isLoading, isError, refetch } = useListDonations();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const donations = useMemo(() => (data ?? []).filter((item) => item.status === 'available')
    .filter((item) => (!category || item.category === category) && `${item.title} ${item.category}`.toLowerCase().includes(search.trim().toLowerCase())), [data, category, search]);
  return <FlowShell title="Doações">
    <Heading eyebrow="circular é melhor" title="Doações" description="Itens gratuitos da comunidade escolar, prontos para ganhar uma nova história." />
    <div className="mb-6 grid gap-3 sm:grid-cols-[1fr_230px]">
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Buscar doações..." className="focus-lilac h-12 rounded-2xl border border-border bg-card px-4 text-sm outline-none focus:border-primary" data-testid="input-donation-search" />
      <select value={category} onChange={(e) => setCategory(e.target.value)} className="focus-lilac h-12 rounded-2xl border border-border bg-card px-4 text-sm text-foreground outline-none focus:border-primary" data-testid="select-donation-category"><option value="">Todas as categorias</option>{categories.map((value) => <option key={value} value={value}>{value}</option>)}</select>
    </div>
    {isLoading || isError || donations.length === 0 ? <QueryMessage loading={isLoading} error={isError} empty={!isLoading && !isError} onRetry={() => refetch()} /> :
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" data-testid="grid-donations">{donations.map((item) => <DonationCard key={item.id} donation={item} />)}</div>}
  </FlowShell>;
}

export function DonationDetailRoute({ id }: { id: string }) {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const queryKey = getGetDonationQueryKey(id);
  const { data: donation, isLoading, isError, refetch } = useGetDonation(id, { query: { enabled: !!id, queryKey } });
  const interest = useExpressDonationInterest();
  async function express() {
    if (!isAuthenticated) { setLocation('/'); return; }
    try {
      await interest.mutateAsync({ id });
      await Promise.all([queryClient.invalidateQueries({ queryKey }), queryClient.invalidateQueries({ queryKey: getListDonationsQueryKey() })]);
      toast({ title: 'Interesse registrado', description: 'O responsável pela doação poderá ver seu interesse.' });
    } catch { toast({ title: 'Não foi possível demonstrar interesse', description: 'Tente novamente em instantes.', variant: 'destructive' }); }
  }
  return <FlowShell title="Detalhes da doação">
    <Link href="/doacoes" className="focus-lilac mb-5 inline-flex items-center gap-2 text-xs font-extrabold text-muted-foreground hover:text-primary" data-testid="link-back-donations"><ArrowLeft className="size-4" />Todas as doações</Link>
    {isLoading ? <div className="grid animate-pulse gap-5 lg:grid-cols-2"><div className="h-[420px] rounded-3xl bg-secondary" /><div className="h-[420px] rounded-3xl bg-secondary" /></div> : isError || !donation ?
      <div className="rounded-3xl border border-destructive/20 bg-card p-8 text-center" data-testid="error-donation-detail"><p className="font-black">Não foi possível abrir esta doação.</p><button onClick={() => refetch()} className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-black text-primary-foreground" data-testid="button-retry-donation-detail">Tentar novamente</button></div> :
      <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]" data-testid={`page-donation-detail-${id}`}>
        <div className="flex min-h-[320px] items-center justify-center overflow-hidden rounded-3xl border border-border bg-[#17131f] p-3 sm:min-h-[460px]"><img src={imageUrl(donation.imagePath)} alt={donation.title} className="max-h-[620px] w-full object-contain" data-testid="image-donation-detail" /></div>
        <section className="rounded-3xl border border-border bg-card p-5 sm:p-8">
          <div className="flex items-center justify-between gap-3"><span className="font-mono text-[10px] uppercase tracking-[.16em] text-primary">{donation.category}</span><StatePill status={donation.status} /></div>
          <h1 className="mt-4 text-[clamp(2rem,5vw,3.5rem)] font-black leading-[.96] tracking-[-.075em] text-foreground" data-testid="text-donation-title">{donation.title}</h1>
          <p className="mt-3 text-sm font-extrabold text-primary">Sem custo · doação entre estudantes</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-2xl bg-secondary p-4"><p className="text-[10px] font-bold uppercase tracking-[.1em] text-muted-foreground">Condição</p><p className="mt-1 text-sm font-black">{donation.condition || 'Não informado'}</p></div>
            <div className="rounded-2xl bg-secondary p-4"><p className="text-[10px] font-bold uppercase tracking-[.1em] text-muted-foreground">Tamanho</p><p className="mt-1 text-sm font-black">{donation.size || 'Não informado'}</p></div>
          </div>
          <p className="mt-5 whitespace-pre-wrap text-sm leading-6 text-muted-foreground" data-testid="text-donation-description">{donation.description || 'Descrição: Não informado'}</p>
          <p className="mt-4 text-xs text-muted-foreground">Publicado por {donation.ownerName || 'Não informado'} · {donation.interestCount} interessados</p>
          {donation.status === 'available' && !donation.isOwner && <button type="button" disabled={interest.isPending || donation.isInterested} onClick={express} className="focus-lilac mt-7 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-black text-primary-foreground disabled:opacity-60" data-testid="button-express-interest">{donation.isInterested ? <><Check className="size-4" />Interesse enviado</> : interest.isPending ? 'Enviando...' : <>Tenho interesse <ArrowRight className="size-4" /></>}</button>}
          {donation.isOwner && <Link href="/minhas-doacoes" className="focus-lilac mt-7 flex h-12 items-center justify-center gap-2 rounded-xl border border-border text-sm font-black hover:border-primary" data-testid="link-manage-donation">Gerenciar doação <ChevronRight className="size-4" /></Link>}
        </section>
      </div>}
  </FlowShell>;
}

export function NewDonationRoute() {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const uploadUrl = useRequestUploadUrl();
  const createDonation = useCreateDonation();
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState('');
  const [error, setError] = useState('');
  useEffect(() => { if (!authLoading && !isAuthenticated) setLocation('/'); }, [authLoading, isAuthenticated, setLocation]);
  useEffect(() => { if (!file) { setPreview(''); return; } const url = URL.createObjectURL(file); setPreview(url); return () => URL.revokeObjectURL(url); }, [file]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = String(form.get('title') || '').trim();
    const condition = String(form.get('condition') || '').trim();
    const category = String(form.get('category') || '') as DonationCategory;
    if (!file || !title || title.length < 2 || !condition || condition.length < 2 || !categories.includes(category)) { setError('Inclua uma foto, um nome, uma categoria e a condição do item.'); return; }
    setError('');
    try {
      const requested = await uploadUrl.mutateAsync({ data: { name: file.name, size: file.size, contentType: file.type || 'application/octet-stream' } });
      const response = await fetch(requested.uploadURL, { method: 'PUT', headers: { 'Content-Type': file.type || 'application/octet-stream' }, body: file });
      if (!response.ok) throw new Error('Falha ao enviar a imagem.');
      await createDonation.mutateAsync({ data: { title, category, description: String(form.get('description') || '').trim() || null, size: String(form.get('size') || '').trim() || null, condition, imagePath: requested.objectPath } });
      await Promise.all([queryClient.invalidateQueries({ queryKey: getListMyDonationsQueryKey() }), queryClient.invalidateQueries({ queryKey: getListDonationsQueryKey() })]);
      toast({ title: 'Doação enviada para aprovação', description: 'Ela ficará visível depois da revisão da equipe.' });
      setLocation('/minhas-doacoes');
    } catch (err) { setError(err instanceof Error ? err.message : 'Não foi possível publicar. Tente novamente.'); }
  }
  const pending = uploadUrl.isPending || createDonation.isPending;
  return <FlowShell title="Nova doação"><Heading eyebrow="passe adiante" title="Nova doação" description="Compartilhe um item em bom estado. Toda publicação aguarda aprovação antes de aparecer para a comunidade." />
    {authLoading ? <div className="h-64 animate-pulse rounded-3xl bg-secondary" /> : isAuthenticated && <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[.85fr_1.15fr]" data-testid="form-new-donation" noValidate>
      <label className="focus-lilac relative flex min-h-[300px] cursor-pointer flex-col items-center justify-center overflow-hidden rounded-3xl border border-dashed border-primary/45 bg-card p-5 text-center transition-colors hover:bg-primary/[.04]">
        {preview ? <img src={preview} alt="Prévia do item" className="absolute inset-0 size-full object-contain bg-[#17131f]" data-testid="preview-donation-image" /> : <><span className="grid size-14 place-items-center rounded-2xl bg-secondary text-primary"><ImagePlus className="size-6" /></span><span className="mt-4 text-sm font-black">Adicione uma foto</span><span className="mt-1 text-xs text-muted-foreground">JPG, PNG ou outro formato de imagem</span></>}
        <input type="file" accept="image/*" className="sr-only" onChange={(event) => { setFile(event.target.files?.[0] ?? null); setError(''); }} data-testid="input-donation-photo" />
        {preview && <span className="absolute bottom-3 right-3 inline-flex items-center gap-2 rounded-xl bg-background/90 px-3 py-2 text-xs font-extrabold"><Upload className="size-3.5" />Trocar foto</span>}
      </label>
      <div className="rounded-3xl border border-border bg-card p-5 sm:p-7">
        <label className="mb-4 block text-xs font-extrabold text-secondary-foreground">Nome do item<input name="title" minLength={2} maxLength={120} required placeholder="Ex.: Mochila azul-marinho" className="focus-lilac mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary" data-testid="input-donation-title" /></label>
        <label className="mb-4 block text-xs font-extrabold text-secondary-foreground">Categoria<select name="category" required defaultValue="" className="focus-lilac mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary" data-testid="select-new-donation-category"><option value="" disabled>Escolha uma categoria</option>{categories.map((item) => <option value={item} key={item}>{item}</option>)}</select></label>
        <label className="mb-4 block text-xs font-extrabold text-secondary-foreground">Descrição<textarea name="description" maxLength={1000} rows={3} placeholder="Conte o que é importante sobre o item" className="focus-lilac mt-2 w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none focus:border-primary" data-testid="textarea-donation-description" /></label>
        <div className="grid gap-4 sm:grid-cols-2"><label className="block text-xs font-extrabold text-secondary-foreground">Tamanho <span className="font-normal text-muted-foreground">(opcional)</span><input name="size" maxLength={40} placeholder="Ex.: M" className="focus-lilac mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary" data-testid="input-donation-size" /></label><label className="block text-xs font-extrabold text-secondary-foreground">Condição<input name="condition" minLength={2} maxLength={60} required placeholder="Ex.: Bom estado" className="focus-lilac mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary" data-testid="input-donation-condition" /></label></div>
        <div className="mt-5 rounded-2xl border border-primary/20 bg-primary/[.07] p-4 text-xs leading-5 text-muted-foreground" data-testid="notice-donation-approval"><ShieldCheck className="mr-2 inline size-4 text-primary" />Sua publicação será revisada e começa como “Aguardando aprovação”. Doações são sempre gratuitas.</div>
        {error && <p className="mt-4 rounded-xl border border-destructive/20 bg-destructive/10 p-3 text-xs leading-5 text-destructive" role="alert" data-testid="error-new-donation">{error}</p>}
        <button type="submit" disabled={pending} className="focus-lilac mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-black text-primary-foreground disabled:opacity-60" data-testid="button-submit-donation">{pending ? 'Enviando...' : 'Enviar para aprovação'}{!pending && <ArrowRight className="size-4" />}</button>
      </div>
    </form>}
  </FlowShell>;
}

export function MyDonationsRoute() {
  const { data, isLoading, isError, refetch } = useListMyDonations();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const update = useUpdateDonationStatus();
  const interestsId = useState<string | null>(null);
  const setInterestId = interestsId[1];
  const [selectedInterestId] = interestsId;
  const interestKey = getListDonationInterestsQueryKey(selectedInterestId ?? '');
  const interests = useListDonationInterests(selectedInterestId ?? '', { query: { enabled: !!selectedInterestId, queryKey: interestKey } });
  async function move(item: Donation, status: 'reserved' | 'delivered') {
    try {
      await update.mutateAsync({ id: item.id, data: { status } });
      await Promise.all([queryClient.invalidateQueries({ queryKey: getListMyDonationsQueryKey() }), queryClient.invalidateQueries({ queryKey: getListDonationsQueryKey() })]);
      toast({ title: status === 'reserved' ? 'Item reservado' : 'Doação entregue' });
    } catch { toast({ title: 'Não foi possível atualizar o status', variant: 'destructive' }); }
  }
  return <FlowShell title="Minhas doações"><Heading eyebrow="acompanhe suas publicações" title="Minhas doações" description="Veja o andamento dos itens que você colocou para circular e acompanhe quem demonstrou interesse." />
    <div className="mb-5"><Link href="/doacoes/nova" className="focus-lilac inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-black text-primary-foreground" data-testid="link-create-donation"><Gift className="size-4" />Nova doação</Link></div>
    {isLoading ? <div className="space-y-3">{[1, 2].map((n) => <div key={n} className="h-36 animate-pulse rounded-3xl bg-secondary" />)}</div> : isError ? <QueryMessage loading={false} error onRetry={() => refetch()} /> : !data?.length ? <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-12 text-center" data-testid="empty-my-donations"><Gift className="mx-auto size-8 text-primary" /><h2 className="mt-4 text-xl font-black">Você ainda não publicou doações.</h2><p className="mt-2 text-sm text-muted-foreground">Um item parado pode ser exatamente o que alguém precisa.</p><Link href="/doacoes/nova" className="focus-lilac mt-5 inline-flex rounded-xl bg-primary px-4 py-3 text-xs font-black text-primary-foreground">Publicar primeiro item</Link></div> :
      <div className="space-y-4" data-testid="list-my-donations">{data.map((item) => <article key={item.id} className="rounded-3xl border border-border bg-card p-4 sm:p-5" data-testid={`card-my-donation-${item.id}`}>
        <div className="flex flex-col gap-4 sm:flex-row"><img src={imageUrl(item.imagePath)} alt={item.title} className="h-36 w-full rounded-2xl bg-[#17131f] object-contain sm:w-40" /><div className="min-w-0 flex-1"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-mono text-[10px] uppercase tracking-[.12em] text-primary">{item.category}</p><StatePill status={item.status} /></div><h2 className="mt-2 text-lg font-black">{item.title}</h2><p className="mt-1 text-xs text-muted-foreground">{item.interestCount} interessados · {item.condition || 'Condição: Não informado'}</p>
          <div className="mt-4 flex flex-wrap gap-2">{item.status === 'available' && <button onClick={() => move(item, 'reserved')} disabled={update.isPending} className="focus-lilac rounded-xl bg-primary px-3 py-2.5 text-xs font-black text-primary-foreground disabled:opacity-50" data-testid={`button-reserve-${item.id}`}>Marcar como reservado</button>}{item.status === 'reserved' && <button onClick={() => move(item, 'delivered')} disabled={update.isPending} className="focus-lilac rounded-xl bg-primary px-3 py-2.5 text-xs font-black text-primary-foreground disabled:opacity-50" data-testid={`button-delivered-${item.id}`}>Marcar como entregue</button>}<button onClick={() => setInterestId(selectedInterestId === item.id ? null : item.id)} className="focus-lilac rounded-xl border border-border px-3 py-2.5 text-xs font-extrabold hover:border-primary" data-testid={`button-view-interests-${item.id}`}>Ver interessados ({item.interestCount})</button></div>
          {selectedInterestId === item.id && <div className="mt-4 rounded-2xl bg-secondary p-4" data-testid={`list-interests-${item.id}`}><p className="text-xs font-black">Alunos interessados</p>{interests.isLoading ? <p className="mt-2 text-xs text-muted-foreground">Carregando...</p> : interests.isError ? <p className="mt-2 text-xs text-destructive">Não foi possível carregar interessados.</p> : !interests.data?.length ? <p className="mt-2 text-xs text-muted-foreground">Ainda não há alunos interessados.</p> : <ul className="mt-2 space-y-2">{interests.data.map((person, index) => <li key={`${person.studentName}-${index}`} className="flex items-center gap-2 text-sm"><UserRound className="size-4 text-primary" />{person.studentName}</li>)}</ul>}</div>}
        </div></div>
      </article>)}</div>}
  </FlowShell>;
}

export function ModerationRoute() {
  const { data: profile } = useGetStudentProfile();
  const { data, isLoading, isError, refetch } = useListPendingDonations({ query: { enabled: !!profile?.profile?.isModerator, queryKey: getListPendingDonationsQueryKey() } });
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const approve = useApproveDonation();
  async function approveItem(item: Donation) {
    try {
      await approve.mutateAsync({ id: item.id });
      await Promise.all([queryClient.invalidateQueries({ queryKey: getListPendingDonationsQueryKey() }), queryClient.invalidateQueries({ queryKey: getListDonationsQueryKey() })]);
      toast({ title: 'Doação aprovada', description: 'O item já pode circular na comunidade.' });
    } catch { toast({ title: 'Não foi possível aprovar', variant: 'destructive' }); }
  }
  return <FlowShell title="Moderação"><Heading eyebrow="cuidado com a comunidade" title="Moderação" description="Revise as publicações enviadas pelos estudantes." />
    {!profile?.profile?.isModerator ? <div className="rounded-3xl border border-border bg-card p-8 text-center" data-testid="moderation-forbidden"><ShieldCheck className="mx-auto size-8 text-primary" /><h2 className="mt-3 font-black">Acesso restrito à moderação.</h2><Link href="/inicio" className="focus-lilac mt-4 inline-flex text-xs font-extrabold text-primary">Voltar ao início</Link></div> :
      isLoading ? <div className="h-48 animate-pulse rounded-3xl bg-secondary" /> : isError ? <QueryMessage loading={false} error onRetry={() => refetch()} /> : !data?.length ? <div className="rounded-3xl border border-dashed border-border bg-card p-10 text-center" data-testid="empty-moderation"><Check className="mx-auto size-8 text-primary" /><h2 className="mt-3 font-black">Tudo em dia.</h2><p className="mt-2 text-sm text-muted-foreground">Não há doações aguardando aprovação.</p></div> :
        <div className="space-y-4" data-testid="list-pending-donations">{data.map((item) => <article key={item.id} className="grid gap-4 rounded-3xl border border-border bg-card p-4 sm:grid-cols-[180px_1fr] sm:p-5" data-testid={`card-pending-donation-${item.id}`}><img src={imageUrl(item.imagePath)} alt={item.title} className="h-40 w-full rounded-2xl bg-[#17131f] object-contain sm:h-44" /><div><div className="flex flex-wrap justify-between gap-2"><p className="font-mono text-[10px] uppercase tracking-[.12em] text-primary">{item.category}</p><StatePill status={item.status} /></div><h2 className="mt-2 text-xl font-black">{item.title}</h2><p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description || 'Descrição: Não informado'}</p><p className="mt-2 text-xs text-muted-foreground">Condição: {item.condition || 'Não informado'} · Tamanho: {item.size || 'Não informado'}</p><button onClick={() => approveItem(item)} disabled={approve.isPending} className="focus-lilac mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-3 text-xs font-black text-primary-foreground disabled:opacity-50" data-testid={`button-approve-donation-${item.id}`}>{approve.isPending ? 'Aprovando...' : <><Check className="size-4" />Aprovar publicação</>}</button></div></article>)}</div>}
  </FlowShell>;
}

export function RegisterRoute() {
  const { isAuthenticated, isLoading } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const saveProfile = useSaveStudentProfile();
  const [error, setError] = useState('');
  useEffect(() => { if (!isLoading && !isAuthenticated) setLocation('/'); }, [isLoading, isAuthenticated, setLocation]);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const displayName = String(form.get('displayName') || '').trim();
    const ra = String(form.get('ra') || '').trim();
    if (displayName.length < 2 || !ra) { setError('Informe seu nome e RA para continuar.'); return; }
    try {
      await saveProfile.mutateAsync({ data: { displayName, ra } });
      await queryClient.invalidateQueries({ queryKey: getGetStudentProfileQueryKey() });
      toast({ title: 'Cadastro concluído', description: `Boas-vindas, ${displayName}.` });
      setLocation('/inicio');
    } catch { setError('Não foi possível salvar seus dados. Confira as informações e tente novamente.'); }
  }
  return <FlowShell title="Cadastro"><div className="mx-auto max-w-[570px]"><Heading eyebrow="um espaço da sua escola" title="Seu cadastro" description="Conte como prefere ser chamado e informe seu RA para confirmar que faz parte da comunidade. O RA não aparece no seu perfil." />
    <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-5 sm:p-8" data-testid="form-student-registration" noValidate>
      <label className="mb-5 block text-xs font-extrabold">Nome para exibição<input name="displayName" minLength={2} maxLength={100} required placeholder="Como os outros alunos vão te chamar" className="focus-lilac mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary" data-testid="input-student-display-name" /></label>
      <label className="block text-xs font-extrabold">RA <input name="ra" maxLength={64} required placeholder="Seu registro acadêmico" autoComplete="off" className="focus-lilac mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary" data-testid="input-student-ra" /></label>
      <p className="mt-3 text-xs leading-5 text-muted-foreground">Seu RA é usado apenas para validar o cadastro e não será exibido no Pass On.</p>
      {error && <p className="mt-4 rounded-xl bg-destructive/10 p-3 text-xs text-destructive" role="alert" data-testid="error-student-registration">{error}</p>}
      <button disabled={saveProfile.isPending || isLoading} className="focus-lilac mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-black text-primary-foreground disabled:opacity-50" data-testid="button-save-student-profile">{saveProfile.isPending ? 'Salvando...' : <>Continuar <ArrowRight className="size-4" /></>}</button>
    </form></div></FlowShell>;
}

export function ModeratorSetupRoute() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const claim = useClaimModeratorAccess();
  const [error, setError] = useState('');
  const [complete, setComplete] = useState(false);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const input = event.currentTarget.elements.namedItem('setupCode') as HTMLInputElement;
    const setupCode = input.value;
    if (!setupCode.trim()) { setError('Informe o código de configuração.'); return; }
    setError('');
    try {
      await claim.mutateAsync({ data: { setupCode } });
      input.value = '';
      setComplete(true);
      await queryClient.invalidateQueries({ queryKey: getGetStudentProfileQueryKey() });
      toast({ title: 'Acesso de moderação configurado' });
    } catch { input.value = ''; setError('Não foi possível validar o código. Confira e tente novamente.'); }
  }
  return <FlowShell title="Configurar moderação"><div className="mx-auto max-w-[560px]"><Heading eyebrow="configuração única" title="Acesso de moderação" description="A primeira pessoa responsável pode ativar a moderação com o código de configuração." />
    {!isAuthenticated ? <div className="rounded-3xl border border-border bg-card p-7 text-center" data-testid="moderator-setup-auth-required"><p className="font-black">Entre para continuar.</p><button onClick={() => setLocation('/')} className="focus-lilac mt-4 rounded-xl bg-primary px-4 py-3 text-xs font-black text-primary-foreground" data-testid="button-setup-login">Entrar</button></div> : complete ? <div className="rounded-3xl border border-primary/25 bg-card p-8 text-center" role="status" data-testid="success-moderator-setup"><span className="mx-auto grid size-14 place-items-center rounded-2xl bg-primary/10 text-primary"><Check className="size-7" /></span><h2 className="mt-4 text-xl font-black">Pronto. Você pode moderar doações.</h2><Link href="/moderacao/doacoes" className="focus-lilac mt-5 inline-flex rounded-xl bg-primary px-4 py-3 text-xs font-black text-primary-foreground">Abrir moderação</Link></div> :
    <form onSubmit={submit} className="rounded-3xl border border-border bg-card p-5 sm:p-8" data-testid="form-moderator-setup" noValidate><label className="block text-xs font-extrabold">Código de configuração<input type="password" name="setupCode" autoComplete="new-password" className="focus-lilac mt-2 h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none focus:border-primary" data-testid="input-moderator-setup-code" /></label><p className="mt-3 text-xs leading-5 text-muted-foreground">O código é enviado somente para validação e não fica salvo neste navegador.</p>{error && <p className="mt-4 rounded-xl bg-destructive/10 p-3 text-xs text-destructive" role="alert" data-testid="error-moderator-setup">{error}</p>}<button disabled={claim.isPending} className="focus-lilac mt-6 h-12 w-full rounded-xl bg-primary text-sm font-black text-primary-foreground disabled:opacity-50" data-testid="button-claim-moderator">{claim.isPending ? 'Validando...' : 'Ativar moderação'}</button></form>}</div></FlowShell>;
}

export function ProfileRoute() {
  const { logout } = useAuth();
  const { data, isLoading, isError, refetch } = useGetStudentProfile();
  const profile = data?.profile;
  const favorites = typeof window !== 'undefined' ? 0 : 0;
  return <FlowShell title="Perfil"><div className="mx-auto max-w-[720px]"><Heading eyebrow="seu espaço" title="Perfil" description="Suas informações e ferramentas da comunidade escolar." />
    {isLoading ? <div className="h-56 animate-pulse rounded-3xl bg-secondary" /> : isError ? <div className="rounded-3xl border border-destructive/20 bg-card p-8 text-center" data-testid="error-profile"><p className="font-black">Não foi possível carregar seu perfil.</p><button onClick={() => refetch()} className="mt-4 rounded-xl bg-primary px-4 py-2 text-xs font-black text-primary-foreground" data-testid="button-retry-profile">Tentar novamente</button></div> :
    <section className="rounded-3xl border border-border bg-card p-6 sm:p-8" data-testid="section-profile-card"><div className="flex items-center gap-4"><span className="grid size-16 place-items-center rounded-2xl bg-accent text-lg font-black text-accent-foreground"><UserRound className="size-7" /></span><div><h2 className="text-xl font-black" data-testid="text-profile-name">{profile?.displayName || 'Estudante'}</h2><p className="mt-1 text-sm text-muted-foreground">{profile?.isModerator ? 'Equipe de moderação' : 'Estudante · E. E. República do Suriname'}</p></div></div>
      <div className="mt-7 flex flex-wrap gap-3">{profile?.isModerator && <><Link href="/moderacao/doacoes" className="focus-lilac rounded-xl bg-primary px-4 py-3 text-xs font-black text-primary-foreground" data-testid="link-profile-moderation">Moderar doações</Link><Link href="/moderador/configurar" className="focus-lilac rounded-xl border border-border px-4 py-3 text-xs font-extrabold" data-testid="link-profile-moderator-setup">Configuração de moderação</Link></>}<Link href="/minhas-doacoes" className="focus-lilac rounded-xl border border-border px-4 py-3 text-xs font-extrabold" data-testid="link-profile-my-donations">Minhas doações</Link></div>
      <button type="button" onClick={() => logout()} className="focus-lilac mt-7 inline-flex items-center gap-2 rounded-xl border border-destructive/20 px-4 py-3 text-xs font-black text-destructive hover:bg-destructive/10" data-testid="button-logout-profile"><LogOut className="size-4" />Sair da conta</button>
    </section>}
  </div></FlowShell>;
}
