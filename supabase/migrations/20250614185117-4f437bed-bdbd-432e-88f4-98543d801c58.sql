
-- Create the event_requirements table
CREATE TABLE IF NOT EXISTS public.event_requirements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid NOT NULL,
  contact_name text NOT NULL,
  contact_email text NOT NULL,
  event_type text NOT NULL,
  event_date text NOT NULL,
  location text NOT NULL,
  guest_count integer NOT NULL DEFAULT 0,
  budget numeric NOT NULL DEFAULT 0,
  description text,
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'processed')),
  created_at timestamp with time zone DEFAULT now() NOT NULL
);

-- Enable Row Level Security
ALTER TABLE public.event_requirements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own requirements" ON public.event_requirements
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own requirements" ON public.event_requirements
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can view all requirements" ON public.event_requirements
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'admin'
    )
  );

CREATE POLICY "Admins can update all requirements" ON public.event_requirements
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM public.profiles 
      WHERE profiles.id = auth.uid() 
      AND profiles.user_type = 'admin'
    )
  );
