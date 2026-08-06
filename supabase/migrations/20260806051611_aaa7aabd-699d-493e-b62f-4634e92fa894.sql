CREATE OR REPLACE FUNCTION public.can_manage_content(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY INVOKER
SET search_path TO 'public'
AS $function$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id
      AND role IN ('super_admin','admin','content_manager','editor')
  )
$function$;

REVOKE ALL ON FUNCTION public.can_manage_content(uuid) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.can_manage_content(uuid) FROM anon;
GRANT EXECUTE ON FUNCTION public.can_manage_content(uuid) TO authenticated;
GRANT EXECUTE ON FUNCTION public.can_manage_content(uuid) TO service_role;