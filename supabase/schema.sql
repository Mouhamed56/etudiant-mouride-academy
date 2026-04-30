-- ============================================
-- ÉTUDIANT MOURIDE ACADEMY — Schéma Supabase
-- ============================================

-- Extension UUID
create extension if not exists "uuid-ossp";

-- PROFILES (liés à auth.users)
create table profiles (
  id          uuid references auth.users on delete cascade primary key,
  full_name   text,
  avatar_url  text,
  lang        text default 'en' check (lang in ('fr', 'en', 'wo')),
  created_at  timestamptz default now(),
  updated_at  timestamptz default now()
);

-- COURSES
create table courses (
  id            uuid default uuid_generate_v4() primary key,
  slug          text unique not null,
  title_fr      text not null,
  title_en      text not null,
  title_wo      text,
  description_fr text,
  description_en text,
  description_wo text,
  level         text check (level in ('debutant', 'intermediaire', 'avance')),
  category      text,
  thumbnail_url text,
  duration_min  int default 0,
  is_published  boolean default false,
  created_at    timestamptz default now()
);

-- MODULES
create table modules (
  id           uuid default uuid_generate_v4() primary key,
  course_id    uuid references courses on delete cascade,
  title_fr     text not null,
  title_en     text not null,
  title_wo     text,
  content_fr   text,
  content_en   text,
  content_wo   text,
  video_url    text,
  audio_url    text,
  pdf_url      text,
  order_num    int not null,
  duration_min int default 10,
  created_at   timestamptz default now()
);

-- QUIZZES
create table quizzes (
  id        uuid default uuid_generate_v4() primary key,
  course_id uuid references courses on delete cascade,
  module_id uuid references modules on delete cascade,
  title_fr  text not null,
  title_en  text not null,
  title_wo  text,
  level     text check (level in ('debutant', 'intermediaire', 'avance')),
  created_at timestamptz default now()
);

-- QUESTIONS
create table questions (
  id              uuid default uuid_generate_v4() primary key,
  quiz_id         uuid references quizzes on delete cascade,
  question_fr     text not null,
  question_en     text not null,
  question_wo     text,
  options_fr      jsonb not null,
  options_en      jsonb not null,
  options_wo      jsonb,
  correct         int not null,
  explanation_fr  text,
  explanation_en  text,
  order_num       int default 0
);

-- USER PROGRESS
create table user_progress (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references auth.users on delete cascade,
  module_id   uuid references modules on delete cascade,
  course_id   uuid references courses on delete cascade,
  completed   boolean default false,
  score       int,
  completed_at timestamptz,
  created_at  timestamptz default now(),
  unique (user_id, module_id)
);

-- CERTIFICATES
create table certificates (
  id         uuid default uuid_generate_v4() primary key,
  user_id    uuid references auth.users on delete cascade,
  course_id  uuid references courses on delete cascade,
  score      int not null,
  issued_at  timestamptz default now(),
  unique (user_id, course_id)
);

-- RLS (Row Level Security)
alter table profiles       enable row level security;
alter table user_progress  enable row level security;
alter table certificates   enable row level security;

-- Policies: chaque utilisateur voit/modifie seulement ses données
create policy "Users view own profile"
  on profiles for select using (auth.uid() = id);

create policy "Users update own profile"
  on profiles for update using (auth.uid() = id);

create policy "Users view own progress"
  on user_progress for all using (auth.uid() = user_id);

create policy "Users view own certificates"
  on certificates for select using (auth.uid() = user_id);

-- Courses et modules sont publics en lecture
create policy "Public read courses"
  on courses for select using (is_published = true);

create policy "Public read modules"
  on modules for select using (true);

create policy "Public read quizzes"
  on quizzes for select using (true);

create policy "Public read questions"
  on questions for select using (true);

-- Trigger: créer profil automatiquement après inscription
create or replace function handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into profiles (id, full_name, avatar_url)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
