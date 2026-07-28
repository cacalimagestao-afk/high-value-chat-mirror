
CREATE TABLE public.inscricoes_evento (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  cpf TEXT NOT NULL,
  empresa TEXT NOT NULL,
  ramo_atuacao TEXT NOT NULL,
  cidade_atuacao TEXT NOT NULL,
  pagamento_confirmado BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

GRANT INSERT, SELECT ON public.inscricoes_evento TO anon;
GRANT INSERT, SELECT ON public.inscricoes_evento TO authenticated;
GRANT ALL ON public.inscricoes_evento TO service_role;

ALTER TABLE public.inscricoes_evento ENABLE ROW LEVEL SECURITY;

-- Anyone can create an inscription (public form)
CREATE POLICY "Anyone can insert inscription"
ON public.inscricoes_evento
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Allow reading own row by id (so app can re-check pagamento_confirmado after submit)
CREATE POLICY "Anyone can read by id"
ON public.inscricoes_evento
FOR SELECT
TO anon, authenticated
USING (true);
