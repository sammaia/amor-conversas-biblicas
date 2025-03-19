
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? ''
    );

    const { method, action, key } = await req.json();

    // Obter o usuário atual a partir do token de autorização
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Authorization header is required');
    }

    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: userError } = await supabaseClient.auth.getUser(token);

    if (userError || !user) {
      throw new Error('Usuário não autenticado');
    }

    if (method === 'GET') {
      // Buscar a chave da API
      const { data, error } = await supabaseClient
        .from('api_keys')
        .select('key, provider')
        .eq('provider', action)
        .single();

      if (error) {
        console.error('Erro ao buscar chave da API:', error);
        return new Response(
          JSON.stringify({ error: 'Chave não encontrada' }),
          { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ key: data.key }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    } else if (method === 'POST') {
      // Verificar se a chave já existe
      const { data: existingKey, error: checkError } = await supabaseClient
        .from('api_keys')
        .select('id')
        .eq('provider', action)
        .maybeSingle();

      if (checkError) {
        console.error('Erro ao verificar chave existente:', checkError);
      }

      let result;
      
      if (existingKey) {
        // Atualizar chave existente
        result = await supabaseClient
          .from('api_keys')
          .update({ key, updated_at: new Date().toISOString() })
          .eq('provider', action);
      } else {
        // Inserir nova chave
        result = await supabaseClient
          .from('api_keys')
          .insert({
            provider: action,
            key,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
      }

      if (result.error) {
        console.error('Erro ao salvar chave da API:', result.error);
        return new Response(
          JSON.stringify({ error: 'Falha ao salvar chave' }),
          { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      return new Response(
        JSON.stringify({ success: true }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ error: 'Método não suportado' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Erro na função de API keys:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
