import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://uehqakonondfenmjthcr.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlaHFha29ub25kZmVubWp0aGNyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyODkzMTEsImV4cCI6MjA4MDg2NTMxMX0._hflqbzlCpnRxeNxkaoiB8gw-PuW6zTJWeZImtzYhKk'
)

export default supabase
